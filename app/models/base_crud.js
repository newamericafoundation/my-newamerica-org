import _ from 'underscore';
import Backbone from 'backbone';
import fs from 'fs';

class Model extends Backbone.Model {


}

class Collection extends Backbone.Collection {

	get model() { return Model; }

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

}

module.exports = {
	Model: Model,
	Collection: Collection
};