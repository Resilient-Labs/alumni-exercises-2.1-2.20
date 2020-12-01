// Exercise 2.13 - 2.14 Data for countries - Step 2 - 3

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CountryList from './components/CountryList';
import CountrySearch from './components/CountrySearch';

const App = () => {
  // List of all countries
  const [countries, setCountries] = useState([]);

  // Country being searched
  const [country, setCountry] = useState('');

  // REST API call to fetch data
  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => setCountries(response.data));
  }, []);

  return (
    <div>
      {
        countries.length ?
        <>
          <CountrySearch 
            country={country} 
            setCountry={setCountry} 
          />
          { country && <CountryList 
                          country={country} 
                          countries={countries} 
                          setCountry={setCountry} /> 
          }
        </>
        :
        <p>Loading application...</p>
      }
    </div>
  );
};

export default App;

//---------------------------------------------------------------------------------------------------------

// Exercise 2.12 Data for countries - Step 1

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import CountryList from './components/CountryList'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ filterChars, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])


  return (
    <div>


    </div>
  )
}

export default App
