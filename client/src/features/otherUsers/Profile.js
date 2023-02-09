import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOtherUserById } from './profileUserSlice';
import { setPosts } from '../posts/postsSlice';
import DetailPage from '../../components/DetailPage';
import ProfileLists from './ProfileLists';
import ProfileCard from './ProfileCard';
import { Grid, Header } from 'semantic-ui-react';

export default function Profile() {
  const user = useSelector(state => state.profileUser.entity);
  const { id }  = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOtherUserById({ id }));
  }, [id])

  useEffect(() => {
    dispatch(setPosts(user?.posts));
  }, [user, dispatch]);

  // console.log(user);

  return (
    <Grid.Column width={15}>
      <Header size="large" dividing>User Profile</Header>
      <DetailPage
        primary={user.id && <ProfileCard  />}
        secondary={<ProfileLists />}
      />
    </Grid.Column>
  );
}