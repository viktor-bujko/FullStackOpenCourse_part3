const mongoose = require('mongoose')

const useMongoose = true

if (process.argv.length < 3) {
    console.log('Please provide the password as an argument: node mongo.js <password>')
    console.log(process.argv)
    process.exit(1)
}

const password = process.argv[2]

const url = process.env.MONGODB_URI

mongoose.connect(url)

const noteSchema = new mongoose.Schema({
    content: String,
    date: Date, 
    important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

const note = new Note({
    content: 'Second note to be stored in DB',
    date: new Date(),
    important: false,
})

/*note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
})*/
Note.find({ important: true }).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})