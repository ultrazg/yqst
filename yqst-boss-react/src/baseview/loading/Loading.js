/**
 * Created by ljy on 2017/11/15
 */
import React, {Component} from 'react';
import {Modal} from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: false,
            title: ''
        }
    }

    show(title) {
        this.setState({
            visiable: true,
            title: title ? title : ''
        });
    }

    hide() {
        this.setState({
            visiable: false
        });
    }

    render() {
        return this.state.visiable ? <Modal
            visible={true}
            closable={false}
            footer={null}
            transitionName={''}
            maskTransitionName={''}
            width={90}
            bodyStyle={{
                display: 'flex',
                height: 90, padding: 0,
                justifyContent: 'center',
                alignItems: 'center',
            }}
            style={{top: '40%', padding: 0}}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <LoadingOutlined  style={{fontSize: 28, color: window.globalConfig.themeColor}}/>
                <span style={{
                    fontSize: 13,
                    marginTop: 10,
                    color: window.globalConfig.themeColor
                }}>{this.state.title}</span>
            </div>
        </Modal> : null
    }
}
