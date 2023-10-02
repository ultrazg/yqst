import React, {Component} from 'react';
import './index.less'
import LoginRouter from '../PageRouters/ChildRouter/LoginRouter'
import {loginCover, logo} from '../../resource'

// import Pdfdemo from '../Login/Pdfdemo'

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
        //pdf demo
        // return <Pdfdemo/>
        return (
            <div className='container' style={{flexDirection: 'column'}}>
                <div className='content'>
                    <div className='content-left'>
                        <img src={loginCover} alt=""/>
                        <div className='content-leftDiv'>
                            <div>
                                <img src={window.globalConfig.logo} alt=""/>
                                <h1>{window.globalConfig.title}</h1>
                                {window.globalConfig.desc}
                            </div>
                        </div>
                    </div>
                    <div className='content-right'>
                        <LoginRouter {...this.props} />
                    </div>
                </div>
                {window.globalConfig.infoDom}
            </div>
        );
    }
}

export default Index;
