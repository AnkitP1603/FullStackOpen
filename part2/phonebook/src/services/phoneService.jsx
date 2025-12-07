import axios from "axios";
const baseUrl = '/api/persons';

const getAllPersons = () => {
  const res = axios.get(`${baseUrl}`)
  return res.then(res => res.data)
}

const addNewPerson = (newPerson) => {
    const res = axios.post(`${baseUrl}`, newPerson)
    return res.then(res => res.data)
}

const deletePerson = (id) => {
    const res = axios.delete(`${baseUrl}/${id}`)
    return res.then(res => res.data)
}

const updatePerson = (updatedPerson) => {
    const res = axios.put(`${baseUrl}/${updatedPerson.id}`, updatedPerson)
    return res.then(res => res.data)
}

export default { getAllPersons, addNewPerson, deletePerson, updatePerson };