import React, {Component} from 'react';
import cloneDeep from 'lodash/cloneDeep'
import {Avatar, Col, Descriptions, Empty, message, Modal, Row, Switch, Tabs} from 'antd';
import QRCode from 'qrcode.react';
import Model from '../Model'
import '../../AddressBook/index.less'
import ApiConst from "../../../base/urls/ApiConst";
import {FormOutlined} from '@ant-design/icons';

class BusinessCardManagement extends Component {
    state = {
        dataList: [],
        checkData: {}
    };

    // ------ 生命周期函数 start-----
    componentDidMount() {
        this.getCardList()
    }

    componentWillUnmount() {

    }

    // ------ 生命周期函数 end-------

    render() {
        const {dataList} = this.state
        return (
            <div
                style={{
                    padding: '30px 32px 24px'
                }}
            >
                {this.renderEditModal()}
                <h1
                    style={{
                        fontSize: '20px',
                        color: '#2B3441',
                        marginBottom: '32px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)'
                    }}
                >
                    名片管理
                </h1>
                {
                    dataList && dataList.length === 0 ? (<Empty/>) : (
                        <Tabs tabPosition={'left'} defaultActiveKey="0" onChange={this.callback}>
                            {
                                dataList && dataList.map((item, index) => (
                                    <Tabs.TabPane tab={`名片${index + 1}`} key={index}>
                                        <div>
                                            <Avatar size={64} shape="square" src={item.logo}/>
                                            <div style={{
                                                display: 'inline-block',
                                                marginLeft: 10,
                                                verticalAlign: 'middle'
                                            }}>
                                                <span
                                                    style={{display: 'block'}}
                                                    className='big-title'
                                                >
                                                    {item.staffName}
                                                </span>
                                                <span
                                                    style={{display: 'block'}}
                                                    className='mid-title'
                                                >
                                                    {item.authCompanyName}
                                                </span>
                                            </div>
                                            <div style={{
                                                display: 'inline-block',
                                                verticalAlign: 'bottom',
                                                position: 'absolute',
                                                right: '10%'
                                            }}>
                                                {
                                                    item.codeSn && (
                                                        <QRCode
                                                            style={{width: '64px', height: '64px'}}
                                                            // size={document.documentElement.clientHeight * 0.25}
                                                            fgColor={window.globalConfig.themeColor}
                                                            value={ApiConst.Versions().GlobalFriendCodeUrl + '?code=' + item.codeSn}
                                                        />
                                                    )
                                                }
                                            </div>
                                        </div>
                                        <div style={{marginTop: 20}} className={'sw-Descriptions'}>
                                            <Descriptions title={(
                                                <div className='ant-descriptions-title'>
                                                    名片信息
                                                    <FormOutlined onClick={() => {
                                                        this.setState({visible: true, checkData: item})
                                                    }} style={{marginLeft: 10, cursor: 'pointer'}}/>
                                                </div>
                                            )}>
                                                <Descriptions.Item
                                                    label="认证状态">{this.checkAuthState(item.authState)}</Descriptions.Item>
                                                {item.isJobShow &&
                                                <Descriptions.Item label="职务">{item.jobName}</Descriptions.Item>}
                                                {item.isWorkPhoneShow &&
                                                <Descriptions.Item label="工作电话">{item.workPhone}</Descriptions.Item>}
                                                {item.isWorkEmailShow &&
                                                <Descriptions.Item label="工作邮箱">{item.workEmail}</Descriptions.Item>}
                                                {item.isAddressShow && (
                                                    <Descriptions.Item label="办公地址">
                                                        {item.address}
                                                    </Descriptions.Item>
                                                )}
                                            </Descriptions>
                                        </div>
                                    </Tabs.TabPane>
                                ))
                            }
                        </Tabs>
                    )
                }
            </div>
        );
    }

    // ------ 带请求函数 start-----
    getCardList = () => {
        Model.userCardPage({
            current: 1,
            pageSize: 100
        }, res => {
            this.setState({dataList: res.data.records})
        })
    }
    // ------ 带请求函数 end-------

    // ------ 工具函数 start-----
    checkAuthState = (state) => {
        switch (state) {
            case -1:
                return '还未提交'
            case 0:
                return '待审核'
            case 1:
                return '已审核'
            case 2:
                return '审核不通过'
            case 3:
                return '已失效'
            default:
                return ''
        }
    }
    // ------ 工具函数 end-------

    // ------ 渲染视图函数 start-----
    renderEditModal = () => {
        const {checkData} = this.state
        const newData = cloneDeep(checkData)
        const checkChange = (checked, field) => {
            this.setState({
                checkData: Object.assign(newData, {[field]: checked ? 1 : 0})
            })
        }
        const onSubmit = () => {
            const {checkData} = this.state
            Model.userCardSave({
                id: checkData.id,
                isJobShow: checkData.isJobShow,
                isWorkPhoneShow: checkData.isWorkPhoneShow,
                isWorkEmailShow: checkData.isWorkEmailShow,
                isAddressShow: checkData.isAddressShow
            }, res => {
                message.success('修改成功')
                this.setState({visible: false, checkData: {}})
                this.getCardList()
            })
        }
        return (
            <Modal
                className='sw-modal'
                title='编辑名片信息'
                visible={this.state.visible}
                onCancel={() => this.setState({visible: false})}
                afterClose={() => {
                    this.setState({checkData: {}})
                }}
                onOk={onSubmit}
            >
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '12px'}}>
                    <Col span={20}>
                        <h3 style={{
                            color: '#2B3441',
                            fontSize: '14px',
                            marginBottom: '4px',
                            lineHeight: '46px'
                        }}>是否展示职务</h3>
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={newData.isJobShow !== 0}
                            onChange={(checked) => checkChange(checked, 'isJobShow')}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '12px'}}>
                    <Col span={20}>
                        <h3 style={{
                            color: '#2B3441',
                            fontSize: '14px',
                            marginBottom: '4px',
                            lineHeight: '46px'
                        }}>是否展示工作电话</h3>
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={newData.isWorkPhoneShow !== 0}
                            onChange={(checked) => checkChange(checked, 'isWorkPhoneShow')}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '12px'}}>
                    <Col span={20}>
                        <h3 style={{
                            color: '#2B3441',
                            fontSize: '14px',
                            marginBottom: '4px',
                            lineHeight: '46px'
                        }}>是否展示工作邮箱</h3>
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={newData.isWorkEmailShow !== 0}
                            onChange={(checked) => checkChange(checked, 'isWorkEmailShow')}
                        />
                    </Col>
                </Row>
                <Row style={{color: 'rgba(43,52,65,0.65)', marginBottom: '12px'}}>
                    <Col span={20}>
                        <h3 style={{
                            color: '#2B3441',
                            fontSize: '14px',
                            marginBottom: '4px',
                            lineHeight: '46px'
                        }}>是否展示办公地址</h3>
                    </Col>
                    <Col span={4} style={{lineHeight: '46px', textAlign: 'right'}}>
                        <Switch
                            className={'Switch'}
                            checked={newData.isAddressShow !== 0}
                            onChange={(checked) => checkChange(checked, 'isAddressShow')}
                        />
                    </Col>
                </Row>
            </Modal>
        )
    }
    // ------ 渲染视图函数 end-------
}

export default BusinessCardManagement;
