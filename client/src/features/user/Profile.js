import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import UserList from '../../components/UserList';

export default function Profile({ userId }) {
  const [user, setUser] = useState({});
  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    fetch(`/api/users/${userId}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setUser);
        } else {
          res.json().then(console.log);
        }
      });
  }, [userId])

  const handleAddFriend = () => {
    fetch('/api/friendships', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        friend_id: userId,
        user_id: currentUser.id
      })
    })
      .then(res => {
        if (res.ok) {
          console.log('added');
        } else {
          res.json().then(console.log);
        }
      })
  }

  const friendsList = user?.friends?.filter(f => !f.pending) || [];

  return (
    <section>
      <h1>Profile</h1>
      <h3>User: {user?.username}</h3>
      <h5>{user?.first_name} {user?.last_name}</h5>
      <h5>Email: {user?.email}</h5>
      <h5>Zip code: {user?.zip_code}</h5>
      {userId !== currentUser.id ? <button onClick={handleAddFriend}>Add Friend</button> : null}
      <h4>Friends</h4>
      <UserList users={friendsList} />
    </section>
  );
}