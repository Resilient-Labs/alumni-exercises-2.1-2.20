// Exercise 2.10 The Phonebook - Step 5

import React from "react";

const PersonForm = ({addPerson, handleNameChange, newName, handleNumberChange, newNumber}) => {
  return (
    <form 
      onSubmit={addPerson}>
      <div>name:
        <input 
          type="text" 
          onChange={handleNameChange} 
          value={newName}
        />
      </div>
      <div>number:
        <input 
          type="text" 
          onChange={handleNumberChange} 
          value={newNumber}
        />
      </div>
      <div>
        <button 
          type="submit">add
        </button>
      </div>
    </form>
  )
}

export default PersonForm;
