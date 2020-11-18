import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
    const [ countries, setCountry ] = useState([])
    const [ weather, setWeather ] = useState([])
    const [ newSearch, setNewSearch] = useState('')

    var matchingCountries = countries.filter(country => country.name.toLowerCase().includes(newSearch))
    var matches = matchingCountries.length
    var display = []
    var countryInfo = {}
    var oneMatch = false

    const hook = () => {
        axios
          .get(`https://restcountries.eu/rest/v2/`)
          .then(response => {
            setCountry(response.data)
          })
      }

    useEffect(hook, [])

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
    }

    const handleButtonClick = (e) => {
      setNewSearch(e.target.value.toLowerCase())
      var capital = (matchingCountries[0].capital)
      axios
        .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${capital}`)
        .then(response => {
          setWeather(response.data.current)
        })
    }

    if(matches === 1){
      var country = matchingCountries[0]
      display.push(country.name)
      oneMatch = true

      countryInfo = {
        name: country.name,
        languages:country.languages, 
        flag: country.flag, 
        capital: country.capital, 
        population: country.population
      }  
    } else if(matches > 1 && matches <= 10){
        matchingCountries.map(country => display.push(country.name))
        oneMatch = false
    } else if(matches === 0){
        display.push('No matches found')
        oneMatch = false
    } else if(matches > 10){
        display.push('Too many matches, please specify')
        oneMatch = false
    }

    return(
        <div>
            find countries: <input value={newSearch} onChange={handleSearchChange}/>
  
            <h2>Matches:</h2>
            <ul>
              {
                newSearch !== ''
              ? display.map(country => {
                  return(
                  <li key={country}>{country} 
                    {country === 'Too many matches, please specify' || country === 'No matches found' 
                    ? '' 
                    : <button value={country} onClick={handleButtonClick}>show</button>
                    }
                  </li>
                  )
                })
                : 'Please start typing to search'
              }
            </ul>
              {
                oneMatch === true
                ? <div>
                    <h1>{countryInfo.name}</h1>
                    <p>Capital: {countryInfo.capital}</p> 
                    <p>Population: {countryInfo.population}</p>
                    <h2>Languages:</h2>
                    <ul>
                      {countryInfo.languages.map(language => <li key={language.name}>{language.name}</li>)}
                    </ul>
                    <img src={countryInfo.flag} alt="country's flag" width={150} height={100}/>
                    <br />
                    <h3>Weather in {countryInfo.capital}</h3>
                    <h4>temperature:</h4><span>{weather.temperature}°Celcius</span>
                    <br />
                    <img src={weather.weather_icons} alt={weather.weather_descriptions} width={75} height={75}/>
                    <h4>wind:</h4><span>{weather.wind_speed} mph direction {weather.wind_dir}</span>
                  </div>
                : ''
              } 
        </div>
    )
}

export default App

