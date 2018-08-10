import React from 'react';
import logoImage from './logo.svg';

const CenteredLayout = (props) => {
  const { logo, title, children } = props;

  const showLogo = () => {
    if (logo) {
      return <img alt="logo" className="img-fluid d-block mx-5 pb-4" src={logoImage} />;
    }
    return null;
  };

  const showTitle = () => {
    if (title) {
      return <h1 className="display-4 text-center">{title}</h1>;
    }
    return null;
  };

  return (
    <div className="row align-items-center justify-content-center">
      <div className="col-md-6">
        {showLogo()}
        {showTitle()}
        {children}
      </div>
    </div>
  );
};

export default CenteredLayout;
