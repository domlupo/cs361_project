import React from 'react';
import { FormLabel, FormGroup, FormControl } from 'react-bootstrap';

function InputBox(props) {
  const { label, name, type, dataVal, handleChange } = props;

  return (
    <FormGroup controlId={name} bssize="large">
      <FormLabel>{label}</FormLabel>
      <FormControl
        name={name}
        type={type}
        value={dataVal}
        onChange={handleChange}
      />
    </FormGroup>
  );
}

export default InputBox;
