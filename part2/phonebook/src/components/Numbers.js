import React from 'react'

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
