import React from 'react'

import {Building} from './../../general/icons.jsx'
import Loader from './../../general/loader.jsx'

import {Model, Collection} from './../../../models/faq.js'

import Base from './../base/index.jsx'

import FaqGroup from './faq_group.jsx'

export default class Faq extends Base {

  constructor (props) {
    super(props)
    this.state = {
      searchTerm: ''
    }
  }

  render () {
    return (
      <div className='page page--resources'>
        <div className='page__content'>
          <div className='page__content__logo'>
            <Building />
          </div>
          <h1 className='title'>Moving FAQ</h1>
          { this.renderAddButton() }
          <input placeholder='Search' onChange={this.setSearchTerm.bind(this)} />

          { this.renderFaqGroups() }

        </div>
      </div>
    )
  }

  renderFaqGroups () {
    if (this.state.faqs == null) { return (<Loader />) }

    var grps = this.state.faqs.group()

    return Object.keys(grps).map((grpKey, i) => {
      var grp = grps[grpKey]
      if (!grp.containsSearchTermMatch(this.state.searchTerm)) { return }
      return (
        <FaqGroup
          history={this.props.history}
          searchTerm={this.state.searchTerm}
          section={grpKey}
          faqs={grp}
          key={i}
        />
      )
    })
  }

  componentDidMount () {
    new Collection().getClientFetchPromise().then((coll) => {
      this.setState({faqs: coll})
    }).catch((err) => { console.log(err.stack) })
  }

  navigateToAdd () {
    this.props.history.pushState(null, Model.prototype.getNewUrl())
  }

  setSearchTerm (e) {
    this.setState({searchTerm: e.target.value})
  }

}
