import React, { useState, useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import PostList from './PostList';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/posts')
      .then(res => {
        if (res.ok) {
          res.json().then(setPosts);
        } else {
          res.json().then(console.log);
        }
      })
  }, [])


  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Recent Posts</Header>
      <PostList posts={posts} />
    </Grid.Column>
  );
}