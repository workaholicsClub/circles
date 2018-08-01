import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
// import { Provider } from 'react-redux'
// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { createLogger } from 'redux-logger'
// import reducer from './reducers'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

import stores from './stores'
import { Provider } from 'mobx-react'
// import 'semantic-ui-css/semantic.min.css'

// const middleware = [thunk]
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

// const store = createStore(reducer, applyMiddleware(...middleware))
// console.log(stores)

ReactDOM.render(
  <Provider {...stores}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
