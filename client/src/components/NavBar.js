import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const currentUser = useSelector(state => state.user);

  return (
    <nav>
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/new_post">Post</NavLink>
      <NavLink to="/users" end>Find Friends</NavLink>
      {
        currentUser.id
        ? <NavLink to={`/users/${currentUser.id}`}>Profile</NavLink>
        : <NavLink to="/login">Login</NavLink>
      }
    </nav>
  );
}