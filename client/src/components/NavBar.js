import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

export default function NavBar() {
  const currentUser = useSelector(state => state.user);

  return (
    <Menu as="nav" fluid widths={5}>
      <Menu.Item as={NavLink} to="/feed">Feed</Menu.Item>
      <Menu.Item as={NavLink} to="/new_post">Post</Menu.Item>
      <Menu.Item as={NavLink} to="/courses">Courses</Menu.Item>
      <Menu.Item as={NavLink} to="/users" end>Find Friends</Menu.Item>
      {
        currentUser.id
        ? <Menu.Item as={NavLink} to={`/users/${currentUser.id}`}>Profile</Menu.Item>
        : <Menu.Item as={NavLink} to="/login">Login</Menu.Item>
      }
    </Menu>
  );
}