import React from "react";

function Person({ name, number, handleDelete }) {
  return (
    <>
      <li>
        {name} : {number}
      </li>
      <button onClick={handleDelete}>delete</button>
    </>
  );
}

export default Person;
