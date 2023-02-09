import React from 'react';
import PostList from '../posts/PostList';
import { Header } from 'semantic-ui-react';

export default function CoursePosts({ course }) {
  return (
    <>
      <Header size="large" dividing>
        Recent Posts about {course.name}
      </Header>
      <PostList />
    </>
  );
}