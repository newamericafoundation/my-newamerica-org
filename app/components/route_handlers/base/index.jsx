import React from 'react';
import Icons from './../../general/icons.jsx';


class Base extends React.Component {

	render() {
		return (<div/>);
	}


	/*
	 *
	 *
	 */
	renderAddButton() {
		var { Plus } = Icons;
		if (!window.user) { return; }
		if (!window.user.isAdmin) { return; }
		return (
			<p className='page__content__button' onClick={this.navigateToAdd.bind(this)}><Plus /></p>
		);
	}

}

export default Base;