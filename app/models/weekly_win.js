import base from './base.js';

class Model extends base.Model {
}

class Collection extends base.Collection {
	get model() { return Model; }
	get apiUrl() { return 'api/v1/weekly-wins'; }
	get dbCollection() { return 'weekly_wins'; }
	get dataFilePath() { return __dirname + '/../../db/seeds/weekly_wins/index.json'; }
}

export default {
	Model: Model,
	Collection: Collection
};