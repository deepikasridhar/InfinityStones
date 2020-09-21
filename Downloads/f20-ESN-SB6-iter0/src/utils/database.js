import 'dotenv/config'
import mongoose from 'mongoose'

const server = 'localhost:27017'
const database = 'test'

class Database {
  constructor() {
    this.connect()
  }

  connect() { // eslint-disable-line class-methods-use-this
    mongoose.connect(`mongodb://${server}/${database}`)
      .then(() => {
        console.log("database is" + database)
        console.log('Database connection successful')
      })
      .catch((err) => {
        console.error('Database connection error', err)
      })
  }
}

module.exports = new Database()
