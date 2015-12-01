import * as express from 'express'
import * as passport from 'passport'
import * as React from 'react'

import request from 'request'
import gm from 'gm'
import fs from 'fs'

import { ensureNothing, ensureAuthenticated } from './../middleware/auth.js'

import authRouter from './auth.js'
import apiV1Router from './api/v1/index.js'

var router = express.Router()

// Authentication routes.
router.use('/auth', authRouter)

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/logout', (req, res) => {
    req.logout()
    res.redirect('/')
});

// Data api routes.
router.use('/api/v1', apiV1Router)

var  { NODE_ENV } = process.env

var currentAuthMiddleware = (NODE_ENV === 'development') ? ensureNothing : ensureAuthenticated

// For all other routes, render client-side application JavaScript.
// Further routing is handled on the client.
router.get('*', currentAuthMiddleware, (req, res) => {
	var user = req.user
	if (!user && NODE_ENV === 'development') {
		user = { isAdmin: true, name: { givenName: 'Anne-Marie' } }
	}
    return res.render('app', { user: user });
});

export default router