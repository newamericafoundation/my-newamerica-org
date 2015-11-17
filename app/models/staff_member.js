import * as base from './base.js';

import * as department from './department.js';

export class Model extends base.Model {

	get resourceName() { return 'staff_member'; }

	getIndexUrl() { return '/staff-directory'; }

	getViewUrl() { return null; }

	parse(resp) {
		resp.room_id = String(resp.room_id);
		return resp;
	}

		get fields() {
		return [
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'name',
					labelText: 'Name',
					hint: '',
					placeholder: 'Enter staff member name.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'title',
					labelText: 'Title',
					hint: '',
					placeholder: 'Enter title.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'url',
					labelText: 'Bio url',
					hint: '',
					placeholder: 'Enter bio url.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'dept',
					labelText: 'Department (OBSOLETE)',
					hint: '',
					placeholder: 'Enter Department.'
				}
			},
			{
				formComponentName: 'ForeignCollectionCheckBox',
				
				formComponentProps: {
					id: 'department_ids',
					labelText: 'Department (NEW)',
					foreignCollectionConstructor: department.Collection,
					hint: 'choose'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'phone',
					labelText: 'Phone number',
					hint: '',
					placeholder: 'Enter phone number.'
				}
			},
			{
				formComponentName: 'Text',
				formComponentProps: {
					id: 'room_id',
					labelText: 'Room number',
					hint: 'Use official numbering, e.g. 940 for main events space, 827A for a cubicle section.',
					placeholder: 'Enter room number.'
				}
			}
		];
	}
	
}

export class Collection extends base.Collection {

	get model() { return Model; }

}