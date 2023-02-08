import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addComment } from '../features/posts/postsSlice';
import CommentForm from './CommentForm';

export default function NewComment({ postId, onSubmit, onCancel }) {
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSubmit = body => {
    dispatch(addComment({
      userId: currentUser.id,
      commentData: { body, post_id: postId }
    }));
    // fetch(`/api/users/${currentUser.id}/comments`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({body, post_id: postId})
    // })
    //   .then(res => {
    //     if (res.ok) {
    //       res.json().then(commentData => {
    //         onSubmit(commentData);
    //       });
    //     } else {
    //       res.json().then(console.log);
    //     }
    //   })
  }

  return (
    <CommentForm onSubmit={handleSubmit} onCancel={onCancel} />
  );
}