import React from 'react';
import { Link } from 'react-router-dom';

export default function UserList({ users }) {
  const usersList = users.map((u, idx) => (
    <li key={`user-${idx}`}>
      {u.username}
      <Link to={`/users/${u.id}`}>View Profile</Link>
    </li>
  ));

  return (
    <ul>
      {usersList}
    </ul>
  );
}