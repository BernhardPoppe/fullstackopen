import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Countrieslist from './components/Countrieslist'
import SingleCountry from './components/SingleCountry'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ searchInput, setSearchInput ] = useState("")
  
  const handleSearchInput = (e) => {
    setSearchInput(e.target.value)
  }

  const countriesDisplay = searchInput
  ? countries.filter(country => country.name.toLowerCase().search(searchInput.toLowerCase()) !== -1)
  : countries;

  const singleCountry = countriesDisplay.length === 1
  const countryList = countriesDisplay.length <= 10


  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('countries loaded.')
        setCountries(response.data)
      })
  }, [])

  return (
    <div>
        find countries: 
        <input value={searchInput} onChange={handleSearchInput} />
        {
          singleCountry ? 
          <SingleCountry country={countriesDisplay[0]}/> :
            countryList ?
            <Countrieslist countries={countriesDisplay}/> :
            <div>Too many matches, specify another filter</div>
        }

    </div>
  )
  
}

export default App