import base from './base.js';

class Model extends base.Model {

	get apiUrlRoot() { return '/api/v1/readmes'; }

}

class Collection extends base.Collection {

	get model() { return Model; }
	get apiUrl() { return '/api/v1/readmes'; }
	get dbCollection() { return 'readmes'; }
	get dataFilePath() { return __dirname + '/../../db/seeds/readmes/index.json'; }

}

export default {
	Model: Model,
	Collection: Collection
};