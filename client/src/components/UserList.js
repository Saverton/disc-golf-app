import React from 'react';
import UserListItem from './UserListItem';
import { List, Icon, Header } from 'semantic-ui-react';

export default function UserList({ users, size }) {
  const usersList = users.map((u, idx) => (
    <UserListItem key={`user-${idx}`} user={u} />
  ));

  if (users.length === 0) {
    return (
      <Header textAlign='center' size='large' icon>
        <Icon name="users"/>
        <Header.Content>No Users Found...</Header.Content>
      </Header>
    );
  }

  return (
    <List selection size={size || 'big'}>
      {usersList}
    </List>
  );
}