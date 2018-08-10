import React from 'react';

const MainLayout = (props) => {
  const { children } = props;

  return (
    <div className="py-5">
      <div className="container">{children}</div>
    </div>
  );
};

export default MainLayout;
