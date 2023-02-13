import React, { useState } from 'react';
import { Form, Input, Icon } from 'semantic-ui-react';

function capitalize(str) {
  let strArr = str.split(/[\s_-]/);
  strArr = strArr.map(word => word[0].toUpperCase() + word.slice(1).toLowerCase());
  return strArr.join(' ');
}

function PasswordInput({ name, onChange, value, error }) {
  const [show, setShow] = useState(false);

  function handleShowToggle() {
    setShow(show => !show);
  }

  return (
    <>
      <Form.Field>
        <label>{capitalize(name)}</label>
        <Input
          type={show ? "text" : "password"}
          name={name}
          placeholder="password"
          value={value}
          onChange={onChange}
          error={error || false}
          icon
        >
          <input />
          <Icon name={show ? "hide" : "unhide" } link onClick={handleShowToggle} />
        </Input>
      </Form.Field>

    </>
  );
}

export default PasswordInput;