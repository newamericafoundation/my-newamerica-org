import base from './base.js';

class Model extends base.Model {
	parse(resp) {
		resp.room_id = String(resp.room_id);
		return resp;
	}
}

class Collection extends base.Collection {
	get model() { return Model; }
	get url() { return 'api/v1/staff-members'; }
	get dataFilePath() { return __dirname + '/../../db/staff_members/index.json'; }
}

export default {
	Model: Model,
	Collection: Collection
};