import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';

export default function NewPost() {
  const currentUser = useSelector(state => state.user);
  const navigate = useNavigate();

  const createPost = (post) => {
    fetch(`/api/users/${currentUser.id}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        ...post,
        course_id: post.course.id
      })
    })
      .then(res => {
        if (res.ok) {
          navigate(`/users/${currentUser.id}`);
        } else {
          res.json().then(console.log);
        }
      });
  }

  return (
    <main>
      <h2>Create a new Post</h2>
      <PostForm onSubmit={createPost} />
    </main>
  );
}