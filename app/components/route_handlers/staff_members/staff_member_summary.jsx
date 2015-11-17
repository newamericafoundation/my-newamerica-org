import React from 'react'

class StaffMemberSummary extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var { staffMember } = this.props
		if (!staffMember) { return <div className='page__summary' />; }
		this.getFloorSummary();
		return (
			<div className='page__summary'>
				<div className='page__summary__logo'>
				</div>
				<div className='page__summary__content'>
					<p>{ staffMember.get('name') + "'s office" }</p>
					<p>{ this.getFloorSummary() }</p>
					<p>{ 'Phone: ' + staffMember.get('phone') }</p>
				</div>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	getFloor() {
		var { staffMember, floors } = this.props,
			roomId = String(staffMember.get('room_id')),
			floor = floors.findByRoom(roomId);
		return floor
	}


	/*
	 *
	 *
	 */
	getFloorSummary() {
		var floor = this.getFloor()
		if(!floor) { return }
		return floor.getDisplayName()
	}

}

export default StaffMemberSummary