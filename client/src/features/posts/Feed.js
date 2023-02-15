import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchPosts, loadMorePosts } from './postsSlice';
import { Grid, Header, Message, Button, Icon } from 'semantic-ui-react';
import PostList from './PostList';
import NoPostsFeed from './NoPostsFeed';

export default function Feed() {
  const dispatch = useDispatch();
  const { loading, errors } = useSelector(state => state.posts);

  function onLoadClick() {
    dispatch(loadMorePosts());
  }

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const isLoading = loading === 'pending';

  return (
    <Grid.Column computer={10} mobile={14}>
      <Header size="large" dividing>Recent Posts</Header>

      <PostList fallbackComponent={NoPostsFeed} />

      <Header textAlign='center'>
        <Message hidden={errors.length === 0} error>
          <Message.Header>{errors.join(', ')}</Message.Header>
        </Message>

        <Button onClick={onLoadClick} animated="fade" disabled={isLoading}>
          <Button.Content visible content="Load More" />
          <Button.Content hidden>
            <Icon name="sync" />
          </Button.Content>
        </Button>

        <Button as={Link} to={'/users'} animated="fade" disabled={isLoading}>
          <Button.Content visible content="Find Friends" />
          <Button.Content hidden>
            <Icon name="users" />
          </Button.Content>
        </Button>
      </Header>
    </Grid.Column>
  );
}