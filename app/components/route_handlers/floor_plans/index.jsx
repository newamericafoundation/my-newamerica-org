import React from 'react'
import moment from 'moment'

import { Model, Collection } from './../../../models/floor.js'

import Loader from './../../general/loader.jsx'

import Icons from './../../general/icons.jsx'

import FloorPlans from './../../general/floor_plans/root.jsx'

// TODO: convert to database entry
// var floors = new Collection(floorsData)

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

		// var activeFloor = floors.models[0],
		// 	activeRoom = activeFloor.get('rooms').models[0];

		// this.state = {
		// 	activeRoom: activeRoom
		// };

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
						<Icons.Key />
					</div>
					<h1 className="title">Floor Plans</h1>

					<p>Please select floor:</p>
					{ this.renderFloorForm() }

					{ this.renderFloors() }

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
		var floors = new Collection()
		floors.getClientFetchPromise().then((floors) => { 
			this.setState({ 
				floors: floors,
				activeRoom: floors.models[0].get('rooms').models[0]
			})
		}).catch((err) => { console.log(err.stack) })
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
	changeActiveFloor(e) {
		var activeFloorId = e.target.value,
			{ floors } = this.state,
			activeFloor = floors.findWhere({ id: activeFloorId });
		this.setState({ activeRoom: activeFloor.get('rooms').models[0] });
	}

}


export default FloorPlansPage