import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from '../../components/DetailPage';
import ProfileLists from '../../components/ProfileLists';
import ProfileCard from '../../components/ProfileCard';
import { Grid, Header } from 'semantic-ui-react';

export default function Profile() {
  const [user, setUser] = useState({});
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

  // console.log(user);

  return (
    <Grid.Column width={15}>
      <Header size="large" dividing>User Profile</Header>
      <DetailPage
        primary={user.id ? <ProfileCard user={user} setUser={setUser} /> : null}
        secondary={<ProfileLists user={user} />}
      />
    </Grid.Column>
  );
}