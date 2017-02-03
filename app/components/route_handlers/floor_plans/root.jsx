import React from 'react'

import * as floor from './../../../models/floor.js'
import * as staffMember from './../../../models/staff_member.js'
import Loader from './../../general/loader.jsx'
import {Key} from './../../general/icons.jsx'
import FloorPlans from './../../floor_plans/root.jsx'

export default class FloorPlansPage extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleRoomClick = this.handleRoomClick.bind(this)
    this.handleRoomMouseEnter = this.handleRoomMouseEnter.bind(this)
    this.handleRoomMouseLeave = this.handleRoomMouseLeave.bind(this)
  }

  render () {
    return (
      <div className='page page--room-booking'>
        <div className='page__content'>
          <div className='page__content__logo'>
            <Key />
          </div>
          <h1 className='title'>Floor Plans</h1>
          <p>Please select floor:</p>
          {this.renderFloorForm()}
          {this.renderFloors()}
          {this.renderActiveRoomStaffMember()}
        </div>
      </div>
    )
  }

  renderFloorOptions () {
    const {floors} = this.state
    if (!floors) { return }
    return floors.map((floor, i) => {
      return (
        <option key={i} value={floor.get('id')}>{ floor.get('name') }</option>
      )
    })
  }

  renderFloorForm () {
    return (
      <select onChange={this.changeActiveFloor.bind(this)}>
        { this.renderFloorOptions() }
      </select>
    )
  }

  renderFloors () {
    const {floors, activeRoom} = this.state
    if (!floors) {
      return
    }
    return (
      <FloorPlans
        floors={floors}
        activeRoom={activeRoom}
        handleRoomClick={this.handleRoomClick}
        handleRoomMouseEnter={this.handleRoomMouseEnter}
        handleRoomMouseLeave={this.handleRoomMouseLeave}
      />
    )
  }

  componentWillMount () {
    const floors = new floor.Collection()
    floors.getClientFetchPromise().then((floors) => {
      this.setState({
        floors: floors,
        activeRoom: floors.models[0].get('rooms').models[0]
      })
    }).catch((err) => { console.log(err.stack) })

    const staffMembers = new staffMember.Collection()
    staffMembers.getClientFetchPromise().then((staffMembers) => {
      this.setState({staffMembers})
    })
  }

  handleRoomClick (room) {
    this.setState({activeRoom: room})
  }

  handleRoomMouseEnter (room) {
    this.setState({activeRoom: room})
  }

  handleRoomMouseLeave (room) {
    return
  }

  renderActiveRoomStaffMember () {
    const {activeRoom, staffMembers} = this.state
    if (!activeRoom || !staffMembers) { return }
    const activeRoomId = activeRoom.get('id')
    const activeStaffMembers = staffMembers.where({
      'room_id': Number(activeRoomId)
    })
    if (activeStaffMembers.length === 0) { return }
    const activeStaffMembersSummary = activeStaffMembers.map((staffMember, i) => {
      return <p>{staffMember.get('name')}</p>
    })
    return (
      <div>
        {activeStaffMembersSummary}
      </div>
    )
  }

  changeActiveFloor (e) {
    const activeFloorId = e.target.value
    const {floors} = this.state
    const activeFloor = floors.findWhere({
      id: activeFloorId
    })
    this.setState({
      activeRoom: activeFloor.get('rooms').models[0]
    })
  }
}
