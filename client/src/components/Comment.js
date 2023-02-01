import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CommentForm from './CommentForm';
import { Button } from '../styled-components/Buttons';

export default function Comment({ comment, onUpdate, onDelete }) {
  const { id, body, user } = comment;
  const currentUser = useSelector(state => state.user);
  const [editing, setEditing] = useState(false);

  const enableEdit = () => {
    setEditing(true);
  }

  const disableEdit = () => {
    setEditing(false);
  }

  const handleDelete = () => {
    fetch(`/api/users/${currentUser.id}/comments/${id}`, {
      method: 'DELETE'
    })
      .then(res => {
        if (res.ok) {
          onDelete(id);
        } else {
          res.json().then(console.log);
        }
      });
  }

  const handleUpdateComment = body => {
    fetch(`/api/users/${currentUser.id}/comments/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ body })
    })
      .then(res => {
        if (res.ok) {
          res.json().then(onUpdate);
          setEditing(false);
        } else {
          res.json().then(console.log);
        }
      })
  }

  return (
    <li>
      {
        editing
        ? (
          <>
            <CommentForm comment={comment} onSubmit={handleUpdateComment} />
            <Button onClick={disableEdit}>Cancel</Button>
          </>
        )
        : <p><strong>{user.username}</strong>: {body}</p>
      }
      {
        (currentUser.id === user.id && !editing)
        ? (
          <>
            <Button onClick={enableEdit}>Edit</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </>
        )
        : null
      }
    </li>
  );
}