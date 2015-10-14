import passport from 'passport';
import { OAuth2Strategy } from 'passport-google-oauth';
import user from './../app/models/user.js';
import express from 'express';

var getCallbackUrl = function() {
    var env = express().get('env');
    var urlBase = (env === 'development') ? '127.0.0.1:3000' : 'my.newamerica.org';
    return 'http://' + urlBase + '/auth/google/callback';
};

// API Access link for creating client ID and secret:
// https://code.google.com/apis/console/
var { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;

// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.  However, since this example does not
//   have a database of user records, the complete Google profile is
//   serialized and deserialized.
passport.serializeUser(function(user, done) {
    done(null, { id: user.id });
});

passport.deserializeUser(function(obj, done) {
    var model = new user.Model({ id: obj.id });
    model.getRetrievePromise().then((model) => {
        done(null, model.toClientJSON());
    }, () => { console.log('could not deserialize'); });
});

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
passport.use(new OAuth2Strategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: getCallbackUrl()
    },
    function(accessToken, refreshToken, profile, done) {

        profile._json.accessToken = accessToken;

        var model = new user.Model(profile._json);

        if (!model.isDomainAuthorized()) {
            return done(
                null, 
                false, 
                { message: 'Please log into your newamerica.org as your primary account. We are working on a more robust solution to handle multiple Google logins for more convenient access to the site.' },
                { message: 'Please log into your newamerica.org as your primary account. We are working on a more robust solution to handle multiple Google logins for more convenient access to the site.' }
            );
        }

        model.getSavePromise().then(() => {
            return done(null, model.toSessionJSON());
        })
            .catch((err) => { return done(err); });

    }
));