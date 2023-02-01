import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from './userSlice';
import { Button } from '../../styled-components/Buttons';

export default function UserStatus() {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          dispatch(logout());
          navigate('/login');
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <>
      <h2>Currently Logged in as: {currentUser.username || 'NOT LOGGED IN'}</h2>
      {
        currentUser.id ? <Button onClick={handleLogout}>logout</Button> : null
      }
    </>
  );
}