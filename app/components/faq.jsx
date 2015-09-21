import React from 'react';
import moment from 'moment';
import Icons from './mixins/icons.jsx';
import Loader from './mixins/loader.jsx';
import { Model, Collection } from './../models/faq.js';

class Faq extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			searchTerm: ''
		};
	}

	render() {
		return (
			<div className='page page--resources'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Building />
					</div>
					<h1 className="title">Moving FAQ</h1>

					<input placeholder="Search" onChange={ this.setSearchTerm.bind(this) }></input>

					{ this.renderFaqGroups() }

				</div>
			</div>
		);
	}

	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			this.setState({ faqs: coll });
		});
	}

	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value });
	}

	renderFaqGroups() {
		
		if (this.state.faqs == null) { return (<Loader />); }

		var grps = this.state.faqs.group();

		return Object.keys(grps).map((grpKey) => {
			var grp = grps[grpKey];
			if (!grp.containsSearchTermMatch(this.state.searchTerm)) { return; }
			return <FaqGroup searchTerm={this.state.searchTerm} section={grpKey} faqs={grp} />
		});
		
	}

}

class FaqGroup extends React.Component {

	render() {
		return (
			<div>
				<h2 className="page__section-title">{this.props.section}</h2>
				{ this.renderFaqs() }
			</div>
		);
	}

	renderFaqs() {
		return this.props.faqs.map((faq) => {
			return (<FaqItem searchTerm={this.props.searchTerm} faq={faq} />);
		});
	}

}

class FaqItem extends React.Component {

	render() {
		if (!this.shouldDisplay()) { return (<div/>); }
		var faq = this.props.faq,
			style = { margin: '20px 0' };
		return (
			<div className='faq'>
				<p className='faq__question'>{ faq.get('question') }</p>
				<p className='faq__answer'>{ faq.get('answer') }</p>
			</div>
		);
	}

	shouldDisplay() {
		return this.props.faq.matchesSearchTerm(this.props.searchTerm);
	}

}

Faq.contextTypes = {
	router: React.PropTypes.func
};

module.exports = Faq;