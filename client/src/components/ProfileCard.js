import React from "react";
import { useSelector } from 'react-redux';
import UserList from './UserList';
import FriendManager from "./FriendManager";
import { Card, Header } from 'semantic-ui-react';

export default function ProfileCard() {
  const user = useSelector(state => state.profileUser.entity);
  const currentUser = useSelector(state => state.user);
  const { full_name, username, id, email, zip_code } = user;
  const friendsList = user?.friends || [];

  // Should the card display personal details, like the user's email, zip code, and friends list?
  const showPrivateDetails = user.friendship.status === 'friends' || parseInt(id) === currentUser.id;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{full_name}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        {
          showPrivateDetails &&
          <>
            <Card.Content content={email} />
            <Card.Content content={`Location: ${zip_code}`} /> 
          </>
        }
      </Card.Content>
      <FriendManager user={user} />
      {
        showPrivateDetails
        ? (
          <Card.Content>
            <Header dividing>Friends</Header>
            <UserList users={friendsList} size='medium' />
          </Card.Content>
        ) : null
      }
    </Card>
  );
}