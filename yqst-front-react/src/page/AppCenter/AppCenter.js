import React, {Component} from 'react';
import AppCenterRouter from '../PageRouters/ChildRouter/AppCenterRouter'
import './AppCenterCss.less'

class AppCenter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        return (
            <AppCenterRouter/>
        );
    }
}

export default AppCenter;