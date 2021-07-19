import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'


import numberService from './services/numberService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')
  const [ notification, setNotification ] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersonas => {
          setPersons(initialPersonas)
      })
      .catch(error => {
          setNotification({
            'message': `Error!`,
            'type': 'error'
          })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
  }, [])

  const addName = (event) => {
    event.preventDefault()
      if (newName && newNumber)
      {
        const newNameObj = {"name": newName, "number": newNumber}

        /*Check if person is already in Phonebook.*/
        if (persons.find(person => person.name === newNameObj.name)) {
          
          const personToUpdate = persons.find(person => person.name === newNameObj.name)
          
          if (window.confirm(`${newNameObj.name} is already added to phonebook, replace the old number with a new one?`)) {
              //setPersons(persons.map(person => person.name !== newNameObj.name ? person : newNameObj))
              numberService
              .update(newNameObj, personToUpdate.id)
              .then((updatedPerson) => {
                setPersons(persons.map(person => person.name !== updatedPerson.name ? person : updatedPerson))
                setNotification({
                  'message': `Changed ${newNameObj.name}`,
                  'type': 'success'
                })
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
              .catch(error => {
                setNotification({
                  'message': `Information of ${newNameObj.name} has already been removed from server!`,
                  'type': 'error'
                })
                setTimeout(() => {
                  setNotification(null)
                }, 5000)
              })
          }
        } else {

         numberService
          .create(newNameObj)
          .then(newPerson => {
              console.log(newPerson)
              setPersons(persons.concat(newPerson))

              setNotification({
                'message': `Added ${newPerson.name}`,
                'type': 'success'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000)

          })
          .catch(error => {
              setNotification({
                'message': `Error!`,
                'type': 'error'
              })
              setTimeout(() => {
                setNotification(null)
              }, 5000)
          })
      }

      //Reset Input Forumlar.
      setNewName('')
      setNewNumber('')
    }
    
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

   const handleSearchInput = (event) => {
    setSearchInput(event.target.value)
  }

  const deleteNumberOf = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
       numberService
      .deleteNumber(person.id)
      .then(newPerson => {
        setPersons(persons.filter(n => n.id !== person.id))
      })
      .catch(error => {
        setNotification({
          'message': `Error!`,
          'type': 'error'
        })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    }
  }

  const filteredPersons = searchInput
  ? persons.filter(person => person.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
  : persons

  return (
    <div>
      <Notification notification={notification} />
      <h2>Phonebook</h2>
        <div>
          filter shown with <input value={searchInput} onChange={handleSearchInput}/>
        </div>
      <h2>add a new</h2>
       <PersonForm
        addName={addName}
        handleNameChange={handleNameChange}
        newName={newName}
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
       />
      <h2>Numbers</h2>
      <Numbers persons={filteredPersons} deleteNumberOf={deleteNumberOf} />
    </div>
  )
}

export default App