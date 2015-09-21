import React from 'react';
import Loader from './mixins/loader.jsx';
import Icons from './mixins/icons.jsx';
import moment from 'moment';
import { Model, Collection } from './../models/weekly_win.js';

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
			this.setState({
				weeklyWins: coll,
				activeEdition: coll.models[0].get('edition')
			});
		});
	}

	setActiveEdition(e) {
		this.setState({ activeEdition: e.nativeEvent.target.value });
	}

	renderWins() {
		if (this.state.weeklyWins == null) { return (<Loader />); }
		return this.state.weeklyWins.map((win) => {
			return (
				<Win win={win} activeEdition={this.state.activeEdition} />
			);
		});
	}

	renderWinOptions() {
		if (this.state.weeklyWins == null) { return; }
		return this.state.weeklyWins.map((win) => {
			var val = `Edition ${win.get('edition')}: ${win.get('title')}`;
			return (
				<option value={win.get('edition')}>{ val }</option>
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