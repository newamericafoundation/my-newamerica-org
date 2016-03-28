import React from 'react'
import moment from 'moment'

import * as floor from './../../../models/floor.js'
import * as staffMember from './../../../models/staff_member.js'

import Loader from './../../general/loader.jsx'

import { Key } from './../../general/icons.jsx'

import FloorPlans from './../../floor_plans/root.jsx'


/*
 *
 *
 */
class FloorPlansPage extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = {  }
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='page page--room-booking'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Key />
					</div>
					<h1 className="title">Floor Plans</h1>
					<p>Please select floor:</p>
					{ this.renderFloorForm() }
					{ this.renderFloors() }
					{ this.renderActiveRoomStaffMember() }
				</div>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderFloorOptions() {
		var { floors } = this.state
		if (!floors) { return }
		return floors.map((floor, i) => {
			return (
				<option key={i} value={ floor.get('id') }>{ floor.get('name') }</option>
			);
		});
	}


	/*
	 *
	 *
	 */
	renderFloorForm() {
		return (
			<select onChange={this.changeActiveFloor.bind(this)}>
				{ this.renderFloorOptions() }
			</select>
		);
	}


	/*
	 *
	 *
	 */
	renderFloors() {
		var { floors, activeRoom } = this.state
		if (!floors) { return }
		return (
			<FloorPlans
				floors={floors}
				activeRoom={activeRoom}
				handleRoomClick={this.handleRoomClick.bind(this)}
				handleRoomMouseEnter={this.handleRoomMouseEnter.bind(this)}
				handleRoomMouseLeave={this.handleRoomMouseLeave.bind(this)}
			/>
		)
	}


	/*
	 * Fetch floor data.
	 *
	 */
	componentWillMount() {

		var floors = new floor.Collection()
		floors.getClientFetchPromise().then((floors) => {
			this.setState({
				floors: floors,
				activeRoom: floors.models[0].get('rooms').models[0]
			})
		}).catch((err) => { console.log(err.stack) })

		var staffMembers = new staffMember.Collection()
		staffMembers.getClientFetchPromise().then((staffMembers) => {
			this.setState({ staffMembers: staffMembers })
		})

	}


	/*
	 *
	 *
	 */
	handleRoomClick(room) {
		console.log(room)
		this.setState({ activeRoom: room })
	}


	/*
	 *
	 *
	 */
	handleRoomMouseEnter(room) {
		this.setState({ activeRoom: room });
	}


	/*
	 *
	 *
	 */
	handleRoomMouseLeave(room) {
		// console.log(room);
	}


	/*
	 *
	 *
	 */
	renderActiveRoomStaffMember() {
		var { activeRoom, staffMembers } = this.state
		if (!activeRoom || !staffMembers) { return }
		var activeRoomId = activeRoom.get('id')
		var activeStaffMembers = staffMembers.where({ 'room_id': Number(activeRoomId) })
		if (activeStaffMembers.length === 0) { return }
		var activeStaffMembersSummary = activeStaffMembers.map((staffMember, i) => {
			return <p>{ staffMember.get('name') }</p>
		})
		return (
			<div>
				{ activeStaffMembersSummary }
			</div>
		)
	}


	/*
	 *
	 *
	 */
	changeActiveFloor(e) {
		var activeFloorId = e.target.value,
			{ floors } = this.state,
			activeFloor = floors.findWhere({ id: activeFloorId });
		this.setState({ activeRoom: activeFloor.get('rooms').models[0] });
	}

}


export default FloorPlansPage
