// Do not bundle!
import Backbone from 'backbone'

import dbConnector from './../../db/connector.js'

const adminEmails = [
  'communications',
  'szerzo',
  'vanderlinde',
  'elkin',
  'fuzz',
  'zalatoris',
  'murphy',
  'hairston',
  'lawson',
  'richardett',
  'calabresee',
  'novamartinez'
].map((email) => { return `${email}@newamerica.org` })

export class Model extends Backbone.Model {

  get resourceName () { return 'user' }

  isDomainAuthorized () {
    return ([ 'newamerica.org', 'opentechinstitute.org' ].indexOf(this.get('domain')) > -1)
  }

  isAdmin () {
    const email = this.get('emails')[0].value
    return (adminEmails.indexOf(email) > 0)
  }

  parse (raw) {
    if (raw._id) {
      raw.id = raw._id
      delete raw._id
    }
    return raw
  }

  toMongoJSON () {
    let json = this.toJSON()
    json._id = json.id
    delete json.id
    return json
  }

  toSessionJSON () {
    return {
      id: this.get('id'),
      accessToken: this.get('accessToken')
    }
  }

  toClientJSON () {
    return {
      displayName: this.get('displayName'),
      name: this.get('name'),
      image: this.get('image'),
      emails: this.get('emails'),
      isAdmin: this.isAdmin()
    }
  }

  getSavePromise () {
    return new Promise((resolve, reject) => {
      dbConnector.then((db) => {
        const collection = db.collection('intranet_users')
        collection.update({
          _id: this.get('id')
        }, this.toMongoJSON(), {
          upsert: true
        }, (err, json) => {
          console.log('user saved successfully')
          if (err) { return reject(err) }
          resolve(this)
        })
      }).catch((err) => { reject(err.stack) })
    })
  }

  getRetrievePromise () {
    return new Promise((resolve, reject) => {
      dbConnector.then((db) => {
        const collection = db.collection('intranet_users')
        const cursor = collection.find({ _id: this.get('id') })

        cursor.toArray((err, json) => {
          if (err) { return reject(err) }
          this.set(this.parse(json[0]))
          resolve(this)
        })
      }).catch((err) => { reject(err.stack) })
    })
  }

}

export class Collection extends Backbone.Collection {

  get model () { return Model }

}
