import React from 'react';
import classes from './Subreddits.css';
import {Link} from 'react-router-dom';

const subreddits = (props) => {
    return(
        <Link className={classes.Subreddits} to={'/' + props.name}><li onClick={props.setSubUrl} id={props.name}>{props.name}</li></Link>
    )
}

export default subreddits;