import React from 'react';
import classes from './Navbar.css';
import logo from '../../img/redditlogo.png';
import {Link} from 'react-router-dom';

const navbar = (props) => {
    return (
        <div className={classes.Navbar}>
            <div className={classes.RightContent}>
                <Link to='/'><img src={logo} onClick={props.setSubUrl} id=' ' alt='Reddit logo'/></Link>
                <ul>
                    <li onClick={props.sortFrontpage} id='best'>BEST</li>
                    <li onClick={props.sortFrontpage} id='hot'>HOT</li>
                    <li onClick={props.sortFrontpage} id='new'>NEW</li>
                    <li onClick={props.sortFrontpage} id='top'>TOP</li>
                </ul>
            </div>
            <p>{props.username}</p>
        </div>
    )
}

export default navbar;