import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CourseForm from './CourseForm';

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
    <main>
      <h1>Upload a new Disc Golf Course</h1>
      <CourseForm onSubmit={createCourse} />
      <ul>
        {errors.map((e, idx) => <li key={`error-${idx}`}>{e}</li>)}
      </ul>
    </main>
  );
}