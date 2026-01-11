import React from "react";
import Person from "./Person";
import phoneService from "../services/phoneService";

function Persons({ filteredPersons, handleDeletePerson }) {
  return (
    <ul>
      {filteredPersons.map((person) => (
        <Person
          key={person.id}
          name={person.name}
          number={person.number}
          handleDelete={() => handleDeletePerson(person.id)}
        />
      ))}
    </ul>
  );
}

export default Persons;
