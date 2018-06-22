import React from 'react';
import classes from './Frontpage.css';
import {Link} from 'react-router-dom';

const frontpage = (props) => {
    return (
        <li className={classes.Frontpage}>
            <div className={classes.Score}>
                <h2>{props.score}</h2>
            </div>
            <Link to={'/' + props.subreddit + '/' + props.id}><img src={"" + props.img} alt='preview' onClick={props.setUrl} id={props.subreddit} title={props.id} /></Link>
            <div className={classes.Info}>
                {props.postHint === 'link' || (props.postHint === undefined && props.isRedditDomain === false && props.selftextHtml === null) ? <a href={"" + props.sourceURL}><h2 onClick={props.setUrl} id={props.subreddit} title={props.id}>{props.title}</h2></a> : <Link to={'/' + props.subreddit + '/' + props.id}><h2 onClick={props.setUrl} id={props.subreddit} title={props.id}>{props.title}</h2></Link>}
                <div className={classes.postInfo}>
                    <p>Submitted by</p>
                    <span>{props.author !== '[deleted]' ? <Link to={'/user/' + props.author}><p onClick={() => props.setUserInfo(props.author)}>{props.author}</p></Link> : <p>{props.author}</p>}</span>
                    <p>to <Link to={'/' + props.subreddit} onClick={props.setSubUrl} id={props.subreddit}>r/{props.subreddit}</Link></p>
                    {props.gilded > 0 ? <p className={classes.GildedInfo}><span className={classes.Gilded} /> {props.gilded > 1 ? 'x' + props.gilded : null}</p> : null}
                </div>
                <div className={classes.Comments}>
                    <Link to={'/' + props.subreddit + '/' + props.id}><p className={classes.CommentsNum} onClick={props.setUrl} id={props.subreddit} title={props.id}>{props.comments} comments</p></Link>
                    <p>{props.domain}</p>
                </div>
            </div>
        </li>
    )
}

export default frontpage;

