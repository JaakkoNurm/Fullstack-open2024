import { useState, useEffect } from 'react'
import Person from './components/Person'
import Notification from './components/Notifications'
import personService from './services/persons'


const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [notificationMsg, setNotificationMsg] = useState(null)

  useEffect(() => {
    personService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.some(person => person.name === personObject.name)) {
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      personService
        .create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
          })
      setNotificationMsg(
        `Added ${personObject.name}`
      )
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (id) => {
    console.log('Person with id ' + id + ' will be deleted')
    const deletedPerson = persons.find(p => p.id === id)
    const confirmDelete = window.confirm(`Do you really want to delete ${deletedPerson.name}?`)

    if (confirmDelete) {
      console.log(persons)
      personService
        .deletePerson(deletedPerson.id)
      setPersons(persons.filter(person => person.id !== id))
      setNotificationMsg(
        `Deleted ${deletedPerson.name}`
      )
      setTimeout(() => {
        setNotificationMsg(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    const inputValue = event.target.value
    
    if (/^[0-9-]*$/.test(inputValue)) {
      setNewNumber(inputValue);
    } else {
      alert('Please enter only numbers and dashes.');
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMsg}/>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number: <input 
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person
            key={person.id}
            person={person}
            deletePerson={deletePerson}
          />
        )}
      </ul>
    </div>
  )

}

export default App