import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'readme'; }

	get apiUrlRoot() { return '/api/v1/readmes'; }

}

class Collection extends base.Collection {

	get model() { return Model; }

}

export default {
	Model: Model,
	Collection: Collection
};