import React from 'react';
import { Link } from 'react-router-dom';
import { LinkButton } from '../styled-components/Buttons';

export default function UserList({ users }) {
  const usersList = users.map((u, idx) => (
    <li key={`user-${idx}`}>
      <LinkButton as={Link} to={`/users/${u.id}`}>{u.username}</LinkButton>
    </li>
  ));

  return (
    <ul>
      {usersList}
    </ul>
  );
}