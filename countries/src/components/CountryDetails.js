// Exercise 2.14 Data for countries - Step 3

import React from 'react';
import CountryWeather from './CountryWeather';

const CountryDetails = ({country}) => {
    return (
        <>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
              {
                country.languages.map(language => <li key={language.name}>{language.name}</li>)
              }
          </ul>
          <img src={country.flag} style={{width: 200, height: 200}} />
          <CountryWeather country={country}/>
        </>
    );
};

export default CountryDetails;


// -----------------------------------------------------------------------------------------------

// Exercise 2.12 Data for countries - Step 1

import React from 'react';

const CountryDetails = ({country}) => {
    return (
        <>
          <h1>{country.name}</h1>
          <p>Capital: {country.capital}</p>
          <p>Population: {country.population}</p>
          <h2>Languages</h2>
          <ul>
              {
                country.languages.map(language => <li key={language.name}>{language.name}</li>)
              }
          </ul>
          <img src={country.flag} alt='Flag' style={{width: 200, height: 200}} />
        </>
    );
};

export default CountryDetails;
