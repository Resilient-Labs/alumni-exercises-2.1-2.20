// helper functions for communicating with the server using axios
import axios from 'axios';
const baseUrl = '/api/persons';

// get all persons in phonebook
const getAll = () => (
    axios
        .get(baseUrl)
        .then(response => response.data)
);

// add person to phonebook
const create = (name, number) => (
    axios
        .post(baseUrl, {name, number})
        .then(response => response.data)
);

// remove a person from phonebook
const remove = id => axios.delete(`${baseUrl}/${id}`);

// update phone number of existing person
const update = (id, updatedPerson) => (
    axios
        .put(`${baseUrl}/${id}`, updatedPerson)
        .then(response => response.data)
);

export default {getAll, create, remove, update};