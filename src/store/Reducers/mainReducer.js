import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    subreddits: [],
    frontPage: [],
    isLoading: false,
    subUrl:  ' ',
    articleUrl: ' ',
    hasToken: false
}

const isLoadingUser = (state, action) => {
    return updateObject(state, {
        isLoading: true,
        subLoading: true
    })
}

const isLoadingFrontPage = (state, action) => {
    return updateObject(state, {
        isLoading: true,
        frontPage: []
    })
}

const frontPageSuccess = (state, action) => {
    return updateObject(state, {
        isLoading: false,
        frontPage: action.frontPage
    })
}

const subSuccess = (state, action) => {
    return updateObject(state, {
        subreddits: action.subreddits
    })
}

const subUrlSuccess = (state, action) => {
    return updateObject(state, {
        subUrl: action.subUrl
    })
}

const articleUrlSuccess = (state, action) => {
    return updateObject(state, {
        articleUrl: action.articleUrl
    })
}

const tokenSuccess = (state, action) => {
    return updateObject(state, {
        hasToken: true
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.IS_LOADING_USER: return isLoadingUser(state, action);
        case actionTypes.IS_LOADING_FRONT_PAGE: return isLoadingFrontPage(state, action);
        case actionTypes.FRONT_PAGE_SUCCESS: return frontPageSuccess(state, action);
        case actionTypes.SUB_SUCCESS: return subSuccess(state, action);
        case actionTypes.SUB_URL_SUCCESS: return subUrlSuccess(state, action);
        case actionTypes.ARTICLE_URL_SUCCESS: return articleUrlSuccess(state, action);
        case actionTypes.TOKEN_SUCCESS: return tokenSuccess(state, action);
        default: return state;
    }
}

export default reducer;