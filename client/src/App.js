import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from './features/user/userSlice';
import UserList from './components/UserList';
import Signup from './features/user/Signup';
import Login from './features/user/Login';
import Profile from './features/user/Profile';
import './App.css';

export default function App() {
  const [users, setUsers] = useState([]);
  const [currentProfileId, setCurrentProfileId] = useState(1);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    // fetch list of users
    fetch('/api/users')
      .then(res => {
        if (res.ok) {
          res.json().then(setUsers);
        } else {
          res.json().then(console.log);
        }
      });
    
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
      <UserList users={users} onClickUser={handleClickUser} />
      <Login />
      <Signup />
      <Profile userId={currentProfileId}/>
    </>
  );
}