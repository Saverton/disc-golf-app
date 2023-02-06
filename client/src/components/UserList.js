import React from 'react';
import { List } from 'semantic-ui-react';
import UserListItem from './UserListItem';

export default function UserList({ users, size }) {
  const usersList = users.map((u, idx) => (
    <UserListItem key={`user-${idx}`} user={u} />
  ));

  return (
    <List selection size={size || 'big'}>
      {usersList}
    </List>
  );
}