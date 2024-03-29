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


app.get('/api/persons', (req, res, next) => {
  Person
    .find({})
    .then(persons => {
    res.json(persons)
  })
    .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person
    .findById(req.params.id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
  })
    .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  const date = new Date()
	Person
		.find({})
		.then(result => {
			res.send(
				`<div>
            <p>Phonebook has info for ${result.length} persons</p>
            <p>${date}</p>
        </div>`
			)
		})
    .catch(error => next(error))
})

const generateId = () => {
  const randomId = Math.floor(Math.random()*10000)
  return randomId
}

app.post('/api/persons', (req, res, next) => {
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
      .catch(error => next(error))
  }
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndDelete(req.params.id)
		.then(() => {
			res.status(204).end()
		})
    .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})