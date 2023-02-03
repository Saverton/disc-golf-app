import React from 'react';
import Post from './Post';
import { Feed } from 'semantic-ui-react';

export default function PostList({ posts }) {
  const postsList = posts.map((p, idx) => <Post key={`post-${idx}`} post={p} />);

  if (Object.keys(posts).length === 0) {
    return <h2>No Posts Found...</h2>
  }

  return (
    <Feed>
      {postsList}
    </Feed>
  );
}