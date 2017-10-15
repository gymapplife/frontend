import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers'
import App from './components/App'

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger
    )
)

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
