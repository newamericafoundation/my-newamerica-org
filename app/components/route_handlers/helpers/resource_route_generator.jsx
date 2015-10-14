import React from 'react';

import { Route } from 'react-router';

import NewBase from './../../crud/new_base.js';
import EditBase from './../../crud/edit_base.js';
import DeleteBase from './../../crud/delete_base.js';

export default function resourceRouteGenerator(Model, rootRouteName) {

	/*
	 *
	 *
	 */
	class New extends NewBase {
		getResourceConstructor() { return Model; }
	}


	/*
	 *
	 *
	 */
	class Edit extends EditBase {
		getResourceConstructor() { return Model; }
	}


	/*
	 *
	 *
	 */
	class Delete extends DeleteBase {
		getResourceConstructor() { return Model; }
	}


	/*
	 *
	 *
	 */
	class Wrapper extends React.Component {
		render() { return (<div className='fill-parent'>{ this.props.children }</div>); }
	}


	return (
		<Route path={rootRouteName} component={Wrapper}>
			<Route path='/new' component={New} />
			<Route path='/:id/edit' component={Edit} />
			<Route path='/:id/delete' component={Delete} />
		</Route>
	);

};