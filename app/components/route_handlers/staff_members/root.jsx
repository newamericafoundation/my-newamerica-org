import React from 'react'

import StaffMember from './staff_member.jsx'

import { People } from './../../general/icons.jsx'
import Loader from './../../general/loader.jsx'

import * as staffMember from './../../../models/staff_member.js'
import * as floor from './../../../models/floor.js'

import Base from './../base/index.jsx'

export default class StaffMembers extends Base {

  constructor (props) {
    super(props)
    this.state = {}
    this.logScroll = this.logScroll.bind(this)
    this.setSearchTerm = this.setSearchTerm.bind(this)
  }

  render () {
    return (
      <div className='page page--staff-registry' onScroll={this.logScroll}>
        <div className='page__content'>
          <div className='page__content__logo'>
            <People />
          </div>
          <h1 className='title'>Staff Directory</h1>
          {this.renderAddButton()}
          <input placeholder='Search' onChange={this.setSearchTerm} />
          <ul>
            { this.renderMembers() }
          </ul>
        </div>
      </div>
    )
  }

  renderMembers () {
    const { staffMembers, floors } = this.state
    if (!staffMembers) { return <Loader /> }
    return staffMembers.map((staffMember, i) => {
      return <StaffMember
        history={this.props.history}
        key={i}
        staffMember={staffMember}
        floors={floors}
        searchTerm={this.state.searchTerm}
      />
    })
  }

  componentDidMount () {
    new staffMember.Collection().getClientFetchPromise().then((coll) => {
      this.setState({
        staffMembers: coll
      })
    }).catch((err) => {
      console.log(err.stack)
    })

    new floor.Collection().getClientFetchPromise().then((coll) => {
      this.setState({
        floors: coll
      })
    }).catch((err) => {
      console.log(err.stack)
    })
  }

  navigateToAdd () {
    this.props.history.pushState(null, staffMember.Model.prototype.getNewUrl())
  }

  logScroll (e) {
    this.setState({
      scrollTop: e.target.scrollTop
    })
  }

  setSearchTerm (e) {
    this.setState({
      searchTerm: e.target.value
    })
  }

}
