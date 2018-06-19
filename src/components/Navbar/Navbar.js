import React, {Component} from 'react';
import {connect} from 'react-redux';
import classes from './Navbar.css';
import logo from '../../img/redditlogo.png';
import Subreddits from '../../components/Subreddits/Subreddits';
import {Link} from 'react-router-dom';
import * as actions from '../../store/Actions/index';

class Navbar extends Component {
    state = {
        showSubs: false
    }

    showSubreddits = () => {
        this.setState({showSubs: !this.state.showSubs});
    }

    render() {
        let subredditClasses = [classes.Subreddits];
        if(this.state.showSubs === true) {
            subredditClasses = [classes.Subreddits, classes.ShowSubs];
        }
        
        let subreddits = this.props.subreddits.map(subs => {
            return <Subreddits 
                key={subs}
                name={subs}
                setSubUrl={this.props.setSubUrl}
                showSubs={this.state.showSubs} />
        })
        
        return (
            <div className={classes.Navbar}>
                <div className={classes.UserInfo}>
                    <div className={classes.MySubreddits}>
                        <p onClick={this.showSubreddits}>Subreddits</p>
                        <ul className={subredditClasses.join(' ')}>
                            {subreddits}
                        </ul>
                    </div>
                    <p>{sessionStorage.getItem('username')} ({this.props.linkKarma})</p>
                </div>
                <div className={classes.RightContent}>
                    <Link to='/'><img src={logo} onClick={this.props.setSubUrl} id=' ' alt='Reddit logo'/></Link>
                    <ul>
                        <li onClick={this.props.sortFrontPage} id='best'>BEST</li>
                        <li onClick={this.props.sortFrontPage} id='hot'>HOT</li>
                        <li onClick={this.props.sortFrontPage} id='new'>NEW</li>
                        <li onClick={this.props.sortFrontPage} id='top'>TOP</li>
                    </ul>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        subreddits: state.main.subreddits,
        linkKarma: state.main.linkKarma
    }
}

const mapDispatchToProps = dispatch => {
    return {
        sortFrontPage: (event) => dispatch(actions.sortFrontPage(event)),
        setSubUrl: (event) => dispatch(actions.setSubUrl(event))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);