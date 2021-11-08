require('dotenv').config()
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const uri = process.env.MONGODB_URI

console.log('Connecting to database...')

if (uri === undefined) {
  console.log('URI is not defined!')
  process.exit(1)
}

mongoose
    .connect(uri)
    .then(result => {
        console.log('connected to MongoDb')
    })
    .catch(error => {
        console.log('Error connecting to MongoDB: ', error.message)
    })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    required: true
  },
  number: {
    type: String,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    //returnedObject.number = returnedObject.phone
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
