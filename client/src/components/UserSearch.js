import React, { useState, useEffect } from 'react';
import UserList from './UserList';
import SearchForm from './SearchForm';
import { Grid, Header } from 'semantic-ui-react';

export default function UserSearch() {
  const [users, setUsers] = useState([]);

  const fetchUsers = (searchText = '') => {
    fetch(`/api/users?username=${searchText}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setUsers);
        } else {
          res.json().then(console.log);
        }
      });
  }

  // performs a query for users with no search term first
  useEffect(fetchUsers, []);

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Find Users</Header>
      <SearchForm onSubmit={fetchUsers} />
      <UserList users={users} />
    </Grid.Column>
  );
}