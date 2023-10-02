import React, {Component} from 'react';
import {LeftOutlined} from '@ant-design/icons';
import {Form, Row, Col, Button, Input, Modal, message} from 'antd';
import {none} from '../../../resource';
import Model from "../Model";

const {TextArea} = Input;

class FindCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            accountSn: '',
            comData: null,
            isOnClick: false,
            visible: false
        };
    }

    componentDidMount() {
        // this.getUserIList();
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <div className={'finComCss'}>
                <Button className={'Button_leftIcon'} style={{height: '32px', fontSize: '14px'}} icon={<LeftOutlined/>}
                        onClick={() => {
                            this.props.history.push('/pages/home/index');
                        }}>返回</Button>
                <h1>查找企业</h1>
                <Row>
                    <Col span={4} className={'label'}>企业号</Col>
                    <Col span={20} className={'forms'}>
                        <Input
                            maxLength={30}
                            placeholder={'请输入完整的企业号'}
                            value={this.state.accountSn}
                            onChange={(e) => {
                                this.setState({accountSn: e.target.value});
                            }}
                        />
                        <Button type="primary" onClick={() => {
                            this.referCom();
                        }}>查找</Button>
                    </Col>
                </Row>
                {
                    (this.state.isOnClick && !this.state.comData) && <div className={'resCss'}>
                        <img src={none} alt=""/>
                        <p>没有找到对应的企业</p>
                    </div>
                }
                {
                    this.state.comData && <div className={'resCom'}>
                        <div>
                            <Row>
                                <Col span={20} className={'resCom_left'}>
                                    <img src={this.state.comData.logo} alt=""/>
                                    <span>{this.state.comData.enterpriseName}</span>
                                </Col>
                                <Col span={4}>
                                    <a onClick={() => {
                                        this.setState({visible: true});
                                    }}>加入企业</a>
                                </Col>
                            </Row>
                        </div>
                    </div>
                }
                {this.state.visible && this.makeModView()}
            </div>
        );
    }

    referCom() {
        Model.GetErpInfo({
            accountSn: this.state.accountSn,
        }, (res) => {
            this.setState({
                comData: res.data,
                isOnClick: true
            })
        }, (err) => {
        });
    }

    getUserIList() {
        Model.UserIList({}, (res) => {
            this.setState({indList: res.data || []})
        }, (err) => {
        });
    }

    makeModView() {
        let {comData} = this.state;
        const formItemLayout = {
            labelCol: {span: 24},
            wrapperCol: {span: 24},
        };

        return <Modal
            title={
                <div>加入企业</div>
            }
            visible={this.state.visible}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({visible: false});
            }}
            className={'Modal jcMod'}
            width={404}
            footer={null}
        >
            <div className={'jcMod_com'}>
                <div className={'comL'}>
                    <img src={comData.logo} alt="" style={{width: 48, height: 48}} className={"imgCover"}/>
                </div>
                <div className={'comR'}>
                    <h1>{comData.enterpriseName}</h1>
                    <span>企业号：{comData.accountSn}</span>
                </div>
            </div>
            <Row className={'jcMod_mes'}>
                <Col span={12}>
                    <span className={'mesSpan'}>行业：</span>
                    {comData.industry}
                </Col>
                <Col span={12}>
                    <span className={'mesSpan'}>地区：</span>
                    {comData.provinceName + comData.cityName + comData.districtName}
                </Col>
            </Row>
            <Form ref={(c) => this.form = c} {...formItemLayout} autoComplete="off"
                  className={'formCss'} onFinish={this.onSubmit.bind(this)} scrollToFirstError={true}>
                <Form.Item label="员工姓名" name={'name'} rules={[
                    {required: true, message: '员工姓名不能为空!'}
                ]}>
                    <Input
                        maxLength={30}
                        placeholder="请输入员工姓名"
                    />
                </Form.Item>
                <Form.Item label="验证信息" name={'remark'} rules={[
                    {required: false, message: '验证信息不能为空!'}
                ]}>
                    <TextArea
                        maxLength={200}
                        rows={4}
                        placeholder="请输入验证信息"
                    />
                </Form.Item>
                <p>注：提交申请，等待企业审核</p>
                <Form.Item className={'btn'}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    }

    onSubmit = (values) => {
        let {comData} = this.state;
        values.accountSn = comData.accountSn;
        Model.AppyToJoinComp({
            ...values,
        }, (res) => {
            message.success('提交成功，请耐心等待企业的审核！');
            this.setState({visible: false});
        }, (err) => {
        });
    }
}

export default FindCompany;
