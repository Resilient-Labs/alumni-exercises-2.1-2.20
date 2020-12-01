// Exercise 2.17 The Phonebook - Step 9

import React from "react";

const Filter = ({setSearchName, searchName}) => {
  return (
    <div>
      filter shown with
      <input 
        type="text" 
        onChange={event => setSearchName(event.target.value)} 
        value={searchName}
        ></input>
    </div>
  )
}

export default Filter;

// ----------------------------------------------------------------------

// Exercise 2.10 The Phonebook - Step 5

import React from "react";

const Filter = ({handleFilterChange, filterChars}) => {
  return (
    <form>
    <div>filter shown with 
      <input 
        type="text" 
        onChange={handleFilterChange} 
        value={filterChars}
        >
      </input>
    </div>
    </form>
  )
}

export default Filter;
