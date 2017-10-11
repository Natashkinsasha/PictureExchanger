import React from 'react';
import Promise from "bluebird";
import {connect} from 'react-redux';
import {push} from 'react-router-redux';


import Login from './Login.jsx';
import {login} from '../../actions/user';


class LoginContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                nicknameOrEmail: '',
                password: '',
            },
            formLoading: false,
        };
        this.setStateAsync = Promise.promisify(this.setState);
    }

    onChange = (user) => {
        this.setState({user: {...this.state.user, ...user}});
    };

    onLoginClick = () => {
        return this.setStateAsync({formLoading: true})
            .then(() => {
                return this.props.onLogin({
                    nicknameOrEmail: this.state.user.nicknameOrEmail,
                    password: this.state.user.password
                });
            })
            .finally(() => {
                return this.setStateAsync({formLoading: false})
            })
            .catch((err) => {
                console.error(err);
            })
    };

    onBackClick = () => {
        return this.props.onBack();
    };

    render = () => {
        return (
            <Login {...{...this, ...this.state}}/>
        )
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        onBack: () => {
            return dispatch(push('/'));
        },
        onLogin: ({nicknameOrEmail, password}) => {
            return dispatch(login({nicknameOrEmail, password}));
        },
        onHome: () => {
            return dispatch(push('/'));
        },
    })
)
(LoginContainer);