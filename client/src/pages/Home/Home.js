import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { CenteredLayout } from '../../layouts/CenteredLayout';

class Home extends Component {
  render() {
    return (
      <CenteredLayout logo title="Circles">
        <Link to="/register" className="btn btn-primary btn-block btn-lg">
          Регистрация
        </Link>
      </CenteredLayout>
    );
  }
}

export default Home;
