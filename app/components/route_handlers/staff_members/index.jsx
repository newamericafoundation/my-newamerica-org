import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

import StaffMember from './staff_member.jsx'
import StaffMemberSummary from './staff_member_summary.jsx'

import Icons from './../../general/icons.jsx'
import Loader from './../../general/loader.jsx'

import * as staffMember from './../../../models/staff_member.js'

import Base from './../base/index.jsx'


class StaffMembers extends Base {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = {}

		// Pre-bind event handlers to instance.
		this.logScroll = this.logScroll.bind(this)
		this.setSearchTerm = this.setSearchTerm.bind(this)
		this.setHoveredStaffMember = this.setHoveredStaffMember.bind(this)
		this.activateStaffMember = this.activateStaffMember.bind(this)
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='page page--staff-registry' onScroll={this.logScroll}>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.People />
					</div>
					<h1 className='title'>Staff Directory</h1>
					{ this.renderAddButton() }
					<input placeholder="Search" onChange={ this.setSearchTerm }></input>

					<ul>
						{ this.renderMembers() }
					</ul>

					{ false ? this.renderLocator() : null }

				</div>
			</div>
		)
	}


	/*
	 *
	 *
	 */
	renderMembers() {
		if (this.state.staffMembers == null) { return <Loader /> }
		return this.state.staffMembers.map((staffMember, i) => {
			return <StaffMember
				history={this.props.history}
				key={i}
				staffMember={staffMember} 
				searchTerm={this.state.searchTerm}
				activeStaffMember={this.state.activeStaffMember}
				setHoveredStaffMember={this.setHoveredStaffMember} 
				activateStaffMember={this.activateStaffMember} />;
		})
	}


	/*
	 *
	 *
	 */
	renderLocator() {
		if (this.state.staffMembers == null) { return }
		var cls = 'page__content__2-2';
		if (this.state.scrollTop > 220) { cls += ' page__content__2-2--fixed'; }

		return (
			<div className={ cls }>
				<StaffMemberSummary floors={floors} staffMember={this.getHighlightedStaffMember()} />
				<FloorPlans floors={floors} activeRoomId={this.getHighlightedRoomId()} />
			</div>
		);
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		new staffMember.Collection().getClientFetchPromise().then((coll) => {
			this.setState({ staffMembers: coll });
		}).catch((err) => { console.log(err.stack); });
	}


	/*
	 *
	 *
	 */
	navigateToAdd() {
		this.props.history.pushState(null, staffMember.Model.prototype.getNewUrl());
	}


	/*
	 *
	 *
	 */
	logScroll(e) {
		this.setState({
			scrollTop: e.target.scrollTop
		});
	}


	/*
	 * Resolves hovered and active staff members to get the highlighted staff member.
	 *
	 */
	getHighlightedStaffMember() {
		var { hoveredStaffMember, activeStaffMember } = this.state
		if (!hoveredStaffMember) { return hoveredStaffMember }
		return activeStaffMember
	}


	/*
	 *
	 *
	 */
	getHighlightedRoomId() {
		var highlightedStaffMember = this.getHighlightedStaffMember();
		if (highlightedStaffMember == null) { return null; }
		return String(highlightedStaffMember.get('room_id'));
	}


	/*
	 *
	 *
	 */
	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value });
	}


	/*
	 *
	 *
	 */
	setHoveredStaffMember(staffMember) {
		var stateChanges = {
			hoveredStaffMember: staffMember
		};
		if (staffMember) {
			stateChanges.activeStaffMember = null;
		}
		this.setState(stateChanges);
	}


	/*
	 *
	 *
	 */
	activateStaffMember(staffMember) {
		this.setState({ activeStaffMember: staffMember });
	}

}


export default StaffMembers;