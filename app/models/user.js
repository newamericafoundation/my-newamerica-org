// Do not bundle!

import _ from 'underscore';
import Backbone from 'backbone';

var adminEmails = [
	"communications",
	"szerzo",
	"vanderlinde",
	"elkin",
	"fuzz",
	"zalatoris",
	"murphy",
	"hairston",
	"lawson",
	"richardett",
	"calabresee",
	"novamartinez"
].map((email) => { return `${email}@newamerica.org`; })

class Model extends Backbone.Model {

	constructor(options) {
		super(options);
	}

	get resourceName() { return 'user'; }


	/*
	 *
	 *
	 */
	isDomainAuthorized() {
		return ([ 'newamerica.org', 'opentechinstitute.org', 'wiredcraft.com' ].indexOf(this.get('domain')) > -1);
	}


	/*
	 *
	 *
	 */
	isAdmin() {
		var email = this.get('emails')[0].value;
		return (adminEmails.indexOf(email) > 0);
	}


	/*
	 *
	 *
	 */
	parse(raw) {
		if (raw._id) {
			raw.id = raw._id;
			delete raw._id;
		}
		return raw;
	}


	/*
	 *
	 *
	 */
	toMongoJSON() {
		var json = this.toJSON();
		json._id = json.id;
		delete json.id;
		return json;
	}


	/*
	 *
	 *
	 */
	toSessionJSON() {
		return {
			id: this.get('id'),
			accessToken: this.get('accessToken')
		};
	}


	/*
	 *
	 *
	 */
	toClientJSON() {
		return {
			displayName: this.get('displayName'),
			name: this.get('name'),
			image: this.get('image'),
			emails: this.get('emails'),
			isAdmin: this.isAdmin()
		};
	}


	/*
	 *
	 * @param {object} MongoDB client instance.
	 */
	getSavePromise(db) {

		var { NODE_ENV, PRODUCTION_DB_URL } = process.env
	
		var dbUrlBase = (NODE_ENV === 'development') ? 'localhost' : PRODUCTION_DB_URL
		var dbUrl = `mongodb://${dbUrlBase}:27017/mongoid`

		MongoClient.connect(dbUrl, (err, db) => {

			return new Promise((resolve, reject) => {

				var collection = db.collection('intranet_users');

				collection.update({ _id: this.get('id') }, this.toMongoJSON(), { upsert: true }, (err, json) => {
					console.log('user saved successfully');
					if (err) { return reject(err); }
					resolve(this);
				});

			});

		});
		
	}


	/*
	 *
	 *
	 */
	getRetrievePromise() {

		var { NODE_ENV, PRODUCTION_DB_URL } = process.env
	
		var dbUrlBase = (NODE_ENV === 'development') ? 'localhost' : PRODUCTION_DB_URL
		var dbUrl = `mongodb://${dbUrlBase}:27017/mongoid`

		MongoClient.connect(dbUrl, (err, db) => {

			return new Promise((resolve, reject) => {

				return dbConnector.then((db) => {

					var collection = db.collection('intranet_users'),
						cursor = collection.find({ _id: this.get('id') });

					cursor.toArray((err, json) => {
						if (err) { return reject(err); }
						this.set(this.parse(json[0]));
						resolve(this);
					})

				}, (err) => { reject(err); });

			})

		})

	}

}

class Collection extends Backbone.Collection {

	constructor(options) {
		super(options);
		this.model = Model;
		this.url = '/api/v1/floors';
	}

}

export default {
	Model: Model,
	Collection: Collection
};