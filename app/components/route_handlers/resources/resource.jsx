import React from 'react';
import moment from 'moment';

import Icons from './../../general/icons.jsx';

/*
 *
 *
 */
class Resource extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		if (!this.shouldDisplay()) { return (<div/>); }
		var resource = this.props.resource;
		var Comp = Icons.get(this.props.resource.get('icon'));
		return (
			<div style={{ display: 'inline-block', position: 'relative' }}>
				<a 
					href={resource.get('url')} 
					target="_blank" 
					className="feature-box"
				>
					<div className="feature-box__background">
						<Comp />
					</div>
					<div className="feature-box__top-content">
						{resource.get('name')}
					</div>
					<div className="feature-box__bottom-content"></div>
				</a>
				{ this.renderEditButton() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderEditButton() {
		var { Build } = Icons;
		// if (!window.user) { return; }
		// if (!window.user.isAdmin) { return; }
		return (
			<p className='page__button' onClick={this.navigateToEdit.bind(this)}><Build /></p>
		);
	}


	/*
	 *
	 *
	 */
	shouldDisplay() {
		return this.props.resource.matchesSearchTerm(this.props.searchTerm);
	}


	/*
	 *
	 *
	 */
	navigateToEdit(e) {
		e.preventDefault();
		var url = this.props.resource ? this.props.resource.getEditUrl() : '/';
		this.props.history.pushState(null, url);
	}

}

export default Resource;