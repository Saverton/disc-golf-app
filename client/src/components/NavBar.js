import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { NavButton } from '../styled-components/Buttons';
import { HDiv } from '../styled-components/FlexDivs';

export default function NavBar() {
  const currentUser = useSelector(state => state.user);

  return (
    <>
      <HDiv as="nav">
        <NavButton as={NavLink} to="/feed">Feed</NavButton>
        <NavButton as={NavLink} to="/new_post">Post</NavButton>
        <NavButton as={NavLink} to="/users" end>Find Friends</NavButton>
        {
          currentUser.id
          ? <NavButton as={NavLink} to={`/users/${currentUser.id}`}>Profile</NavButton>
          : <NavButton as={NavLink} to="/login">Login</NavButton>
        }
      </HDiv>
      <hr />
    </>
  );
}