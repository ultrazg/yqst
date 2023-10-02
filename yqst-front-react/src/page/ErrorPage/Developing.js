import React, {Component} from 'react';
import {none} from '../../resource';

class Developing extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    componentWillUnmount() {

    }

    render() {
        return (
            <div
                style={{
                    textAlign: 'center'
                }}
            >
                <img src={none} alt=""
                     style={{width: '400px', marginTop: '100px'}}
                />
                <h1
                    style={{margin: '16px 0', fontSize: '60px', lineHeight: '60px'}}
                >500</h1>
                <span style={{color: 'rgba(43,52,65,0.65)'}}>工程师正在紧张的研发中</span>
                <p style={{color: 'rgba(43,52,65,0.65)', margin: '16px 0'}}>敬请期待...</p>
                {this.props.children && this.props.children}
            </div>
        );
    }
}

export default Developing;
