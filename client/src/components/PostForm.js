import React, { useState } from 'react';

const DEFAULT_FORM_DATA = {
  body: ''
};

export default function PostForm({ onSubmit, startData }) {
  const [formData, setFormData] = useState(startData || DEFAULT_FORM_DATA);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Post Body</label>
      <textarea
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
      />
      <br />
      <input
        type="submit"
        value="Post"
      />
    </form>
  );
}