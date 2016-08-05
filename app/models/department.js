import * as base from './base.js';

export class Model extends base.Model {

	get resourceName() { return 'department'; }

	getViewUrl() { return null; }

	get fields() {
		return [
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'name',
					labelText: 'Name',
					hint: '',
					placeholder: 'Enter question.'
				}
			}
		];
	}

}

export class Collection extends base.Collection {
	get model() { return Model; }
}