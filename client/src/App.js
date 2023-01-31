import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login } from './features/user/userSlice';
import NavBar from './components/NavBar';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    // fetch current user
    fetch('/api/me')
      .then(res => {
        if (res.ok) {
          res.json().then(userData => dispatch(login(userData)));
        } else {
          navigate('/login');
        }
      });
  }, [dispatch, navigate]);

  return (
    <>
      <NavBar />
      <h2>Currently Logged in as: {currentUser.username || 'NOT LOGGED IN'}</h2>
      <Outlet />
    </>
  );
}