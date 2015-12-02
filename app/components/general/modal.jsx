import React from 'react'

/*
 * General modal window.
 *
 */
class Modal extends React.Component {


	constructor(props) {
		super(props)
		this.handleClick = this.handleClick.bind(this)
		this.handleContentClick = this.handleContentClick.bind(this)
	}


	/*
	 *
	 *
	 */
	render() {
		var { width, height } = this.props
		var style
		if (width && height) {
			style = {
				width: width,
				height: height,
				maxWidth: '90%',
				maxHeight: '90%'
			}
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


	/*
	 *
	 *
	 */
	handleClick(e) {
		var { handleClick } = this.props
		if (handleClick) { handleClick(e) }
	}


	/*
	 *
	 *
	 */
	handleContentClick(e) {
		var { handleContentClick } = this.props
		if (handleContentClick) { handleContentClick(e) }
	}

}

export default Modal