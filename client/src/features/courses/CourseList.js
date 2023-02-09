import React from 'react';
import { useSelector } from 'react-redux';
import CourseListItem from './CourseListItem';
import { List } from 'semantic-ui-react';

export default function CourseList({ onSelect }) {
  const courses = useSelector(state => state.courses.entities);

  const coursesList = courses.map((c, idx) => (
    <CourseListItem key={`course-${idx}`} course={c} onClick={onSelect} />
  ));

  return (
    <List selection>
      {coursesList}
    </List>
  );
}