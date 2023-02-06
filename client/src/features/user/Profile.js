import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserList from '../../components/UserList';
import PostList from '../../components/PostList';
import ProfileCard from '../../components/ProfileCard';
import { Grid, Header } from 'semantic-ui-react';

export default function Profile() {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.user);
  const { id }  = useParams();

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setUser);
        } else {
          res.json().then(console.log);
        }
      });
  }, [id])

  const outgoingFriendsList = user?.outgoing_friends || [];
  const incomingFriendsList = user?.incoming_friends || [];
  // console.log(user);
  

  return (
    <Grid.Column width={15}>
    <Header size="large" dividing>User Profile</Header>
      <Grid columns={2}>
        <Grid.Column width={6}>
          {/* Profile information card */}
          { user.id ? <ProfileCard user={user} setUser={setUser} /> : null }
        </Grid.Column>
        <Grid.Column width={10}>
          {/* Secondary Profile view (lists) */}
          <Grid.Row>
            {/* Secondary Profile Navigation */}
          </Grid.Row>
          <Grid.Row>
            {
              // Only show this user's current outgoing and incoming friend requests if they are currently logged in
              currentUser.id === user?.id
              ? (
                <>
                  <h4>Sent Friend Requests</h4>
                  <UserList users={outgoingFriendsList} />
                  <h4>Incoming Friend Requests</h4>
                  <UserList users={incomingFriendsList} />
                </>
              ) : null
            }
            <h3>Posts</h3>
            <PostList posts={user?.posts || []} />
          </Grid.Row>
        </Grid.Column>
      </Grid>
    </Grid.Column>
  );
}