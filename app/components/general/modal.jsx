import React from 'react';

export default class Modal extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleContentClick = this.handleContentClick.bind(this);
  }

  render() {
    const {width, height} = this.props;
    let style;
    if (width && height) {
      style = {
        width: width,
        height: height,
        maxWidth: '90%',
        maxHeight: '90%'
      };
    }
    return (
      <div className='modal' onClick={this.handleClick}>
        <div className='modal__window bg-c-off-white' style={style} onClick={this.handleContentClick}>
          <div className='modal__content'>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }

  handleClick(e) {
    if (this.props.handleClick) {
      this.props.handleClick(e);
    }
  }

  handleContentClick(e) {
    if (this.props.handleContentClick) {
      this.props.handleContentClick(e);
    }
  }

}
