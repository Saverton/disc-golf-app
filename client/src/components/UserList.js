import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from '../features/otherUsers/otherUsersSlice';
import UserListItem from './UserListItem';
import { List, Icon, Header } from 'semantic-ui-react';

export default function UserList({ users, size }) {
  // useSelector(state => state.otherUsers.entities);

  // useEffect(() => {
  //   // TODO: setUsers

  // }, []);
  const otherUsers = useSelector(state => state.otherUsers.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users)
      dispatch(setUsers(users));
  }, [dispatch, users]);

  const usersList = otherUsers.map((u, idx) => (
    <UserListItem key={`user-${idx}`} user={u} />
  ));

  if (otherUsers.length === 0) {
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