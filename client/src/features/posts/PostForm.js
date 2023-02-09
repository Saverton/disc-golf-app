import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import CourseSearch from '../courses/CourseSearch';
import { Form, Label, TextArea } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  body: '',
  course: {
    name: 'None',
    id: null
  }
};

export default function PostForm({ onSubmit, startData }) {
  const [formData, setFormData] = useState({...(startData || DEFAULT_FORM_DATA)});
  const loading = useSelector(state => state.postManager.loading);
  if (!formData.course)
    formData.course = DEFAULT_FORM_DATA.course;

  // console.log(formData);

  useEffect(() => {
    setFormData({...(startData || DEFAULT_FORM_DATA)});
  }, [startData]);

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
    <Form onSubmit={handleSubmit} loading={loading === 'pending'}>
      <Form.Field
        control={TextArea}
        name="body"
        placeholder="Write something..."
        value={formData.body}
        onChange={handleChange}
      />
      <Form.Field>
        <label>Choose a Course</label>
        <Label
          color="blue"
          icon="map marker"
          content={formData.course?.name}
        />
        <CourseSearch onSelect={handleSelectCourse} />
      </Form.Field>
      <Form.Button type="submit">Publish</Form.Button>
    </Form>
  );
}