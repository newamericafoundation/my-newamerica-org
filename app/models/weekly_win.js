import * as base from './base.js'
import _ from 'underscore'

/*
 *
 *
 */
export class Model extends base.Model {

	get resourceName() { return 'weekly_win' }

	getIndexUrl() { return '/weekly-wins' }

	getViewUrl() { return null }

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
					hint: 'Edition number only (e.g. 80), without hash character.',
					placeholder: 'Enter readme edition.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'title',
					labelText: 'Title',
					hint: 'Same as weekly wins e-mail title.',
					placeholder: 'Enter readme title.'
				}
			},
			{
				formComponentName: 'TextArea',
				formComponentProps: {
					id: 'html',
					labelText: 'Body',
					hint: 'Enter HTML. Remove inline styling using (TBA) tool.',
					placeholder: 'Enter readme body.'
				}
			}
		];
	}


	/*
	 * Convert edition to number before saving to database.
	 *
	 */
	beforeSave() {
		var ed = this.get('edition')
		if (!_.isNumber(ed)) { this.set('edition', Number(ed)) }
	}

}

export class Collection extends base.Collection {

	get model() { return Model }

	comparator(m1, m2) { return (m1.get('edition') - m2.get('edition')) }

}