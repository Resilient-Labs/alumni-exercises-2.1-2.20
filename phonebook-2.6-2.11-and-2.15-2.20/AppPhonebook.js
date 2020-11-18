import React, { useState, useEffect } from 'react'
import FilterName from './components/FilterName'
import Notification from './components/Notification'
import Person from './components/Person'
import phoneService from './services/phonebook.js'
import './index.css'


const AppPhonebook = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName] = useState('')
    const [ newNumber, setNewNumber] = useState('')
    const [ newSearch, setNewSearch] = useState('')
    const [showAll, setShowAll] = useState(true)
    const [notificationMessage, setNotification] = useState(null)


    useEffect(() => {
        phoneService
          .getAll()
          .then(initialEntries => {
            setPersons(initialEntries)
          })
      }, [])

    const peopleToShow = showAll
    ? persons
    : persons.filter(person => {
        var fullName = person.name.toLowerCase().split(' ').join('')
        return fullName.includes(newSearch)
    })

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearchChange = (event) => {
        setNewSearch(event.target.value)
        if(event.target.value){
            setShowAll(!setShowAll)
        } else {
            setShowAll(setShowAll)
        }
    }

    const addPerson = (event) => {
        event.preventDefault()  
        var existingContact = persons.find(person => person.name === newName)
        const changedNumber = { ...existingContact, number: newNumber }

        if(existingContact){
            if (window.confirm(`${existingContact.name} is already added to phonebook, replace the old number with a new one?`)) { 
                phoneService
                    .update(existingContact.id, changedNumber)
                    .then(() => {
                        setNotification(
                            `${existingContact.name}'s number shifted forms!`
                          )
                          setTimeout(() => {
                            setNotification(null)
                          }, 5000)
                        setPersons(persons.map(person => person.name === existingContact.name ? changedNumber : person))
                    })
              }
        } else {
            const personObject= {
                name: newName,
                number: newNumber
            }
            phoneService
                .create(personObject)
                .then(returnedPerson => {
                    setNotification(
                        `A star was born: ${returnedPerson.name}!`
                      )
                      setTimeout(() => {
                        setNotification(null)
                      }, 5000)
                    setPersons(persons.concat(returnedPerson))
            })
        }

        setNewName('')
        setNewNumber('')
    }

    const handleDeletePerson = (event) => {
        var arr = event.target.value.split(',')
        const id = arr[0]
        const name = arr[1]
        if (window.confirm(`Delete ${name}?`)) { 
            phoneService
                .deletePerson(id)
                .then(() => {
                    setNotification(
                        `${name} flew alway from this multiverse`
                      )
                      setTimeout(() => {
                        setNotification(null)
                      }, 5000)
                    phoneService
                        .getAll()
                        .then(updatedEntries => {
                        setPersons(updatedEntries)
                        })
                })
          }  
    }

    return(
        <div>
            <h1>Intergalactic Phonebook</h1>
            <Notification message={notificationMessage} />

            <FilterName value={newSearch} onChange={handleSearchChange}/>
            <h2>Add New or Change Number</h2>
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                    <br />
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <ul>
                {peopleToShow.map(person => 
                    <div key={person.name} >
                        <Person name={person.name} number={person.number} id={person.id}/>
                        <button value ={[person.id, person.name]} onClick={handleDeletePerson}>delete</button>
                    </div>
                )}
            </ul>
            
        </div>
    )
}

export default AppPhonebook