import React, { useState, useEffect } from 'react';
import Post from './Post';

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

  const postsList = posts.map((p, idx) => <Post key={`post-${idx}`} post={p} />);

  return (
    <main>
      {postsList}
    </main>
  );
}