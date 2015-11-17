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
	constructor(props) {
		super(props)
		this.state = {}
	}


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
		var { floors } = this.state
		if (!floors) { return }
		return floors.models.map((floor, i) => {
			return (
				<Floor activeRoom={this.state.activeRoom} floor={floor} key={i} />
			);
		});
	}


	/*
	 *
	 *
	 */
	renderActiveRoomSummary() {
		var { activeRoom } = this.state
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


	/*
	 *
	 *
	 */
	componentWillMount() {
		var coll = new Collection()
		coll.getClientFetchPromise().then(() => {
			var firstRoom = coll.models[0].get('rooms').models[0]
			this.setState({
				floors: coll,
				activeRoom: firstRoom
			})
		}).catch((err) => { console.log(err.stack) })
	}

}


export default FloorPlans