import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import PostPlaceholders from '../../components/PostPlaceholders';
import { Feed, Header, Icon, Divider } from 'semantic-ui-react';

export default function PostList({ fallbackComponent }) {
  const { entities: posts, loading } = useSelector(state => state.posts);

  const postsList = posts.map((p, idx) => 
    <div key={`post-${idx}`}>
      <Post post={p} index={idx} />
      <Divider section hidden/>
    </div>
  );
  
  if (loading === 'pending')
    return <PostPlaceholders />;
  
  if (Object.keys(posts).length === 0)
    return (
      (fallbackComponent && fallbackComponent()) ||
      <>
        <Divider hidden />
        <Header textAlign='center' size='large' icon>
          <Icon name="frown outline"/>
          <Header.Content>No Posts Found...</Header.Content>
        </Header>
      </>
    );

  return (
    <>
      <Divider hidden />
      <Feed>
        {postsList}
      </Feed>
    </>
  );
}