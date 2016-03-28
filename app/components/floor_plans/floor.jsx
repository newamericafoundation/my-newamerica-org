import React from 'react'
import Room from './room.jsx'

import {toSvgPointsDef} from './svg_helpers.js'


/*
 * Floor plan component.
 *
 */
class Floor extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var polygonPoints
		var { activeRoom } = this.props
		if (!this.isActive()) { return <div /> }
		polygonPoints = toSvgPointsDef(this.props.floor.get('outer_wall_coordinates'));
		return (
			<div style={{ position: 'relative' }}>
				{ /* this.renderPopup() */ }
				<svg className='floorplans__floor' viewBox="0 0 100 100">
					<g className='floorplans__rooms'>
						{ this.renderRooms() }
					</g>
					<polygon className='floorplans__outer-wall' points={ polygonPoints } />
				</svg>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderRooms() {
		var { floor } = this.props
		return floor.get('rooms').models.map((room, i) => {
			return <Room {...this.props} room={room} key={i} />
		});
	}


	/*
	 *
	 *
	 */
	renderPopup() {
		var style = {
			position: 'absolute',
			top: '30px',
			left: '30px'
		}
		return (
			<div style={style}>
				Hello, I am a popup.
			</div>
		)
	}


	/*
	 *
	 *
	 */
	isActive() {
		var { activeRoom, floor } = this.props
		return (activeRoom && (activeRoom.parent === floor));
	}

}

export default Floor
