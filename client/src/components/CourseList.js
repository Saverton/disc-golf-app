import React from 'react';
import CourseListItem from './CourseListItem';
import { List } from 'semantic-ui-react';

export default function CourseList({ courses, onSelect }) {
  const coursesList = courses.map((c, idx) => (
    <CourseListItem key={`course-${idx}`} course={c} onClick={onSelect} />
  ));

  return (
    <List selection>
      {coursesList}
    </List>
  );
}