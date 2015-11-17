import React from 'react'
import moment from 'moment'

import { Model, Collection } from './../../../models/floor.js'

import Loader from './../../general/loader.jsx'
import Icons from './../../general/icons.jsx'
import FloorPlans from './../../general/floor_plans.jsx'

class RoomBooking extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {

		super(props);
		this.state = {
			floors: null,
			activeFloor: null
		}

		// var activeFloor = floors.models[0],
		// 	activeRoom = activeFloor.get('rooms').models[0];

		// this.state = { activeRoom: activeRoom }

	}


	/*
	 *
	 *
	 */
	render() {

		var { floors, activeRoom } = this.state

		return (
			<div className='page page--room-booking'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Key />
					</div>
					<h1 className="title">Floor Plans</h1>

					<p>Please select floor:</p>
					{ this.renderFloorSelectForm() }

					<FloorPlans 
						floors={floors}
						activeRoom={activeRoom} 
						handleRoomClick={this.handleRoomClick.bind(this)}
						handleRoomMouseEnter={this.handleRoomMouseEnter.bind(this)}
						handleRoomMouseLeave={this.handleRoomMouseLeave.bind(this)}
					/>

				</div>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderFloorSelectForm() {
		return (
			<select onChange={this.changeActiveFloor.bind(this)}>
				{ this.renderFloorOptions() }
			</select>
		)
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


	componentWillMount() {
		var coll = new Collection()
		coll.getClientFetchPromise().then(() => {
			console.log(coll)
		}).catch((err) => { console.log(err.stack) })
	}


	/*
	 *
	 *
	 */
	handleRoomClick(room) {
		this.setState({ activeRoom: room });
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
	changeActiveFloor(e) {
		var { floors } = this.state
		var activeFloorId = e.target.value,
			activeFloor = floors.findWhere({ id: activeFloorId });
		this.setState({ activeRoom: activeFloor.get('rooms').models[0] });
	}

}

module.exports = RoomBooking;