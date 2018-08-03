import React from 'react';
import PropTypes from 'prop-types';

const TitleWrapper = (props) => {
  const { title } = props;
  return (
    <div className="row">
      <label className="col">{title}</label>
    </div>
  );
};

TitleWrapper.propTypes = {
  title: PropTypes.string,
};

TitleWrapper.defaultProps = {
  title: '',
};

export default TitleWrapper;
