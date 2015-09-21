// Allow ES6 code on the server.
require("babel/register");

var express = require('express'),
    passport = require('passport'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    session = require('express-session'),
    router = require('./app/routes/index.js');

// Configure authentication.
require('./config/passport_config.js');


var app = express();

// configure Express
app.set('views', __dirname + '/app/views');
app.set('view engine', 'jade');

// Log query urls.
// app.use(require('./app/middleware/log.js'));

app.use(express.static('./public'));
app.use(cookieParser());
app.use(methodOverride());
app.use(session({ 
    secret: 'Big_Secret',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session({
    resave: false,
    saveUninitialized: false
}));

// Require to compile icons into React components.
// require('./util/icon_parser.js');

// Use main router.
app.use(router);

var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log('Listening on port ' + port + '.')
});