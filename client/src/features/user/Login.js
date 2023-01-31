import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from './userSlice';
import { Button } from '../../styled-components/Buttons';

const DEFAULT_FORM_DATA = {
  username: '',
  password: ''
};

export default function Login() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        if (res.ok) {
          // set current user
          res.json().then(userData => dispatch(login(userData)));
          setFormData(DEFAULT_FORM_DATA);
        } else {
          res.json().then(e => setErrors(e.errors));
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
      <Button
        as="input"
        type="submit"
        value="login"
      />
      <ul>
        {errorList}
      </ul>
      <div>
        <h5>
          Don't have an account?{' '}
          <Link to="/signup">create an account here</Link>!
        </h5>
      </div>
    </form>
  );
}