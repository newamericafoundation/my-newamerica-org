import React from 'react';
import Loader from './../../general/loader.jsx';
import Icons from './../../general/icons.jsx';
import moment from 'moment';
import { Model, Collection } from './../../../models/readme.js';

import Base from './../base/index.jsx'

import Readme from './readme.jsx'


/*
 *
 *
 */
class Readmes extends Base {
	
	/*
	 *
	 *
	 */
	constructor(props) {
		super(props)
		this.state = { activeEdition: '' }
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
					<select value={this.state.activeEdition} onChange={this.setActiveEdition.bind(this)}>
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
			var val = `Edition ${readme.get('edition')}: ${readme.get('title')}`;
			return (
				<option key={i} value={readme.get('edition')}>{ val }</option>
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


export default Readmes