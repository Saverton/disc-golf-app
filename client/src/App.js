import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { login } from './features/user/userSlice';
import Header from './components/Header';
import './App.css';
import { Grid } from 'semantic-ui-react';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // fetch current user
    fetch('/api/me')
      .then(res => {
        if (res.ok) {
          res.json().then(userData => dispatch(login(userData)));
        } else {
          if (location.pathname === '/')
            navigate('/login');
        }
      });
  }, [dispatch, navigate, location.pathname]);

  return (
    <>
      <Header />
      <Grid centered>
        <Outlet />
      </Grid>
    </>
  );
}