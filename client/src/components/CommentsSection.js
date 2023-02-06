import React, { useState } from 'react';
import Comment from './Comment';
import NewComment from './NewComment';
import { Comment as CommentUI, Header, Icon, Divider, Container } from 'semantic-ui-react';

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
    <Container text>
      <Header size="small" as="span" dividing>
        Comments{' '}
      </Header>
      { writing
        ? <Icon name="minus" onClick={disableWriting} size="small" />
        : <Icon name="plus" onClick={enableWriting} size="small" />
      }
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