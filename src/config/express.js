const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const passport = require('passport')
const { logs } = require('./vars')
const error = require('../middlewares/error')

/** *
 * Express instance
 * @public
 */
const app = express()

process.env.TZ = 'Asia/Bangkok'

// request logging. dev: console | production: file
app.use(morgan(logs))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

// enable authentication
app.use(passport.initialize())
// passport.use('agent', strategies.agent)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
