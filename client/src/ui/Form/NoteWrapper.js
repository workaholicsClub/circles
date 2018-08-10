import React from 'react';
import PropTypes from 'prop-types';

const NoteWrapper = (props) => {
  const { note } = props;
  return <small className="form-text">{note}</small>;
};

NoteWrapper.propTypes = {
  note: PropTypes.string,
};

NoteWrapper.defaultProps = {
  note: '',
};

export default NoteWrapper;
