import React from 'react';
import { Router, Route, RouteHandler, Redirect } from 'react-router';
import { history } from 'react-router/lib/History';

import Header from './../components/general/header.jsx';

import Dashboard from './../components/route_handlers/dashboard.jsx';
import RoomBooking from './../components/route_handlers/room_booking.jsx';
import StaffDirectory from './../components/route_handlers/staff_directory.jsx';
import WeeklyWins from './../components/route_handlers/weekly_wins.jsx';
import Resources from './../components/route_handlers/resources.jsx';
import Faq from './../components/route_handlers/faq.jsx';
import Readmes from './../components/route_handlers/readmes.jsx';

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