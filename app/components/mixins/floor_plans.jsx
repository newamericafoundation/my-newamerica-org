import React from 'react';

var toSvgPointsDef = function(coordinates) {
	var points = coordinates.map((point) => {
		return `${point[0]},${100 - point[1]}`;
	});
	return points.join(',');
};


// Floor plans component.
class FloorPlans extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className='floorplans'>
				{ this.renderFloors() }
			</div>
		);
	}

	renderFloors() {
		return this.props.floors.models.map((floor, i) => {
			return (
				<Floor {...this.props} floor={floor} key={i} />
			);
		});
	}

}

// Floor plan component.
class Floor extends React.Component {

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

	renderRooms() {
		return this.props.floor.get('rooms').models.map((room, i) => {
			return <Room {...this.props} room={room} key={i} />
		});
	}

	isActive() {
		var floor = this.props.floor,
			floors = floor.collection;
		return (floors.findByRoom(this.props.activeRoomId) === floor);
	}

}


// Room component floor plan.
class Room extends React.Component {

	render() {
		var polygonPoints = toSvgPointsDef(this.props.room.get('coordinates'));
		return (
			<polygon 
				className={ 'floorplans__room ' + this.getModifierClass() } 
				points={ polygonPoints } 
				onClick={ this.handleClick.bind(this) } 
				onMouseEnter={ this.handleMouseEnter.bind(this) }
				onMouseLeave={ this.handleMouseLeave.bind(this) }
			/>
		);
	}

	handleClick() {
		var fn = this.props.handleRoomClick;
		if (fn) { fn(this.props.room.get('id')); }
	}

	handleMouseEnter() {
		var fn = this.props.handleRoomMouseEnter;
		if (fn) { fn(this.props.room.get('id')); }
	}

	handleMouseLeave() {
		var fn = this.props.handleRoomMouseLeave;
		if (fn) { fn(this.props.room.get('id')); }
	}

	getModifierClass() {
		if (this.isActive()) { return 'floorplans__room--active'; }
		return '';
	}

	isActive() {
		return (this.props.room.get('id') === this.props.activeRoomId);
	}

}

export default FloorPlans;