import React from 'react'
import classNames from 'classnames'

var toSvgPointsDef = function(coordinates) {
	var points = coordinates.map((point) => {
		return `${point[0]},${100 - point[1]}`;
	});
	return points.join(',');
};

// Floor plans component.
class FloorPlans extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
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
		return this.props.floors.models.map((floor, i) => {
			return (
				<Floor {...this.props} floor={floor} key={i} />
			);
		});
	}


	/*
	 *
	 *
	 */
	renderActiveRoomSummary() {
		var room = this.props.activeRoom;
		return (
			<div className='floorplans__tooltip'>
				<div>
					<h1>{ room.get('name') || room.get('id') }</h1>
					<p>{ room.isPublic() ? `Capacity: ${room.get('capacity')}.` : null }</p>
				</div>
			</div>
		);
	}

}

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
		return this.props.floor.get('rooms').models.map((room, i) => {
			return <Room {...this.props} room={room} key={i} />
		});
	}


	/*
	 *
	 *
	 */
	isActive() {
		return (this.props.activeRoom && (this.props.activeRoom.parent === this.props.floor));
	}

}


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

export default FloorPlans;