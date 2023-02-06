import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import PostList from './PostList';
import ProfileNav from './ProfileNav';
import { Grid, Header } from 'semantic-ui-react';

export default function ProfileLists({ user }) {
  const currentUser = useSelector(state => state.user);
  const [currentList, setCurrentList] = useState('Posts');
  
  const isFriend = user?.friendship?.status === 'friends';
  const isSelf = user?.id === currentUser.id
  
  const options = ['Posts'];
  if (isFriend || isSelf)
    options.push('Friends');
  if (isSelf)
    options.push('Incoming Friend Requests', 'Outgoing Friend Requests');

  if (!options.includes(currentList))
    setCurrentList(options[0]);

  const outgoingFriendsList = user?.outgoing_friends || [];
  const incomingFriendsList = user?.incoming_friends || [];

  const getList = () => {
    switch(currentList) {
      case 'Posts': 
        return (
          <PostList posts={user?.posts || []} loading={!user?.id} />
        );
      case 'Friends':
        return (
          isFriend || isSelf
          ? <UserList users={user?.friends || []} />
          : <Header>You don't have access to this user's friends list because you aren't friends</Header>
        );
      case 'Incoming Friend Requests':
        return (
          isSelf
          ? <UserList users={incomingFriendsList || []} />
          : <Header>You don't have access to this user's private information</Header>
        );
      case 'Outgoing Friend Requests':
        return (
          isSelf
          ? <UserList users={outgoingFriendsList || []} />
          : <Header>You don't have access to this user's private information</Header>
        );
      default:
        return <Header size="large">404: List Doesn't Exist</Header>
    }
  }

  return (
    <>
      {/* Secondary Profile view (lists) */}
      <Grid.Row>
        {/* Secondary Profile Navigation */}
        <ProfileNav options={options} currentChoice={currentList} setChoice={setCurrentList} />
      </Grid.Row>
      <Grid.Row>
        {getList()}
      </Grid.Row>
    </>
  );
}