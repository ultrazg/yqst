import React, {Component} from 'react';
import './index.less';
import SetUpCompanyRouter from '../PageRouters/ChildRouter/SetUpCompanyRouter'

class Index extends Component {
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
            <div className='SUCCss'>
                <div className={'content'}>
                    <SetUpCompanyRouter/>
                </div>
            </div>
        );
    }
}

export default Index;