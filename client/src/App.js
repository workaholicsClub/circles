import { Switch, Route } from 'react-router-dom';
import React from 'react';

import './styles/App.css';
import './styles/theme.css';
import './styles/font-awesome.css';

import * as p from './pages';
import MainLayout from './layouts/MainLayout';

const App = () => (
  <React.Fragment>
    <Switch>
      <MainLayout>
        <Route exact path="/" component={p.Home} />
        <Route exact path="/register" component={p.Register} />
      </MainLayout>
      {/* <Route component={p.NotFound} /> */}
    </Switch>
  </React.Fragment>
);

export default App;
