import _ from 'underscore'
import Backbone from 'backbone'
import * as baseCrud from './base_crud.js'

export class Model extends baseCrud.Model {

	getMatchingSiblingsByField(fieldKey) {
		var query = {};
		query[fieldKey] = this.get(fieldKey);
		if (this.collection == null) { return[]; }
		return this.collection.where(query);
	}

	getGroupName() {
		return (this.get('name') || 'Generic Group');
	}

}

export class Collection extends baseCrud.Collection {

	get model() { return Model; }

	parse(resp) {
		return resp;
	}

	group() {
		var grps = this.groupBy((model) => { return model.getGroupName(); });
		Object.keys(grps).forEach((grpKey) => {
			var grp = grps[grpKey];
			grps[grpKey] = new Collection(grp);
		});
		return grps;
	}

	stringifyField(field) {
		this.models.each((model) => {
			model.set(field, String(model.get(field)));
		});
		return this;
	}

	// Applies model's matchesSearchTerm method to see if there are any matches in a collection.
	containsSearchTermMatch(searchTerm) {
		var contains = false;
		this.models.forEach((model) => {
			if (model.matchesSearchTerm(searchTerm)) {
				contains = true;
			}
		});
		return contains;
	}

}
