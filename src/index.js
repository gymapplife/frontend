import React from 'react'
import { render } from 'react-dom'
import { compose, createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import thunk from 'redux-thunk'
import { logger } from 'redux-logger'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import rootReducer from './reducers'
import 'typeface-roboto'
import MainRouter from './routes'
import apiservice from './middleware/apiservice'

const store = createStore(
    rootReducer,
    undefined,
    compose(
        applyMiddleware(
            thunk,
            logger,
            apiservice,
        ),
        autoRehydrate()
    )
)

persistStore(store)

render(
    <Provider store={store}>
        <MuiThemeProvider>
          <MainRouter />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept('./components/App', () => { render(App) })
}
