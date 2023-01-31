import React from 'react';

export default function UserList({ users, onClickUser }) {
  const usersList = users.map((u, idx) => (
    <li key={`user-${idx}`}>
      {u.username}
      <button onClick={() => onClickUser(u.id)}>View Profile</button>
    </li>
  ));

  return (
    <ul>
      {usersList}
    </ul>
  );
}