import React, {Component} from 'react';
import {Col, Row} from 'antd';
import HeadBar from '../../baseview/headbar/HeadBar';
import {connect} from 'react-redux';

@connect(
    (state) => {
        const {IndexReducers} = state;
        return {IndexReducers};
    }
)
class ViewContent extends Component {
    render() {
        const {children, crumb = [], backgroundColor = '#fff'} = this.props;
        return (
            <div style={{
                // width: this.props.IndexReducers.contentWidth - 17,
                width: this.props.IndexReducers.contentWidth,
                ...(this.props.style ? this.props.style : {})
            }}>
                <Row>
                    <Col span={24}>
                        <HeadBar data={crumb}/>
                        <Col id='mainWindow' span={24} style={{
                            padding: '0 10px 10px 10px',
                            height: document.documentElement.clientHeight - 65 - 48,
                            overflowY: 'auto',
                        }}>
                            <Col span={24} style={{backgroundColor, borderRadius: 6}}>
                                {children}
                            </Col>
                        </Col>
                    </Col>
                </Row>
            </div>
        );
    }
}
export default ViewContent
