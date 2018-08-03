import React from 'react';
import PropTypes from 'prop-types';

import TitleWrapper from '../TitleWrapper';

const Textarea = (props) => {
  const {
    title, name, placeholder, onChange, onBlur, value, note,
  } = props;

  return (
    <React.Fragment>
      <TitleWrapper title={title} />
      <textarea
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
