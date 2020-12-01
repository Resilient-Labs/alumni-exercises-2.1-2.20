// Exercise 2.13 Data for countries - Step 2

import React from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({country, countries, setCountry}) => {

 const countryFound = countries.filter(item => item.name.toLowerCase().includes(country.toLowerCase()));

  return (
    <div>
      {
        countryFound.length > 10 ?
        <p>Too many matches, specify another filter.</p>
        :
        countryFound.length === 1 ?
        <CountryDetails country={countryFound[0]} />
        :
        <ul>
          {
              countryFound.map(result => (
                  <li key={result.name}>
                       {result.name} <button onClick={()=>setCountry(result.name)}>Show</button>
                  </li>
              ))
          }
        </ul>
      }
    </div>
  )
}

export default CountryList;

// -----------------------------------------------------------------------------------------------

// Exercise 2.12 Data for countries - Step 1

import React from "react";
import CountryDetails from "./CountryDetails";

const CountryList = ({countries}) => {
  return (
    <div>
      {
        countries.length > 10 ?
        <p>Too many matches, specify another filter.</p>
        :
        countries.length === 1 ?
        <CountryDetails country={countries[0]} />
        :
        <ul>
          {
              countries.map(result => (
                  <li key={result.name}>
                       {result.name} 
                  </li>
              ))
          }
        </ul>
      }
    </div>
  )
}

export default CountryList;
