import base from './base.js';

class Model extends base.Model {

	get resourceName() { return 'resource'; }

	get searchableFields() { return [ 'name', 'url', 'icon' ]; }

	matchesSearchTerm(searchTerm) {
		var matches = false;
		if (String(this.get('name')).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		if (String(this.get('icon')).toLowerCase().indexOf(searchTerm.toLowerCase()) > -1) { matches = true; }
		return matches;
	}

	getGroupName() {
		return this.get('section');
	}

	get fields() {
		return [
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'name',
					labelText: 'Resource name',
					hint: '',
					placeholder: 'Enter resource name.'
				}
			},
			{
				formComponentName: 'Radio',
				formComponentProps: {
					id: 'section',
					labelText: 'Title',
					hint: '',
					options: [ 'General Policies', 'Development', 'IT', 'Finance', 'TDM', 'Payroll & Taxes', 'Organization Information', 'Other' ],
					placeholder: 'Enter readme title.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'url',
					labelText: 'Url',
					hint: '',
					placeholder: 'Enter url.'
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