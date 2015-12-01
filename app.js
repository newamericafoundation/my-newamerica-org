// Entry point to the app.

// Allow ES6 syntax in all required files.
require('babel-core/register');

// Try to load development environment variables if the environment is not set to production already.
if (process.env['NODE_ENV'] !== 'production') { 

	try {
		require('dotenv').load();
	} catch(err) {
		console.log(err);
		console.log('Could not load development environment variables.');
	}

}

// Require main server file.
require('./server.js');