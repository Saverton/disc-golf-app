import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { login } from './features/user/userSlice';
import NavBar from './components/NavBar';
import UserStatus from './features/user/UserStatus';
import { VDiv } from './styled-components/FlexDivs';
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
          navigate('/login');
        }
      });
  }, [dispatch, navigate]);

  return (
    <>
      <NavBar />
      <VDiv as="main">
        <UserStatus />
        <Outlet />
      </VDiv>
    </>
  );
}