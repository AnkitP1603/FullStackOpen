import { useEffect, useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";
import phoneService from "./services/phoneService";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifType, setNotifType] = useState("");

  useEffect(() => {
    console.log("effect");
    phoneService.getAllPersons().then((res) => {
      console.log("promise fulfilled for getAllPersons");
      setPersons(res);
    });
  }, []);

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.trim().toLowerCase()),
  );

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("form submitted", event.target);

    const nameToAdd = newName.trim();
    if (nameToAdd === "") {
      setNotifType("error");
      setErrorMessage("Name cannot be empty");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
      return;
    }

    const exists = persons.some(
      (p) => p.name.toLowerCase() === nameToAdd.toLowerCase(),
    );

    if (exists) {
      const pos = window.confirm(
        `${nameToAdd} is already added to phonebook, replace the old number with a new one?`,
      );
      if (pos) {
        const personToUpdate = persons.find(
          (p) => p.name.toLowerCase() === nameToAdd.toLowerCase(),
        );
        const updatedPerson = { ...personToUpdate, number: newNumber.trim() };

        phoneService
          .updatePerson(updatedPerson)
          .then((res) => {
            setNotifType("success");
            setErrorMessage(`Updated ${res.name}'s number`);
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            setPersons(persons.map((p) => (p.id === res.id ? res : p)));
            setNewName("");
            setNewNumber("");
          })
          .catch((e) => {
            setNotifType("error");
            setErrorMessage(
              `error updating ${updatedPerson.name}'s number: ${e.response.data.error}`,
            );
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
            if (e.response.status === 404) {
              setPersons(persons.filter((p) => p.id !== updatedPerson.id));
            }
          });
      }

      return;
    }

    const newPerson = { name: nameToAdd, number: newNumber.trim() };

    phoneService
      .addNewPerson(newPerson)
      .then((res) => {
        setNotifType("success");
        setErrorMessage(`Added ${res.name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.concat(res));
        setNewName("");
        setNewNumber("");
      })
      .catch((error) => {
        console.log(error.response.data.error);
        setNotifType("error");
        setErrorMessage(error.response.data.error);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      });
  };

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    setFilter(event.target.value);
  };

  const handleDeletePerson = (id) => {
    const name = persons.find((p) => p.id === id).name;
    const pos = window.confirm(`Delete ${name} ?`);
    if (pos) {
      phoneService.deletePerson(id).then(() => {
        setNotifType("success");
        setErrorMessage(`Deleted ${name}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} type={notifType} />
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h2>Add a new</h2>
      <PersonForm
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
        handleFormSubmit={handleFormSubmit}
      />

      <h2>Numbers</h2>
      <Persons
        filteredPersons={filteredPersons}
        handleDeletePerson={handleDeletePerson}
      />

      {/* <div>debug: {newName}</div> */}
    </div>
  );
};

export default App;
