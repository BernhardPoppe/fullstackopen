import React from 'react'


const Countrieslist = ({countries}) => {
  return(
    <ul>
      {countries.map(country => <li key={country.name}>{country.name}</li>)}
    </ul>    
  )
}

export default Countrieslist