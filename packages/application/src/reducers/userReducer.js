import * as types from '../actions/types';

const initialState = {
    user: {
        roles: ["guest"]
    },
    isAuthorized: false,
    response: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {...state, user: action.user, isAuthorized: true};
        case types.LOGIN_FAILURE:
            return {...state, response: action.response};
        case types.LOGOUT_SUCCESS:
            return {...initialState, response: action.response};
        case types.LOGOUT_FAILURE:
            return {...initialState, response: action.response};
        case types.REGISTRATION_SUCCESS:
            return {...state, user: action.user, isAuthorized: true};
        case types.REGISTRATION_FAILURE:
            return {...state, response: action.response};
    }
    return state;
};

