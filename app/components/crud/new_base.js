import React from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

import SaveBase from './save_base.js'

class NewBase extends SaveBase {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentWillMount () {
    var Model = this.getResourceConstructor()
    if (!this.state.model) {
      this.setState({ model: new Model() })
    }
  }

  getCrudMethodName () { return 'new' }

  getSubmitButtonText () {
    return `Create ${this.getResourceName()}`
  }

  saveModel (formData) {
    var { model } = this.state

		// Set status to pending.
    this.setState({ saveResponseStatus: 'pending' })

		// While pending, save form data using the instance method on the model.
    model.getClientSavePromise().then((res) => {
      res = JSON.parse(res)
      model.set('id', res.id)
      this.setState({ saveResponseStatus: res.status })
    }).catch((err) => {
      this.setState({ saveResponseStatus: 'error' })
    })
  }

}

export default NewBase
