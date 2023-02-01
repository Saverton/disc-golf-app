import React from 'react';

export default function Comment({ comment }) {
  const { body, user } = comment;

  return (
    <li>
      <p><strong>{user.username}</strong>: {body}</p>
    </li>
  );
}