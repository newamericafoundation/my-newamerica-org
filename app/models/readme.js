import base from './base.js';
import _ from 'underscore';

class Model extends base.Model {

	get resourceName() { return 'readme'; }

	get apiUrlRoot() { return '/api/v1/readmes'; }

	getViewUrl() { return null; }

	get defaults() {
		return {
			html: '<p>Content should arrive shortly.</p>'
		};
	}

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


	/*
	 * Make sure the edition is a number.
	 *
	 */
	beforeSave() {
		var ed = this.get('edition');
		if (!_.isNumber(ed)) { this.set('edition', Number(ed)); }
	}

}

class Collection extends base.Collection {

	get model() { return Model; }

	comparator(m1, m2) {
		return m1.get('edition') - m2.get('edition');
	}

}

export default {
	Model: Model,
	Collection: Collection
};