import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import mainReducer from '../src/store/Reducers/mainReducer';
import articleReducer from '../src/store/Reducers/articleReducer';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

const rootReducer = combineReducers({
    main: mainReducer,
    article: articleReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

const app = (
    <Provider store={store}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <ScrollToTop>
                <App />
            </ScrollToTop>
        </BrowserRouter>
    </Provider>
)


ReactDOM.render( app, document.getElementById('root'));
registerServiceWorker();
