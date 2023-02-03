import React, { useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { Comment as CommentUI, Header, Button, Icon, Divider, Container } from 'semantic-ui-react';

export default function CommentsSection({ comments, onUpdate, onDelete, addComment, postId }) {
  const [writing, setWriting] = useState();

  const enableWriting = () => {
    setWriting(true);
  }

  const disableWriting = () => {
    setWriting(false);
  }

  const commentsList = comments.map((c, idx) => (
    <Comment
      key={`comment-${idx}`}
      comment={c}
      onUpdate={onUpdate}
      onDelete={onDelete}
    />
  ));

  return (
    <Container>
      <Header as="span">
        Comments{' '}
      </Header>
      { writing
        ? <Icon name="minus" onClick={disableWriting} />
        : <Icon name="plus" onClick={enableWriting} />
      }
      <Divider fitted />
      { writing
        ? <NewComment postId={postId} onSubmit={addComment} onCancel={disableWriting} />
        : null
      }
      <CommentUI.Group>
        {commentsList}
      </CommentUI.Group>
    </Container>
  )
}