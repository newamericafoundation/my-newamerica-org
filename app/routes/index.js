import * as express from 'express';
import * as passport from 'passport';
import * as React from 'react';
import * as authMiddleware from './../middleware/auth.js';
import * as gcalMiddleware from './../middleware/calendar.js';
import request from 'request';
import gm from 'gm';
import fs from 'fs';

var router = express.Router();

// Authentication routes.
router.use('/auth', require('./auth.js'));

router.get('/login', (req, res) => {
	console.log(req.authInfo);
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Data api routes.
router.use('/api/v1', require('./api/v1/index.js'));

var currentAuthMiddleware = (process.env.NODE_ENV === 'development') ? authMiddleware.ensureNothing : authMiddleware.ensureAuthenticated;

// For all other routes, render client-side application JavaScript.
// Further routing is handled on the client.
router.get('*', currentAuthMiddleware, (req, res) => {
    return res.render('app', { user: req.user });
});

module.exports = router;