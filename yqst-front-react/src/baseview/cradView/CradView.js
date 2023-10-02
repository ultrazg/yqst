/**
 * Created by yb on 2018/12/3
 */
/*
* 组件的使用方式：
*
* */

import React, {Component} from 'react';
import {Card, Row, Col} from 'antd';
import './CradCss.less'

export default class CradView extends Component {

    constructor(props) {
        super(props);
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.state = {
            title: '基础信息',
            isShow: true,
        };
    }

    render() {
        let props = this.props, states = this.state;
        return (
            <div className={'aloneCrad'}>
                <a className={this.state.isShow ? 'aloneCrad_showBtn showName' : 'aloneCrad_showBtn hideName'}
                   onClick={() => {
                       this.showOrHide()
                   }}
                >{this.state.isShow ? '隐藏' : '展开'}</a>
                <Card hoverable={props.hoverable || true} title={this.titleView(props)}>
                    <div className={this.state.isShow ? 'showContent' : 'hideContent'}>
                        {this.props.children && this.props.children}
                    </div>
                </Card>
            </div>
        );
    }

    titleView(props) {
        return <Row>
            <Col span={12}>{props.title || this.state.title}</Col>
            <Col span={12}>{props.titleViews || ''}</Col>
        </Row>
    }

    showOrHide() {
        this.setState({isShow: !this.state.isShow})
    }

}
