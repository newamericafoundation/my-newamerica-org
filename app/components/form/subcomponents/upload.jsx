// Uploads file to S3 bucket.

import React from 'react'
import moment from 'moment'
import $ from 'jquery'

import Base from './base.jsx'
import Loader from './../../general/loader.jsx'

export default class Upload extends Base {
  constructor (props) {
    super(props)
    this.state = {
      upload: 'initial'
    }
  }

  render () {
		const { FileReader } = global
    if (!FileReader) {
      return (<div className='form__wrapper'><p>This form component is not supported in your browser. Please reopen the file in a newer version of Chrome, Safari or Firefox.</p></div>)
    }
    return (
      <div className='form__wrapper'>
        <label htmlFor={this.props.id}>{ this.props.labelText }</label>
        <p className='form__hint'>{ this.props.hint }</p>
        { (this.state.upload === 'pending') ? <Loader /> : null }
        <input
          type='file'
          onChange={this.processUpload.bind(this)}
          disabled={!this.props.isEnabled}
          name={this.props.id}
          id={this.props.id}
          filename={this.props.initialValue}
          placeholder={this.props.placeholder}
				/>
      </div>
    )
  }

  processUpload (e) {
		const { FileReader } = global
    const file = e.target.files[0]
    const reader = new FileReader()
    const fileName = file.name
    const timeStamp = moment(new Date()).format('YYYY-MM-DD-HH-mm-ss')

    fileName = fileName.slice(0, fileName.indexOf('.')) + '-' + timeStamp + fileName.slice(fileName.indexOf('.'))

    const params = {
      Key: `${this.props.model.getUploadPath()}${fileName}`,
      ContentType: file.type
    }

    this.setState({
      upload: 'pending'
    })

    reader.onload = (res) => {
      params.Body = reader.result

      $.ajax({
        url: '/static/upload',
        data: params,
        method: 'post',
        success: (data) => {
          this.setState({ upload: 'success' })
          this.props.saveDataOnParent({
            id: this.props.id,
            value: fileName
          })
        },
        error: (data) => {
          this.setState({ upload: 'error' })
        }
      })
    }
    reader.readAsText(file)
  }
}
