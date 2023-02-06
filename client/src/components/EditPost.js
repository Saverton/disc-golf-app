import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import PostForm from './PostForm';
import { Button, Grid, Header } from 'semantic-ui-react';

export default function EditPost() {
  const [post, setPost] = useState({});
  const { post_id: postId } = useParams();
  const navigate = useNavigate();
  const currentUser = useSelector(state => state.user);

  // console.log(post);

  useEffect(() => {
    fetch(`/api/users/${currentUser.id}/posts/${postId}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setPost);
        } else {
          res.json().then(console.log);
        }
      })
  }, [postId, currentUser.id]);

  const updatePost = updatedPost => {
    fetch(`/api/users/${currentUser.id}/posts/${post.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedPost)
    })
      .then(res => {
        if (res.ok) {
          navigate(`/users/${currentUser.id}`);
        } else {
          res.json().then(console.log);
        }
      })
  }

  const deletePost = () => {
    fetch(`/api/users/${currentUser.id}/posts/${post.id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          navigate(`/users/${currentUser.id}`);
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Edit Post</Header>
      {post.id ? <PostForm onSubmit={updatePost} startData={post} /> : <h4>Loading...</h4>}
      <Header size="small">or</Header>
      <Button onClick={deletePost} negative>Delete This Post</Button>
    </Grid.Column>
  );
}