const mongoose = require("mongoose")
const Person = require("./models/person")

function check_args() {
  if (process.argv.length <= 2) {
    console.log("Too few arguments!")
    console.log("Usage: ")
    console.log("   To add a new person: node phonebook.js <your_db_password> <name_to_add> <phone_number_to_add>")
    console.log("   To show all people : node phonebook.js <your_db_password>")
    process.exit(0)
  }

  // >= 3 below

  if (process.argv.length === 3) return printDataFromDB

  // >= 4 below

  if (process.argv.length !== 5) return

  return addPersonToDB
}

function addPersonToDB() {

  const name = process.argv[3]
  const number = process.argv[4]

  console.log(`Adding ${name} to phonebook ...`)

  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected")
      const newPerson = new Person({
        name: name,
        number: number
      })
      newPerson.save().then(() => {
        console.log(`Added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
      })
    })
}

function printDataFromDB() {
  console.log("Fetching all users from the database ...")
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("Connected successfully.")
      Person.find({}).then(people => {
        console.log("phonebook:")
        people.forEach(person => {
          console.log(`   ${person.name} ${person.number}`)
        })
        console.log("done!")
        mongoose.connection.close()
      })
    })
    .catch(error => {
      console.log("An error occured: ", error)
      return
    })
}


const callback = check_args()

callback()
