import React from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';

export default function NewComment({ postId, onSubmit }) {
  const currentUser = useSelector(state => state.user);

  const handleSubmit = body => {
    fetch(`/api/users/${currentUser.id}/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({body, post_id: postId})
    })
      .then(res => {
        if (res.ok) {
          res.json().then(commentData => {
            onSubmit(commentData);
          });
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <CommentForm onSubmit={handleSubmit} />
  );
}