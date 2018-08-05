import React from 'react';
import PropTypes from 'prop-types';

const SubmitButton = ({ disabled, text }) => (
  <button disabled={disabled} className="btn btn-primary btn-block btn-lg" type="submit">
    {text}
  </button>
);

SubmitButton.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool,
};

SubmitButton.defaultProps = {
  text: '',
  disabled: false,
};

export default SubmitButton;
