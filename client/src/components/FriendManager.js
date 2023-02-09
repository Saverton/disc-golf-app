import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createFriendship, deleteFriendship } from '../features/otherUsers/profileUserSlice';
import { Button, Card, Header } from 'semantic-ui-react';

export default function FriendManager() {
  const currentUser = useSelector(state => state.user);
  const user = useSelector(state => state.profileUser.entity);
  const { id, username } = user;
  const dispatch = useDispatch();

  const handleAddFriend = () => {
    dispatch(createFriendship({
      userId: currentUser.id,
      friendId: id
    }));
  }

  const handleRemoveFriend = () => {
    dispatch(deleteFriendship({ friendshipId: user.friendship.id }));
  }

  const friendManager = () => {
    switch (user.friendship.status) {
      case 'self':
        return <Header>You are logged in as {username}</Header>;
      case 'friends':
        return (
          <>
            <Header>You are friends with {username}</Header>
            <Button onClick={handleRemoveFriend} negative>Remove Friend</Button>
          </>
        );
      case 'pending-outgoing':
        return (
          <>
            <Header>You have sent a friend request to {username}</Header>
            <Button onClick={handleRemoveFriend} negative>Cancel Request</Button>
          </>
        );
      case 'pending-incoming':
        return (
          <>
            <Header>{username} would like to become friends</Header>
            <Button.Group>
              <Button onClick={handleAddFriend} positive>Accept</Button>
              <Button onClick={handleRemoveFriend} negative>Reject</Button>
            </Button.Group>
          </>
        );
      default:
        return <Button onClick={handleAddFriend}>Add Friend</Button>
    }
  }

  return (
    <Card.Content>
      { friendManager() }
    </Card.Content>
  );
}