import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers } from './otherUsersSlice';
import UserListItem from './UserListItem';
import { List, Icon, Header } from 'semantic-ui-react';
import ListLoader from '../../components/ListLoader';

export default function UserList({ users, size, dontReload }) {
  let { entities, loading } = useSelector(state => state.otherUsers);
  const [freeze, setFreeze] = useState(false);
  const [otherUsers, setOtherUsers] = useState(entities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (users)
      dispatch(setUsers(users));
  }, [dispatch, users]);

  // If dontReload is true, freeze the otherUsers state from receiving updates.
  useEffect(() => {
    if (loading === 'succeeded') {
      if (dontReload)
        setFreeze(true);
      if (!freeze)
        setOtherUsers(entities);
    }
  }, [entities, loading, dontReload, freeze]);

  const usersList = otherUsers.map((u, idx) => (
    <UserListItem key={`user-${idx}`} user={u} />
  ));

  return (
    <>
      <ListLoader loading={loading} />
      {
        otherUsers.length === 0
        ? (
          <Header textAlign='center' size='large' icon>
            <Icon name="users"/>
            <Header.Content>No Users Found...</Header.Content>
          </Header>
        ) : (
          <List selection size={size || 'big'}>
            {usersList}
          </List>
        )
      }
    </>
  );
}