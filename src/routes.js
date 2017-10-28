import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import App from './components/App';
import SignupForm from './containers/SignupForm';

const MainRouter = () => (
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App} />
            <Route path='/signup' component={SignupForm} />
        </Switch>
    </HashRouter>
)

export default MainRouter