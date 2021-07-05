import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SingleCountry = ({country}) => {
  /*http://api.weatherstack.com/current?access_key=878a22fa69033eb37362c003381fbe25&query=Vienna*/
  const api_key = process.env.REACT_APP_API_KEY

  const [ weatherData, setWeatherData ] = useState([])
  
  useEffect(() => {
    console.log('effect')
    axios
      .get(`http://api.weatherstack.com/current?access_key=878a22fa69033eb37362c003381fbe25&query=${country.capital}`)
      .then(response => {
        console.log('Weather loaded.')
        setWeatherData(response.data)
      })
  }, [])

  console.log(weatherData.current.temperature);

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
      <h1>
        Weather in {country.capital}
      </h1>
       <p><b>temperature: </b>{weatherData.current.temperature} Celsius</p><br/>
       <img src={weatherData.current.weather_icons[0]} style={{width: '100px'}} /><br/>
       <p><b>wind: {weatherData.current.temperature}</b></p>
    </div>
  )
}

export default SingleCountry