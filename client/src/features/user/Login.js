import React, { useState, useEffect, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, resetStatus } from './userSlice';
import { NavigateContext } from '../../context/NavigateContext';
import ErrorMessage from '../../components/ErrorMessage';
import PasswordInput from '../../components/PasswordInput';
import { Button, Input, Form, Grid, Header, List } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  username: '',
  password: ''
};

export default function Login() {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const currentUser = useSelector(state => state.user);
  const { errors } = currentUser;
  const dispatch = useDispatch();
  const navigate = useContext(NavigateContext);


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
    dispatch(login(formData)).unwrap()
      .then(() => navigate('/feed'))
      .catch(console.error);
  }

  // console.log(currentUser);

  let errorList;
  try {
    errorList = errors.map((e, idx)=> (
      <ErrorMessage key={`error-${idx}`} error={e} />
    ));
  } catch(e) {
    errorList = [];
  }

  return (
    <Grid.Column width={10}>
      <Header dividing size="large">Sign In</Header>

      <Form
        onSubmit={handleSubmit}
        loading={currentUser.loading === 'pending'}
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

        <PasswordInput
          value={formData.password}
          name="password"
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