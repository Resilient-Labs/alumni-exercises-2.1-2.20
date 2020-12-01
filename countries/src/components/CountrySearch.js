// Exercises 2.12 - 2.14 Data for countries - Step 1 - 3

import React from 'react';

const CountrySearch = ({country, setCountry}) => {
    return (
        <div>
            <label>Find countries: </label>
            <input 
              value={country} 
              onChange={event => setCountry(event.target.value)}
            />
        </div>
    );
};

export default CountrySearch;
