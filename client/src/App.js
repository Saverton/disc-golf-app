import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/user/userSlice';
import UserSearch from './components/UserSearch';
import Signup from './features/user/Signup';
import Login from './features/user/Login';
import Profile from './features/user/Profile';
import './App.css';

export default function App() {
  const [currentProfileId, setCurrentProfileId] = useState(1);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    // fetch current user
    fetch('/api/me')
      .then(res => {
        if (res.ok) {
          res.json().then(userData => dispatch(login(userData)));
        } else {
          res.json().then(console.log);
        }
      });
  }, [dispatch]);

  const handleClickUser = id => {
    setCurrentProfileId(id);
  }

  return (
    <>
      <h2>Currently Logged in as: {currentUser.username}</h2>
      <UserSearch handleClickUser={handleClickUser} />
      <Login />
      <Signup />
      <Profile userId={currentProfileId}/>
    </>
  );
}