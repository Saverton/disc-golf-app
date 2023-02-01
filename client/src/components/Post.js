import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LinkButton } from '../styled-components/Buttons';

export default function Post({ post }) {
  const { id, body, user } = post;
  const currentUser = useSelector(state => state.user);

  console.log(post);

  return (
    <div>
      <h3>{user.username}</h3>
      <p>{body}</p>
      {
        currentUser.id === user.id
        ? <LinkButton as={Link} to={`/edit_post/${id}`}>Edit</LinkButton>
        : null
      }
    </div>
  );
}