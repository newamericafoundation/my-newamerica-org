import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'department'; }

	getViewUrl() { return null; }

	get fields() {
		return [
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'name',
					labelText: 'Question',
					hint: '',
					placeholder: 'Enter question.'
				}
			}
		];
	}

}

class Collection extends base.Collection {
	get model() { return Model; }
}

export default {
	Model: Model,
	Collection: Collection
};