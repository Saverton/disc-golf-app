import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Comment from './Comment';
import Likes from './Likes';
import { LinkButton } from '../styled-components/Buttons';

export default function Post({ post }) {
  const { id, body, user, comments } = post;
  const currentUser = useSelector(state => state.user);

  // console.log(post);

  const commentsList = comments.map((c, idx) => <Comment key={`comment-${id}.${idx}`} comment={c} />);

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
      <ul>
        {commentsList}
      </ul>
    </div>
  );
}