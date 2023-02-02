import React, { useState } from 'react';
import CourseSearch from './CourseSearch';

const DEFAULT_FORM_DATA = {
  body: '',
  course: {
    name: 'None',
    id: null
  }
};

export default function PostForm({ onSubmit, startData }) {
  const [formData, setFormData] = useState(startData || DEFAULT_FORM_DATA);
  if (!formData.course)
    formData.course = DEFAULT_FORM_DATA.course;

  // console.log(formData);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  }

  const handleSelectCourse = course => {
    setFormData({
      ...formData,
      course
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="body">Post Body</label>
      <textarea
        id="body"
        name="body"
        value={formData.body}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="course">Course Selection</label>
      <fieldset id="course">
        <h4>{formData.course?.name}</h4>
        <CourseSearch onSelect={handleSelectCourse} />
      </fieldset>
      <br />
      <input
        type="submit"
        value="Post"
      />
    </form>
  );
}