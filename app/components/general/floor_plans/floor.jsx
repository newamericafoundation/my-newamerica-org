import React from 'react'
import Room from './room.jsx'

/*
 * Transforms coordinate array to svg point coordinates definition.
 *
 */
var toSvgPointsDef = function(coordinates) {
	var points = coordinates.map((point) => {
		return `${point[0]},${100 - point[1]}`
	})
	return points.join(',')
};

// Floor plan component.
class Floor extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var polygonPoints;
		if (!this.isActive()) { return (<div />); }
		polygonPoints = toSvgPointsDef(this.props.floor.get('outer_wall_coordinates'));
		return (
			<svg className='floorplans__floor' viewBox="0 0 100 100">
				<g className='floorplans__rooms'>
					{ this.renderRooms() }
				</g>
				<polygon className='floorplans__outer-wall' points={ polygonPoints } />
			</svg>
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
	isActive() {
		var { activeRoom, floor } = this.props
		return (activeRoom && (activeRoom.parent === floor));
	}

}

export default Floor