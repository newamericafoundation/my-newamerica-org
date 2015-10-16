import React from 'react';
import moment from 'moment';

import Loader from './../../general/loader.jsx';
import Icons from './../../general/icons.jsx';
import { Model, Collection } from './../../../models/weekly_win.js';

import Base from './../base/index.jsx';

import Win from './win.jsx';

class WeeklyWins extends Base {
	
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
		return (
			<div className='page page--weekly-wins'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Trophy />
					</div>
					<h1 className="title">Weekly Wins</h1>
					{ this.renderAddButton() }
					<select onChange={this.setActiveEdition.bind(this)}>
						{ this.renderWinOptions() }
					</select>
					{ this.renderWins() }
				</div>
			</div>
		);
	}


	/*
	 *
	 *
	 */
	renderWins() {
		if (this.state.weeklyWins == null) { return (<Loader />); }
		return this.state.weeklyWins.map((win, i) => {
			return (
				<Win 
					history={this.props.history}
					win={win} 
					activeEdition={this.state.activeEdition} 
					key={i} 
				/>
			);
		});
	}


	/*
	 *
	 *
	 */
	renderWinOptions() {
		if (this.state.weeklyWins == null) { return; }
		return this.state.weeklyWins.map((win, i) => {
			var val = `Edition ${win.get('edition')}: ${win.get('title')}`,
				isSelected = win.get('edition') === this.state.activeEdition;
			return (
				<option value={win.get('edition')} selected={isSelected} key={i}>{ val }</option>
			);
		});
	}


	/*
	 *
	 *
	 */
	navigateToAdd() {
		this.props.history.replaceState(null, Model.prototype.getNewUrl());
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
				weeklyWins: coll,
				activeEdition: activeEdition
			});
		});
	}


	/*
	 *
	 *
	 */
	setActiveEdition(e) {
		this.setState({ activeEdition: parseInt(e.nativeEvent.target.value, 10) });
	}

}






export default WeeklyWins;