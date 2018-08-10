import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'formik';

import TitleWrapper from '../TitleWrapper';
import NoteWrapper from '../NoteWrapper';
import InputFieldWrapper from '../InputFieldWrapper';
import ErrorFiled from '../ErrorField';

const BasicInput = (props) => {
  const {
    name, title, note, ...rest
  } = props;

  return (
    <InputFieldWrapper>
      <TitleWrapper title={title} />
      <Field
        name={name}
        render={({ field }) => <input {...field} {...rest} name={name} className="form-control" />}
      />
      <NoteWrapper note={note} />
      <ErrorFiled name={name} />
    </InputFieldWrapper>
  );
};

BasicInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  note: PropTypes.string,
};

BasicInput.defaultProps = {
  type: 'text',
  placeholder: '',
  note: '',
};

export default BasicInput;
