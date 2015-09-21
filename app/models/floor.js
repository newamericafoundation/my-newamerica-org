import base from './base.js';
import room from './room.js';

class Model extends base.Model {

	initialize() {
		if (this.get('rooms') != null) {
			let roomCollection = new room.Collection(this.get('rooms'));
			roomCollection.each((roomModel) => {
				roomModel.parent = this;
			});
			this.set('rooms', roomCollection);
		}
	}

	getDisplayName() {
		return `${this.get('name')}, ${this.get('office')}`;
	}

}

class Collection extends base.Collection {

	get model() { return Model; }

	get dataFilePath() { return __dirname + '/../../db/floors/index.json'; }

	get url() { return 'api/v1/floors'; }

	findByRoom(roomId) {
		var matchingModels = [];
		this.each((model) => {
			var rooms = model.get('rooms');
			if (rooms.findWhere({ id: roomId })) {
				matchingModels.push(model);
			}
		});
		return matchingModels[0];
	}

}

export default {
	Model: Model,
	Collection: Collection
};