import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login } from './features/user/userSlice';
import Header from './components/Header';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // fetch current user
    fetch('/api/me')
      .then(res => {
        if (res.ok) {
          res.json().then(userData => dispatch(login(userData)));
        } else {
          // navigate('/login');
        }
      });
  }, [dispatch, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}