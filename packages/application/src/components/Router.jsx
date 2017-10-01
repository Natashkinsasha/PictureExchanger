import React from 'react';
import NotFound from './NotFound.jsx';
import {Router, IndexRedirect, Route, browserHistory, IndexRoute} from 'react-router';
import store from '../reducers/store';
import {connect} from 'react-redux';
import {syncHistoryWithStore} from 'react-router-redux';
import Menu from './Menu.jsx';
import LogIn from './LogIn.jsx';
import Pictures from './Pictures.jsx'
import 'semantic-ui-css/semantic.css';
import VisibleOnlyFor from '../util/auth';
import SingUp from './SignUp.jsx';

const history = syncHistoryWithStore(browserHistory, store);

const AppRouter = ({user}) => {

    return (
        <Router history={history}>
            <Route path="/" component={Menu}>
                <Route path='/pictures' component={Pictures}/>
            </Route>
            <Route path="/login" components={LogIn}/>
            <Route path="/singUp" components={SingUp}/>
            <Route path="*" component={NotFound}/>
        </Router>
    )
};


export default AppRouter;