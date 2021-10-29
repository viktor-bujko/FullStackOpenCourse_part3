const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

morgan.token('body', (request, _) => JSON.stringify(request.body))

app.use(cors())
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] :response-time ms :body'))
app.use(express.static('build'))

let phonebook = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send('<h1>Welcome to the phonebook.</h1>')
})

app.get(
    '/api/persons',
    (request, response) => {
        response.json(phonebook)
        console.log('Returned phonebook to the response')
    }
)

app.get( 
    '/api/persons/:id',
    (request, response) => {
        const id = Number(request.params.id)

        const phonebookEntry = phonebook.find(person => person.id === id)

        if (phonebookEntry) response.json(phonebookEntry)
        else response.status(404).send('<h1>404 - Not Found</h1><div>Given person was not found in the phonebook.</div>')
    }
)

app.get(
    '/info',
    (request, response) => {
        const msg = `Phonebook has info for ${phonebook.length} people\n`
        console.log(`Printing info: ${msg}`)

        response.send(
            `<div>
                ${msg}
                <br>
                ${new Date()}
            </div>`
        )
    }
)

app.delete(
    '/api/persons/:id',
    (request, response) => {
        const id = Number(request.params.id)

        phonebook = phonebook.filter(person => person.id !== id)

        response.status(204).end()
    }
)

const generateId = () => {
    let foundId = 0
    do {
        newId = Math.floor(Math.random() * 10_000)
        foundId = phonebook.find(person => person.id === newId)
    } while (foundId !== undefined)

    return newId
}

app.post(
    '/api/persons',
    (request, response) => {
        const newPerson = request.body

        if ((!newPerson.name || newPerson.name === '') 
            || (!newPerson.number || newPerson.number === '')) {
            response.status(403).json({
                'error': 'Either a name or number is missing.'
            })
            return
        }

        if (phonebook.find(person => person.name === newPerson.name) !== undefined) {
            response.status(403).json({
                'error': 'A person with given name already exists.'
            })
            return
        }

        console.log('Adding a new person: ', newPerson)
        phonebook = phonebook.concat({
            id: generateId(), 
            ...newPerson
        })

        response.json(newPerson)
    }
)



const PORT = 3001

app.listen(PORT)
console.log(`Started a server on port ${PORT}`)
