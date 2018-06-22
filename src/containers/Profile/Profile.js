import React, {Component} from 'react';
import classes from './Profile.css';
import Navbar from '../../components/Navbar/Navbar';
import ProfileComments from '../../components/Comments/ProfileComments/ProfileComments';
import FrontPage from '../../components/Frontpage/Frontpage';
import Loader from '../../components/Loader/Loader';
import Nopreview from '../../img/nopreview.png';
import {connect} from 'react-redux';
import * as actions from '../../store/Actions/index';

class Profile extends Component {
    state = {
        isProfile: false,
        tab: 'comments'
    }

    componentDidMount() {
        this.setState({isProfile: true}); 
        this.props.setUserInfo(this.props.user);
    }

    setUrl = (event) => {
        this.props.setSubUrl(event);
        this.props.setArticleUrl(event);
    }

    changeTab = (event) => {
        this.setState({tab: event.target.id});
    }
    
    render() {
        let content = <Loader />

        switch(this.state.tab) {
            case 'comments':
                content = this.props.userComments.map(data => {
                    return <ProfileComments
                        key={data.data.id}
                        id={data.data.link_id === undefined ? data.data.name : data.data.link_id}
                        user={data.data.author}
                        bodyHtml={data.data.body_html === undefined ? data.data.selftext_html : data.data.body_html}
                        distinguished={data.data.distinguished}
                        edited={data.data.edited}
                        gilded={data.data.gilded}
                        author={data.data.link_author === undefined ? data.data.author : data.data.link_author}
                        title={data.data.link_title === undefined ? data.data.title : data.data.link_title}
                        numComments={data.data.num_comments}
                        score={data.data.score}
                        scoreHidden={data.data.score_hidden}
                        stickied={data.data.stickied}
                        subreddit={data.data.subreddit}
                        setUrl={this.setUrl}
                        setSubUrl={this.props.setSubUrl}
                        setAuthor={this.props.setAuthor}
                        setUserInfo={this.props.setUserInfo}
                        clickedUser={this.props.user} />
                })
                break;
            case 'submitted':
                content = this.props.userSubmitted.map(data => {
                    return <FrontPage 
                        key={data.data.id}
                        id={data.data.id}
                        title={data.data.title}
                        author={data.data.author}
                        sourceURL={data.data.url}
                        img={data.data.thumbnail === "" || data.data.thumbnail === "spoiler" || data.data.thumbnail === 'default' || data.data.thumbnail === 'image' ||data.data.thumbnail === 'self' ? Nopreview : data.data.thumbnail}
                        subreddit={data.data.subreddit}
                        score={data.data.score}
                        comments={data.data.num_comments}
                        domain={data.data.domain}
                        gilded={data.data.gilded}
                        postHint={data.data.post_hint}
                        isRedditDomain={data.data.is_reddit_media_domain}
                        setSubUrl={this.props.setSubUrl}
                        setUrl={this.setUrl}
                        setUserInfo={this.props.setUserInfo} />
                })
                break;
            case 'upvoted':
                content = this.props.userUpvoted.map(data => {
                    return <FrontPage 
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
                        isRedditDomain={data.is_reddit_media_domain}
                        setSubUrl={this.props.setSubUrl}
                        setUrl={this.setUrl}
                        setUserInfo={this.props.setUserInfo} />
                })
                break;
            case 'downvoted':
                content = this.props.userDownvoted.map(data => {
                    return <FrontPage 
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
                        isRedditDomain={data.is_reddit_media_domain}
                        setSubUrl={this.props.setSubUrl}
                        setUrl={this.setUrl}
                        setUserInfo={this.props.setUserInfo} />
                })
                break;
            default:
                content = this.props.userComments.map(data => {
                    return <ProfileComments
                        key={data.data.id}
                        id={data.data.link_id === undefined ? data.data.name : data.data.link_id}
                        user={data.data.author}
                        bodyHtml={data.data.body_html === undefined ? data.data.selftext_html : data.data.body_html}
                        distinguished={data.data.distinguished}
                        edited={data.data.edited}
                        gilded={data.data.gilded}
                        author={data.data.link_author === undefined ? data.data.author : data.data.link_author}
                        title={data.data.link_title === undefined ? data.data.title : data.data.link_title}
                        numComments={data.data.num_comments}
                        score={data.data.score}
                        scoreHidden={data.data.score_hidden}
                        stickied={data.data.stickied}
                        subreddit={data.data.subreddit}
                        setUrl={this.setUrl}
                        setSubUrl={this.props.setSubUrl}
                        setAuthor={this.props.setAuthor}
                        setUserInfo={this.props.setUserInfo}
                        clickedUser={this.props.user} />
                })
                break;
        }

        return (
            <div>
                <Navbar 
                    isProfile={this.state.isProfile}
                    changeTab={this.changeTab} />
                <div className={classes.Content}>
                    <ul>
                        {content}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        userComments: state.main.userComments,
        userSubmitted: state.main.userSubmitted,
        userUpvoted: state.main.userUpvoted,
        userDownvoted: state.main.userDownvoted,
        user: state.main.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSubUrl: (event) => dispatch(actions.setSubUrl(event)),
        setArticleUrl: (event) => dispatch(actions.setArticleUrl(event)),
        setUserInfo: (user) => dispatch(actions.setUserInfo(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);