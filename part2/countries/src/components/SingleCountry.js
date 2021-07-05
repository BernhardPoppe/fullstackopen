import React from 'react'


const SingleCountry = ({country}) => {
  return(
    <div>
      <h1>
          {country.name}
      </h1>
      capital: {country.capital} <br/>
      population: {country.population}
      <ul>
          {country.languages.map(language =>
            <li key={language.name}>
                {language.name}
            </li>
          )}
      </ul>
      <img src={country.flag} style={{width: '200px'}} />
    </div>
  )
}

export default SingleCountry