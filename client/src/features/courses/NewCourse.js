import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCourse } from './courseManagerSlice';
import CourseForm from './CourseForm';
import { Grid, Header } from 'semantic-ui-react';

export default function NewCourse() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const createCourse = courseData => {
    dispatch(addCourse({courseData})).unwrap()
      .then(res => {
        console.log(res);
        navigate(`/courses/${res.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Upload a New Course's Data</Header>
      <CourseForm onSubmit={createCourse} />
    </Grid.Column>
  );
}