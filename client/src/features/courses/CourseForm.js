import React, { useState, useCallback } from 'react';
import { useSelector } from 'react-redux';
import AddressField from '../../components/AddresField';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  name: '',
  address: '',
  num_holes: 18,
  description: ''
};

export default function CourseForm({ onSubmit }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const errors = useSelector(state => state.courses.errors);

  /**
   * Updates the form component's state to reflect the form.
   * @param {String} name (name of the key to update)
   * @param {*} value (value to assign to key)
   */
  const updateState = useCallback((name, value) => {
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }, []);

  /**
   * Collects change information from the form, passes it to the state update function.
   * @param {Object} e (event)
   */
  const handleChange = e => {
    const { name, value } = e.target;
    updateState(name, value);
  }

  /**
   * Compiles form data into a FormData object, and passes it to the onSubmit callback.
   * @param {Object} e (event)
   */
  const handleSubmit = e => {
    e.preventDefault();

    const data = new FormData();

    data.append("course[image]", e.target.image.files[0]);
    Object.keys(formData).forEach(key => {
      data.append(`course[${key}]`, formData[key]);
    })

    onSubmit(data);
  }

  /**
   * Get the errors associated with a certain field on the form.
   * @param {String} name (name of the error key/field)
   * @returns {String} comma separated error messages
   */
  const getErrors = name => (
    errors[name]?.length > 0
    ? {
      content: errors[name].join(', '),
      pointing: 'below'
    }
    : false
  );

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field
        control={Input}
        label="Course Name"
        name="name"
        placeholder="Anson B. Nixon Park"
        required
        value={formData.name}
        onChange={handleChange}
        error={getErrors('name')}
      />
      <Form.Field
        control={AddressField}
        label="Course Address"
        required
        onChange={updateState}
        error={getErrors('address')}
      />
      <Form.Field
        control={Input}
        type="number"
        label="Number of Holes"
        name="num_holes"
        placeholder="18"
        required
        min={1}
        value={formData.num_holes}
        onChange={handleChange}
        error={getErrors('num_holes')}
      />
      <Form.Field
        control={TextArea}
        rows={2}
        label="Course Description"
        name="description"
        placeholder="Talk about layouts, terrain, obstacles, restrictions, etc..."
        required
        value={formData.description}
        onChange={handleChange}
        error={getErrors('description')}
      />

      <Form.Field
        control={Input}
        type="file"
        label="Course Image"
        name="image"
        error={getErrors('image')}
      />

      <Button type="submit" positive>
        Upload
      </Button>
    </Form>
  );
}