import base from './base.js';

class Model extends base.Model {
}

class Collection extends base.Collection {
	get model() { return Model; }
	get url() { return 'api/v1/weekly-wins'; }
	get dataFilePath() { return __dirname + '/../../db/weekly_wins/index.json'; }
}

export default {
	Model: Model,
	Collection: Collection
};