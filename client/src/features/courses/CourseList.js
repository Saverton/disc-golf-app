import React from 'react';
import { useSelector } from 'react-redux';
import CourseListItem from './CourseListItem';
import ListLoader from '../../components/ListLoader';
import { List, Icon, Header } from 'semantic-ui-react';

export default function CourseList({ onSelect }) {
  const { entities: courses, loading } = useSelector(state => state.courses);

  const coursesList = courses.map((c, idx) => (
    <CourseListItem key={`course-${idx}`} course={c} onClick={onSelect} />
  ));

  return (
    <>
      <ListLoader loading={loading} />
      {
        courses.length === 0
        ? (
          <Header icon textAlign="center" size="large">
            <Icon name="find" size="large" />
            <Header.Content>No Courses found...</Header.Content>
          </Header>
        ) : (
          <List selection>
            {coursesList}
          </List>
        )
      }
    </>
  );
}