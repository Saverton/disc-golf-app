import React, { useContext } from 'react';
import { NavigateContext } from '../context/NavigateContext';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from '../features/posts/postManagerSlice';
import PostForm from './PostForm';
import { Grid, Header } from 'semantic-ui-react';

export default function NewPost() {
  const { id } = useSelector(state => state.user);
  const navigate = useContext(NavigateContext);
  const dispatch = useDispatch();

  const addPost = (post) => {
    dispatch(createPost({
      userId: id,
      postData: post
    })).unwrap()
      .then(() => navigate(`/users/${id}`))
      .catch(console.error);
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Create a new Post</Header>
      <PostForm onSubmit={addPost} />
    </Grid.Column>
  );
}