import React from 'react';

export default function UserList({ users, onClickUser }) {
  const usersList = users.map((u, idx) => (
    <li
      key={`user-${idx}`}
      onClick={() => onClickUser(u.id)}>
      {u.username}
    </li>
  ));

  return (
    <ul>
      {usersList}
    </ul>
  );
}