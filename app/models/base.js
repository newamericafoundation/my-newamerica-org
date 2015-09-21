import _ from 'underscore';
import Backbone from 'backbone';
import fs from 'fs';

class Model extends Backbone.Model {

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

class Collection extends Backbone.Collection {

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

	// Customize for resource needs: retrieve from json on file system or database.
	retrieve(next) {
		if (fs == null) { return; }
		fs.readFile(this.dataFilePath, 'utf-8', (err, data) => {
			next(err, data);
		});
	}

	// Returns promise the is resolved when the collection is fetched successfully from the client.
	getClientFetchPromise() {

		return new Promise((resolve, reject) => {

			this.fetch({ reset: true, parse: true });
			this.on('reset', () => {
				resolve(this);
			});


		});

	}

	// Returns promise the is resolved when the collection is fetched successfully on the server.
	getServerFetchPromise() {

		return new Promise((resolve, reject) => {

			this.retrieve((err, data) => {
				if (err) { return reject(err); }
				data = JSON.parse(data);
				this.reset(data);
				resolve(this);
			});

		});
		
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

module.exports = {
	Model: Model,
	Collection: Collection
};