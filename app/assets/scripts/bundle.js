// Do not bundle User model.

import React from 'react';
import ReactDOM from 'react-dom';

var routes = require('./../../routes/client.jsx');

console.log('Hi, Mom!');

ReactDOM.render(routes, global.document.getElementById('main'));