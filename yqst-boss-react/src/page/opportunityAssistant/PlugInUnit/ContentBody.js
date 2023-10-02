import React, {Component} from 'react'
import {Row, Col, Breadcrumb} from 'antd'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import HeadBar from '../../../baseview/headbar/HeadBar';

@connect(
    (state) => {
        const {IndexReducers} = state;
        return {IndexReducers}
    }
)
class ContentBody extends Component {

    render() {
        const {crumb, children} = this.props
        return (
            <div style={{width: this.props.IndexReducers.contentWidth}}>
                {this.props.crumb ? <HeadBar data={this.props.crumb}/> : null}
                <Row>
                    {/*<Col span={24}>*/}
                    {/*<div style={{padding: '0 20px 10px 20px'}}>*/}
                    {/*<Breadcrumb>*/}
                    {/*{*/}
                    {/*(crumb || []).map((v, k) => <Breadcrumb.Item key={k}>*/}
                    {/*{v.link ? <Link to={v.link}>{v.title}</Link> : v.title}*/}
                    {/*</Breadcrumb.Item>)*/}
                    {/*}*/}
                    {/*</Breadcrumb>*/}
                    {/*</div>*/}
                    {/*</Col>*/}
                    <Col span={24} style={{padding: '0 5px 0'}}>
                        <div style={{padding: '20px 10px 10px 10px', backgroundColor: '#fff', borderRadius: '5px'}}>
                            {children}
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }

}

export default ContentBody