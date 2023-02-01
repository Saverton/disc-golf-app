import React, { useState } from 'react';

export default function CommentForm({ comment, onSubmit }) {
  const [body, setBody] = useState(comment?.body || '');

  const handleChange = e => {
    setBody(e.target.value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(body);
    setBody('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={body}
        onChange={handleChange}
        placeholder="enter comment..."
      />
      <input
        type="submit"
        value="Post"
      />
    </form>
  );
}