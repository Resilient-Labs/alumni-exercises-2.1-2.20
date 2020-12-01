// Exercise 2.20 The Phonebook - Step 12

import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ type, setType ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons);
      }, []);

  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchName(filtered)
    }
  
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };    
    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personService.update(existingPerson.id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        
        setMessage(`Updated ${newName}'s number`);
        setType('info')

        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        if(error){
          setMessage(`Information of ${newName} has already been deleted`);
          setPersons(persons.filter(person => person.id !== existingPerson.id));
          setTimeout(() => {
            setMessage(null);
          }, 5000);
        } else {
          setMessage(error.response.data.error)
        }

        setType('error');
      })
    } else{
      personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));

        setMessage(`Added ${newName}`);
        setType('info');

        setNewName('')
        setNewNumber('')
      })
      .catch(error => {
        console.log(error)
        setMessage(error.response.data.error);
        setType('error');
      });
    }
  };

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Deleted ${name}`);
        setType('info');
      })
    }
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        type={type}
        setMessage={setMessage}
        setType={setType}
      />

      <Filter
        searchName={searchName}
        setSearchName={setSearchName}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.19 The Phonebook - Step 11

import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import personService from './services/persons';
import Notification from './components/Notification';
import './index.css';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')
  const [ message, setMessage ] = useState('')
  const [ type, setType ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons);
      }, []);

  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchName(filtered)
    }
  
  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };    
    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personService.update(existingPerson.id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
        
        setMessage(`Updated ${newName}'s number`);
        setType('info')

        setNewName('')
        setNewNumber('')
      })
    } else{
      personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));

        setMessage(`Added ${newName}`);
        setType('info');

        setNewName('')
        setNewNumber('')
      })
    }
  };

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
        setMessage(`Deleted ${name}`);
        setType('info');
      })
    }
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Notification 
        message={message}
        type={type}
        setMessage={setMessage}
        setType={setType}
      />

      <Filter
        searchName={searchName}
        setSearchName={setSearchName}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App


//---------------------------------------------------------------------------------------------------------

// Exercise 2.18 The Phonebook - Step 10

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons);
      }, []);

  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchName(filtered)
  }

  const addPerson = (event) => {

    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };
    
    const existingPerson = persons.find(person => person.name === newName);

    if(existingPerson){
      window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      personService.update(existingPerson.id, personObject)
      .then(updatedPerson => {
        setPersons(persons.map(person => person.id === updatedPerson.id ? updatedPerson : person))
      })
    }
    else{
      personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson));
        setNewName('')
        setNewNumber('')
      })
    }
  };

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        setSearchName={setSearchName}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.17 The Phonebook - Step 9

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchName, setSearchName ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons);
      }, []);

  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  //noticed issues with the filtering component, passing the searchedName prop
  const handleNameSearch = (event) => {
    setSearchName(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(event.target.value.toLowerCase())
    )
    setSearchName(filtered)
  }

  const addPerson = (event) => {

    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };
    
    const existingPerson = persons.some(person => person.name === newName);

    if(existingPerson === false){
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }else{
      alert(`${newName} is already added to phonebook`);
    }
  };

  const deletePerson = (id, name) => {
    if(window.confirm(`Delete ${name}?`)){
      personService.remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
    }
  }

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        searchName={searchName}
        setSearchName={setSearchName}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
        searchName={searchName}
        deletePerson={deletePerson}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.16 The Phonebook - Step 8

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChars, setFilter ] = useState('')

  useEffect(() => {
    personService.getAll()
      .then(setPersons);
      }, []);

  
  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(filterChars.toLocaleLowerCase())
    )
    setPersons(filtered)
  }

  const addPerson = (event) => {

    event.preventDefault();

    const personObject = {
      name: newName,
      number: newNumber
    };
    
    const existingPerson = persons.some(person => person.name === newName);

    if(existingPerson === false){
      personService.create(personObject)
      .then(response => {
        setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')
      })
    }else{
      alert(`${newName} is already added to phonebook`);
    }
  
  };

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange} 
        filterChars={filterChars}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.15 The Phonebook - Step 7

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChars, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(filterChars.toLocaleLowerCase())
    )
    setPersons(filtered)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber
    };
    
    const existingPerson = persons.some(person => person.name === newName);

   if(existingPerson === false){
     setPersons(persons.concat(personObject))
     axios
     .post('http://localhost:3001/persons', personObject)
     .then(response => {
       setPersons(persons.concat(response.data))
       setNewName('')
       setNewNumber('')
     })
   }else{
     alert(`${newName} is already added to phonebook`);
   }

  };

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange} 
        filterChars={filterChars}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.11 The Phonebook - Step 6

