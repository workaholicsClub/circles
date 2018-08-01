import { Switch, Route } from 'react-router-dom';
import React from 'react';

import * as p from './pages';

import './styles/App.css';
import './styles/theme.css';
import './styles/font-awesome.css';

const App = () => (
  <div>
    <hr />
    <div className="content">
      <Switch>
        <Route exact path="/" component={p.Home} />
        <Route exact path="/register" component={p.Register} />
        <Route component={p.NotFound} />
      </Switch>
    </div>
  </div>
);

export default App;
