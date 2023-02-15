import React, { useContext } from 'react';
import { NavigateContext } from '../../context/NavigateContext';
import { useSelector, useDispatch } from 'react-redux';
import { createFriendship, deleteFriendship } from './profileUserSlice';
import { resumeSession } from '../user/userSlice';
import FriendButton from '../../components/FriendButton';
import { Button, Card, Header } from 'semantic-ui-react';

export default function FriendManager() {
  const currentUser = useSelector(state => state.user);
  const user = useSelector(state => state.profileUser.entity);
  const { id, username } = user;
  const dispatch = useDispatch();
  const navigate = useContext(NavigateContext);

  const handleAddFriend = () => {
    // Auto redirect to login if no user is logged in
    if (!currentUser.id) return navigate('/login');

    dispatch(createFriendship({
      userId: currentUser.id,
      friendId: id
    }))
      .then(() => dispatch(resumeSession()));
  }

  const handleRemoveFriend = () => {
    dispatch(deleteFriendship({ friendshipId: user.friendship.id }))
      .then(() => dispatch(resumeSession()));
  }

  const friendManager = () => {
    switch (user.friendship.status) {
      case 'self':
        return <Header>You are logged in as {username}</Header>;
      case 'friends':
        return (
          <>
            <Header>You are friends with {username}</Header>
            <FriendButton text="Remove Friend" negative onClick={handleRemoveFriend} />
          </>
        );
      case 'pending-outgoing':
        return (
          <>
            <Header>You have sent a friend request to {username}</Header>
            <FriendButton text="Cancel Request" negative onClick={handleRemoveFriend} />
          </>
        );
      case 'pending-incoming':
        return (
          <>
            <Header>{username} would like to become friends</Header>
            <Button.Group>
              <FriendButton text="Accept" positive onClick={handleAddFriend} />
              <FriendButton text="Reject" negative onClick={handleRemoveFriend} />
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