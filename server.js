import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import methodOverride from 'method-override'
import session from 'express-session'
import { MongoClient } from 'mongodb'
import connectMongo from 'connect-mongo'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'

import serveGzipMiddleware from './app/middleware/serve_gzip.js'

import router from './app/routes/index.js'

import dbConnector from './db/connector.js'

// Configure passport. Must run before initializing passport on the app instance.
require('./config/passport_config.js')

var app = express(),
	MongoStore = connectMongo(session);

var { NODE_ENV, PORT, PRODUCTION_DB_URL } = process.env

app.set('views', __dirname + '/app/views')
app.set('view engine', 'jade')

// Basic configuration.
app.use(bodyParser.json({ limit: '50mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000 }))

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js', '*.json' ], serveGzipMiddleware)

app.use(express.static('public'))

app.use(methodOverride())
app.use(cookieParser())
	
var dbUrlBase = (NODE_ENV === 'development') ? 'localhost' : PRODUCTION_DB_URL
var dbUrl = `mongodb://${dbUrlBase}:27017/mongoid`

//MongoClient.connect(dbUrl, (err, db) => {

	// if (err) { return console.log('Unable to connect to the database.') }

dbConnector.then(function(db) {

	// Initialize session with database storage.
	app.use(session({
	    secret: 'Super_Big_Secret',
	    saveUninitialized: false,
	    resave: true,
	    store: new MongoStore({ 
	    	db: db,
	    	collection: 'sessions',
	    	stringify: false
	    }),
	    cookie: { maxAge: 1 * 3600 * 1000 * 24 * 5 }
	}))

	// Initialize passport.
	app.use(passport.initialize());
	app.use(passport.session({
		resave: true,
		saveUninitialized: false
	}))

	app.use(function(req, res, next) {
		req.db = db;
		next();
	})

	// Use router (see ./app/routes directory).
	app.use(router)

	// Start server.
	app.listen(PORT, function(err) { 
		if(err) { return console.log(err); }
		console.log('Listening on port ' + PORT + '.');
	})

});