import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { resumeSession } from './features/user/userSlice';
import { NavigateContext } from './context/NavigateContext';
import Header from './components/Header';
import Footer from './components/Footer';
import WelcomeModal from './components/WelcomeModal';
import './App.css';
import { Grid } from 'semantic-ui-react';

// TODO: Better loading visualization
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
      <WelcomeModal />
      <Header />
      <main id="dynamic-main">
        <Grid centered>
          <Outlet />
        </Grid>
      </main>
      <Footer />
    </NavigateContext.Provider>
  );
}