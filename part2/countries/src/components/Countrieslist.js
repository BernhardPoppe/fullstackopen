import React from 'react'


const Countrieslist = ({countries, handleShowSingleCountry}) => {
  return(
    <ul>
      {countries.map(country => 
      	<li key={country.name}>
      		{country.name}	
      		<button onClick={() => handleShowSingleCountry(country.name)}>show</button>
      	</li>
      )}
     
    </ul>    
  )
}

export default Countrieslist