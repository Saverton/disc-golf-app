import React from "react";
import { useSelector } from 'react-redux';
import UserList from './UserList';
import FriendManager from "./FriendManager";
import CardPlaceholder from "../../components/CardPlaceholder";
import { Card, Header } from 'semantic-ui-react';

// TODO: make friends list static, renders incorrectly for incoming/outgoing friend requests tabs
export default function ProfileCard() {
  const { entity: user, loading } = useSelector(state => state.profileUser);
  const currentUser = useSelector(state => state.user);
  const { full_name, username, id, email, zip_code } = user;
  const friendsList = user?.friends || [];

  // Should the card display personal details, like the user's email, zip code, and friends list?
  const showPrivateDetails = user.friendship.status === 'friends' || parseInt(id) === currentUser.id;

  if (loading === 'pending')
    return (
      <Card>
        <Card.Content>
          <CardPlaceholder />
        </Card.Content>
      </Card>
    );

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
            <UserList users={friendsList} size='medium' dontReload/>
          </Card.Content>
        ) : null
      }
    </Card>
  );
}