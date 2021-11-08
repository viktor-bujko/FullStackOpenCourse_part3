const express = require('express')
const app = express()
const cors = require('cors')
require('dotenv').config()
const Person = require('./models/person')
const morgan = require('morgan')

morgan.token('body', (request, _) => JSON.stringify(request.body))

app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))

const errorHandler = (error, request, response, next) => {
  console.error(`MY LOG: ${error.message}`)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}


app.get(
  '/api/persons',
  (request, response) => {
      Person
        .find({})
        .then(notes => {
          console.log('Found corresponding results')
          response.json(notes)
          console.log('Returned phonebook to the response')
        })
        .catch(error => {
          console.log('An error occured: ', error.message)
          response.status(500).send('<h1>Internal server error occured &ndash; data could not be fetched from the database.</h1>')
        })
  }
)

app.post(
  '/api/persons',
  (request, response, next) => {
      const newPerson = request.body

      if (newPerson === undefined) return response.status(400).json({ error: 'content missing'})

      if ((!newPerson.name || newPerson.name === '') 
          || (!newPerson.number || newPerson.number === '')) {
          response.status(403).json({ 'error': 'Either a name or number is missing.' })
          return
      }

      Person.find({ name: newPerson.name }).then(result => {
        if (result.length > 0) {
          response.status(403).json({ 'error': 'A person with given name already exists.'})
          return
        }
      })

      console.log('Adding a new person: ', newPerson)

      const person = new Person({ ...newPerson })

      person
        .save()
        .then(saved => {
          response.json(saved)
        })
        .catch(error => next(error))
  }
)

app.get( 
  '/api/persons/:id',
  (request, response, next) => {
      Person
        .findById(request.params.id)
        .then(phonebookEntry => {
          console.log('Found: ', phonebookEntry)
          if (phonebookEntry) {
            response.json(phonebookEntry)
          } else {
            response.status(404).end()
          }
        })
        .catch(error => next(error))
})

app.put(
  '/api/persons/:id', 
  (request, response, next) => {
    let updatedPerson = request.body

    Person
      .findOneAndUpdate(request.params.id, updatedPerson, { new: true })
      .then(updated => {
        console.log('Update successful: ', updated)
        response.json(updated)
      })
      .catch(error => {
        console.log('Something went wrong', error.message)
        next(error)
      })
})

app.delete(
  '/api/persons/:id',
  (request, response) => {

      Person
        .findByIdAndRemove(request.params.id)
        .then(result => {
          console.log('Deleted: ', result)
          response.status(204).end()
        })
        .catch(error => next(error))
  }
)

app.get('/', (request, response) => {
    response.send('<h1>Welcome to the phonebook.</h1>')
})

app.get(
    '/info',
    (request, response) => {

        Person.find({}).then(result => {
          const msg = `Phonebook has info for ${result.length} people\n`
          console.log(`Printing info: ${msg}`)

          response.send(
            `<div>
                ${msg}
                <br>
                ${new Date()}
            </div>`
        )
        })
    }
)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

// this has to be the last loaded middleware.
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
