import React from 'react';
import 'semantic-ui-css/semantic.css';
import {syncHistoryWithStore} from 'react-router-redux';
import {Router, IndexRedirect, Route, browserHistory, IndexRoute} from 'react-router';

import store from '../reducers/store';

import Menu from './Menu/MenuContainer.jsx';
import Login from './Login/LoginContainer.jsx';
import Home from './Home/HomeContainer.jsx';
import NotFound from './NotFound.jsx';
import Registration from './Registration/RegistrationContainer.jsx';

const history = syncHistoryWithStore(browserHistory, store);

export default () => {

    return (
        <Router history={history}>
            <Route path="/" component={Menu}>
                <IndexRoute component={Home}/>
            </Route>
            <Route path="/login" components={Login}/>
            <Route path="/registration" components={Registration}/>
            <Route path="*" component={NotFound}/>
        </Router>
    )
};



