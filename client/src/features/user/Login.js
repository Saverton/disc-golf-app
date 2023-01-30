import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from './userSlice';

const DEFAULT_FORM_DATA = {
  username: '',
  password: ''
};

export default function Login() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

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

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          dispatch(logout());
        } else {
          res.json().then(console.log);
        }
      })
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
      <input
        type="submit"
        value="login"
      />
      <ul>
        {errorList}
      </ul>
      {
        currentUser.id ? <button onClick={handleLogout}>logout</button> : null
      }
    </form>
  );
}