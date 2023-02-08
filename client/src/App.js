import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { resumeSession } from './features/user/userSlice';
import { NavigateContext } from './context/NavigateContext';
import Header from './components/Header';
import './App.css';
import { Grid } from 'semantic-ui-react';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // User is logged in automatically if the session is not expired.
  useEffect(() => {
    dispatch(resumeSession());
  }, [dispatch]);

  // Redirect the user to the main feed page
  useEffect(() => {
    if (location.pathname === '/')
      navigate('/feed');
  }, [location.pathname, navigate]);

  return (
    <NavigateContext.Provider value={navigate}>
      <Header />
      <Grid centered>
        <Outlet />
      </Grid>
    </NavigateContext.Provider>
  );
}