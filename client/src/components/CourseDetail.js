import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PostList from './PostList';
import Likes from './Likes';
import { Grid } from 'semantic-ui-react';

export default function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState({});

  useEffect(() => {
    fetch(`/api/courses/${id}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setCourse);
        } else {
          res.json().then(console.log);
        }
      })
  }, [id]);

  // console.log(course);

  if (Object.keys(course).length === 0) {
    return <main><h1>Loading...</h1></main>;
  }

  return (
    <Grid.Column width={14}>
      <h1>{course.name}</h1>
      <h3>{course.address}</h3>
      <h3>{course.num_holes} holes</h3>
      <p>{course.description}</p>
      <Likes likable={course} type="Course" />
      <div>
        <h3>Recent posts about {course.name}</h3>
        <Grid.Row centered>
          <PostList posts={course.posts} />
        </Grid.Row>
      </div>
    </Grid.Column>
  );
}