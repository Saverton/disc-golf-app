import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPosts } from '../features/posts/postsSlice';
import { fetchCourseById } from '../features/courses/courseManagerSlice';
import DetailPage from './DetailPage';
import CourseCard from './CourseCard';
import CoursePosts from './CoursePosts';
import { Grid } from 'semantic-ui-react';

export default function CourseDetail() {
  const { id } = useParams();
  const { entity: course, loading } = useSelector(state => state.courseManager);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCourseById({ courseId: id }));
  }, [id, dispatch]);

  useEffect(() => {
    dispatch(setPosts(course?.posts));
  }, [course, dispatch]);

  // console.log(course);

  if (loading === 'pending') {
    return <main><h1>Loading...</h1></main>;
  }

  return (
    <Grid.Column width={15}>
      <DetailPage
        primary={<CourseCard course={course} />}
        secondary={<CoursePosts course={course} />}
      />
    </Grid.Column>
  );
}