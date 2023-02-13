import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, loadMorePosts } from './postsSlice';
import { Grid, Header, Message, Button } from 'semantic-ui-react';
import PostList from './PostList';
import NoPostsFeed from './NoPostsFeed';

export default function Feed() {
  const dispatch = useDispatch();
  const errors = useSelector(state => state.posts.errors);

  function onLoadClick() {
    dispatch(loadMorePosts());
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Recent Posts</Header>

      <PostList fallbackComponent={NoPostsFeed} />

      <Header textAlign='center'>
        <Message hidden={errors.length === 0} error>
          <Message.Header>{errors.join(', ')}</Message.Header>
        </Message>
        <Button onClick={onLoadClick}>Load More...</Button>
        <Button as={Link} to={'/users'}>Find Friends</Button>
      </Header>
    </Grid.Column>
  );
}