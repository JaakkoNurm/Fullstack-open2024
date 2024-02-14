require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))


app.get('/api/persons', (req, res) => {
    Person
      .find({})
      .then(persons => {
      res.json(persons)
    })
})

app.get('/api/persons/:id', (req, res) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
  })
})

app.get('/info', (req, res) => {
    const currentDate = new Date()
    res.send(
        `<div>
            <p>Phonebook has info for ${persons.length} people</p>
            <p>${currentDate}</p>
        </div>`
    )
})

const generateId = () => {
  const randomId = Math.floor(Math.random()*10000)
  return randomId
}

app.post('/api/persons', (req, res) => {
  console.log("Request body: ", req.body)
  const { name, number } = req.body

  if (!name || !number) {
    return res.status(400).json({
      error: 'Name or number missing!'
    })
  } else {
    const person = new Person ({
      name: name,
      number: number,
      id: generateId()
    })
    person.save().then(savedPerson => {
      res.json(savedPerson)
    })
  }
})

app.delete('/api/persons/:id', (req, res) => {
  Person.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end()
		})
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})