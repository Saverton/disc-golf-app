import React, { useState, useEffect, useCallback } from 'react';
import { Form, Input } from 'semantic-ui-react';

const DEFAULT_FORM_DATA = {
  street1: '',
  city: '',
  state: '',
  zipcode: ''
};

export default function AddressField({ onChange }) {
  const [address, setAddress] = useState(DEFAULT_FORM_DATA);

  const handleChange = e => {
    const { name, value } = e.target;
    setAddress({
      ...address,
      [name]: value
    })
  }

  const stringify = useCallback(() => {
    return `${address.street1}, ${address.city}, ${address.state} ${address.zipcode}`;
  }, [address]);

  useEffect(() => {
    onChange('address', stringify());
  }, [stringify, onChange]);

  return (
    <fieldset>
      <Form.Field
        control={Input}
        label="Street Address"
        name="street1"
        placeholder="405 N Walnut Rd"
        required
        value={address.street1}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label="City"
        name="city"
        placeholder="Kennett Square"
        required
        value={address.city}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label="State"
        name="state"
        placeholder="PA"
        required
        pattern="[A-Za-z]{2}"
        value={address.state}
        onChange={handleChange}
      />
      <Form.Field
        control={Input}
        label="Zip Code"
        name="zipcode"
        placeholder="19348"
        required
        pattern="\d{5}"
        value={address.zipcode}
        onChange={handleChange}
      />
    </fieldset>
  );
}