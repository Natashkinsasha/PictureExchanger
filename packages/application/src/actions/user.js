import * as types from '../actions/types';

export function loginSuccess(user, response) {
    return {
        type: types.LOGIN_SUCCESS,
        response,
        user,
    };
}

export function loginFailure(response) {
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

export function registrationFailure(response) {
    return {
        type: types.REGISTRATION_FAILURE,
        response,
    };
}

export function registrationSuccess(user, response) {
    return {
        type: types.REGISTRATION_SUCCESS,
        response,
        user,
    };
}


