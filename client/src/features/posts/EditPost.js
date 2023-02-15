import React, { useEffect, useContext } from 'react';
import { NavigateContext } from '../../context/NavigateContext';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPostById, editPost, deletePost } from './postManagerSlice';
import { useParams } from 'react-router-dom';
import PostForm from './PostForm';
import { Button, Grid, Header } from 'semantic-ui-react';

export default function EditPost() {
  const post = useSelector(state => state.postManager.entity);
  const { post_id: postId } = useParams();
  const navigate = useContext(NavigateContext);
  const dispatch = useDispatch();
  const { id: userId } = useSelector(state => state.user);

  // Boot the user to the login screen if not logged in.
  useEffect(() => {
    if (!userId) navigate('/login');
  }, [userId]);

  // pull in the data for the post to be edited
  useEffect(() => {
    dispatch(fetchPostById({
      userId: userId,
      postId: postId
    })).unwrap()
      .catch(err => {
        console.error(err);
        navigate('/login');
      })
  }, [postId, userId, dispatch, navigate]);

  // submit the updates to the database
  const updatePost = updatedPost => {
    dispatch(editPost({
      postData: updatedPost,
      postId: postId,
      userId: userId
    })).unwrap()
      .then(() => navigate(`/users/${userId}`))
      .catch(console.error);
  }

  // delete this post from the database
  const removePost = () => {
    dispatch(deletePost({
      postId: postId,
      userId: userId
    })).unwrap()
      .then(() => navigate(`/users/${userId}`))
      .catch(console.error);
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Edit Post</Header>
  
      {post?.id && 
        <PostForm
          onSubmit={updatePost}
          startData={post}
          type="edit"
        />
      }

      <Header size="small">or</Header>
      <Button onClick={removePost} negative>Delete This Post</Button>
    </Grid.Column>
  );
}