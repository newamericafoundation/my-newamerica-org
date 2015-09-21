import React from 'react';
import Loader from './mixins/loader.jsx';
import Icons from './mixins/icons.jsx';
import moment from 'moment';
import { Model, Collection } from './../models/readme.js';

class Readmes extends React.Component {
	
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
						<Icons.Readme />
					</div>
					<h1 className="title">Read-me!</h1>
					<select onChange={this.setActiveEdition.bind(this)}>
						{ this.renderReadmeOptions() }
					</select>
					{ this.renderReadmes() }
				</div>
			</div>
		);
	}

	componentDidMount() {
		new Collection().getClientFetchPromise().then((coll) => {
			this.setState({
				readmes: coll,
				activeEdition: parseInt(coll.models[coll.models.length - 1].get('edition'), 10)
			});
		});
	}

	setActiveEdition(e) {
		this.setState({ activeEdition: parseInt(e.nativeEvent.target.value, 10) });
	}

	renderReadmes() {
		if (this.state.readmes == null) { return (<Loader />); }
		return this.state.readmes.map((readme) => {
			return (
				<Readme readme={readme} activeEdition={this.state.activeEdition} />
			);
		});
	}

	renderReadmeOptions() {
		if (this.state.readmes == null) { return; }
		return this.state.readmes.map((readme) => {
			var val = `Edition ${readme.get('edition')}: ${readme.get('title')}`,
				isSelected = readme.get('edition') === this.state.activeEdition;
			return (
				<option value={readme.get('edition')} selected={isSelected}>{ val }</option>
			);
		});
	}

}

Readmes.contextTypes = {
	router: React.PropTypes.func
};


class Readme extends React.Component {

	render() {
		var readme = this.props.readme;
		if (!this.shouldDisplay()) { return <div/>; }
		return (
			<div>
				<h2 className='page__section-title'>{ this.getTitle() }</h2>
				<div className='static-content' dangerouslySetInnerHTML={{ __html: readme.get('html') }}></div>
			</div>
		);
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