import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import UserList from '../../components/UserList';
import Post from '../../components/Post';

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

  // console.log(user);
  const friendsList = user?.friends || [];
  const outgoingFriendsList = user?.outgoing_friends || [];
  const incomingFriendsList = user?.incoming_friends || [];
  const postsList = (user?.posts || []).map((p, idx) => <Post key={`post-${idx}`} post={{...p, user: {id: user.id, username: user.username}}} />);

  const friendManager = () => {
    switch (user?.friendship?.status) {
      case 'friends':
        return (
          <>
            <h5>You are friends with {user.username}</h5>
            <button onClick={handleRemoveFriend}>Remove Friend</button>
          </>
        );
      case 'pending-outgoing':
        return (
          <>
            <h5>You have sent a friend request to {user.username}</h5>
            <button onClick={handleRemoveFriend}>Cancel Request</button>
          </>
        );
      case 'pending-incoming':
        return (
          <>
            <h5>{user.username} would like to become friends</h5>
            <button onClick={handleAddFriend}>Accept Friend Request</button>
            <button onClick={handleRemoveFriend}>Reject Friend Request</button>
          </>
        );
      default:
        return <button onClick={handleAddFriend}>Add Friend</button>
    }
  }

  return (
    <section>
      <h1>Profile</h1>
      <h3>Username: {user?.username}</h3>
      <h5>{user?.first_name} {user?.last_name}</h5>
      {
        // Conditionally show the 'Add Friend' button or a message based on friend status.
        parseInt(id) !== currentUser.id ? friendManager() : null
      }
      {
        // Only show the user's email, zip code, and friends list if the current user is friends with this user.
        user?.friendship?.status === 'friends' || parseInt(id) === currentUser.id
        ? (<>
          <h5>Email: {user?.email}</h5>
          <h5>Zip code: {user?.zip_code}</h5>
          <h4>Friends</h4>
          <UserList users={friendsList} />
        </>) : null
      }
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
      {postsList}
    </section>
  );
}