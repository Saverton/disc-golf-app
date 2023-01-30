import React, { useState } from 'react';

const DEFAULT_FORM_DATA = {
  username: '',
  password: '',
  password_confirmation: '',
  email: '',
  first_name: '',
  last_name: '',
  zip_code: ''
};

export default function Signup() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          // set current user
          res.json().then(console.log);
          setFormData(DEFAULT_FORM_DATA);
        } else {
          res.json().then(setErrors);
        }
      });
  }

  const errorList = errors.map(e => <li>{e}</li>);

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={formData.username}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="password">password</label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="password_confirmation">password confirmation</label>
      <input
        type="password"
        id="password_confirmation"
        name="password_confirmation"
        value={formData.password_confirmation}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="first_name">first name</label>
      <input
        type="text"
        id="first_name"
        name="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="last_name">last name</label>
      <input
        type="text"
        id="last_name"
        name="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="email">email</label>
      <input
        type="text"
        id="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="zip_code">zip code</label>
      <input
        type="text"
        id="zip_code"
        name="zip_code"
        value={formData.zip_code}
        onChange={handleChange}
      />
      <br />
      <input
        type="submit"
        value="sign up"
      />
      <ul>
        {errorList}
      </ul>
    </form>
  );
}