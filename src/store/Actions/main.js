import * as actionTypes from './actionTypes';

let $ = require('jquery');

let REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
let CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
let CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET;

export const isLoadingUser = () => {
    return {
        type: actionTypes.IS_LOADING_USER
    }
}

export const isLoadingFrontPage = () => {
    return {
        type: actionTypes.IS_LOADING_FRONT_PAGE
    }
}

export const frontPageSuccess = (frontPage) => {
    return {
        type: actionTypes.FRONT_PAGE_SUCCESS,
        frontPage: frontPage
    }
}

export const subSuccess = (subreddits) => {
    return {
        type: actionTypes.SUB_SUCCESS,
        subreddits: subreddits
    }
}

export const subUrlSuccess = (subUrl) => {
    return {
        type: actionTypes.SUB_URL_SUCCESS,
        subUrl: subUrl
    }
}

export const articleUrlSuccess = (articleUrl) => {
    return {
        type: actionTypes.ARTICLE_URL_SUCCESS,
        articleUrl: articleUrl
    }
}

export const tokenSuccess = () => {
    return {
        type: actionTypes.TOKEN_SUCCESS
    }
}

export const getAccessToken = () => {
    return dispatch => {
        let code = dispatch(getUrlParams('code'));
        let data = {
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': REDIRECT_URL
        }
        $.post({
            url: 'https://www.reddit.com/api/v1/access_token',
            beforeSend: xhr => {
                xhr.setRequestHeader ("Authorization", "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET));
            },
            data: data,
            success: response => {
                if(response.access_token !== undefined) {
                    sessionStorage.setItem('accessToken', response.access_token);
                    sessionStorage.setItem('refreshToken', response.refresh_token);
                }
            },
            error: error => {
                console.log(error);
            }
        })
    }
}

export const getUrlParams = (paramName) => {
    return dispatch => {
        let url = window.location.search.substring(1);
        let urlVariables = url.split('&');
        for(let i = 0; i < urlVariables[i].length; i++) {
            let params = urlVariables[i].split('=');
            if(params[0] === paramName) {
                return params[1];
            }
        }
    }
}

export const getUserInfo = () => {
    return (dispatch, getState) => {
        dispatch(isLoadingUser());
        $.get({
            url: 'https://oauth.reddit.com/api/v1/me',
            beforeSend: xhr => {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('accessToken'))
            }
        }).then(response => {
            dispatch(getFrontPage('hot', getState().main.subUrl));
            sessionStorage.setItem('username', response.name);
            dispatch(getSubreddits());
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getFrontPage = (sort, sub) => {
    return dispatch => {
        dispatch(isLoadingFrontPage());
        let url = "https://oauth.reddit.com/"+sort+"/?limit=100";
        if(sub !== ' ') {
            url = "https://oauth.reddit.com/r/"+sub+'/'+sort+"/?limit=100";
        }
        $.get({
            url: url,
            beforeSend: xhr => {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('accessToken'))
            }
        }).then(response => {
            let fetchedFrontPage = [];
            for(let key in response.data.children) {
                fetchedFrontPage.push(response.data.children[key].data);
            }
            dispatch(frontPageSuccess(fetchedFrontPage));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const getSubreddits = () => {
    return dispatch => {
        $.get({
            url: "https://oauth.reddit.com/subreddits/mine/subscriber?limit=100",
            beforeSend: xhr => {
                xhr.setRequestHeader('Authorization', 'bearer ' + sessionStorage.getItem('accessToken'))
            }
        }).then(response => {
            let fetchedSubs = [];
            for(let key in response.data.children) {
                fetchedSubs.push(response.data.children[key].data.display_name);
            }
            fetchedSubs.sort((a, b) => {
                return a.toLowerCase().localeCompare(b.toLowerCase());
            })
            dispatch(subSuccess(fetchedSubs));
        }).catch(error => {
            console.log(error);
        })
    }
}

export const sortFrontPage = (event) => {
    return (dispatch, getState) => {
        dispatch(getFrontPage(event.target.id, getState().main.subUrl));
    }
}

export const setSubUrl = (event) => {
    return dispatch => {
        dispatch(subUrlSuccess(event.target.id));
        dispatch(getFrontPage('hot', event.target.id));
    }
}

export const setArticleUrl = (event) => {
    return dispatch => {
        dispatch(articleUrlSuccess(event.target.title))
    }
}