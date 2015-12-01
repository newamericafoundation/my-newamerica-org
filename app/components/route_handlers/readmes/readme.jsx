import React from 'react'


/*
 *
 *
 */
class Readme extends React.Component {

	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.navigateToEdit = this.navigateToEdit.bind(this)
	}


	/*
	 * 
	 *
	 */
	render() {
		var { readme } = this.props
		if (!this.shouldDisplay()) { return <div/> }
		return (
			<div onDoubleClick={this.navigateToEdit}>
				<h2 className='page__section-title'>{ this.getTitle() }</h2>
				<div className='static-content' dangerouslySetInnerHTML={{ __html: readme.get('html') }}></div>
			</div>
		);
	}


	/*
	 * 
	 *
	 */
	navigateToEdit() {
		var url = this.props.readme ? this.props.readme.getEditUrl() : '/'
		this.props.history.pushState(null, url)
	}


	/*
	 * 
	 *
	 */
	shouldDisplay() {
		var { activeEdition, readme } = this.props
		return (activeEdition === readme.get('edition'))
	}


	/*
	 * 
	 *
	 */
	getTitle() {
		var { readme } = this.props
		return `Edition ${readme.get('edition')}: ${readme.get('title')}`
	}

}


export default Readme