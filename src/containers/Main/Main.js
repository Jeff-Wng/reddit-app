import React, {Component} from 'react';
import Frontpage from '../../components/Frontpage/Frontpage';
import Navbar from '../../components/Navbar/Navbar';
import classes from './Main.css';
import Nopreview from '../../img/nopreview.png';
import Loader from '../../components/Loader/Loader';
import Logo from '../../img/redditlogo.png';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

let REDIRECT_URL = process.env.REACT_APP_REDIRECT_URL;
let CLIENT_ID = process.env.REACT_APP_CLIENT_ID;

class Main extends Component {
    componentDidMount() {
        this.props.getAccessToken();
        setTimeout(() => {
            if(sessionStorage.getItem('accessToken')) {
                this.props.tokenSuccess();
                this.props.getUserInfo();
            }
        },1000)
    }

    setUrl = (event) => {
        this.props.setSubUrl(event);
        this.props.setArticleUrl(event);
    }

    render() {
        let frontPage = this.props.frontPage.map(data => {
            return <Frontpage 
               key={data.id}
               id={data.id}
               title={data.title}
               author={data.author}
               sourceURL={data.url}
               img={data.thumbnail === "" || data.thumbnail === "spoiler" || data.thumbnail === 'default' || data.thumbnail === 'image' ||data.thumbnail === 'self' ? Nopreview : data.thumbnail}
               subreddit={data.subreddit}
               score={data.score}
               comments={data.num_comments}
               domain={data.domain}
               gilded={data.gilded}
               postHint={data.post_hint}
               setSubUrl={this.props.setSubUrl}
               setUrl={this.setUrl}
               isRedditDomain={data.is_reddit_media_domain} />
        })
        
        let content = null;
        if(this.props.hasToken) {
            content = 
                <div>
                    <Navbar />
                    <div className={classes.Content}>
                        <ul className={classes.Frontpage}>
                            {this.props.isLoading ? <Loader className={classes.Loader} /> : null}
                            {frontPage}
                        </ul>
                    </div>
                </div>
        } else {
            content =
                <div className={classes.Auth}>
                    <img src={Logo} alt='Reddit Logo' />
                    <h2>To use this app you must login to your Reddit account with the app</h2>
                    <a href={"https://www.reddit.com/api/v1/authorize?client_id="+CLIENT_ID+"&response_type=code&state=heydfik&redirect_uri="+REDIRECT_URL+"&duration=permanent&scope=identity read mysubreddits history"}><h3>Click here to connect your account</h3></a>
                </div>
        }

        return (
            <div>
                {content}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        frontPage: state.main.frontPage,
        subreddits: state.main.subreddits,
        isLoading: state.main.isLoading,
        subLoading: state.main.subLoading,
        hasToken: state.main.hasToken
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAccessToken: () => dispatch(actions.getAccessToken()),
        sortFrontPage: (event) => dispatch(actions.sortFrontPage(event)),
        setSubUrl: (event) => dispatch(actions.setSubUrl(event)),
        setArticleUrl: (event) => dispatch(actions.setArticleUrl(event)),
        tokenSuccess: () => dispatch(actions.tokenSuccess()),
        getUserInfo: () => dispatch(actions.getUserInfo())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
