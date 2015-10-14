// Do not bundle User model.

var React = require('react');
var Router = require('react-router');

var routes = require('./../../routes/client.jsx');

console.log('Hi, Mom!');

React.render(routes, global.document.getElementById('main'));