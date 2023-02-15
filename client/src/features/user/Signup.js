import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { signup, resetStatus } from './userSlice';
import { Button, Form, Grid, Input, Header, Divider } from 'semantic-ui-react';
import PasswordInput from '../../components/PasswordInput';

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
  const errors = useSelector(state => state.user.errors);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetStatus());
  }, [dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(signup(formData)).unwrap()
      .then(user => navigate(`/users/${user.id}`))
      .catch(console.error);
  }

  const getErrors = name => (
    errors[name]?.length > 0
    ? {
      content: errors[name].join(', ')
    }
    : false
  );

  return (
    <Grid.Column width={10}>
      <Header dividing size="large">Sign Up</Header>
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
          <PasswordInput
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={getErrors('password')}
          />
          <PasswordInput
            name="password_confirmation"
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
          name="email"
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
        <Button type="submit" primary>Sign Up</Button>
      </Form>

      <Divider hidden />

      <div>
        <h5>
          Already have an account?{' '}
          <Link to="/login">sign in here</Link>!
        </h5>
      </div>
    </Grid.Column>
  );
}