import React, { useState } from 'react';
import Comment from './Comment';
import { Comment as CommentUI, Header, Button } from 'semantic-ui-react';

export default function CommentsSection({ comments }) {
  const [ numberShown, setNumberShown ] = useState(1);

  /**
   * Show 5 more comments on the post when called.
   */
  function showMoreComments() {
    setNumberShown(numShown => numShown + 5);
  }

  const commentsList = comments.slice(0, Math.min(numberShown, comments.length)).map((c, idx) => (
    <Comment
      key={`comment-${idx}`}
      comment={c}
    />
  ));

  return (
    <>
      <Header size="medium" dividing content="Comments" />

      <CommentUI.Group>
        {commentsList}
      </CommentUI.Group>

      {/* Display a prompt to be the first to comment if there are no comments */}
      { comments.length === 0 &&
        <Header as="h5" icon={{name: 'flag checkered'}} content="No one has commented yet... Be the first!" />
      }

      {/* Display a "Show more" option to display more comments iff there are more to see */}
      {numberShown < comments.length && 
        <Button
          basic
          size="tiny"
          onClick={showMoreComments}
        >
          Show more
        </Button>
      }
    </>
  )
}