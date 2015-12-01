import React from 'react'

/*
 *
 *
 */
class Modal extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		var { width, height } = this.props
		var style = {
			width: width,
			height: height,
			maxWidth: '90%',
			maxHeight: '90%'
		}
		return (
			<div className='modal'>
				<div className='modal__window bg-c-off-white' style={style}>
					<div className='modal__content'>
						{ this.props.children }
						{ this.renderContent() }
					</div>
				</div>
			</div>
		);
	}


	/*
	 * Customize on subclass.
	 *
	 */
	renderContent() {
		// return <p>It is not nice to leave a model empty.</p>
	}

}

export default Modal