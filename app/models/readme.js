import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'readme'; }

	get apiUrlRoot() { return '/api/v1/readmes'; }

	getViewUrl() { return null; }

	get fields() {
		return [
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'edition',
					labelText: 'Edition',
					hint: '',
					placeholder: 'Enter readme edition.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'title',
					labelText: 'Title',
					hint: '',
					placeholder: 'Enter readme title.'
				}
			},
			{
				formComponentName: 'TextArea',
				formComponentProps: {
					id: 'html',
					labelText: 'Body',
					hint: '',
					placeholder: 'Enter main body text.'
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