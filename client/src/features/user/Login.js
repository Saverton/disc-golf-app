import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from './userSlice';
import { Button, Input, Form } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  username: '',
  password: ''
};

export default function Login() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
      .then(res => {
        setLoading(false);
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
    <>
      <Form
        onSubmit={handleSubmit}
        loading={loading}
        size="large"
      >
        <Form.Field
          control={Input}
          label="Username"
          name="username"
          placeholder="username"
          value={formData.username}
          onChange={handleChange}
        />
        <Form.Field
          control={Input}
          label="Password"
          type="password"
          name="password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
        />
        <Button type="submit" >Login</Button>
        <ul>
          {errorList}
        </ul>
      </Form>
      <div>
        <h5>
          Don't have an account?{' '}
          <Link to="/signup">create an account here</Link>!
        </h5>
      </div>
    </>
  );
}