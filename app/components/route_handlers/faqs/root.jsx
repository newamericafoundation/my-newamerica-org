import React from 'react'

import {Info} from './../../general/icons.jsx'
import Loader from './../../general/loader.jsx'
import {Model, Collection} from './../../../models/faq.js'
import Base from './../base/index.jsx'
import Faq from './faq_item.jsx'

export default class Faqs extends Base {
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
            <Info />
          </div>
          <h1 className='title'>Questions and Answers</h1>
          { this.renderAddButton() }
          <div>
            <a className="link" target="_blank" href="https://docs.google.com/a/newamerica.org/forms/d/e/1FAIpQLSc1Tnigy-OBwZLZ9TfSgxDAqqQkp7KePfRVVn6-7ACcjsIlkg/viewform">Submit a question</a>
          </div>
          <input placeholder='Search' onChange={this.setSearchTerm.bind(this)} />

          { this.renderFaqs() }

        </div>
      </div>
    )
  }

  renderFaqs () {
    if (this.state.faqs == null) { return (<Loader />) }

    var grps = this.state.faqs.group()

    return this.state.faqs.map((faq, index) => <Faq history={this.props.history} key={index} faq={faq} searchTerm={this.state.searchTerm} />)
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
