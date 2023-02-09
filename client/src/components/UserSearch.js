import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchOtherUsersByName } from '../features/otherUsers/otherUsersSlice';
import UserList from './UserList';
import SearchForm from './SearchForm';
import { Grid, Header } from 'semantic-ui-react';

export default function UserSearch() {
  const dispatch = useDispatch();

  const fetchUsers = (searchText = '') => {
    dispatch(fetchOtherUsersByName({ username: searchText }));
  }

  // performs a query for users with no search term first
  useEffect(fetchUsers, [dispatch]);

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Find Users</Header>
      <SearchForm onSubmit={fetchUsers} />
      <UserList />
    </Grid.Column>
  );
}