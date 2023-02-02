import React, { useState } from "react";

export default function SearchForm({ onSubmit }) {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(searchText);
  }

  const handleChange = e => {
    setSearchText(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="search">Search: </label>
      <input
        type="text"
        id="search"
        value={searchText}
        onChange={handleChange}
      />
      <br />
      <input
        type="submit"
        value="search"
      />
    </form>
  );
}