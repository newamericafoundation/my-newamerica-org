import * as express from 'express'

import {ensureNothing, ensureAuthenticated} from './../middleware/auth.js'

import authRouter from './auth.js'
import apiV1Router from './api/v1/index.js'

const router = express.Router()

// Authentication routes.
router.use('/auth', authRouter)

router.get('/login', (req, res) => {
  res.render('login')
})

router.get('/logout', (req, res) => {
  req.logout()
  res.redirect('/')
})

// Data api routes.
router.use('/api/v1', apiV1Router)

const {NODE_ENV} = process.env

const currentAuthMiddleware = (NODE_ENV === 'development') ? ensureNothing : ensureAuthenticated

// For all other routes, render client-side application JavaScript.
// Further routing is handled on the client.
router.get('*', currentAuthMiddleware, (req, res) => {
  let {user} = req
  if (!user && NODE_ENV === 'development') {
    user = {isAdmin: true, name: {givenName: 'Anne-Marie'}}
  }
  return res.render('app', {user: user})
})

export default router
