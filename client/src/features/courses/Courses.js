import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CourseSearch from './CourseSearch';
import { Button, Header, Grid, Divider } from 'semantic-ui-react';

export default function Courses() {
  const navigate = useNavigate();

  const handleCourseClick = course => {
    navigate(`/courses/${course.id}`);
  }

  return (
    <Grid.Column computer={10} mobile={14}>
      <Header size="large" dividing>Disc Golf Courses</Header>

      <CourseSearch onSelect={handleCourseClick} />

      <Divider hidden />

      <p style={{fontSize: '1.25rem'}}>Can't find the course you're looking for?</p>
      <Button as={Link} to="/new_course" primary>
        Upload a new Course
      </Button>
    </Grid.Column>
  );
}