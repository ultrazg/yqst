import React, {Component} from 'react';
import './Home.less';
import HomeRouter from '../PageRouters/ChildRouter/HomeRouter'

class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
        if (localStorage && !localStorage.sessKey) {
            this.props.history.replace('/users/login/index');
            // this.props.history.push('/users/login/index');
        }
    }

    componentDidMount() {

    }

    componentWillUnmount() {}

    render() {
        return (
            <HomeRouter/>
        );
    }
}

export default Index;
