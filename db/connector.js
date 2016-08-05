import { MongoClient } from 'mongodb'

export default new Promise((resolve, reject) => {

  const { MONGODB_URI } = process.env

  MongoClient.connect(MONGODB_URI, (err, db) => {
    if (err) {
      console.log('Unable to connect to the database.')
      return reject(err)
    }
    console.log('Successfully connected to database.')
    resolve(db)
  })

})
