import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Register from "./views/Register";
import Video from "./views/Video";

import './styles/theme.css';
import './styles/font-awesome.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/register' component={Register} />
            <Route path='/video' component={Video} />
        </Switch>
    </BrowserRouter>,
    document.getElementById('root')
);