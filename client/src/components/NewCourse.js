import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';
import { Grid, Header } from 'semantic-ui-react';

export default function NewCourse() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  const createCourse = courseData => {
    fetch('/api/courses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(courseData)
    })
      .then(res => {
        if (res.ok) {
          res.json().then(course => {
            navigate(`/courses/${course.id}`);
          });
        } else {
          res.json().then(setErrors);
        }
      })
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Upload a New Course's Data</Header>
      <CourseForm onSubmit={createCourse} errors={errors} />
    </Grid.Column>
  );
}