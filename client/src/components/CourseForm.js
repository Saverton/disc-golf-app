import React, { useState, useCallback } from 'react';
import AddressField from './AddresField';

const DEFAULT_FORM_DATA = {
  name: '',
  address: '',
  num_holes: 18,
  description: ''
};

export default function CourseForm({ onSubmit }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  
  const updateState = useCallback((name, value) => {
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    updateState(name, value);
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Course Name</label>
      <input
        type="text"
        id="name"
        name="name"
        placeholder="Anson B. Nixon Park"
        required
        value={formData.name}
        onChange={handleChange}
      />
      <br />
      <AddressField onChange={updateState} />
      <br />
      <label htmlFor="num_holes">Number of Holes</label>
      <input
        type="number"
        id="num_holes"
        name="num_holes"
        placeholder="18"
        required
        min="1"
        value={formData.num_holes}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="description">Course Name</label>
      <textarea
        id="description"
        name="description"
        placeholder="Talk about layouts, terrain, obstacles, restrictions, etc..."
        required
        value={formData.description}
        onChange={handleChange}
      />
      <br />
      <input type="submit" value="Save" />
    </form>
  );
}