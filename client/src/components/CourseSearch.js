import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import CourseList from './CourseList';

export default function CourseSearch({ onSelect }) {
  onSelect ||= () => {}; // TODO: Callback for click in Courses.js
  const [courses, setCourses] = useState([]);

  const fetchCourses = (searchText = '') => {
    fetch(`/api/courses?name=${searchText}`)
      .then(res => {
        if (res.ok) {
          res.json().then(setCourses);
        } else {
          res.json().then(console.log);
        }
      });
  }

  useEffect(fetchCourses, []);

  return (
    <section>
      <SearchForm onSubmit={fetchCourses} />
      <CourseList onSelect={onSelect} courses={courses} />
    </section>
  );
}