import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Frontpage from '../../components/Frontpage/Frontpage';
import Loader from '../../components/Loader/Loader';
import Nopreview from '../../img/nopreview.png';
import {connect} from 'react-redux';
import classes from '../Main/Main.css';
import * as actions from '../../store/Actions/index';

class SubredditPage extends Component {
    setUrl = (event) => {
        // Retrieves the subreddit of the article and the article url from the front page
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
                // Reddit has multiple tags for imgs, many of which does not include pictures
                // Therefore these if statements are for displaying a placeholder image for the articles that does not have a thumbnail
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

        return (
            <div>
                <Navbar />
                <div className={classes.Content}>
                    <ul className={classes.Frontpage}>
                        {this.props.isLoading ? <Loader className={classes.Loader} /> : null}
                        {frontPage}
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        frontPage: state.main.frontPage,
        subreddits: state.main.subreddits,
        isLoading: state.main.isLoading,
        subLoading: state.main.subLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortFrontPage: (event) => dispatch(actions.sortFrontPage(event)),
        setSubUrl: (event) => dispatch(actions.setSubUrl(event)),
        setArticleUrl: (event) => dispatch(actions.setArticleUrl(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubredditPage);