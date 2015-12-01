import React from 'react'
import classNames from 'classnames'

import { toSvgPointsDef } from './svg_helpers.js'


/*
 * Room component floor plan.
 *
 */
class Room extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.handleMouseEnter = this.handleMouseEnter.bind(this)
		this.handleMouseLeave = this.handleMouseLeave.bind(this)
		this.handleClick = this.handleClick.bind(this)
	}


	/*
	 *
	 *
	 */
	render() {
		var { room } = this.props
		var polygonPoints = toSvgPointsDef(room.get('coordinates')),
			cls = classNames({
				'floorplans__room': true,
				'floorplans__room--active': this.isActive(),
				'floorplans__room--public': room.isPublic()
			});
		return (
			<polygon 
				className={ cls } 
				points={ polygonPoints } 
				onClick={ this.handleClick } 
				onMouseEnter={ this.handleMouseEnter }
				onMouseLeave={ this.handleMouseLeave }
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
		var fn = this.props.handleRoomClick
		if (fn) { fn(this.props.room) }
	}


	/*
	 *
	 *
	 */
	handleMouseEnter() {
		var fn = this.props.handleRoomMouseEnter
		if (fn) { fn(this.props.room) }
	}


	/*
	 *
	 *
	 */
	handleMouseLeave() {
		var fn = this.props.handleRoomMouseLeave
		if (fn) { fn(this.props.room) }
	}

}

export default Room