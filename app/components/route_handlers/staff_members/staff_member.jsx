import React, { Component } from 'react'
import classNames from 'classnames'

import {Build} from '../../general/icons.jsx'
import Modal from '../../general/modal.jsx'
import FloorPlans from '../../floor_plans/root.jsx'

export default class StaffMember extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isActive: false
    }
    this.navigateToEdit = this.navigateToEdit.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleModalClick = this.handleModalClick.bind(this)
    this.handleModalContentClick = this.handleModalContentClick.bind(this)
  }

  render() {
    const cls = classNames({
      'feature-box': true,
      'hidden': !this.isVisible(),
      'feature-box--active': this.state.isActive
    });
    return (
      <li
        className={cls}
        onClick={this.handleClick}
      >
        <div className="feature-box__image">
          <img src={ this.getImageSource() } />
        </div>
        <div className="feature-box__bottom-content">
          <h1>{ this.props.staffMember.get('name') }</h1>
          <p> { this.props.staffMember.get('title') } <br/>
          { this.props.staffMember.get('dept') }</p>
          <p> { this.props.staffMember.get('phone') }</p>
        </div>
        { this.renderEditButton() }
        { this.renderModal() }
      </li>
    );
  }

  renderEditButton() {
    if (!window.user || !window.user.isAdmin) { return }
    return (
      <p
        className="page__button"
        onClick={this.navigateToEdit}
      >
        <Build/>
      </p>
    );
  }

  renderModal() {
    const { staffMember, floors } = this.props
    const { isActive } = this.state
    if (!isActive || !floors) { return }
    const roomId = String(staffMember.get('room_id'));
    const floor = floors.findByRoom(roomId);
    const activeRoom = floor ? floor.get('rooms').findWhere({id: roomId}) : null;
    return (
      <Modal
        width="1000px"
        height="600px"
        handleClick={this.handleModalClick}
        handleContentClick={this.handleModalContentClick}
      >
        <FloorPlans floors={floors} activeRoom={activeRoom}/>
      </Modal>
    );
  }

  getImageSource() {
    return this.props.staffMember.get('image') || '/assets/images/profile.png'
  }

  handleClick() {
    this.setState({ isActive: true });
  }


  /*
   * Since modal content click stops propagation, this is only called when the modal overlay region is clicked.
   *
   */
  handleModalClick(e) {
    e.stopPropagation()
    this.setState({ isActive: false })
  }

  handleModalContentClick(e) {
    e.stopPropagation()
  }

  isVisible() {
    let name
    const { searchTerm, staffMember } = this.props
    if (!searchTerm) { return true }
    name = staffMember.get('name')
    return (name.toLowerCase().indexOf(searchTerm.toLowerCase()) > -1)
  }

  navigateToEdit(e) {
    e.stopPropagation()
    const {staffMember} = this.props
    const url = staffMember ? staffMember.getEditUrl() : '/'
    this.props.history.pushState(null, url)
  }

}
