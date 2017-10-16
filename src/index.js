import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { logger } from 'redux-logger';
import rootReducer from './reducers'
import App from './components/App'
import SignupForm from './components/SignupForm'
import { HashRouter, Switch, Route } from 'react-router-dom'

const store = createStore(
    rootReducer,
    applyMiddleware(
        thunk,
        logger
    )
)

render(
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <Route exact path='/' component={App} />
        <Route path='/signup' component={SignupForm} />
      </Switch>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./components/App', () => { render(App) })
}
