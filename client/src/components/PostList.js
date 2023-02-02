import React from 'react';
import Post from './Post';

export default function PostList({ posts }) {
  const postsList = posts.map((p, idx) => <Post key={`post-${idx}`} post={p} />);

  if (Object.keys(posts).length === 0) {
    return <h2>No Posts Found...</h2>
  }

  return (
    <>
      {postsList}
    </>
  );
}