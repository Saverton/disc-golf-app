import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Card, Header } from 'semantic-ui-react';

export default function FriendManager({ user, setUser }) {
  const currentUser = useSelector(state => state.user);
  const { id, username } = user;

  const handleAddFriend = () => {
    fetch('/api/friendships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friend_id: id,
        user_id: currentUser.id
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(setUser);
        } else {
          res.json().then(console.log);
        }
      })
  }

  const handleRemoveFriend = () => {
    fetch(`/api/friendships/${user.friendship.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          setUser({...user, friendship: {
            id: null,
            status: false
          }});
        } else {
          res.json().then(console.log);
        }
      })
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