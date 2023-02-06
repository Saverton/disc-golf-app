import React, { useState, useCallback } from 'react';
import AddressField from './AddresField';
import { Button, Form, Input, TextArea } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  name: '',
  address: '',
  num_holes: 18,
  description: ''
};

export default function CourseForm({ onSubmit, errors }) {
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);

  const updateState = useCallback((name, value) => {
    setFormData(formData => ({
      ...formData,
      [name]: value
    }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    updateState(name, value);
  }

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(formData);
  }

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
      <Button type="submit" positive>
        Upload
      </Button>
    </Form>
  );
}