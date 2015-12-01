import React from 'react'
import moment from 'moment'
import marked from 'marked'

import Icons from './../../general/icons.jsx'
import Loader from './../../general/loader.jsx'

import { Model, Collection } from './../../../models/faq.js'

import Base from './../base/index.jsx'

/*
 *
 *
 */
class Faq extends Base {
	
	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = { searchTerm: '' }
	}


	/*
	 *
	 *
	 */
	render() {
		return (
			<div className='page page--resources'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Building />
					</div>
					<h1 className="title">Moving FAQ</h1>
					{ this.renderAddButton() }
					<input placeholder="Search" onChange={ this.setSearchTerm.bind(this) }></input>

					{ this.renderFaqGroups() }

				</div>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderFaqGroups() {
		
		if (this.state.faqs == null) { return (<Loader />); }

		var grps = this.state.faqs.group();

		return Object.keys(grps).map((grpKey, i) => {
			var grp = grps[grpKey];
			if (!grp.containsSearchTermMatch(this.state.searchTerm)) { return; }
			return (
				<FaqGroup
					history={this.props.history}
					searchTerm={this.state.searchTerm} 
					section={grpKey} 
					faqs={grp}
					key={i}
				/>
			);
		});
		
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			this.setState({ faqs: coll });
		});
	}


	/*
	 *
	 *
	 */
	navigateToAdd() {
		this.props.history.pushState(null, Model.prototype.getNewUrl());
	}


	/*
	 *
	 *
	 */
	setSearchTerm(e) {
		this.setState({ searchTerm: e.target.value });
	}

}


/*
 *
 *
 */
class FaqGroup extends React.Component {

	/*
	 *
	 *
	 */
	render() {
		return (
			<div>
				<h2 className="page__section-title">{this.props.section}</h2>
				{ this.renderFaqs() }
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderFaqs() {
		return this.props.faqs.map((faq, i) => {
			return (
				<FaqItem
					history={this.props.history}
					searchTerm={this.props.searchTerm} 
					faq={faq} 
					key={i} 
				/>
			);
		});
	}

}


/*
 *
 *
 */
class FaqItem extends React.Component {


	/*
	 *
	 *
	 */
	render() {
		if (!this.shouldDisplay()) { return (<div/>); }
		var faq = this.props.faq,
			html = marked(faq.get('answer'), { sanitize: true });
		return (
			<div className='faq' onDoubleClick={this.navigateToEdit.bind(this)}>
				<p className='faq__question'>{ faq.get('question') }</p>
				<div 
					className='faq__answer static-content'
					dangerouslySetInnerHTML={{ __html: html }}
				/>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	shouldDisplay() {
		return this.props.faq.matchesSearchTerm(this.props.searchTerm);
	}


	/*
	 *
	 *
	 */
	navigateToEdit() {
		var url = this.props.faq ? this.props.faq.getEditUrl() : '/';
		return this.props.history.pushState(null, url);
	}

}

module.exports = Faq;