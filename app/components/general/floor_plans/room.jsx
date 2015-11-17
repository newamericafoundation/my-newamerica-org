import React from 'react'
import classNames from 'classnames'

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

// Room component floor plan.
class Room extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var polygonPoints = toSvgPointsDef(this.props.room.get('coordinates')),
			cls = classNames({
				'floorplans__room': true,
				'floorplans__room--active': this.isActive(),
				'floorplans__room--public': this.props.room.isPublic()
			});
		return (
			<polygon 
				className={ cls } 
				points={ polygonPoints } 
				onClick={ this.handleClick.bind(this) } 
				onMouseEnter={ this.handleMouseEnter.bind(this) }
				onMouseLeave={ this.handleMouseLeave.bind(this) }
			/>
		);
	}


	/*
	 *
	 *
	 */
	isActive() {
		return (this.props.room === this.props.activeRoom);
	}

	// If there are event handlers passed down to the component, run those passing along the room id.

	/*
	 *
	 *
	 */
	handleClick() {
		var fn = this.props.handleRoomClick;
		if (fn) { fn(this.props.room); }
	}


	/*
	 *
	 *
	 */
	handleMouseEnter() {
		var fn = this.props.handleRoomMouseEnter;
		if (fn) { fn(this.props.room); }
	}


	/*
	 *
	 *
	 */
	handleMouseLeave() {
		var fn = this.props.handleRoomMouseLeave;
		if (fn) { fn(this.props.room); }
	}

}

export default Room