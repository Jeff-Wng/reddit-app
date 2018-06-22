import React from 'react';
import classes from './Comments.css';
import {Link} from 'react-router-dom';

const comments = (props) => {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className={classes.Comments}>
            <div className={classes.Title}>
                {props.author !== '[deleted]' ? <Link to={'/user/' + props.author}><p onClick={() => props.setUserInfo(props.author)}>{props.author}</p></Link> : <p>{props.author}</p>} 
                <p>{props.distinguished === "moderator" ? '[M]' : null} {props.scoreHidden ? '[score hidden]' : (props.score === 1 ? + props.score + ' point': props.score + ' points')} {props.edited ? '*' : null} {props.stickied ? '- Stickied comment' : null}</p>
                {props.gilded > 0 ? <p className={classes.GildedInfo}><span className={classes.Gilded} /> {props.gilded > 1 ? 'x' + props.gilded : null}</p> : null}
            </div>
            <div dangerouslySetInnerHTML={{__html: decodeHtml(props.bodyHtml)}} />
        </div>
    )
}

export default comments;
