import React from 'react';
import moment from 'moment';

import Resource from './resource.jsx';

/*
 *
 *
 */
class ResourceGroup extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		return (
			<div>
				<h2 className="page__section-title">{this.props.section}</h2>
				{ this.renderResources() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderResources() {
		return this.props.resources.map((resource, i) => {
			return (
				<Resource 
					history={this.props.history} 
					key={i} 
					searchTerm={this.props.searchTerm} 
					resource={resource} 
				/>
			);
		});
	}

}

export default ResourceGroup;