import React, {Component} from 'react'

export default class Readme extends Component {

  constructor (props) {
    super(props)
    this.navigateToEdit = this.navigateToEdit.bind(this)
  }

  render () {
    const {readme} = this.props
    if (!this.shouldDisplay()) { return <div /> }
    return (
      <div onDoubleClick={this.navigateToEdit}>
        <h2 className='page__section-title'>{ this.getTitle() }</h2>
        <div className='static-content' dangerouslySetInnerHTML={{__html: readme.get('html')}} />
      </div>
    )
  }

  navigateToEdit () {
    const url = this.props.readme ? this.props.readme.getEditUrl() : '/'
    this.props.history.pushState(null, url)
  }

  shouldDisplay () {
    const {activeEdition, readme} = this.props
    return (activeEdition === readme.get('edition'))
  }

  getTitle () {
    const {readme} = this.props
    return `Edition ${readme.get('edition')}: ${readme.get('title')}`
  }

}
