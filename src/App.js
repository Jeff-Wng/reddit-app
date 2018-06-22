import React, { Component } from 'react';
import './App.css';
import Main from './containers/Main/Main';
import SubredditPage from './containers/SubredditPage/SubredditPage';
import Article from './containers/Article/Article';
import Profile from './containers/Profile/Profile';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path='/' exact component={Main} />
        <Route path={'/' + this.props.subUrl} exact component={SubredditPage}/>
        <Route path={'/' + this.props.subUrl + '/' + this.props.articleUrl} exact component={Article} />
        <Route path={'/user/' + this.props.user} exact component={Profile} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subUrl: state.main.subUrl,
    articleUrl: state.main.articleUrl,
    user: state.main.user
  }
}

export default withRouter(connect(mapStateToProps)(App));
