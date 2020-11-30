// Exercise 2.17 The Phonebook - Step 9

import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Get all persons from the phonebook server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Update the phonebook with a new person and number
const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

// Remove a person from the phonebook
const remove = id => axios.delete(`${baseUrl}/${id}`);

// Change number details of an exisiting person in the phonebook
const update = (id, updatedPerson) => {
  const request = axios.put(`${baseUrl}/${id}`, updatedPerson)
  return request.then(response => response.data)
}

export default { getAll, create, remove, update }

//---------------------------------------------------------------------------------------------------------

// Exercise 2.16 The Phonebook - Step 8

import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

// Get all persons from the phonebook server
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Update the phonebook with a new person and number
const create = personObject => {
  const request = axios.post(baseUrl, personObject)
  return request.then(response => response.data)
}

export default { getAll, create }
