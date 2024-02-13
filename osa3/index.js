const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.static('dist'))
app.use(cors())
app.use(morgan('tiny'))

let persons = [
    {
      name: "Arto Hellas",
      number: "040-123456",
      id: 1
    },
    {
      name: "Ada Lovelace",
      number: "39-44-5323523",
      id: 2
    },
    {
      name: "Dan Abramov",
      number: "12-43-234345",
      id: 3
    },
    {
      name: "Mary Poppendieck",
      number: "39-23-6423122",
      id: 4
    }
  ]

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id)
  const person = persons.find(person => person.id === personId)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
  
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
  }
  
  if (persons.find(person => person.name === name)) {
    return res.status(409).json({
      error: 'Name must be unique!'
    })
  } 

  const person = {
    name: name,
    number: number,
    id: generateId()
  }

  persons = persons.concat(person)
  res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const personId = Number(req.params.id)
  persons = persons.filter(person => person.id !== personId)
  res.status(204).end()
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})