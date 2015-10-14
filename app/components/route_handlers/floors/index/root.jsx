import React from 'react';
import moment from 'moment';

import floorsData from './../../../../../db/seeds/floors/index.json';
import { Model, Collection } from './../../../../models/floor.js';

import Loader from './../../../general/loader.jsx';
import Icons from './../../../general/icons.jsx';
import FloorPlans from './../../../general/floor_plans.jsx';


var floors = new Collection(floorsData);

class RoomBooking extends React.Component {
	
	constructor(props) {

		super(props);

		var activeFloor = floors.models[0],
			activeRoom = activeFloor.get('rooms').models[0];

		this.state = {
			activeRoom: activeRoom
		};

	}

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

					<FloorPlans 
						floors={floors} 
						activeRoom={this.state.activeRoom} 
						handleRoomClick={this.handleRoomClick.bind(this)}
						handleRoomMouseEnter={this.handleRoomMouseEnter.bind(this)}
						handleRoomMouseLeave={this.handleRoomMouseLeave.bind(this)}
					/>

				</div>
			</div>
		);
	}

	handleRoomClick(room) {
		this.setState({ activeRoom: room });
	}

	handleRoomMouseEnter(room) {
		this.setState({ activeRoom: room });
	}

	handleRoomMouseLeave(room) {
		// console.log(room);
	}

	renderFloorForm() {
		return (
			<select onChange={this.changeActiveFloor.bind(this)}>
				{ this.renderFloorOptions() }
			</select>
		);
	}

	changeActiveFloor(e) {
		var activeFloorId = e.target.value,
			activeFloor = floors.findWhere({ id: activeFloorId });
		this.setState({ activeRoom: activeFloor.get('rooms').models[0] });
	}

	renderFloorOptions() {
		return floors.map((floor, i) => {
			return (
				<option key={i} value={ floor.get('id') }>{ floor.get('name') }</option>
			);
		});
	}

}

RoomBooking.contextTypes = {
	router: React.PropTypes.func
};

module.exports = RoomBooking;