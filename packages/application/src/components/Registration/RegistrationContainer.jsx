import React from 'react';
import Promise from 'bluebird';
import {connect} from 'react-redux';
import {goBack, push} from 'react-router-redux';

import Registration from './Registration.jsx';
import {registration} from '../../actions/user';


class RegistrationContainer extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                nickname: '',
                email: '',
                password: '',
                repeatPassword: '',
            },
            formLoading: false,
        };
        this.setStateAsync = Promise.promisify(this.setState);
    }

    onChange = (user) => {
        this.setState({user: {...this.state.user, ...user}});
    };

    onRegistrationClick = () => {
        return this.setStateAsync({formLoading: true})
            .then(() => {
                return this.props.onRegistration({
                    nickname: this.state.user.nickname,
                    email: this.state.user.email,
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

    onLoginClick = () => {
        return this.props.onLogin();
    };

    onBackClick = () => {
        return this.props.onBack();
    };


    render = () => {
        return (
            <Registration {...{...this, ...this.state}}/>
        )
    }
}

export default connect(
    undefined,
    (dispatch) => ({
        onRegistration: ({nickname, email, password,}) => {
            return dispatch(
                registration({
                    nickname,
                    email,
                    password,
                })
            );
        },
        onLogin: () => {
            return dispatch(push('/login'));
        },
        onBack: () => {
            return dispatch(push('/'));
        },
    })
)
(RegistrationContainer);