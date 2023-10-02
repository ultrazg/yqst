import React, {Component} from 'react';
import UserLayoutRouter from '../PageRouters/UserLayoutRouter'

class UserLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        if (localStorage && localStorage.sessKey) {
            setTimeout(() => {
                this.props.history.push('/pages/home');
            }, 10)
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <UserLayoutRouter />
        );
    }
}

export default UserLayout;