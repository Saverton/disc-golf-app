import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { editComment, removeComment } from './postsSlice';
import { Link } from 'react-router-dom';
import CommentForm from './CommentForm';
import { Comment as CommentUI, Icon } from 'semantic-ui-react';

export default function Comment({ comment }) {
  const { id, body, user } = comment;
  const currentUser = useSelector(state => state.user);
  const [editing, setEditing] = useState(false);
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeComment({
      userId: currentUser.id,
      commentId: id
    }));
  }

  const handleUpdateComment = body => {
    dispatch(editComment({
      userId: currentUser.id,
      commentId: id,
      commentData: { body }
    })).unwrap()
      .then(() => setEditing(false))
      .catch(console.error);
  }

  return (
    <CommentUI>
      <CommentUI.Content>
        <CommentUI.Author as={Link} to={`/users/${user.id}`}>{user.username}</CommentUI.Author>
        {
          editing
          ? (
            <CommentForm comment={comment} onSubmit={handleUpdateComment} onCancel={() => setEditing(false)} />
          )
          : (
            <CommentUI.Text>{body}</CommentUI.Text>
          )
        }
        {
          (currentUser.id === user.id && !editing) &&
          (
            <CommentUI.Actions>
              <CommentUI.Action onClick={() => setEditing(true)}>
                <Icon name="pencil" />
              </CommentUI.Action>
              <CommentUI.Action onClick={handleDelete}>
                <Icon name="trash" />
              </CommentUI.Action>
            </CommentUI.Actions>
          )
        }
      </CommentUI.Content>
    </CommentUI>
  );
}