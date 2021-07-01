import React, { useState } from 'react'


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
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

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