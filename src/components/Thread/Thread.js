import React from 'react';
import classes from './Thread.css';
import {Link} from 'react-router-dom';
import Iframe from 'react-iframe';

const thread = (props) => {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    let post = null;
    if(props.selftextHtml !== null) {
        let txt = props.selftextHtml;
        txt = txt.slice(21, txt.length - 20);
        post = <div dangerouslySetInnerHTML={{__html: decodeHtml(txt)}} />
    } else if (props.postHint === "rich:video" || props.postHint === "hosted:video" ) {
        post = <Iframe
            url={props.videoUrl}
            position='initial'
            allowFullScreen
            styles={{width: '40vw', height: '40vh'}} />
    } else if (props.postHint === "image") {
        post = <img src={props.sourceUrl} alt='post' style={{width: '30vw', height: '50vh'}}/>
    }

    return (
        <div className={classes.Thread}>
            <div className={classes.Score}>
                <h2>{props.score}</h2>
            </div>
            <Link to={'/' + props.subreddit + '/' + props.id}><img src={"" + props.img} alt='preview' onClick={props.setUrl} id={props.subreddit} title={props.id} /></Link>
            <div className={classes.Info}>
                {props.postHint !== 'link' ? <Link to={'/' + props.subreddit + '/' + props.id}><h2 onClick={props.setUrl} id={props.subreddit} title={props.id}>{props.title}</h2></Link> : <a href={"" + props.sourceURL}><h2 onClick={props.setUrl} id={props.subreddit} title={props.id}>{props.title}</h2></a>}
                <div className={classes.postInfo}>
                    <p>Submitted by <span>{props.author}</span> to <Link to={'/' + props.subreddit} onClick={props.setSubUrl} id={props.subreddit}>r/{props.subreddit}</Link></p>
                    {props.gilded > 0 ? <p className={classes.GildedInfo}><span className={classes.Gilded} /> {props.gilded > 1 ? 'x' + props.gilded : null}</p> : null}
                </div>
                <div className={classes.Comments}>
                    <div className={classes.CommentInfo}>
                        <p><a href={props.redditURL}>{props.comments} comments</a></p>
                        <p>{props.domain}</p>
                    </div>
                    <div className={classes.MainContent}>
                        {post}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default thread;