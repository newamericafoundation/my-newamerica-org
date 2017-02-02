// Form component backed by a Backbone model.
import React from 'react'
import _ from 'underscore'

import * as Subcomponents from './subcomponents/index.js'

class Form extends React.Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  render () {
    const style = this.props.isEnabled ? {} : { opacity: 0.5 }
    return (
      <form
        onSubmit={this.sendFormDataToParent.bind(this)}
        style={style}
      >
        { this.renderFormComponents() }
        <input
          type='submit'
          disabled={!this.props.isEnabled}
          value={this.props.submitButtonText || 'Submit Form'}
        />
      </form>
    )
  }

  renderFormComponents () {
    return this.props.model.fields.map((field, i) => {
      const FormComp = Subcomponents[field.formComponentName] || Subcomponents.Text
      const id = field.formComponentProps.id
      const props = field.formComponentProps || {}
      return (
        <FormComp
          {...props}
          history={this.props.history}
          key={i}
          isEnabled={this.props.isEnabled}
          saveDataOnParent={this.saveDataFromChild.bind(this)}
          initialValue={this.props.model.get(id)}
        />
      )
    })
  }

  saveDataFromChild (childData) {
    const { model } = this.props
    const key = childData.id
    const currentValue = this.props.model.get(key)
    const incomingValue = childData.value

    // If the data field is an array, add the incoming value if the array does not contain it but remove it if it does.
    // This behavior is specific to the ForeignCollectionCheckBox subcomponent.
    if (_.isArray(currentValue)) {
      let index = currentValue.indexOf(incomingValue)
      if (index < 0) {
        currentValue.push(incomingValue)
      } else {
        currentValue.splice(index, 1)
      }
      model.set(key, currentValue)
    } else {
      model.set(key, incomingValue)
    }

    this.forceUpdate()
  }

  sendFormDataToParent (e) {
    e.preventDefault()
    this.props.onSubmit(this.props.model)
  }

}

export default Form
