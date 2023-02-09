import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import UserList from './UserList';
import PostList from './PostList';
import ProfileNav from './ProfileNav';
import { Grid, Header } from 'semantic-ui-react';
import Placeholder from './Placeholder';

export default function ProfileLists() {
  const currentUser = useSelector(state => state.user);
  const { entity: user, loading } = useSelector(state => state.profileUser);
  const [currentList, setCurrentList] = useState('Posts');
  
  const isFriend = user?.friendship?.status === 'friends';
  const isSelf = user?.id === currentUser.id
  
  const outgoingFriendsList = user?.outgoing_friends || [];
  const incomingFriendsList = user?.incoming_friends || [];

  const options = [{ name: 'Posts' }];
  if (isFriend || isSelf)
    options.push({ name: 'Friends'});
  if (isSelf)
    options.push(
      { name: 'Incoming Friend Requests', label: incomingFriendsList.length },
      { name: 'Outgoing Friend Requests'}
    );

  if (!options.map(o => o.name).includes(currentList))
    setCurrentList(options[0].name);

  const getList = () => {
    switch(currentList) {
      case 'Posts': 
        return (
          <PostList />
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
        {loading === 'pending' ? <Placeholder /> : getList()}
      </Grid.Row>
    </>
  );
}