import React from 'react';
import classes from './Loader.css';

// A spinner/loading icon for when the app is reach out to the API
const loader = () => {
    return (
        <div className={classes.Loader} />
    )
}

export default loader;