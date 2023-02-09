import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../features/posts/postsSlice';
import CommentForm from './CommentForm';

export default function NewComment({ postId, onCancel }) {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = body => {
    dispatch(addComment({
      userId: currentUser.id,
      commentData: { body, post_id: postId }
    }));
  }

  return (
    <CommentForm onSubmit={handleSubmit} onCancel={onCancel} />
  );
}