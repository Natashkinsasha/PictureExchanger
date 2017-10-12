import * as types from '../actions/types';
import pictureApi from '../api/picture';
import {isEmpty} from 'ramda';

export function getPopularTags(){
    return (dispatch, getState)=>{
        const store = getState();
        if(isEmpty(store.picturesState.popularTags)){
            return pictureApi
                .getPopularTags({})
                .then((response)=>{
                    dispatch(getPopularTagsSuccess(response.data, response));
                }, (err)=>{
                    dispatch(getPopularTagsFailure(err.response));
                })
        }
    };

}


export function addTag(tag) {
    return {
        type: types.ADD_TAG,
        tag,
    }
}


function getPopularTagsSuccess(tags, response) {
    return {
        type: types.GET_TAGS_SUCCESS,
        response,
        tags,
    }
}


function getPopularTagsFailure(response) {
    return {
        type: types.GET_TAGS_FAILURE,
        response,

    }
}

export function getPictures({}){
    return (dispatch)=>{
        return pictureApi
            .getPictures({})
            .then((response)=>{
                dispatch(getPicturesSuccess(response.data, response));
            }, (err)=>{
                dispatch(getPicturesFailure(err.response));
            })
    };

}

function getPicturesSuccess(pictures, response) {
    return {
        type: types.GET_TAGS_SUCCESS,
        response,
        pictures,
    }
}


function getPicturesFailure(response) {
    return {
        type: types.GET_TAGS_FAILURE,
        response,

    }
}