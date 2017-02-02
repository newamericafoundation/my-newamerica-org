import React from 'react'
import { Plus } from './../../general/icons.jsx'

class Base extends React.Component {

  render () {
    return <div />
  }

	/*
	 *
	 *
	 */
  renderAddButton () {
    if (!window.user) { return }
    if (!window.user.isAdmin) { return }
    return (
      <p className='page__content__button' onClick={this.navigateToAdd.bind(this)}><Plus /></p>
    )
  }

}

export default Base
