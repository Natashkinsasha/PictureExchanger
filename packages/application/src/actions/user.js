import * as types from '../actions/types';
import authApi from '../api/auth'
import {push} from 'react-router-redux';


export function login({nicknameOrEmail, password}) {
    return (dispatch) => {
        return authApi
            .login({
                nicknameOrEmail,
                password,
            })
            .then(
                (response) => {
                    const user = response.data.user;
                    dispatch(loginSuccess(user, response));
                    return dispatch(push('/'));

                },
                (err) => {
                    return dispatch(loginFailure(err.response))
                }
            );
    };
}

function loginSuccess(user, response) {
    return {
        type: types.LOGIN_SUCCESS,
        response,
        user,
    };
}

function loginFailure(response) {
    return {
        type: types.LOGIN_FAILURE,
        response,
    };
}


export function logout() {
    return {
        type: types.LOGOUT,
    };
}


export function registration({nickname, email, password}) {
    return (dispatch) => {
        return authApi
            .registration({
                nickname,
                email,
                password,
            })
            .then(
                (response) => {
                    const user = response.data.user;
                    return dispatch(registrationSuccess(user, response))
                },
                (err) => {
                    return dispatch(registrationFailure(err.response))
                }
            );
    };
}

function registrationFailure(response) {
    return {
        type: types.REGISTRATION_FAILURE,
        response,
    };
}

function registrationSuccess(user, response) {
    return {
        type: types.REGISTRATION_SUCCESS,
        response,
        user,
    };
}


