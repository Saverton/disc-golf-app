import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchCourses } from '../features/courses/coursesSlice';
import SearchForm from './SearchForm';
import CourseList from './CourseList';

export default function CourseSearch({ onSelect }) {
  const dispatch = useDispatch();

  /**
   * Dispath a fetch to get a list of up to 15 courses given a search term.
   * @param {string} searchText 
   */
  const getCourses = (searchText = '') => {
    dispatch(fetchCourses(searchText));
  }

  useEffect(getCourses, [dispatch]);

  return (
    <section>
      <SearchForm onSubmit={getCourses} />
      <CourseList onSelect={onSelect} />
    </section>
  );
}