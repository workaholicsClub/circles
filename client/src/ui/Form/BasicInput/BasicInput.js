import React from 'react';
import PropTypes from 'prop-types';

import TitleWrapper from '../TitleWrapper';

const RadioImgInput = (props) => {
  const {
    type,
    title,
    name,
    placeholder,
    onChange,
    onBlur,
    value,
    note,
  } = props;

  return (
    <React.Fragment>
      <TitleWrapper title={title} />
      <input
        type={type}
        name={name}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      />
      <small className="form-text">{note}</small>
    </React.Fragment>
  );
};

RadioImgInput.propTypes = {
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  note: PropTypes.string,
};

RadioImgInput.defaultProps = {
  type: 'text',
  placeholder: '',
  note: '',
};

export default RadioImgInput;
