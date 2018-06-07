import * as actionTypes from '../Actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    content: [],
    comments: [],
    isLoading: false
}

const setLoading = (state, action) => {
    return updateObject(state, {
        isLoading: action.value
    })
}

const setArticle = (state, action) => {
    return updateObject(state, {
        content: action.content,
        comments: action.comments
    })
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.SET_LOADING: return setLoading(state, action);
        case actionTypes.SET_ARTICLE: return setArticle(state, action);
        default: return state;
    }
}

export default reducer;