import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';

export default function CommentForm({ comment, onSubmit, onCancel }) {
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
    <Form onSubmit={handleSubmit} size="tiny">
      <Form.TextArea
        rows={2}
        value={body}
        onChange={handleChange}
        placeholder="enter comment..."
      />
      <Form.Group>
        <Form.Button type="submit" size="tiny">
          Post
        </Form.Button>
        <Form.Button onClick={onCancel} size="tiny" type="button">
          Cancel
        </Form.Button>
      </Form.Group>
    </Form>
  );
}