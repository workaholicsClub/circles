import React from 'react';
import PropTypes from 'prop-types';

import TitleWrapper from '../TitleWrapper';
import NoteWrapper from '../NoteWrapper';
import InputFieldWrapper from '../InputFieldWrapper';
import ErrorFiled from '../ErrorField';
import { Field } from '../../../../node_modules/formik';

const Textarea = (props) => {
  const {
    title, name, note, ...rest
  } = props;

  return (
    <InputFieldWrapper>
      <TitleWrapper title={title} />
      <Field
        name={name}
        render={({ field }) => (
          <textarea {...field} {...rest} name={name} className="form-control" />
        )}
      />

      <NoteWrapper note={note} />
      <ErrorFiled name={name} />
    </InputFieldWrapper>
  );
};

Textarea.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  note: PropTypes.string,
};

Textarea.defaultProps = {
  placeholder: '',
  note: '',
};

export default Textarea;
