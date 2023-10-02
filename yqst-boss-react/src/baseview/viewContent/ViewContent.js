import React, {Component} from 'react'
import {Col, Row, Breadcrumb} from 'antd'
import HeadBar from "../../baseview/headbar/HeadBar";
import {connect} from "react-redux";
import PublicData from "../../base/publicData/PublicData";

export default @connect(
    (state) => {
        const {IndexReducers} = state;
        return {IndexReducers}
    }
)class ViewContent extends Component {
    render() {
        const {children, crumb = [], backgroundColor = '#fff', topBtn = null} = this.props;
        return (
            <div style={{
                // width: this.props.IndexReducers.contentWidth - 17,
                width: document.documentElement.clientWidth - PublicData.leftMenuWidth,
                paddingLeft: 15,
                ...(this.props.style ? this.props.style : {})
            }}>
                <Row>
                    <Col span={24}>
                        <HeadBar data={crumb}/>
                        {
                            topBtn && <div style={{
                                position: 'absolute',
                                right: 35,
                                top: 10,
                                zIndex: 1
                            }}>
                                {topBtn}
                            </div>
                        }
                        <Col span={24} style={{
                            height: document.documentElement.clientHeight - PublicData.pageTopHeight - PublicData.breadHeight,
                            overflowY: 'auto',
                            paddingRight: 15
                        }}>
                            <Col span={24} style={{
                                backgroundColor: backgroundColor,
                                borderRadius: 6,
                                padding: 5,
                                marginBottom: 15,
                            }}>
                                {children}
                            </Col>
                        </Col>
                    </Col>
                </Row>
            </div>
        )
    }
}
