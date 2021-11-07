require('dotenv').config()
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI

console.log('Connecting to database...')

mongoose
    .connect(uri)
    .then(result => {
        console.log('connected to MongoDb')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    //returnedObject.number = returnedObject.phone
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
