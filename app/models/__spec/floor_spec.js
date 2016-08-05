import 'babel-polyfill'

import assert from 'assert';
import mocha from 'mocha';
import { Model, Collection } from './../floor.js'; 

describe('Model', () => {

	describe('constructor', () => {

		var model;

		beforeEach(() => {
			model = new Model({ 
				id: 'dc_08', 
				rooms: [
					{
						id: '801'
					}
				]
			});
		});

		it('builds embedded room models into a room collection', () => {
			assert.equal(model.get('rooms').models[0].get('id'), '801');
		});

		it('sets parent reference to embedded room collection models', () => {
			assert.equal(model.get('rooms').models[0].parent, model);
		});

	});
	
});

describe('Collection', () => {

	describe('findByRoom', () => {

		var collection;

		it('finds room', () => {

			collection = new Collection([
				{ id: '1', rooms: [ { id: '1' }, { id: '2' } ] },
				{ id: '2', rooms: [ { id: '3' }, { id: '4' } ] },
				{ id: '3', rooms: [ { id: '5' }, { id: '6' } ] }
			]);

			assert.equal(collection.findByRoom('4'), collection.models[1]);

		});

	});

});