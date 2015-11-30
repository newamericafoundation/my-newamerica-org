import React from 'react'
import classNames from 'classnames'

import { Model, Collection } from './../../../models/floor.js'

import Floor from './floor.jsx'


/* 
 * Floor plans component.
 *
 */
class FloorPlans extends React.Component {


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='floorplans'>
				{ this.renderFloors() }
				{ this.renderActiveRoomSummary() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderFloors() {
		var { floors, activeRoom } = this.props
		if (!floors) { return }
		return floors.models.map((floor, i) => {
			return (
				<Floor 
					activeRoom={activeRoom} 
					floor={floor} 
					key={i} 
				/>
			);
		});
	}


	/*
	 *
	 *
	 */
	renderActiveRoomSummary() {
		var { activeRoom } = this.props
		if (!activeRoom) { return }
		return (
			<div className='floorplans__tooltip'>
				<div>
					<h1>{ activeRoom.get('name') || activeRoom.get('id') }</h1>
					<p>{ activeRoom.isPublic() ? `Capacity: ${room.get('capacity')}.` : null }</p>
				</div>
			</div>
		);
	}

}


export default FloorPlans