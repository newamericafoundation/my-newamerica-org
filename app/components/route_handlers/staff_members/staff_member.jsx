import React from 'react';
import moment from 'moment';
import classNames from 'classnames';


class StaffMember extends React.Component {

	constructor(props) {
		super(props);
	}


	/*
	 *
	 *
	 */
	render() {
		var cls = classNames({
			'feature-box': true,
			'hidden': !this.isVisible(),
			'feature-box--active': this.isActive()
		});
		return (
			<li className={ cls } 
				onMouseEnter={this.setHoveredStaffMember.bind(this)} 
				onMouseLeave={this.unsetHoveredStaffMember.bind(this)}
				onDoubleClick={this.navigateToEdit.bind(this)}
				onClick={this.toggleActiveStaffMember.bind(this)}>

				<div className="feature-box__image">
					<img src={ this.getImageSource() } />
				</div>

				<div className="feature-box__bottom-content">
					<h1>{ this.props.staffMember.get('name') }</h1>
					<p> { this.props.staffMember.get('title') } <br/>
					{ this.props.staffMember.get('dept') }</p>
					<p> { this.props.staffMember.get('phone') }</p>
				</div>

			</li>
		);

	}


	/*
	 *
	 *
	 */
	getImageSource() {
		var fullSource = this.props.staffMember.get('image');
		// strip off https://static.newamerica.org
		if (!fullSource || !fullSource.slice) { return '/assets/images/profile.png'; }
		var partialSource = fullSource.slice(29);
		return '/assets/images/staff_members' + partialSource;
	}


	/*
	 *
	 *
	 */
	isActive() {
		return (this.props.staffMember === this.props.activeStaffMember);
	}


	/*
	 *
	 *
	 */
	setHoveredStaffMember() {
		this.props.setHoveredStaffMember(this.props.staffMember);
	}


	/*
	 *
	 *
	 */
	unsetHoveredStaffMember() {
		this.props.setHoveredStaffMember(null);
	}


	/*
	 *
	 *
	 */
	toggleActiveStaffMember() {
		var newActiveStaffMember = this.isActive() ? null : this.props.staffMember;
		this.props.activateStaffMember(newActiveStaffMember);
	}


	/*
	 *
	 *
	 */
	isVisible() {
		var name, 
			searchTerm = this.props.searchTerm;
		if (searchTerm == null) { return true; }
		name = this.props.staffMember.get('name');
		return (name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
	}


	/*
	 *
	 *
	 */
	navigateToEdit() {
		var url = this.props.staffMember ? this.props.staffMember.getEditUrl() : '/';
		this.props.history.replaceState(null, url);
	}

}

export default StaffMember;