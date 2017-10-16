import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import rootReducer from './reducers'
import 'typeface-roboto'
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
        <MuiThemeProvider>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/App', () => { render(App) })
}
