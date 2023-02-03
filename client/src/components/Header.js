import React from 'react';
import NavBar from './NavBar';
import UserStatus from '../features/user/UserStatus';

export default function Header() {
  return (
    <header>
      <UserStatus />
      <NavBar />
    </header>
  );
}