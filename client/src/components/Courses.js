import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CourseSearch from './CourseSearch';
import { Button } from '../styled-components/Buttons';

export default function Courses() {
  const navigate = useNavigate();

  const handleCourseClick = course => {
    navigate(`/courses/${course.id}`);
  }

  return (
    <main>
      <h2>Disc Golf Courses</h2>
      <CourseSearch onSelect={handleCourseClick} />
      <p>Can't find the course you're looking for?</p>
      <Button as={Link} to="/new_course">Upload a new Course</Button>
    </main>
  );
}