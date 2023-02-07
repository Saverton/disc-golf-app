import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Comment as CommentUI, Icon } from 'semantic-ui-react';

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
    <CommentUI>
      <CommentUI.Content>
        <CommentUI.Author as={Link} to={`/site/users/${user.id}`}>{user.username}</CommentUI.Author>
        {
          editing
          ? (
            <CommentForm comment={comment} onSubmit={handleUpdateComment} onCancel={disableEdit} />
          )
          : (
            <CommentUI.Text>{body}</CommentUI.Text>
          )
        }
        {
          (currentUser.id === user.id && !editing)
          ? (
            <CommentUI.Actions>
              <CommentUI.Action onClick={enableEdit}>
                <Icon name="pencil" />
              </CommentUI.Action>
              <CommentUI.Action onClick={handleDelete}>
                <Icon name="trash" />
              </CommentUI.Action>
            </CommentUI.Actions>
          )
          : null
        }
      </CommentUI.Content>
    </CommentUI>
  );
}