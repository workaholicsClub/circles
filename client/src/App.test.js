import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { JSDOM } from "jsdom";
const { document } = (new JSDOM(``)).window;

it('Отрисовка приложения', () => {
  const div = document.createElement('div');
  ReactDOM.render(<BrowserRouter><App /></BrowserRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});
