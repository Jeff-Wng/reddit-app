import React from 'react';
import classes from './Comments.css';

const comments = (props) => {
    function decodeHtml(html) {
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }

    return (
        <div className={classes.Comments}>
            <p>{props.author} {props.distinguished === "moderator" ? '[M]' : null} {props.scoreHidden ? '[score hidden]' : (props.score === 1 ? + props.score + ' point': props.score + ' points')} {props.edited ? '*' : null} {props.stickied ? '- Stickied comment' : null}</p>
            <div dangerouslySetInnerHTML={{__html: decodeHtml(props.bodyHtml)}} />
        </div>
    )
}

export default comments;