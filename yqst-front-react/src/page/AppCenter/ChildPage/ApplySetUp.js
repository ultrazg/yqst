import React, {Component} from 'react';
import {LeftOutlined} from '@ant-design/icons';
import {Row, Col, Button, Modal, Table, message,} from 'antd';
import {addMember} from '../../../resource';
import model from '../model'
import addressBookModel from '../../AddressBook/Model'
import {getQueryVariable} from "../../../utils";
import IsPower from "../../Power/IsPower";

class ApplySetUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            softDetail: {},
            authUserList: [],
            allStaffUserList: [],
            chooseUserVisible: false,
            selectedRowKeys: [],
            isShow: 0
        };
    }

    componentDidMount() {
        this.getDetail()
        this.getSoftUserAuthList()
    }

    componentWillUnmount() {
    }

    getDetail = () => {
        const serviceTag = getQueryVariable('serviceTag')
        model.softGet({serviceTag: serviceTag}, res => {
            this.setState({softDetail: res.data, isShow: res.data.isShow})
        })
    }

    getSoftUserAuthList = () => {
        const serviceTag = getQueryVariable('serviceTag')
        model.softUserAuthList({serviceTag: serviceTag}, res => {
            const selectedRowKeys = []
            res.data.forEach((n) => {
                selectedRowKeys.push(n.staffId)
            })
            this.setState({
                authUserList: res.data,
                selectedRowKeys: selectedRowKeys
            })
        })
    }

    getAllStaff = () => {
        window.globalPermissions.checkPermission('SOFT_MANAGE_AUTHEDIT', (res) => {
            if (res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            addressBookModel.erpStaffUserList({}, res => {
                this.setState({
                    allStaffUserList: res.data,
                    chooseUserVisible: true
                })
            })
        });
    };

    chooseUserModal = () => {
        const columns = [
            {
                title: '头像', dataIndex: 'photo', render: text => (
                    <img width={64} height={64} src={text} alt=""/>
                )
            },
            {
                title: '用户名', dataIndex: 'staffName', render: ((text, record) => (
                    record.isAdmin === 1 ? text + '(企业创建者,无法被移除权限)' : text
                ))
            }
        ]
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onChange: (selectedRowKeys) => {
                this.setState({selectedRowKeys})
            },
            getCheckboxProps: record => {
                return {
                    disabled: record.isAdmin === 1, // Column configuration not to be checked
                }
            },
        };
        return (
            <Modal
                title='授权给用户'
                width={768}
                visible={this.state.chooseUserVisible}
                onCancel={() => this.setState({chooseUserVisible: false})}
                onOk={() => {
                    const params = {
                        serviceTag: getQueryVariable('serviceTag'),
                        staffIds: this.state.selectedRowKeys.length > 0 ? this.state.selectedRowKeys.join(',') : undefined
                    }
                    if (params.staffIds === undefined) delete params.staffIds
                    model.softUserAuth(params, res => {
                        this.getSoftUserAuthList()
                        message.success('授权成功')
                        this.setState({chooseUserVisible: false})
                    })
                }}
            >
                <Table
                    columns={columns}
                    dataSource={this.state.allStaffUserList}
                    rowSelection={rowSelection}
                    rowKey='staffAccount'
                />
            </Modal>
        )
    }

    changeShow = (checked) => {
        window.globalPermissions.checkPermission('SOFT_VISIBLE_SET', (res) => {
            if (res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            model.softGroupUserShowSave({
                groupUserId: this.state.softDetail.groupUserId,
                isShow: checked ? 1 : 0
            }, res => {
                this.setState({isShow: checked === false ? 0 : 1})
                message.success('保存成功')
            })
        });
    }

    render() {

        return (
            <div
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    background: '#fff',
                    borderRadius: '6px',
                    margin: '24px auto',
                    padding: '0 138px',
                    fontSize: '14px',
                    position: 'relative'
                }}
            >
                {this.chooseUserModal()}
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined/>}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '25px',
                    }}
                    onClick={() => {
                        const {entrance} = getQueryVariable()
                        if (entrance === undefined) this.props.history.push('/pages/appCenter/applyIndex');
                        this.props.history.push(`/pages/appCenter/${entrance}`);
                    }}
                >返回</Button>
                <IsPower
                    key={'SOFT_MANAGE_INFO'}
                    permissionsName={'SOFT_MANAGE_INFO'}
                    style={{paddingTop: '240px'}}
                >
                    <h1
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                            margin: '0px'
                        }}
                    >
                        应用详情
                    </h1>
                    <Row
                        style={{
                            padding: '24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)'
                        }}
                    >
                        <Col span={18}>
                            <div style={{display: 'flex'}}>
                                <img src={this.state.softDetail.logo} alt=""
                                     style={{
                                         height: '64px',
                                         verticalAlign: 'bottom',
                                         marginRight: '16px',
                                         borderRadius: '6px',
                                     }}
                                />
                                <div
                                    style={{
                                        display: 'inline-block'
                                    }}
                                >
                                    <h1
                                        style={{
                                            marginBottom: '8px',
                                            fontSize: '20px'
                                        }}
                                    >
                                        {this.state.softDetail.softName}
                                    </h1>
                                    <span
                                        style={{
                                            color: 'rgba(43,52,65,0.65)'
                                        }}
                                    >
                                {this.state.softDetail.introduction}
                            </span>
                                </div>
                            </div>
                        </Col>
                        <Col span={6}
                             style={{
                                 textAlign: 'right',
                                 marginTop: '19px'
                             }}
                        >
                            <Button type='primary'>进入应用</Button>
                            <Button style={{marginLeft: 12}}>服务续费</Button>
                        </Col>
                    </Row>
                    {/*<IsPower
                        key={'SOFT_VISIBLE_ENTER'}
                        permissionsName={'SOFT_VISIBLE_ENTER'}
                        isShowRes={false}
                        isShowWait={false}
                    >
                        <h3 style={{borderBottom: '1px solid rgba(43,52,65,0.25)', marginTop: 12, paddingBottom: 12}}>
                            应用可见性 <Switch
                            onChange={this.changeShow}
                            checked={this.state.isShow !== 0} style={{verticalAlign: 'text-bottom'}}
                            checkedChildren='显示'
                            unCheckedChildren='隐藏'/>
                        </h3>
                    </IsPower>*/}
                    <IsPower
                        key={'SOFT_MANAGE_AUTHINFO'}
                        permissionsName={'SOFT_MANAGE_AUTHINFO'}
                        isShowRes={false}
                        isShowWait={false}
                    >
                        <div
                            style={{
                                margin: '24px 0 16px',
                                color: 'rgba(43,52,65,0.65)',
                            }}
                        >
                            应用授权
                        </div>

                        <ul
                            style={{
                                overflow: 'hidden',
                                marginBottom: '24px'
                            }}
                        >
                            {
                                this.state.authUserList && this.state.authUserList.map((item, idx) => {
                                    return <li
                                        key={'list_' + idx}
                                        style={{
                                            textAlign: 'center',
                                            float: 'left',
                                            marginRight: '20px'
                                        }}
                                    >
                                        <img src={item.authUserPic} alt=""
                                             style={{
                                                 width: '32px',
                                                 height: '32px',
                                                 borderRadius: '6px',
                                             }}
                                        />
                                        <h3
                                            style={{
                                                margin: '0',
                                                marginTop: '4px',
                                                fontSize: '12px'
                                            }}
                                        >{item.authUserName}</h3>
                                    </li>
                                })
                            }
                            <img src={addMember} alt=""
                                 onClick={this.getAllStaff}
                                 style={{
                                     width: '32px',
                                     height: '32px',
                                     borderRadius: '6px',
                                     marginRight: '16px',
                                     cursor: 'pointer',
                                 }}
                            />
                            {/*<img src={removeMember} alt=""*/}
                            {/*     style={{*/}
                            {/*         width: '32px',*/}
                            {/*         height: '32px',*/}
                            {/*         borderRadius: '6px',*/}
                            {/*         cursor: 'pointer',*/}
                            {/*     }}*/}
                            {/*/>*/}
                        </ul>
                        {/*<div*/}
                        {/*    style={{*/}
                        {/*        color: 'rgba(43,52,65,0.65)',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    应用功能权限*/}
                        {/*    <a*/}
                        {/*        style={{marginLeft: '16px'}}*/}
                        {/*        onClick={() => {*/}
                        {/*            model.groupStaffResourceList()*/}
                        {/*        }}*/}
                        {/*    >查看</a>*/}
                        {/*</div>*/}
                    </IsPower>
                </IsPower>
            </div>
        );
    }
}

export default ApplySetUp;
