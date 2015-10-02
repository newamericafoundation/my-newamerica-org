import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'staff_member'; }

	parse(resp) {
		resp.room_id = String(resp.room_id);
		return resp;
	}
}

class Collection extends base.Collection {

	get model() { return Model; }

}

export default {
	Model: Model,
	Collection: Collection
};