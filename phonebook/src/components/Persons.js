// Exercise 2.17 The Phonebook - Step 9

import React from "react";

const Persons = ({persons, searchName, deletePerson}) => {
  return (
    persons.length ?
    <div>
      {
        persons.filter(person => person.name.toLowerCase().includes(searchName.toLowerCase()))
        .map(person => 
          <p key={person.name}>
            {person.name} {person.number}
            <button onClick={() => deletePerson(person.id, person.name)}>Delete</button>
          </p>)
      }
    </div>
    :
    <p>Loading contacts...</p>
  )
}

export default Persons;

// ------------------------------------------------------------------------------------------

// Exercise 2.11 The Phonebook - Step 6

import React from "react";

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Persons;

// ------------------------------------------------------------------------------------------

// Exercise 2.10 The Phonebook - Step 5

import React from "react";

const Persons = ({persons}) => {
  return (
    <div>
      {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
    </div>
  )
}

export default Persons;
