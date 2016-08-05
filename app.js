require('babel-core/register');

if (process.env.NODE_ENV !== 'production') {
  try {
    require('dotenv').load();
  } catch(err) {
    console.log(err);
    console.log('Could not load development environment variables.');
  }
}

require('./server.js');
