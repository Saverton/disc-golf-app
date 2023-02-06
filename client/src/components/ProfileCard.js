import React from "react";
import { useSelector } from 'react-redux';
import UserList from './UserList';
import FriendManager from "./FriendManager";
import { Card, Header } from 'semantic-ui-react';

export default function ProfileCard({ user, setUser }) {
  const { full_name, username, id, email, zip_code } = user;
  const friendsList = user?.friends || [];
  const currentUser = useSelector(state => state.user);

  // Should the card display personal details, like the user's email, zip code, and friends list?
  const showPrivateDetails = user.friendship.status === 'friends' || parseInt(id) === currentUser.id;

  return (
    <Card>
      <Card.Content>
        <Card.Header>{full_name}</Card.Header>
        <Card.Meta>{username}</Card.Meta>
        {
          showPrivateDetails
          ? <>
            <Card.Content content={email} />
            <Card.Content content={`Location: ${zip_code}`} /> 
          </>
          : null
        }
      </Card.Content>
      <FriendManager user={user} setUser={setUser} />
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