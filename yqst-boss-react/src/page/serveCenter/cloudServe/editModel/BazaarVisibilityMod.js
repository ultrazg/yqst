/**
 * Created by yb on 2019/11/21
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Row, Col, Select, message, Input, Popconfirm} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "../SwitchName";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../../baseview/uploadFile/UploadFile';
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";

const { TabPane } = Tabs;
const { Option } = Select;


class BazaarVisibilityMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            markDisplay: '',
            keyWord: '',
        };
    }

    componentDidMount() {
        this.setState({
            markDisplay: this.props.pState.bazVisPar.markDisplay,
            keyWord: this.props.pState.bazVisPar.keyWord,
        })
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeSCView()}
            </div>
        );
    }

    makeSCView(){
        return <div>
            <Card
                type="inner"
                title="应用桌面可见性"
            >
                <Row>
                    <Col span={12}>
                        <Row>
                            <Col span={6}
                                 style={{
                                     lineHeight: '30px',
                                     textAlign: 'right',
                                     paddingRight: '10px',
                                 }}
                            >
                                <span style={{color: '#f00'}}>*</span>可见性设置:
                            </Col>
                            <Col span={18}>
                                <Select style={{width: '180px'}} value={this.state.markDisplay + ''} onChange={(val) => {
                                    this.setState({
                                        markDisplay: val,
                                    }, this.outCallBack)
                                }}>
                                    <Option value="">请选择</Option>
                                    <Option value="1">显示</Option>
                                    <Option value="2">搜索显示</Option>
                                    <Option value="3">隐藏</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    {
                        '2' === '' + this.state.markDisplay ? <Col span={12}>
                            <Row>
                                <Col span={8}
                                     style={{
                                         lineHeight: '30px',
                                         textAlign: 'right',
                                         paddingRight: '10px',
                                     }}
                                >
                                    <span style={{color: '#f00'}}>*</span>搜索关键词(精确搜索):
                                </Col>
                                <Col span={16}>
                                    <Input maxLength={30} value={this.state.keyWord} placeholder="请输入搜索关键字" onChange={(e) => {
                                        this.setState({keyWord: e.target.value}, this.outCallBack)
                                    }}/>
                                </Col>
                            </Row>
                        </Col> : null
                    }
                </Row>
                <a style={{marginTop: 15, display: 'inline-block'}}>{SwitchName.markDisplayTxt(this.state.isHide)}</a>
            </Card>
        </div>
    }

    outCallBack(){
        this.props.callBack && this.props.callBack(this.state);
    }

}

export default BazaarVisibilityMod
