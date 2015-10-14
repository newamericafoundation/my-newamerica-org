import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import Header from './../components/general/header.jsx';

import Dashboard from './../components/route_handlers/dashboard/index/root.jsx';

import RoomBooking from './../components/route_handlers/floors/index/root.jsx';

import StaffMembersIndex from './../components/route_handlers/staff_members/index/root.jsx';
import StaffMembersNew from './../components/route_handlers/staff_members/index/root.jsx';

import WeeklyWins from './../components/route_handlers/weekly_wins/index/root.jsx';

import Resources from './../components/route_handlers/resources/index/root.jsx';
import ResourcesNew from './../components/route_handlers/resources/new/root.jsx';

import Faq from './../components/route_handlers/faqs/index/root.jsx';

import Readmes from './../components/route_handlers/readmes/index/root.jsx';
import ReadmesNew from './../components/route_handlers/readmes/new/root.jsx';
import ReadmesEdit from './../components/route_handlers/readmes/edit/root.jsx';

class App extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Header user={this.props.user} />
				{ this.props.children }
			</div>
		);
	}
}

import readme from './../models/readme.js';

import resourceRouteGenerator from './../components/route_handlers/helpers/resource_route_generator.jsx';

var readmeRoutes = resourceRouteGenerator(readme.Model, 'rme');

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path='/' component={App}>

			<IndexRoute component={Dashboard} />

			<Route path='staff-directory' component={StaffMembersIndex} />
			<Route path='staff-directory/new' component={StaffMembersNew} />

			<Route path='weekly-wins' component={WeeklyWins} />

			<Route path='readmes' component={Readmes} />
			<Route path='readmes/new' component={ReadmesNew} />
			<Route path='readmes/:id/edit' component={ReadmesEdit} />

			<Route path='floorplans' component={RoomBooking} />

			<Route path='resources' component={Resources} />
			<Route path='resources/new' component={ResourcesNew} />

			<Route path='faq' component={Faq} />

			{ readmeRoutes }

		
			

		</Route>
	</Router>
);

console.log(routes);

export default routes;