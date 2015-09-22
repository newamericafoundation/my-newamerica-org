import React from 'react';
import moment from 'moment';
import Loader from './mixins/loader.jsx';
import classNames from 'classnames';
import { Jazz, Salesforce, Adp } from './mixins/icons.jsx';

var quickLinks = [

	{
		name: 'My Timecard',
		icon: Adp,
		url: 'http://workforcenow.adp.com'
	},
	{
		name: 'Job Applications',
		icon: Jazz,
		url: 'http://jazz.com'
	},
	{
		name: 'Salesforce',
		icon: Salesforce,
		url: 'http://salesforce.com'
	}
];

class Dashboard extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isImageLoaded: false
		};
	}

	render() {
		this.getTimeOfDay();
		var cls = classNames({
			'dashboard': true,
			'dashboard--waiting-for-image': !this.state.isImageLoaded
		});
		return (
			<div className={ cls }>
				<div className='dashboard__background'>
					<img src="/assets/images/shutterstock_268077389_1500.jpg" alt="Washington DC Background" onLoad={ this.setImageLoadedState.bind(this) } />
				</div>
				<div className='dashboard__welcome'>
					<h1 onClick={ this.testLog }>{ this.getTime() }</h1>
					<p>{ this.getGreeting() }</p>
				</div>
				<div className='dashboard__quick-links'>
					<ul>
						{ this.renderQuickLinks() }
					</ul>
				</div>
			</div>
		);
	}

	renderQuickLinks() {
		return quickLinks.map((item) => {
			return (
				<a className='icon-button' href={item.url} target="_blank" >
					<div className='icon-button__icon'>
						{ React.createElement(item.icon) }
					</div>
					<p className='icon-button__text'>
						{ item.name }
					</p>
				</a>
			);
		});
	}

	getTime() {
		return moment(new Date().toISOString()).format('h:mm');
	}

	getTimeOfDay() {
		var H = moment(new Date().toISOString()).format('H');
		if (H < 12) { return 'morning'; }
		if (H < 18) { return 'afternoon'; }
		return 'evening';
	}

	getGreeting() {
		return `Good ${this.getTimeOfDay()}, ${this.getDisplayName()}!`;
	}

	setImageLoadedState() {
		this.setState({ isImageLoaded: true });
	}

	getDisplayName() {
		if (this.props.user == null) return 'Anne-Marie';
		return this.props.user.name.givenName;
	}

}

Dashboard.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Dashboard;