import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChars, setFilter ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(filterChars.toLocaleLowerCase())
    )
    setPersons(filtered)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber
    };
    const existingPerson = persons.some(person => person.name === newName);
    existingPerson === false ? setPersons(persons.concat(newPerson)) : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange} 
        filterChars={filterChars}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />

    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.10 The Phonebook - Step 5

import React, { useState } from 'react' 
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Roger Cruz', phone: '050-7654321'},
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChars, setFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(filterChars.toLocaleLowerCase())
    )
    setPersons(filtered)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newNumber
    };
    const existingPerson = persons.some(person => person.name === newName);
    existingPerson === false ? setPersons(persons.concat(newPerson)) : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      
      <h2>Phonebook</h2>
      <Filter
        handleFilterChange={handleFilterChange} 
        filterChars={filterChars}
      />

      <h2>add a new</h2>
      <PersonForm
        addPerson={addPerson} 
        handleNameChange={handleNameChange}
        newName={newName} 
        handleNumberChange={handleNumberChange}
        newNumber={newNumber}
      />

      <h2>Numbers</h2>
      <Persons 
        persons={persons}
      />

    </div>
  )
}

export default App


//---------------------------------------------------------------------------------------------------------

// Exercise 2.9 The Phonebook - Step 4

import React, { useState } from 'react' 

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Roger Cruz', phone: '050-7654321'},
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterChars, setFilter ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    const filtered = persons.filter((person) => 
      person.name.toLowerCase().includes(filterChars.toLocaleLowerCase())
    )
    setPersons(filtered)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newNumber
    };
    const existingPerson = persons.some(person => person.name === newName);
    existingPerson === false ? setPersons(persons.concat(newPerson)) : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>filter shown with <input type="text" onChange={handleFilterChange} value={filterChars}></input></div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>name:<input type="text" onChange={handleNameChange} value={newName}/></div>
        <div>number:<input type="text" onChange={handleNumberChange} value={newNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
      </div>
    </div>
  )
}

export default App


//---------------------------------------------------------------------------------------------------------

// Exercise 2.8 The Phonebook - Step 3

import React, { useState } from 'react' 

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
      phone: '040-1234567'
    },
    { name: 'Roger Cruz',
      phone: '050-7654321'
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      phone: newNumber
    };
    const existingPerson = persons.some(person => person.name === newName);
    existingPerson === false ? setPersons(persons.concat(newPerson)) : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>name:<input type="text" onChange={handleNameChange} value={newName}/></div>
        <div>number:<input type="text" onChange={handleNumberChange} value={newNumber}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.phone}</p>)}
      </div>
    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.7 The Phonebook - Step 2

import React, { useState } from 'react' 

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    const existingPerson = persons.some(person => person.name === newName);
    existingPerson === false ? setPersons(persons.concat(newPerson)) : alert(`${newName} is already added to phonebook`);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App

//---------------------------------------------------------------------------------------------------------

// Exercise 2.6 The Phonebook - Step 1

import React, { useState } from 'react' 

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' },
    { name: 'Ada Lovelace'}
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName
    };
    setPersons(persons.concat(newPerson))
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input type="text" onChange={handleNameChange} value={newName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name}</p>)}
      </div>
    </div>
  )
}

export default App
