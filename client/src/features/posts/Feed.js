import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './postsSlice';
import { Grid, Header } from 'semantic-ui-react';
import PostList from './PostList';

export default function Feed() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Recent Posts</Header>
      <PostList />
    </Grid.Column>
  );
}