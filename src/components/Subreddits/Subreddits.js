import React from 'react';
import classes from './Subreddits.css';
import {Link} from 'react-router-dom';

const subreddits = (props) => {
    let SubredditClasses = [classes.Subreddits];
    if(props.showSubs === true) {
        SubredditClasses = [classes.Subreddits, classes.ShowSubs];
    }

    return(
        <Link className={SubredditClasses.join(' ')} to={'/' + props.name}  onClick={props.setSubUrl} id={props.name}><li>{props.name}</li></Link>
    )
}

export default subreddits;