import * as actionTypes from './actionTypes';

let $ = require('jquery');

export const setLoading = (value) =>{
    return {
        type: actionTypes.SET_LOADING,
        isLoading: value
    }
}

// passes comments and content or the article to state
export const setArticle = (content, comments) => {
    return {
        type: actionTypes.SET_ARTICLE,
        content: content,
        comments: comments
    }
}

export const getArticle = () => {
    return (dispatch, getState) => {
        dispatch(setLoading(true));
        $.get({
            url: "https://www.reddit.com/r/" + getState().main.subUrl + "/" + getState().main.articleUrl + '/.json'
        }).then(response => {
            let fetchedContent = [];
            let fetchedComments = [];
            fetchedContent.push(response[0].data.children[0].data);
            for(let key in response[1].data.children) {
                fetchedComments.push(response[1].data.children[key].data);
            }
            dispatch(setArticle(fetchedContent, fetchedComments));
        })
        dispatch(setLoading(false));
    }
}