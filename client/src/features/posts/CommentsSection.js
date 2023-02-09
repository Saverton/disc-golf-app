import React, { useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { Comment as CommentUI, Header, Icon, Container } from 'semantic-ui-react';

export default function CommentsSection({ comments, postId }) {
  const [writing, setWriting] = useState();

  const commentsList = comments.map((c, idx) => (
    <Comment
      key={`comment-${idx}`}
      comment={c}
    />
  ));

  return (
    <Container text>
      <Header size="small" as="span" dividing>
        Comments{' '}
      </Header>
      { writing
        ? <Icon name="minus" onClick={() => setWriting(false)} size="small" />
        : <Icon name="plus" onClick={() => setWriting(true)} size="small" />
      }
      {writing && <NewComment postId={postId} onCancel={() => setWriting(false)} />}
      <CommentUI.Group>
        {commentsList}
      </CommentUI.Group>
    </Container>
  )
}