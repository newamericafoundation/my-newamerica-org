import React from 'react';
import Icons from './icons.jsx';
import { Link } from 'react-router';

class SideBar extends React.Component {

	constructor() {
		super();
	}

	render() {
		return (
			<div className="atl__side-bar atl__side-bar--naf-green" onClick={ this.toggle }>
				<div className="atl__side-bar__title">{ this.getTitle() }</div>
				<ul className="atl__side-bar__icons">
					{ this.renderButtons() }
				</ul>
			</div>
		);
	}

	getTitle() {
		if (this.state == null) { this.state = { title: '' }; }
		return this.state.title;
	}

	renderButtons() {
		return this.getButtons().map((button, i) => {
			return <SideBarButton button={button} changeTitle={this.changeTitle.bind(this)} key={i} />;;
		});
	}

	changeTitle(title) {
		this.setState({ title: title });
	}

	getButtons() {
		return [
			{
				title: 'Wins',
				url: '/weekly-wins',
				reactIconName: 'trophy'
			},
			{
				title: 'Read-Me',
				url: '/readmes',
				reactIconName: 'readme'
			},
			{
				title: 'Staff',
				url: '/staff',
				reactIconName: 'people'
			},
			{
				title: 'Room Booking',
				url: '/room-booking',
				reactIconName: 'key'
			},
			{
				title: 'Resources',
				url: '/resources',
				reactIconName: 'page'
			},
			{
				title: 'Moving FAQ',
				url: '/faq',
				reactIconName: 'building'
			}
		];
	}

}

SideBar.contextTypes = {
	router: React.PropTypes.func
};

class SideBarButton extends React.Component {

	render() {
		var IconComp = Icons.get(this.props.button.reactIconName);
		return (
			<li className="atl__side-bar__icon" onMouseEnter={ this.setTitle.bind(this) } onMouseLeave={ this.clearTitle.bind(this) }>
				<Link to={ this.props.button.url }>
					<IconComp />
				</Link>
			</li>
		);
	}

	setTitle() {
		this.props.changeTitle(this.props.button.title);
	}

	clearTitle() {
		this.props.changeTitle('');
	}

}

SideBarButton.contextTypes = {
	router: React.PropTypes.func
};

module.exports = SideBar;