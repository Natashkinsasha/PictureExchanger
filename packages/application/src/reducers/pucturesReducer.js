import * as types from '../actions/types';

const initialState = {
    pictures: [],
    popularTags: [],
    response: null
};

export default (state = initialState, action) => {

    switch (action.type) {
        case types.GET_TAGS_SUCCESS:
            return {...state, popularTags: action.tags, response: action.response};
        case types.GET_TAGS_FAILURE:
            return {...state, response: action.response};
        case types.ADD_TAG:
            return {...state, popularTags: [...state.popularTags, action.tag]};
        case types.GET_PICTURES_SUCCESS:
            return {...state, pictures: action.pictures, response: action.response};
        case types.GET_PICTURES_FAILURE:
            return {...state, response: action.response};
    }
    return state;
};
