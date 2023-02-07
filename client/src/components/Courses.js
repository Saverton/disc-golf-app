import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CourseSearch from './CourseSearch';
import { Button, Header, Grid } from 'semantic-ui-react';

export default function Courses() {
  const navigate = useNavigate();

  const handleCourseClick = course => {
    navigate(`/site/courses/${course.id}`);
  }

  return (
    <Grid.Column width={10}>
      <Header size="large" dividing>Disc Golf Courses</Header>
      <CourseSearch onSelect={handleCourseClick} />
      <p>Can't find the course you're looking for?</p>
      <Button as={Link} to="/site/new_course">Upload a new Course</Button>
    </Grid.Column>
  );
}