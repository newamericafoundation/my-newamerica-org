import React from 'react';
import Loader from './../../general/loader.jsx';
import Icons from './../../general/icons.jsx';
import moment from 'moment';
import { Model, Collection } from './../../../models/readme.js';

import Base from './../base/index.jsx';

class Readmes extends Base {
	
	/*
	 *
	 *
	 */
	constructor(props) {
		super(props);
		this.state = {
			activeEdition: ''
		};
	}


	/*
	 *
	 *
	 */
	render() {
		var { Plus } = Icons;
		return (
			<div className='page page--weekly-wins'>
				<div className='page__content'>					
					<div className='page__content__logo'>
						<Icons.Readme />
					</div>
					<h1 className="title">Read-me!</h1>
					{ this.renderAddButton() }
					<select onChange={this.setActiveEdition.bind(this)}>
						{ this.renderReadmeOptions() }
					</select>
					{ this.renderReadmes() }
				</div>
			</div>
		);
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
	renderReadmes() {
		if (this.state.readmes == null) { return (<Loader />); }
		return this.state.readmes.map((readme, i) => {
			return (
				<Readme history={this.props.history} key={i} readme={readme} activeEdition={this.state.activeEdition} />
			);
		});
	}


	/*
	 *
	 *
	 */
	renderReadmeOptions() {
		if (this.state.readmes == null) { return; }
		return this.state.readmes.map((readme, i) => {
			var val = `Edition ${readme.get('edition')}: ${readme.get('title')}`,
				isSelected = readme.get('edition') === this.state.activeEdition;
			return (
				<option key={i} value={readme.get('edition')} selected={isSelected}>{ val }</option>
			);
		});
	}


	/*
	 *
	 *
	 */
	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			var lastModel = coll.models[coll.models.length - 1],
				activeEdition = lastModel ? parseInt(lastModel.get('edition'), 10) : undefined;
			this.setState({
				readmes: coll,
				activeEdition: activeEdition
			});
		}, (err) => { console.log('problem'); });
	}


	/*
	 *
	 *
	 */
	setActiveEdition(e) {
		this.setState({ activeEdition: parseInt(e.nativeEvent.target.value, 10) });
	}

}



class Readme extends React.Component {

	render() {
		var readme = this.props.readme;
		if (!this.shouldDisplay()) { return <div/>; }
		return (
			<div onDoubleClick={this.navigateToEdit.bind(this)}>
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
		var url = this.props.readme ? this.props.readme.getEditUrl() : '/';
		this.props.history.replaceState(null, url);
	}


	shouldDisplay() {
		return (this.props.activeEdition === this.props.readme.get('edition'));
	}


	getTitle() {
		var readme = this.props.readme;
		return `Edition ${readme.get('edition')}: ${readme.get('title')}`;
	}

}

export default Readmes;