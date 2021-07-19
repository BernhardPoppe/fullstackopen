import React from 'react'

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

const Number = ({name, number}) => {
  return(
    <li>{name} {number}</li>
  )
}


const Numbers = ({persons}) => {
  return(
    <ul>
        {persons.map(contact => <Number key={contact.name} name={contact.name} number={contact.number}/>)}
    </ul>
  )
}

export default Numbers
