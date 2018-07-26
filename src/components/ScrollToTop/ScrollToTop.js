import {Component} from 'react';
import {withRouter} from 'react-router-dom';

class ScrollToTop extends Component {
    // Returns user to top of the page whenever the move to another component
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.scrollTo(0, 0)
        }
    }

    render() {
        return this.props.children
    }
}
  
export default withRouter(ScrollToTop)