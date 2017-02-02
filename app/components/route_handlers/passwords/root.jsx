import React from 'react'
import Loader from './../../general/loader.jsx'
import {Clipboard} from './../../general/icons.jsx'
import {Model, Collection} from './../../../models/password.js'

import Base from './../base/index.jsx'

import Password from './password.jsx'

export default class Passwords extends Base {

  constructor (props) {
    super(props)
    this.state = {

    }
  }

  render () {
    return (
      <div className='page page--weekly-wins'>
        <div className='page__content'>
          <div className='page__content__logo'>
            <Clipboard />
          </div>
          <h1 className='title'>Passwords</h1>
          { this.renderAddButton() }
          { this.renderPasswords() }
        </div>
      </div>
    )
  }

  navigateToAdd () {
    this.props.history.pushState(null, Model.prototype.getNewUrl())
  }

  renderPasswords () {
    const {passwords} = this.state
    if (!passwords) { return <Loader /> }
    return passwords.map((password, i) => {
      return (
        <Password
          history={this.props.history}
          key={i}
          password={password}
          activeEdition={this.state.activeEdition}
        />
      )
    })
  }

  componentDidMount () {
    new Collection().getClientFetchPromise().then((coll) => {
      this.setState({
        passwords: coll
      })
    }, (err) => { console.log('problem') })
  }

}
