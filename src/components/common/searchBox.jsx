import React from "react";

const SearchBox = ({ value, onSearch }) => {
  return (
    <div className="input-group mb-3 custom-class">
      <input
        onChange={(e) => onSearch(e.currentTarget.value)}
        type="text"
        name="query"
        value={value}
        className="form-control"
        placeholder="Search Task..."
      />
    </div>
  );
};

export default SearchBox;
