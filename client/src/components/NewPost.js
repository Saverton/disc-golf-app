import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PostForm from './PostForm';
import { Grid, Header } from 'semantic-ui-react';

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
    <Grid.Column width={10}>
      <Header size="large" dividing>Create a new Post</Header>
      <PostForm onSubmit={createPost} />
    </Grid.Column>
  );
}