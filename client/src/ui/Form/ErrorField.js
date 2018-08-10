import React from 'react';
import { Field } from 'formik';

const ErrorField = ({ name }) => (
  <Field
    name={name}
    render={({ form: { touched, errors } }) =>
      (touched[name] && errors[name] ? <div style={{ color: 'red' }}>{errors[name]}</div> : null)
    }
  />
);

export default ErrorField;
