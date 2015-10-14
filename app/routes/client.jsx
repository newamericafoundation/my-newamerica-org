import React from 'react';
import { Router, Route, RouteHandler, Redirect } from 'react-router';
import { history } from 'react-router/lib/History';

import Header from './../components/general/header.jsx';

import Dashboard from './../components/route_handlers/dashboard/index/root.jsx';

import RoomBooking from './../components/route_handlers/floors/index/root.jsx';

import StaffDirectory from './../components/route_handlers/staff_members/index/root.jsx';

import WeeklyWins from './../components/route_handlers/weekly_wins/index/root.jsx';
import Resources from './../components/route_handlers/resources/index/root.jsx';
import Faq from './../components/route_handlers/faqs/index/root.jsx';
import Readmes from './../components/route_handlers/readmes/index/root.jsx';

class App extends React.Component {
	render() {
		return (
			<div className='wrapper'>
				<Header user={this.props.user} />
				<RouteHandler user={this.props.user} />
			</div>
		);
	}
}

var routes = (
	<Route handler={App}>
		<Route path='/' handler={Dashboard} />
		<Route path='/dashboard' handler={Dashboard} />
		<Route path='/staff-directory' handler={StaffDirectory} />
		<Route path='/weekly-wins' handler={WeeklyWins} />
		<Route path='/readmes' handler={Readmes} />
		<Route path='/floorplans' handler={RoomBooking} />
		<Route path='/resources' handler={Resources} />
		<Route path='/faq' handler={Faq} />
		<Redirect from="*" to="dashboard" />
	</Route>
);

export default routes;