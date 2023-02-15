import React, { useContext, useEffect } from 'react';
import { NavigateContext } from '../../context/NavigateContext';
import { useSelector, useDispatch } from 'react-redux';
import { createPost } from './postManagerSlice';
import PostForm from './PostForm';
import { Grid, Header } from 'semantic-ui-react';

export default function NewPost() {
  const { id } = useSelector(state => state.user);
  const navigate = useContext(NavigateContext);
  const dispatch = useDispatch();

  // Boot the user to the login screen if not logged in.
  useEffect(() => {
    if (!id) navigate('/login');
  }, [id]);

  /**
   * Upload the new post to the API, and navigate to the current user page if successful.
   * @param {FormData} post 
   */
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
      <PostForm onSubmit={addPost} type="new" />
    </Grid.Column>
  );
}