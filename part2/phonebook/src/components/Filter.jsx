import React from "react";

function Filter({ filter, handleFilterChange }) {
  return (
    <form>
      <div>
        filter shown with:{" "}
        <input value={filter} onChange={handleFilterChange} />
      </div>
    </form>
  );
}

export default Filter;
