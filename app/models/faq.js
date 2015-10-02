import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'faq'; }

	get searchableFields() { return [ 'question', 'answer' ]; }

	matchesSearchTerm(searchTerm) {
		var matches = false;
		if (this.get('question').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		if (this.get('answer').toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
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