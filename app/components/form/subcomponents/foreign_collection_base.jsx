import React from 'react';
import Base from './base.jsx';

class ForeignCollectionBase extends Base {

	constructor(props) {
		super(props);
		this.state = this.state || {};
		this.state.foreignCollection = null;
	}


	/*
	 *
	 *
	 */
	render() {
		return (<div/>);
	}


	/*
	 * Fetch foreign collection if one is not passed down through props.
	 *
	 */
	fetchForeignCollection() {
		if (!this.props.foreignCollection && !this.props.foreignCollectionConstructor) { return; }
		var coll = new this.props.foreignCollectionConstructor();
		coll.getClientFetchPromise().then((coll) => {
			this.setState({ foreignCollection: coll });
		}).catch((err) => { console.log(err.stack); });
	}


	/*
	 * If there is no option selected, initialize the first one.
	 *
	 */
	// setInitialValue() {
	// 	if(!this.props.initialValue) {
	// 		this.props.saveDataOnParent({
	// 			id: this.props.id,
	// 			value: [ this.props.foreignCollection.models[0].get('id') ]
	// 		});
	// 	}
	// }


	/*
	 *
	 *
	 */
	getForeignCollection() {
		if (this.props.foreignCollection) { return this.props.foreignCollection; }
		return this.state.foreignCollection;
	}


	/*
	 *
	 *
	 */
	getForeignCollectionDisplayField() {
		return this.props.foreignCollectionDisplayField || 'name';
	}

}


export default ForeignCollectionBase;