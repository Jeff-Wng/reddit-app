import React, {Component} from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Thread from '../../components/Thread/Thread';
import Comments from '../../components/Comments/Comments';
import {connect} from 'react-redux';
import classes from './Article.css';
import Loader from '../../components/Loader/Loader';
import Nopreview from '../../img/nopreview.png';
import * as actions from '../../store/Actions/index';

class Article extends Component {
    componentDidMount() {
        this.props.getArticle();
    }

    render() {
        let thread = this.props.content.map(data => {
            return <Thread 
                key={data.title}
                title={data.title}
                author={data.author}
                sourceUrl={data.url}
                subreddit={data.subreddit}
                score={data.score}
                comments={data.num_comments}
                img={data.thumbnail === "" || data.thumbnail === "spoiler" || data.thumbnail === 'default' || data.thumbnail === 'image' ||data.thumbnail === 'self' ? Nopreview : data.thumbnail}
                domain={data.domain}
                gilded={data.gilded}
                postHint={data.post_hint}
                videoUrl={data.post_hint === 'rich:video' ? data.secure_media_embed.media_domain_url : (data.post_hint === 'hosted:video' ? data.media.reddit_video.fallback_url : null)}
                videoWidth={data.post_hint === 'rich:video' ? data.secure_media_embed.width : (data.post_hint === 'hosted:video' ? data.media.reddit_video.width : null)}
                videoHeight={data.post_hint === 'rich:video' ? data.secure_media_embed.height : (data.post_hint === 'hosted:video' ? data.media.reddit_video.height : null)}
                selftextHtml={data.selftext_html}
                isRedditDomain={data.is_reddit_media_domain} />
        })

        let comments = this.props.comments.map(data => {
            return <Comments
                key={data.id}
                score={data.score} 
                scoreHidden={data.scoreHidden}
                author={data.author}
                gilded={data.gilded}
                edited={data.edited}
                stickied={data.stickied}
                bodyHtml={data.body_html}
                distinguished={data.distinguished}
                setUserInfo={this.props.setUserInfo} />
        })

        return (
            <div>
                <Navbar />
                <div className={classes.Content}>
                    <div className={classes.Post}>
                        <div>
                            {this.props.isLoading ? <Loader className={classes.Loader} /> : null}
                            {thread}
                        </div>
                        <div className={classes.Comments}>
                            {comments}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subUrl: state.main.subUrl,
        articleUrl: state.main.articleUrl,
        content: state.article.content,
        comments: state.article.comments,
        isLoading: state.article.isLoading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setSubUrl: (event) => dispatch(actions.setSubUrl(event)),
        getArticle: () => dispatch(actions.getArticle()),
        setUserInfo: (user) => dispatch(actions.setUserInfo(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Article);
