import React from 'react'

import Base from './base.jsx'

class ImageFile extends Base {

  render() {
    return (
      <div className='form__wrapper'>
        <label htmlFor={this.props.id}>{ this.props.labelText }</label>
        { this.renderThumbnail() }
        <p className='form__hint'>{ this.props.hint }</p>
        <input
          ref='input'
          onChange={this.saveDataOnParent.bind(this)}
          type='file'
          disabled={!this.props.isEnabled}
          name={this.props.id}
          id={this.props.id}
          placeholder={this.props.placeholder}
        />
      </div>
    )
  }

  renderThumbnail() {
    let encoded = this.props.initialValue
    if (encoded) {
      encoded = encoded.replace(/(\r\n|\n|\r)/gm, '');
      return (
        <div style={
          {
            width: '100%',
            paddingTop: '75%',
            backgroundSize: 'cover',
            backgroundImage: (`url(${encoded})`)
          }
        }/>
      );
    }
  }

  saveDataOnParent(e) {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => {
      const b64 = reader.result
      this.props.saveDataOnParent({
        id: this.props.id,
        value: b64
      })
    }
    reader.readAsDataURL(file)
  }
}

export default ImageFile
