import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseSearch from './CourseSearch';

export default function Courses() {
  const navigate = useNavigate();

  const handleCourseClick = course => {
    navigate(`/courses/${course.id}`);
  }

  return (
    <main>
      <h2>Disc Golf Courses</h2>
      <CourseSearch onSelect={handleCourseClick} />
    </main>
  );
}