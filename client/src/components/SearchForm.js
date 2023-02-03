import React, { useState } from "react";
import { Input } from 'semantic-ui-react';

export default function SearchForm({ onSubmit }) {
  const [searchText, setSearchText] = useState('');
  
  const handleSubmit = e => {
    onSubmit(searchText);
  }

  const handleChange = e => {
    setSearchText(e.target.value);
  }

  return (
    <Input
      fluid
      action={{ icon: "search", onClick: handleSubmit, type: "button" }}
      placeholder="Search..."
      onChange={handleChange}
      value={searchText}
    />
  );
}