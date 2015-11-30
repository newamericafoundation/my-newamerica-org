import React from 'react'
import Icons from './icons.jsx'
import { Link } from 'react-router'

var buttons = [
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
		title: 'Staff Directory',
		url: '/staff-directory',
		reactIconName: 'people'
	},
	{
		title: 'Floor Plans',
		url: '/floor-plans',
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


/*
 *
 *
 */
class SideBar extends React.Component {

	/*
	 *
	 *
	 */
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


	/*
	 *
	 *
	 */
	getTitle() {
		if (this.state == null) { this.state = { title: '' }; }
		return this.state.title;
	}


	/*
	 *
	 *
	 */
	renderButtons() {
		return buttons.map((button, i) => {
			return (
				<SideBarButton 
					button={button} 
					changeTitle={this.changeTitle.bind(this)} 
					key={i} 
				/>
			);
		});
	}


	/*
	 *
	 *
	 */
	changeTitle(title) {
		this.setState({ title: title });
	}

}



/*
 *
 *
 */
class SideBarButton extends React.Component {

	/*
	 *
	 *
	 */
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


	/*
	 *
	 *
	 */
	setTitle() {
		this.props.changeTitle(this.props.button.title);
	}


	/*
	 *
	 *
	 */
	clearTitle() {
		this.props.changeTitle('');
	}

}


export default SideBar