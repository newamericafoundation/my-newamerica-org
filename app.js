// Allow ES6 code on the server.
require("babel/register");

var express = require('express'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    connectMongo = require('connect-mongo'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    dbConnector = require('./db/connector.js'),
    router = require('./app/routes/index.js');

// Configure authentication.
require('./config/passport_config.js');

var appConfig = require('./config/app/environments.json');

var env = process.env.NODE_ENV,
    app = express(),
    MongoStore = connectMongo(session),
    port = process.env.PORT || appConfig.development.port;

// configure Express
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// GZip serving middleware must be declared before static folder declaration. 
app.get([ '*.js' ], require('./app/middleware/serve_gzip.js'));

app.use(express.static('./public'));

app.use(methodOverride());
app.use(cookieParser());

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
        cookie: { maxAge: 1 * 3600 * 1000 }
    }));

    app.use(passport.initialize());
    app.use(passport.session({
        resave: true,
        saveUninitialized: false
    }));

    app.use(function(req, res, next) {
        req.db = db;
        next();
    });

    // Use main router.
    app.use(router);

    app.listen(port, function() {
        console.log('Listening on port ' + port + '.')
    });

});