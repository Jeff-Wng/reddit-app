import React from 'react';
import classes from './ProfileComments.css';
import {Link} from 'react-router-dom';

const profileComments = (props) => {    
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    let slicedId = props.id.slice(3, 9);
    
    return (
        <li className={classes.ProfileComments}>
            <div className={classes.Title}>
                <Link to={'/' + props.subreddit + '/' + slicedId}><p onClick={props.setUrl} id={props.subreddit} title={slicedId}>{props.title}</p></Link> 
                <p>by</p>{props.author !== '[deleted]' ? <Link to={'/user/' + props.author}><p onClick={() => props.setUserInfo(props.author)}>{props.author}</p></Link> : <p>{props.author}</p>}
                <p>in</p><Link to={'/' + props.subreddit}><p onClick={props.setSubUrl} id={props.subreddit}>{props.subreddit}</p></Link>
            </div>
            <div>
                <p>{props.user} {props.distinguished === "moderator" ? '[M]' : null} {props.scoreHidden ? '[score hidden]' : (props.score === 1 ? + props.score + ' point': props.score + ' points')} {props.edited ? '*' : null} {props.stickied ? '- Stickied comment' : null}</p>
                {props.gilded > 0 ? <p className={classes.GildedInfo}><span className={classes.Gilded} /> {props.gilded > 1 ? 'x' + props.gilded : null}</p> : null}
            </div>
            <div dangerouslySetInnerHTML={{__html: decodeHtml(props.bodyHtml)}} />
            <div className={classes.Title}><Link to={'/' + props.subreddit + '/' + slicedId}><p onClick={props.setUrl} id={props.subreddit} title={slicedId}>{props.numComments} comments</p></Link></div>

            
        </li>
    )
}

export default profileComments;


