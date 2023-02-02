import React, { useState, useEffect, useCallback } from 'react';

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
      <label htmlFor="street1">Street Address</label>
      <input
        type="text"
        id="street1"
        name="street1"
        placeholder="405 N Walnut Rd"
        required
        value={address.street1}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
        name="city"
        placeholder="Kennett Square"
        required
        value={address.city}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="state">State</label>
      <input
        type="text"
        id="state"
        name="state"
        placeholder="PA"
        required
        pattern="[A-Za-z]{2}"
        value={address.state}
        onChange={handleChange}
      />
      <br />
      <label htmlFor="zipcode">Street Address</label>
      <input
        type="text"
        id="zipcode"
        name="zipcode"
        placeholder="19348"
        required
        pattern="\d{5}"
        value={address.zipcode}
        onChange={handleChange}
      />
      <br />
    </fieldset>
  );
}