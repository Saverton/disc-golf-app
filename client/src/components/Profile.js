import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setPosts } from '../features/posts/postsSlice';
import DetailPage from './DetailPage';
import ProfileLists from './ProfileLists';
import ProfileCard from './ProfileCard';
import { Grid, Header } from 'semantic-ui-react';

export default function Profile() {
  const [user, setUser] = useState({});
  const { id }  = useParams();
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(setPosts(user?.posts));
  }, [user, dispatch]);

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