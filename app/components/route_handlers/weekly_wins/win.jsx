import React from 'react'
import moment from 'moment'
import classNames from 'classnames'

export default class Win extends React.Component {
  render () {
    const { win } = this.props
    if (!this.shouldDisplay()) { return null }
    return (
      <div onDoubleClick={this.navigateToEdit.bind(this)}>
        <h2 className='page__section-title'>{ this.getTitle() }</h2>
        <div className='static-content' dangerouslySetInnerHTML={{ __html: win.get('html') }} />
      </div>
    )
  }

  shouldDisplay () {
    return (this.props.activeEdition === this.props.win.get('edition'))
  }

  getTitle () {
    const { win } = this.props
    return `Edition ${win.get('edition')}: ${win.get('title')}`
  }

  navigateToEdit () {
    var url = this.props.win ? this.props.win.getEditUrl() : '/'
    this.props.history.replaceState(null, url)
  }
}
