import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function Likes({ post }) {
  const { id } = post;
  const [{ likes, liked }, setLikeData] = useState({
    likes: post.likes,
    liked: post.liked_by_current_user
  });
  const currentUser = useSelector(state => state.user);

  const handleLike = () => {
    fetch(`/api/posts/${id}/likes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.id
      })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(like => setLikeData(data => ({likes: data.likes + 1, liked: like.id})));
        } else {
          res.json().then(console.log);
        }
      })
  }

  const handleUnlike = () => {
    fetch(`/api/posts/${id}/likes/${liked}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: currentUser.id
      })
    })
      .then(res => {
        if (res.ok) {
          setLikeData(data => ({likes: data.likes - 1, liked: false}));
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <span>
      {
        liked ? <button onClick={handleUnlike}>Unlike</button> : <button onClick={handleLike}>Like</button>
      }
      <span> - {likes}</span>
    </span>
  );
}