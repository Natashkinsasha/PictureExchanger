import React from 'react';
import Home from './Home.jsx';
import NotFound from './NotFound.jsx';
import {Router, IndexRedirect, Route, browserHistory, IndexRoute} from 'react-router';
import store from '../reducers/store';;
import {syncHistoryWithStore} from 'react-router-redux';
import Menu from './Menu/Menu.jsx';
import Login from './Login/LoginContainer.jsx';
import 'semantic-ui-css/semantic.css';
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



