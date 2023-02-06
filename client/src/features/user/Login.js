import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from './userSlice';
import { Button, Input, Form, Grid, Header, List } from 'semantic-ui-react';

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

  const errorList = errors.map((e, idx)=> (
    <List.Item key={`error-${idx}`} style={{backgroundColor: 'coral'}}>
      <List.Icon name="warning" color="red" />
      <List.Content>
        {e}
      </List.Content>
    </List.Item>
  ));

  return (
    <Grid.Column width={10}>
      <Header dividing size="large">Sign In</Header>
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
        <List celled>
          {errorList}
        </List>
        <Button type="submit" >Login</Button>
      </Form>
      <div>
        <h5>
          Don't have an account?{' '}
          <Link to="/signup">create an account here</Link>!
        </h5>
      </div>
    </Grid.Column>
  );
}