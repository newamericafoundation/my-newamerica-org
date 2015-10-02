import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'resource'; }

	get searchableFields() { return [ 'name', 'url', 'icon' ]; }

	matchesSearchTerm(searchTerm) {
		var matches = false;
		if (this.get('name').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		// if (this.get('url').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		if (this.get('icon').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		return matches;
	}

	getGroupName() {
		return this.get('section');
	}

}

class Collection extends base.Collection {
	get model() { return Model; }
}

export default {
	Model: Model,
	Collection: Collection
};