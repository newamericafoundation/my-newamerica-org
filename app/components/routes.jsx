import React from 'react';
import { Router, Route, RouteHandler, Redirect } from 'react-router';
import { history } from 'react-router/lib/History';

import Header from './mixins/header.jsx';

import Dashboard from './dashboard.jsx';
import RoomBooking from './room_booking.jsx';
import StaffDirectory from './staff_directory.jsx';
import WeeklyWins from './weekly_wins.jsx';
import Resources from './resources.jsx';
import Faq from './faq.jsx';
import Readmes from './readmes.jsx';

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
		<Route name='root' path='' handler={Dashboard} />
		<Route name='dashboard' path='dashboard' handler={Dashboard} />
		<Route path='staff-directory' handler={StaffDirectory} />
		<Route path='weekly-wins' handler={WeeklyWins} />
		<Route path='readmes' handler={Readmes} />
		<Route path='floorplans' handler={RoomBooking} />
		<Route path='resources' handler={Resources} />
		<Route path='faq' handler={Faq} />
		<Redirect from="*" to="dashboard" />
	</Route>
);

export default routes;