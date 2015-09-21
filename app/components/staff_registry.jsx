import React from 'react';
import Icons from './mixins/icons.jsx';
import FloorPlans from './mixins/floor_plans.jsx';
import moment from 'moment';
import Loader from './mixins/loader.jsx';
import staffMember from './../models/staff_member.js';
import floorsData from './../../db/floors/index.json';
import { Model, Collection } from './../models/floor.js';

var floors = new Collection(floorsData);

class StaffRegistry extends React.Component {

	constructor(props) {
		super(props);
		this.state = {

		};
	}

	render() {
		return (
			<div className='page page--staff-registry' onScroll={this.logScroll.bind(this)}>
				<div className='page__content page__content--large'>
					<div className='page__content__logo'>
						<Icons.People />
					</div>
					<h1 className='title'>Staff Registry</h1>

					<input placeholder="Search" onChange={ this.setSearchTerm.bind(this) }></input>

					{ /*<div className='page__content__1-2'>*/ }
						<ul>
							{ this.renderMembers() }
						</ul>
					{ /* </div> */ }

					{ false ? this.renderLocator() : null }

				</div>
			</div>
		);
	}

	componentDidMount() {
		new staffMember.Collection().getClientFetchPromise().then((coll) => {
			this.setState({ staffMembers: coll });
		});
	}

	logScroll(e) {
		this.setState({
			scrollTop: e.target.scrollTop
		});
	}

	renderMembers() {
		if (this.state.staffMembers == null) { return (<Loader />); }
		return this.state.staffMembers.map((staffMember) => {
			return <StaffMember 
				staffMember={staffMember} 
				searchTerm={this.state.searchTerm}
				activeStaffMember={this.state.activeStaffMember}
				setHoveredStaffMember={this.setHoveredStaffMember.bind(this)} 
				activateStaffMember={this.activateStaffMember.bind(this)} />;
		});
	}

	renderLocator() {
		if (this.state.staffMembers == null) { return; }
		var cls = 'page__content__2-2';
		if (this.state.scrollTop > 220) { cls += ' page__content__2-2--fixed'; }

		return (
			<div className={ cls }>
				<StaffMemberSummary floors={floors} staffMember={this.getHighlightedStaffMember()} />
				<FloorPlans floors={floors} activeRoomId={this.getHighlightedRoomId()} />
			</div>
		);
	}

	getHighlightedStaffMember() {
		if (this.state.hoveredStaffMember != null) { return this.state.hoveredStaffMember; }
		return this.state.activeStaffMember;
	}

	getHighlightedRoomId() {
		var highlightedStaffMember = this.getHighlightedStaffMember();
		if (highlightedStaffMember == null) { return null; }
		return String(highlightedStaffMember.get('room_id'));
	}

	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value });
	}

	setHoveredStaffMember(staffMember) {
		var stateChanges = {
			hoveredStaffMember: staffMember
		};
		if (staffMember) {
			stateChanges.activeStaffMember = null;
		}
		this.setState(stateChanges);
	}

	activateStaffMember(staffMember) {
		this.setState({ activeStaffMember: staffMember });
	}

}

StaffRegistry.contextTypes = {
	router: React.PropTypes.func
};



class StaffMemberSummary extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		if (this.props.staffMember == null) { return <div className='page__summary' />; }
		this.getFloorSummary();
		return (
			<div className='page__summary'>
				<div className='page__summary__logo'>
					{ this.renderFloor3dSvg() }
				</div>
				<div className='page__summary__content'>
					<p>{ this.props.staffMember.get('name') + "'s office" }</p>
					<p>{ this.getFloorSummary() }</p>
					<p>{ 'Phone: ' + this.props.staffMember.get('phone') }</p>
				</div>
			</div>
		);
	}

	getFloor() {
		var roomId = String(this.props.staffMember.get('room_id')),
			floors = this.props.floors,
			floor = floors.findByRoom(roomId);
		return floor;
	}

	getFloorSummary() {
		var floor = this.getFloor();
		if(floor == null) { return; }
		return floor.getDisplayName();
	}

	renderFloor3dSvg() {

		var roomId = String(this.props.staffMember.get('room_id')),
			floors = this.props.floors,
			floor = this.getFloor(), room;

		if(floor == null) { return; }

		room = floor.get('rooms').findWhere({ id: roomId });

		var sameOfficeFloors = floor.getMatchingSiblingsByField('office');

		var paths = sameOfficeFloors.map((sameOfficeFloor) => {
			var cls='page__svg-path' + ( (sameOfficeFloor === floor) ? ' page__svg-path--active' : '' );
			return (<polygon className={ cls } points={ sameOfficeFloor.get('3d_schematic_svg_points') }></polygon>);
		});

		return (
			<svg viewBox="0 0 100 100">
				{ paths }
			</svg>
		);

	}

}


class StaffMember extends React.Component {

	constructor(props) {
		super(props);
	}

	setImageLoadedState() {
		
	}

	render() {
		return (
			<li className={ 'feature-box' + this.getModifierClasses() } 
				onMouseEnter={this.setHoveredStaffMember.bind(this)} 
				onMouseLeave={this.unsetHoveredStaffMember.bind(this)}
				onClick={this.toggleActiveStaffMember.bind(this)}>

				<div className="feature-box__image">
					<img src={ this.getImageSource() } onLoad={this.setImageLoadedState.bind(this)} />
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

	getImageSource() {
		var fullSource = this.props.staffMember.get('image');
		// strip off https://static.newamerica.org
		if (!fullSource || !fullSource.slice) { return; }
		var partialSource = fullSource.slice(29);
		return '/assets/images/staff_members' + partialSource;
	}

	getModifierClasses() {
		var cls = '';
		if (!this.isVisible()) { cls += ' hidden'; }
		if (this.isActive()) { cls += ' feature-box--active'; }
		return cls;
	}

	isActive() {
		return (this.props.staffMember === this.props.activeStaffMember);
	}

	setHoveredStaffMember() {
		this.props.setHoveredStaffMember(this.props.staffMember);
	}

	unsetHoveredStaffMember() {
		this.props.setHoveredStaffMember(null);
	}

	toggleActiveStaffMember() {
		var newActiveStaffMember = this.isActive() ? null : this.props.staffMember;
		this.props.activateStaffMember(newActiveStaffMember);
	}

	isVisible() {
		var name, 
			searchTerm = this.props.searchTerm;
		if (searchTerm == null) { return true; }
		name = this.props.staffMember.get('name');
		return (name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1);
	}

}

module.exports = StaffRegistry;