import React, { useState, useEffect } from 'react';
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
    <main>
      <PostList posts={posts} />
    </main>
  );
}