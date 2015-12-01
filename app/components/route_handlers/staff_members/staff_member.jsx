import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import { Build } from './../../general/icons.jsx'

import Modal from './../../general/modal.jsx'

import FloorPlans from './../../general/floor_plans/root.jsx'


/*
 * Displays a single staff member.
 *
 */
class StaffMember extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = { isActive: false }
		this.navigateToEdit = this.navigateToEdit.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}


	/*
	 *
	 *
	 */
	render() {
		var cls = classNames({
			'feature-box': true,
			'hidden': !this.isVisible(),
			'feature-box--active': this.state.isActive
		});
		return (
			<li className={ cls } 
				onClick={this.handleClick}>

				<div className="feature-box__image">
					<img src={ this.getImageSource() } />
				</div>

				<div className="feature-box__bottom-content">
					<h1>{ this.props.staffMember.get('name') }</h1>
					<p> { this.props.staffMember.get('title') } <br/>
					{ this.props.staffMember.get('dept') }</p>
					<p> { this.props.staffMember.get('phone') }</p>
				</div>

				{ this.renderEditButton() }

				{ this.renderModal() }

			</li>
		);

	}


	/*
	 *
	 *
	 */
	renderEditButton() {
		if (!window.user) { return }
		if (!window.user.isAdmin) { return }
		return (
			<p className='page__button' onClick={this.navigateToEdit}><Build /></p>
		);
	}


	/*
	 *
	 *
	 */
	getImageSource() {
		var fullSource = this.props.staffMember.get('image')
		// strip off https://static.newamerica.org
		if (!fullSource || !fullSource.slice) { return '/assets/images/profile.png' }
		var partialSource = fullSource.slice(29)
		return '/assets/images/staff_members' + partialSource
	}


	/*
	 *
	 *
	 */
	handleClick() {
		var { staffMember } = this.props
		this.setState({ isActive: true })
	}


	/*
	 *
	 *
	 */
	renderModal() {
		var { floors } = this.props
		if (!this.state.isActive) { return }
		return (
			<Modal width='1000px' height='600px'>

			</Modal>
		)
	}


	/*
	 *
	 *
	 */
	isVisible() {
		var name
		var { searchTerm, staffMember } = this.props
		if (!searchTerm) { return true }
		name = staffMember.get('name')
		return (name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
	}


	/*
	 *
	 *
	 */
	navigateToEdit(e) {
		e.stopPropagation()
		var { staffMember } = this.props
		var url = staffMember ? staffMember.getEditUrl() : '/'
		this.props.history.pushState(null, url)
	}

}

export default StaffMember