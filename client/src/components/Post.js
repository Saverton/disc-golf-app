import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NewComment from './NewComment';
import Comment from './Comment';
import Likes from './Likes';
import { LinkButton } from '../styled-components/Buttons';

export default function Post({ post }) {
  const { id, body, user } = post;
  const [comments, setComments] = useState(post.comments);
  const currentUser = useSelector(state => state.user);

  // console.log(post);
  const addComment = newComment => {
    setComments(c => [...c, newComment]);
  }

  const updateComment = updatedComment => {
    setComments(comments => comments.map(c => c.id === updatedComment.id ? updatedComment : c));
  }

  const deleteComment = deletedId => {
    setComments(comments => comments.filter(c => c.id !== deletedId));
  }

  const commentsList = comments.map((c, idx) => <Comment key={`comment-${id}.${idx}`} comment={c} onUpdate={updateComment} onDelete={deleteComment} />);

  return (
    <div>
      <h3>{user.username}</h3>
      <p>{body}</p>
      <Likes post={post} />
      {
        currentUser.id === user.id
        ? <LinkButton as={Link} to={`/edit_post/${id}`}>Edit</LinkButton>
        : null
      }
      <NewComment postId={id} onSubmit={addComment} />
      <ul>
        {commentsList}
      </ul>
    </div>
  );
}