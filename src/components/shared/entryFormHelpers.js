import React from 'react';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';

function InputBox(props) {
  const { label, name, type, value, handleChange } = props;

  return (
    <FormGroup controlId={name} bssize="large">
      <FormLabel>{label}</FormLabel>
      <FormControl
        name={name}
        type={type}
        value={value}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

export default InputBox;
