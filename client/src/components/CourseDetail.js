import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DetailPage from './DetailPage';
import CourseCard from './CourseCard';
import CoursePosts from './CoursePosts';
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

  console.log(course);

  if (!course?.id) {
    return <main><h1>Loading...</h1></main>;
  }

  return (
    <Grid.Column width={15}>
      <DetailPage
        primary={<CourseCard course={course} />}
        secondary={<CoursePosts course={course} />}
      />
    </Grid.Column>
  );
}