import React, { useState, useEffect } from 'react';
import UserList from '../../components/UserList';

export default function Profile({ userId }) {
  const [user, setUser] = useState({});

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

  return (
    <section>
      <h1>Profile</h1>
      <h3>User: {user?.username}</h3>
      <h5>{user?.first_name} {user?.last_name}</h5>
      <h5>Email: {user?.email}</h5>
      <h5>Zip code: {user?.zip_code}</h5>
      <h4>Friends</h4>
      <UserList users={user?.friends || []} />
    </section>
  );
}