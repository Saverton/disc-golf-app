import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Input } from 'semantic-ui-react';

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

  const getErrors = name => (
    errors[name]?.length > 0
    ? {
      content: errors[name].join(', ')
    }
    : false
  );

  return (
    <Form onSubmit={handleSubmit} size="large">
      <Form.Field
        control={Input}
        name="username"
        label="Username"
        placeholder="username"
        value={formData.username}
        onChange={handleChange}
        error={getErrors('username')}
      />
      <Form.Group unstackable widths={2}>
        <Form.Field
          control={Input}
          name="password"
          label="Password"
          placeholder="password"
          value={formData.password}
          onChange={handleChange}
          error={getErrors('password')}
        />
        <Form.Field
          control={Input}
          name="password_confirmation"
          label="Password Confirmation"
          placeholder="password"
          value={formData.password_confirmation}
          onChange={handleChange}
          error={getErrors('password_confirmation')}
        />
      </Form.Group>
      <Form.Group unstackable widths={2}>
        <Form.Field
          control={Input}
          name="first_name"
          label="First Name"
          placeholder="John"
          value={formData.first_name}
          onChange={handleChange}
          error={getErrors('first_name')}
        />
        <Form.Field
          control={Input}
          name="last_name"
          label="Last Name"
          placeholder="Smith"
          value={formData.last_name}
          onChange={handleChange}
          error={getErrors('last_name')}
        />
      </Form.Group>
      <Form.Field
        control={Input}
        label="Email"
        placeholder="joe@schmoe.com"
        value={formData.email}
        onChange={handleChange}
        error={getErrors('email')}
      />
      <Form.Field
        control={Input}
        label="Zip Code"
        name="zip_code"
        placeholder="19348"
        pattern="\d{5}"
        value={formData.zip_code}
        onChange={handleChange}
        error={getErrors('zip_code')}
      />
      <Button type="submit">Sign Up</Button>
      <div>
        <h5>
          Already have an account?{' '}
          <Link to="/login">sign in here</Link>!
        </h5>
      </div>
    </Form>
  );
}