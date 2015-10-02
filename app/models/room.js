import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'room'; }

	isPublic() {
		return (this.get('capacity') != null);
	}

}

class Collection extends base.Collection {
	get model() { return Model; }
}

export default {
	Model: Model,
	Collection: Collection
};