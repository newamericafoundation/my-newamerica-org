import * as Backbone from 'backbone';
import $ from 'jquery';


export class Model extends Backbone.Model {

  get resourceName() { return 'resource'; }

  get apiUrlRoot() {
    const name = this.resourceName;
    return `/api/v1/${name}s`;
  }

  getIndexUrl() {
    const name = this.resourceName;
    return `/${name}s`;
  }

  getViewUrl() {
    const name = this.resourceName;
    return `/${name}s/${this.get('id')}`;
  }

  getEditUrl() {
    const name = this.resourceName;
    return `/admin/${name}s/${this.get('id')}/edit`;
  }

  getDeleteUrl() {
    const name = this.resourceName;
    return `/admin/${name}s/${this.get('id')}/delete`;
  }

  getNewUrl() {
    const name = this.resourceName;
    return `/admin/${name}s/new`;
  }

  getClientFetchPromise() {

    return new Promise((resolve, reject) => {

      const url = this.apiUrlRoot + '/' + this.get('id');

      $.ajax({
        url: url,
        type: 'get',
        success: (datum) => {
          this.set(datum);
          if (this.afterRead) {
            this.afterRead();
          }
          resolve(this);
        },
        error: (err) => {
          reject(err);
        }
      });

    });

  }

  getClientSavePromise() {

    if (this.beforeSave) {
			this.beforeSave()
		}

    this.set('created_at', new Date().toISOString())

    return new Promise((resolve, reject) => {

      const url = this.apiUrlRoot;

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'text',
        data: {jsonString: JSON.stringify(this.toJSON())},
        success: (datum) => {
          resolve(datum)
        },
        error: (err) => {
          reject(err)
        }
      });

    });

  }

  getClientUpdatePromise() {

    const model = this.clone();

    if (model.beforeSave) {
			model.beforeSave()
		}

    model.set('updated_at', new Date().toISOString())

    return new Promise((resolve, reject) => {

      const url = `${this.apiUrlRoot}/${this.get('id')}/edit`

      $.ajax({
        url: url,
        type: 'post',
        dataType: 'text',
        data: {jsonString: JSON.stringify(model.toJSON())},
        success: (datum) => {
          resolve(datum)
        },
        error: (err) => {
          reject(err)
        }
      })

    })

  }

  getClientDeletePromise() {

    return new Promise((resolve, reject) => {

      const url = `${this.apiUrlRoot}/${this.get('id')}`;

      $.ajax({
        url: url,
        type: 'delete',
        success: (datum) => {
          resolve(datum);
        },
        error: (err) => {
          reject(err);
        }
      });
    });
  }
}


export class Collection extends Backbone.Collection {

  get model() { return Model; }

  get dbCollectionName() {
    const name = this.model.prototype.resourceName;
    return `${name}s`;
  }

  get apiUrl() {
    const name = this.model.prototype.resourceName;
    return `/api/v1/${name}s`;
  }

  buildQueryString(query) {

    let queryString = '';

    if (!query || Object.keys(query).length === 0) { return null; }

    for (let key in query) {
      let value = query[key];
      queryString += `${key}=${value}&`;
    }

    return queryString.slice(0, -1);

  }

  buildFieldString(fields) {

    let fieldString = 'fields=';

    if (!fields || Object.keys(fields).length === 0) { return null; }

    for (let key in fields) {
      let value = fields[key];
      fieldString += `${ value === 1 ? '' : '-' }${key},`;
    }

    return fieldString.slice(0, -1);

  }

  getClientFetchPromise(query, fields) {

    const isCompleteQuery = (query && !fields);

    const queryString = '?' + (this.buildQueryString(query) || '') + '&' + (this.buildFieldString(fields) || '');

    return new Promise((resolve, reject) => {

      if (!isCompleteQuery) {

        // Small, seeded collections are resolved immediately.
        if (this.dbSeed) {
          this.reset(this.dbSeed);
          return resolve(this);
        }

        // Cached collections are resolved immediately.
        if (this.dbCache) {
          this.reset(this.dbCache);
          return resolve(this);
        }

      }

      const url = this.apiUrl + queryString;

      $.ajax({
        url: url,
        type: 'get',
        success: (data) => {
          // Set database cache.
          if (!isCompleteQuery) { this.dbCache = data }
          this.reset(data)
          if (this.comparator) {
            this.sort()
          }
          this.models.forEach((model) => {
            if (model.afterRead) {
              model.afterRead()
            }
          })
          resolve(this)
        },
        error: (err) => {
          reject(err)
        }
      });

    });

  }

}
