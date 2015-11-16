import * as express from 'express';
import * as passport from 'passport';
import * as React from 'react';
import { ensureNothing, ensureAuthenticated } from './../middleware/auth.js';
import request from 'request';
import gm from 'gm';
import fs from 'fs';

import authRouter from './auth.js'
import apiV1Router from './api/v1/index.js'

var router = express.Router();

// Authentication routes.
router.use('/auth', authRouter);

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Data api routes.
router.use('/api/v1', apiV1Router);

var currentAuthMiddleware = (process.env.NODE_ENV === 'development') ? ensureNothing : ensureAuthenticated;

// For all other routes, render client-side application JavaScript.
// Further routing is handled on the client.
router.get('*', currentAuthMiddleware, (req, res) => {
    return res.render('app', { user: req.user });
});

export default router