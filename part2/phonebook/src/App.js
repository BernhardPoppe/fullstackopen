import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Numbers = ({persons}) => {
  return(
    <ul>
        {persons.map(contact => <Number key={contact.name} name={contact.name} number={contact.number}/>)}
    </ul>
  )
}
const Number = ({name, number}) => {
  return(
    <li>{name} {number}</li>
  )
}

const PersonForm = ({addName, handleNameChange, newName, handleNumberChange, newNumber}) => {
  return(
    <form onSubmit={addName}>
        <div>
          name: <input onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('personas loaded.')
        setPersons(response.data)
      })
  }, [])

  const addName = (event) => {
    event.preventDefault();
      if (newName && newNumber) {
      const newNameObj = {"name": newName, "number": newNumber}
      

      /*Check if person is already in Phonebook.*/
      persons.find(person => person.name === newNameObj.name)
      ? alert(`${newNameObj.name} is already added to phonebook`)
      : setPersons(persons.concat(newNameObj))

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
    setSearchInput(event.target.value);
  }


  const filteredPersons = searchInput
  ? persons.filter(person => person.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
  : persons;

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
      <Numbers persons={filteredPersons}/>
    </div>
  )
}

export default App