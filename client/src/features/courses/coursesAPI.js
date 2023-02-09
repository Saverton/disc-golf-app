/**
 * Fetch courses from API with an optional name parameter
 * @param {string} name 
 * @returns Promise w/ backend response data
 */
function fetchCourses(name = '') {
  return (
    fetch(`/api/courses?name=${name}`)
      .then(res => res.json())
      .catch(err => ({ errors: ['Bad Request'] }))
  );
}

/**
 * Post a new course to the backend given the course's data
 * @param {FormData} courseData 
 * @returns Promise w/ backend response data
 */
function fetchPostCourse(courseData) {
  return (
    fetch('/api/courses', {
      method: 'POST',
      body: courseData
    })
      .then(res => res.json())
  );
}

/**
 * Fetch a specific course's detailed information given it's ID.
 * @param {number} courseId 
 * @returns 
 */
function fetchCourseById(courseId) {
  return (
    fetch(`/api/courses/${courseId}`)
      .then(res => res.json())
  );
}

const coursesAPI = {
  fetchCourses,
  fetchPostCourse,
  fetchCourseById
};

export default coursesAPI;