import React, { useState, useEffect } from 'react'
import Numbers from './components/Numbers'
import PersonForm from './components/PersonForm'
import numberService from './services/numberService'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    numberService
      .getAll()
      .then(initialPersonas => {
          setPersons(initialPersonas)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault()
      if (newName && newNumber) {
      const newNameObj = {"name": newName, "number": newNumber}
      

      /*Check if person is already in Phonebook.*/
      if (persons.find(person => person.name === newNameObj.name)) {
        alert(`${newNameObj.name} is already added to phonebook`)
      } else {

         numberService
          .create(newNameObj)
          .then(newPerson => {
              console.log(newPerson)
              setPersons(persons.concat(newPerson))
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

  const deleteNumberOf = (id) => {
    if (window.confirm("Do you really want to leave?")) {
       numberService
      .deleteNumber(id)
      .then(newPerson => {
                setPersons(persons.filter(n => n.id !== id))
      })
    }
   
  }


  const filteredPersons = searchInput
  ? persons.filter(person => person.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
  : persons

 /* so würde das genauso gehen:
  let filteredPersons = ""
  if (searchInput){
  	 filteredPersons = persons.filter(person => person.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
  } else {
  	 filteredPersons = persons
  }*/

  return (
    <div>
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