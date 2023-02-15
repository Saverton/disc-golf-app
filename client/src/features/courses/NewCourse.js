import React, { useEffect, useContext } from 'react';
import { NavigateContext } from '../../context/NavigateContext';
import { useDispatch, useSelector } from 'react-redux';
import { addCourse } from './courseManagerSlice';
import CourseForm from './CourseForm';
import { Grid, Header } from 'semantic-ui-react';

export default function NewCourse() {
  const navigate = useContext(NavigateContext);
  const dispatch = useDispatch();
  const id = useSelector(state => state.user.id);

  // Redirect user to the login page if not logged in
  useEffect(() => {
    if (!id) navigate('/login');
  }, [id]);

  /**
   * Add a new Disc Golf Course to the Database, redirect user to the course's page if successful.
   * @param {FormData} courseData 
   */
  const createCourse = courseData => {
    dispatch(addCourse({courseData})).unwrap()
      .then(res => {
        navigate(`/courses/${res.id}`);
      })
      .catch(err => {
        console.log(err);
      });
  }

  return (
    <Grid.Column computer={10} mobile={14}>
      <Header size="large" dividing>Upload a New Course's Data</Header>
      <CourseForm onSubmit={createCourse} />
    </Grid.Column>
  );
}