import React from 'react'

const Number = ({name, number, deleteNumber}) => {
  return(
    <li>{name} {number}
    <button onClick={deleteNumber}>delete</button>
    </li>
  )
}


const Numbers = ({persons, deleteNumberOf}) => {

  return(
    <ul>
        {persons.map(person => 
            <Number
              deleteNumber={() => deleteNumberOf(person)}
              key={person.name}
              name={person.name}
              number={person.number}
            />)}
    </ul>
  )
}

export default Numbers