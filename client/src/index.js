import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

import stores from './stores';

ReactDOM.render(
  <Provider {...stores}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
