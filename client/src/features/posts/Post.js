import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CommentsSection from './CommentsSection';
import Likes from '../../components/Likes';
import { Feed, Icon } from 'semantic-ui-react';

export default function Post({ post, index }) {
  const { id, body, user, course } = post;
  const currentUser = useSelector(state => state.user);

  return (
    <Feed.Event style={
      index % 2 === 0 ? {backgroundColor: '#EEE'} : null
    }>
      <Feed.Label>
        <Icon name="user" />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{user.username}</Feed.User>
          { course ? <span> at <Link to={`/courses/${course.id}`}>{course.name}</Link></span> : null }
        </Feed.Summary>
        <Feed.Extra text>
          {body}
        </Feed.Extra>
        <Feed.Meta>
          <Likes likable={post} type="Post" />
          {
            currentUser.id === user.id &&
            <Link to={`/edit_post/${id}`}>
              <Icon name="edit" />
            </Link>
          }
          <CommentsSection comments={post.comments} postId={id} />
        </Feed.Meta>
      </Feed.Content>
    </Feed.Event>
  );
}