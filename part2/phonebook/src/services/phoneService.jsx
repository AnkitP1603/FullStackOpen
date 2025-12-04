import axios from "axios";

const getAllPersons = () => {
  const res = axios.get('http://localhost:3001/persons')
  return res.then(res => res.data)
}

const addNewPerson = (newPerson) => {
    const res = axios.post('http://localhost:3001/persons', newPerson)
    return res.then(res => res.data)
}

const deletePerson = (id) => {
    const res = axios.delete(`http://localhost:3001/persons/${id}`)
    return res.then(res => res.data)
}

const updatePerson = (updatedPerson) => {
    const res = axios.put(`http://localhost:3001/persons/${updatedPerson.id}`, updatedPerson)
    return res.then(res => res.data)
}

export default { getAllPersons, addNewPerson, deletePerson, updatePerson };