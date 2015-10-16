import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import Header from './../components/general/header.jsx';

import Dashboard from './../components/route_handlers/dashboard/index.jsx';

import RoomBooking from './../components/route_handlers/floors/index.jsx';
import StaffMembers from './../components/route_handlers/staff_members/index.jsx';
import WeeklyWins from './../components/route_handlers/weekly_wins/index.jsx';
import Resources from './../components/route_handlers/resources/index.jsx';
import Faq from './../components/route_handlers/faqs/index.jsx';
import Readmes from './../components/route_handlers/readmes/index.jsx';

class App extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Header user={window.user} />
				{ this.props.children }
			</div>
		);
	}
}

class Wrapper extends React.Component {
	render() { return (<div className='fill-parent'>{ this.props.children }</div>); }
}

import * as models from './../models/index.js';

import resourceRouteGenerator from './../components/route_handlers/helpers/resource_route_generator.jsx';

var routes = (
	<Router history={createBrowserHistory()}>
		<Route path='/' component={App}>

			<IndexRoute component={Dashboard} />

			<Route path='staff-directory' component={StaffMembers} />
			<Route path='weekly-wins' component={WeeklyWins} />
			<Route path='readmes' component={Readmes} />
			<Route path='floorplans' component={RoomBooking} />
			<Route path='resources' component={Resources} />
			<Route path='faq' component={Faq} />

			{ resourceRouteGenerator(models.readme.Model) }
			{ resourceRouteGenerator(models.faq.Model) }
			{ resourceRouteGenerator(models.resource.Model) }
			{ resourceRouteGenerator(models.weeklyWin.Model) }
			{ resourceRouteGenerator(models.staffMember.Model) }

		</Route>
	</Router>
);

export default routes;