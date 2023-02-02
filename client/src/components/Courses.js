import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';

export default function Courses() {
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

  const coursesList = courses.map((c, idx) => <li key={`course-${idx}`}>{c.name}</li>);

  return (
    <main>
      <h2>Disc Golf Courses</h2>
      <SearchForm onSubmit={fetchCourses} />
      <ul>
        {coursesList}
      </ul>
    </main>
  );
}