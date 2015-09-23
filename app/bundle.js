// Do not bundle User model.

var React = require('react');
var Router = require('react-router');

var routes = require('./router/client.jsx');

console.log('Hi, Mom!');

Router.run(routes, Router.HistoryLocation, (Root) => {
	React.render(<Root user={global.user} />, global.document.getElementById('main'));
});