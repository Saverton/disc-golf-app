import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';

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

  const coursesList = courses.map((c, idx) => (
    <li
      key={`course-${idx}`}
      onClick={() => onSelect(c)}
    >
      {c.name}
    </li>
  ));

  return (
    <section>
      <SearchForm onSubmit={fetchCourses} />
      <ul>
        {coursesList}
      </ul>
    </section>
  );
}