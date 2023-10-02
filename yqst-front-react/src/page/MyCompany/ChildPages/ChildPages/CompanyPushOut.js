import React, {Component} from 'react';

import Developing from "../../../ErrorPage/Developing";

class CompanyPushOut extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {

    }

    render() {
        return (
            <div>
                <Developing/>
            </div>
        );
    }
}

export default CompanyPushOut;
