import React from 'react';
import moment from 'moment';

import Loader from './../general/loader.jsx';
import Icons from './../general/icons.jsx';
import { Model, Collection } from './../../models/weekly_win.js';

class WeeklyWins extends React.Component {
	
	constructor(props) {
		super(props);
		this.state = {
			activeEdition: ''
		};
	}

	render() {
		return (
			<div className='page page--weekly-wins'>
				<div className='page__content'>
					<div className='page__content__logo'>
						<Icons.Trophy />
					</div>
					<h1 className="title">Weekly Wins</h1>
					<select onChange={this.setActiveEdition.bind(this)}>
						{ this.renderWinOptions() }
					</select>
					{ this.renderWins() }
				</div>
			</div>
		);
	}

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

	setActiveEdition(e) {
		this.setState({ activeEdition: parseInt(e.nativeEvent.target.value, 10) });
	}

	renderWins() {
		if (this.state.weeklyWins == null) { return (<Loader />); }
		return this.state.weeklyWins.map((win, i) => {
			return (
				<Win win={win} activeEdition={this.state.activeEdition} key={i} />
			);
		});
	}

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

}

WeeklyWins.contextTypes = {
	router: React.PropTypes.func
};


class Win extends React.Component {

	render() {
		var win = this.props.win;
		if (!this.shouldDisplay()) { return <div/>; }
		return (
			<div>
				<h2 className='page__section-title'>{ this.getTitle() }</h2>
				<div className='static-content' dangerouslySetInnerHTML={{ __html: win.get('html') }}></div>
			</div>
		);
	}

	shouldDisplay() {
		return (this.props.activeEdition === this.props.win.get('edition'));
	}

	getTitle() {
		var win = this.props.win;
		return `Edition ${win.get('edition')}: ${win.get('title')}`;
	}

}

export default WeeklyWins;