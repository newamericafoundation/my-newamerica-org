// Entry point to the app.
// To keep consistency among other projects that work off the boilerplate, do not modify this file.
// Instead, add project-specific configurations under ./config/app_config.js.

// Allow ES6 syntax in all required files.
require('babel-core/register')

if (process.env['NODE_ENV'] !== 'production') { require('dotenv').load() }

require('./server.js')