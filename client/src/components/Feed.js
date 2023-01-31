import React, { useState, useEffect } from 'react';

export default function Feed() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('/api/feed')
      .then(res => {
        if (res.ok) {
          res.json().then(setPosts);
        } else {
          res.json().then(console.log);
        }
      })
  }, [])

  const postsList = posts.map((p, idx) => {
    return (
      <div key={`post-${idx}`}>
        <h3>{p.user.username}</h3>
        <p>{p.body}</p>
      </div>
    );
  });

  return (
    <main>
      {postsList}
    </main>
  );
}