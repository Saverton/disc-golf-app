import React from "react";
import { List } from 'semantic-ui-react';

export default function CourseListItem({ course, onClick }) {
  const handleClick = () => {
    onClick(course);
  }

  return (
    <List.Item icon="map marker" content={course.name} onClick={handleClick} />
  );
}