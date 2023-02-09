import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import Placeholder from '../../components/Placeholder';
import { Feed, Header, Icon } from 'semantic-ui-react';

export default function PostList() {
  const { entities: posts, loading } = useSelector(state => state.posts);

  const postsList = posts.map((p, idx) => <Post key={`post-${idx}`} post={p} index={idx} />);
  
  if (loading === 'pending')
    return <Placeholder />;
  
  if (Object.keys(posts).length === 0)
    return (
      <Header textAlign='center' size='large' icon>
        <Icon name="frown outline"/>
        <Header.Content>No Posts Found...</Header.Content>
      </Header>
    );

  return (
    <Feed>
      {postsList}
    </Feed>
  );
}