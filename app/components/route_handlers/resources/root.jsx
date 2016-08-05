import React from 'react';
import moment from 'moment';

import {Page} from './../../general/icons.jsx';
import Loader from './../../general/loader.jsx';

import {Model, Collection} from './../../../models/resource.js';

import ResourceGroup from './resource_group.jsx'

import Base from './../base/index.jsx'

export default class Resources extends Base {

	constructor(props) {
		super(props)
		this.setSearchTerm = this.setSearchTerm.bind(this)
		this.state = {
			searchTerm: ''
		}
	}

	render() {
		return (
			<div className='page page--resources'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Page/>
					</div>
					<h1 className="title">Resources</h1>
					{ this.renderAddButton() }
					<input placeholder="Search" onChange={ this.setSearchTerm }></input>
					{ this.renderResourceGroups() }
				</div>
			</div>
		);
	}

	renderResourceGroups() {

		if (this.state.resources == null) { return <Loader /> }

		var grps = this.state.resources.group()

		return Object.keys(grps).map((grpKey, i) => {
			var grp = grps[grpKey];
			if (!grp.containsSearchTermMatch(this.state.searchTerm)) { return; }
			return (
				<ResourceGroup
					history={this.props.history}
					key={i}
					searchTerm={this.state.searchTerm}
					section={grpKey}
					resources={grp}
				/>
			);
		});

	}

	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			this.setState({ resources: coll })
		}).catch((err) => { console.log(err.stack) })
	}

	navigateToAdd() {
		this.props.history.pushState(null, Model.prototype.getNewUrl())
	}

	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value })
	}

}
