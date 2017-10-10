import React from 'react';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import Menu from './Menu.jsx';

import {logout} from '../../actions/user';

class MenuContainer extends React.Component {

    constructor(props) {
        super(props);
    }

    onEmailClick = () => {
        return this.props.onEmail();
    };

    onRegistrationClick = () => {
        return this.props.onRegistration();
    };

    onVKClick = () => {

    };

    onFacebookClick = () => {
    };

    onLogoutClick = () => {
        return this.props.onLogout();
    };


    render = () => {
        return (
            <Menu {...{...this.props, ...this}}>
                {this.props.children}
            </Menu>
        )
    }

}


export default connect(
    (store) => {
        return {
            user: store.userState.user,
            isAuthorized: store.userState.isAuthorized,
        }
    },
    dispatch => ({
        onEmail: () => {
            return dispatch(push('/login'));
        },
        onLogout: () => {
            return dispatch(logout())
        },
        onRegistration: () => {
            return dispatch(push('/registration'))
        },
    })
)
(MenuContainer)

