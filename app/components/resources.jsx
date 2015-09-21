import React from 'react';
import moment from 'moment';
import Icons from './mixins/icons.jsx';
import Loader from './mixins/loader.jsx';
import { Model, Collection } from './../models/resource.js';

class Resources extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			isImageLoaded: false,
			searchTerm: ''
		};
	}

	render() {
		return (
			<div className='page page--resources'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Page />
					</div>
					<h1 className="title">Resources</h1>

					<input placeholder="Search" onChange={ this.setSearchTerm.bind(this) }></input>

					{ this.renderResourceGroups() }

				</div>
			</div>
		);
	}

	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			this.setState({ resources: coll });
		});
	}

	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value });
	}

	renderResourceGroups() {
		
		if (this.state.resources == null) { return (<Loader />); }

		var grps = this.state.resources.group();

		return Object.keys(grps).map((grpKey) => {
			var grp = grps[grpKey];
			if (!grp.containsSearchTermMatch(this.state.searchTerm)) { return; }
			return <ResourceGroup searchTerm={this.state.searchTerm} section={grpKey} resources={grp} />
		});
		
	}

}

class ResourceGroup extends React.Component {

	render() {
		return (
			<div>
				<h2 className="page__section-title">{this.props.section}</h2>
				{ this.renderResources() }
			</div>
		);
	}

	renderResources() {
		return this.props.resources.map((resource) => {
			return (<Resource searchTerm={this.props.searchTerm} resource={resource} />);
		});
	}

}

class Resource extends React.Component {

	render() {
		if (!this.shouldDisplay()) { return (<div/>); }
		var resource = this.props.resource;
		var Comp = Icons.get(this.props.resource.get('icon'));
		return (
			<a href={resource.get('url')} target="_blank" className="feature-box">
				<div className="feature-box__background">
					<Comp />
				</div>
				<div className="feature-box__top-content">
					{resource.get('name')}
				</div>
				<div className="feature-box__bottom-content"></div>
			</a>
		);
	}

	shouldDisplay() {
		return this.props.resource.matchesSearchTerm(this.props.searchTerm);
	}

}

Resources.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Resources;