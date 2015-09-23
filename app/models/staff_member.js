import base from './base.js';

class Model extends base.Model {
	parse(resp) {
		resp.room_id = String(resp.room_id);
		return resp;
	}
}

class Collection extends base.Collection {

	get model() { return Model; }
	get apiUrl() { return '/api/v1/staff-members'; }
	get dbCollection() { return 'staff_members'; }
	get dataFilePath() { return __dirname + '/../../db/seeds/staff_members/index.json'; }

}

export default {
	Model: Model,
	Collection: Collection
};