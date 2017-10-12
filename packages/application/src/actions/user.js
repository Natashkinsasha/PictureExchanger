import * as types from '../actions/types';
import authApi from '../api/auth'
import {routerActions} from 'react-router-redux';


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
                    return dispatch(routerActions.push('/'));

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
    return (dispatch) => {
        return authApi
            .logout()
            .then(
                (response) => {
                    const user = response.data.user;
                    dispatch(logoutSuccess(response));
                    return dispatch(routerActions.push('/'));
                },
                (err) => {
                    return dispatch(logoutFailure(err.response))
                }
            );
    };
}


function logoutSuccess(response) {
    return {
        type: types.LOGOUT_SUCCESS,
        response,
    };
}

function logoutFailure(response) {
    return {
        type: types.LOGIN_FAILURE,
        response,
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
                    dispatch(registrationSuccess(user, response));
                    return dispatch(routerActions.push('/'));
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


