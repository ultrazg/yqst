import React, {Component} from 'react';
import {Row, Col, Button, Modal, message, Radio, Table, Empty, Input} from 'antd';
import model from '../../model'
import {formatDate, getQueryVariable} from "../../../../utils";
import IsPower from '../../../Power/IsPower';
import {addMember} from '../../../../resource'
import addressBookModel from '../../../AddressBook/Model'
import JudgePath from '../JudgePath'
import cloneDeep from 'lodash/cloneDeep';
import pull from 'lodash/pull';

const {Search} = Input;

class ApplyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            softDetail: {},
            chargeVisible: false,
            chargeDetail: {},
        };
        // this.isSearchMode = false
    }

    componentDidMount() {
        this.getDetail()
        this.getSoftUserAuthList()
    }

    componentWillUnmount() {

    }

    chooseUserModal = () => {
        const {allStaffUserList} = this.state;
        const columns = [
            {
                title: '头像',
                dataIndex: 'photo',
                width: 120,
                render: text => (
                    <img width={64} height={64}
                         src={text || 'https://sunawtest.oss-cn-shenzhen.aliyuncs.com/clue/520cd5b5eecb2cfdb70948c0d4e4207b.jpg'}
                         alt=""/>
                )
            },
            {
                title: '用户名', dataIndex: 'staffName', render: ((text, record) => (
                    record.isAdmin === 1 ? text + '(企业创建者,无法被移除权限)' : text
                ))
            },
            {
                title: '职务名称',
                dataIndex: 'jobName'
            },
            {
                title: '所属部门',
                dataIndex: 'deptName',
            },
            {
                title: '手机号',
                dataIndex: 'phone',
            }
        ];
        const rowSelection = {
            selectedRowKeys: this.state.selectedRowKeys,
            onSelect: (record, selected, selectedRows, nativeEvent) => {
                let selectedArr = cloneDeep(this.state.selectedRowKeys);
                if (selected) {
                    selectedArr.push(record.staffAccount);
                } else {
                    pull(selectedArr, record.staffAccount);
                }
                this.setState({selectedRowKeys: selectedArr});
            },
            onSelectAll: (selected, selectedRows, changeRows) => {
                let selectedArr = cloneDeep(this.state.selectedRowKeys);
                if (selected) {
                    for (let i = 0; i < changeRows.length; i++) {
                        if (!selectedArr.includes(changeRows[i].staffAccount)) {
                            selectedArr.push(changeRows[i].staffAccount);
                        }
                    }
                    this.setState({selectedRowKeys: selectedArr});
                } else {
                    for (let i = 0; i < changeRows.length; i++) {
                        if (!(changeRows[i].isAdmin == 1) && selectedArr.includes(changeRows[i].staffAccount)) {
                            pull(selectedArr, changeRows[i].staffAccount);
                        }
                    }
                    this.setState({selectedRowKeys: selectedArr});
                }
            },
            getCheckboxProps: record => {
                return {
                    disabled: this.state.selectedRowKeys.includes(record.staffAccount)
                        && record.isAdmin === 1, // Column configuration not to be checked
                }
            },
        };
        const showData = (list = []) => {
            let res = [];
            list.forEach(item => {
                if (!item.isHidden) {
                    res.push(item);
                }
            });
            return res;
        };

        return (
            <Modal
                title='授权给用户'
                style={{top: 10}}
                width={880}
                visible={true}
                onCancel={() => this.setState({chooseUserVisible: false})}
                onOk={() => {
                    // console.log(this.state.selectedRowKeys, "this.state.selectedRowKeys.--")
                    // return;
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
                <Search
                    placeholder="可查询职务名称、用户名、所属部门、手机号"
                    style={{marginBottom: '24px'}}
                    onSearch={value => {
                        const newAllStaffUserList = allStaffUserList.map(item => {
                            let newIsHidden = true;
                            if (item.jobName.indexOf(value) >= 0 || item.staffName.indexOf(value) >= 0 || item.deptName.indexOf(value) >= 0 || item.phone.indexOf(value) >= 0) {
                                newIsHidden = false;
                            }
                            return {
                                ...item,
                                isHidden: newIsHidden
                            }
                        });
                        // this.isSearchMode = value !== "";
                        this.setState({allStaffUserList: newAllStaffUserList});
                    }}
                    onChange={(e) => {
                        const newAllStaffUserList = allStaffUserList.map(item => {
                            let newIsHidden = true;
                            if (item.jobName.indexOf(e.target.value) >= 0 || item.staffName.indexOf(e.target.value) >= 0 || item.deptName.indexOf(e.target.value) >= 0 || item.phone.indexOf(e.target.value) >= 0) {
                                newIsHidden = false;
                            }
                            return {
                                ...item,
                                isHidden: newIsHidden
                            }
                        });
                        // this.isSearchMode = e.target.value !== "";
                        this.setState({allStaffUserList: newAllStaffUserList});
                    }}
                />
                <Table
                    scroll={{y: 340}}
                    columns={columns}
                    dataSource={showData(allStaffUserList)}
                    rowSelection={rowSelection}
                    rowKey='staffAccount'
                    pagination={{
                        showSizeChanger: false
                    }}
                />
            </Modal>
        )
    }

    getDetail = () => {
        const softId = getQueryVariable('softId');
        model.softMarketSoftGet({softId: softId}, res => {
            this.setState({softDetail: res.data})
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
            if (res) return message.error('抱歉，您没有该操作权限，请联系管理员！');
            addressBookModel.erpStaffUserList({}, res => {
                const deptName = (list = []) => {
                    let res = [];
                    list.forEach(item => {
                        res.push(item.departmentName);
                    });
                    return res;
                };
                const allStaffUserList = res.data && res.data.map(item => {
                    return {
                        ...item,
                        isHidden: false,
                        key: item.userId,
                        deptName: deptName(item.deptList || []).join(','),
                    }
                });
                this.setState({
                    allStaffUserList: allStaffUserList,
                    chooseUserVisible: true
                })
            })
        });
    };

    updateHistory = () => {
        let {softDetail} = this.state;
        return (
            <Modal
                title={'更新历史'}
                className={'sw-modal'}
                bodyStyle={{padding: '10px 20px 20px 20px'}}
                visible={this.state.historyVisible}
                onCancel={() => this.setState({historyVisible: false})}
                footer={[
                    <Button onClick={() => this.setState({historyVisible: false})} type={'primary'}>确定</Button>
                ]}
            >
                {
                    (softDetail && softDetail.versionLogList && softDetail.versionLogList.length !== 0) ? (
                        softDetail.versionLogList.map((item, index) => {
                            return (
                                <div style={{borderBottom: '1px solid #E8E8E8', padding: '16px 0'}}>
                                    <h3 style={{fontSize: 14, lineHeight: '20px', color: '#2B3441'}}>版本
                                        : {item.softVersion}</h3>
                                    <h3 style={{fontSize: 14, lineHeight: '20px', color: '#2B3441'}}>版本说明
                                        : {item.memo}</h3>
                                </div>
                            )
                        })
                    ) : <Empty/>
                }
            </Modal>
        )
    }

    showButton = () => {
        const {softDetail, btnData} = this.state;
        const btnStyle = {
            width: '96px',
            height: '32px',
            lineHeight: '32px',
            margin: '0 5px'
        }
        const entrance = getQueryVariable('entrance');
        const freeActive = this.freeActive
        const chargeActive = () => {
            message.info('暂不支持')
            return;
            const requestParams = {
                goodsId: btnData.goodsId,
                shopId: btnData.shopId,
            }
            model.softwareGoodsDetail(requestParams, res => {
                this.setState({
                    chargeVisible: true,
                    chargeDetail: res.data
                })
            })
        }
        const btnArr = []
        if (entrance === 'applyIndex') {
            btnArr.push(
                <div>
                    <Button style={btnStyle} type='primary'>xxx</Button>
                </div>
            )
            return btnArr
        }
        if (softDetail.status === 1) {
            btnArr.push(
                <div key={1}>
                    <Button style={btnStyle} type='primary'
                            onClick={() => {
                                if (softDetail.isAuth == 0) {
                                    Modal.info({
                                        title: '该应用未被授权.',
                                        okText: '确定',
                                    });
                                    return;
                                }
                                JudgePath(softDetail.serviceTag, this.props)
                            }}
                    >进入应用</Button>
                </div>
            )
        } else if (softDetail.status === 3) {
            btnArr.push(
                <div key={1}>
                    <Button style={btnStyle} type='primary'>服务续费</Button>
                </div>
            )
        } else {
            if (btnData && btnData.freeButtonPar && btnData.freeButtonPar.isShow === 1) {
                btnArr.push(
                    <Button key={1} onClick={freeActive} style={btnStyle}
                            type='primary'>{btnData.freeButtonPar.buttonName}</Button>
                )
            }
            if (btnData && btnData.chargeButtonPar && btnData.chargeButtonPar.isShow === 1) {
                btnArr.push(
                    <Button key={2} onClick={chargeActive} style={btnStyle}
                            type='primary'>{btnData.chargeButtonPar.buttonName}</Button>
                )
            }
        }
        return btnArr
    }

    render() {
        const {softDetail, chargeDetail} = this.state;
        return (
            <div>
                {this.state.chooseUserVisible ? this.chooseUserModal() : null}
                {this.updateHistory()}
                <h1
                    style={{
                        fontSize: '20px',
                        lineHeight: '28px',
                        padding: '24px 0',
                        borderBottom: '1px solid rgba(43,52,65,0.25)',
                        margin: '0 0 15px 0'
                    }}
                >
                    <a
                        onClick={() => this.props.history.push('/pages/appCenter/ApplyManageNewUI/applySetting')}
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0',
                            margin: '0 0 15px 0'
                        }}
                    >
                        应用设置
                    </a>
                    &nbsp;> {softDetail && softDetail.name}
                </h1>
                <Modal
                    title='收费开通'
                    visible={this.state.chargeVisible}
                    onCancel={() => this.setState({chargeVisible: false})}
                    onOk={this.chargeActive}
                >
                    <h3>请选择购买云服务规则</h3>
                    <h3>已选择:一年</h3>
                    <h3>店铺数:</h3>
                    <div style={{margin: '8px 0'}}>
                        <Radio.Group>
                            {
                                chargeDetail.allGoodsSpecList && chargeDetail.allGoodsSpecList[0].specResList.map(item => (
                                    <Radio.Button key={item.specId} value={item.specId}>{item.specValue}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <h3>使用时长</h3>
                    <div style={{margin: '8px 0'}}>
                        <Radio.Group>
                            {
                                chargeDetail.allGoodsSpecList && chargeDetail.allGoodsSpecList[1].specResList.map(item => (
                                    <Radio.Button key={item.specId} value={item.specId}>{item.specValue}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>
                </Modal>
                <IsPower
                    key={'SOFT_MARKET_INF0'}
                    permissionsName={'SOFT_MARKET_INF0'}
                >
                    <Row
                        style={{
                            padding: '9px 0 24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                        }}
                    >
                        <Col span={17} style={{display: 'flex'}}>
                            <img src={softDetail.logo} alt=""
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
                                    {softDetail.name}
                                </h1>
                                <span
                                    style={{
                                        color: 'rgba(43,52,65,0.65)'
                                    }}
                                >
                                    {softDetail.description}
                                </span>
                            </div>
                        </Col>
                        <Col span={7}
                             style={{
                                 textAlign: 'right',
                                 marginTop: '19px'
                             }}
                        >
                            {/*{*/}
                            {/*    this.showButton()*/}
                            {/*}*/}
                        </Col>
                    </Row>
                    <div
                        style={{
                            color: '#2B3441',
                            margin: '24px 0px 16px',
                        }}
                    >
                        版本: {softDetail.softVersion}&nbsp;&nbsp;&nbsp;&nbsp; <a
                        onClick={() => this.setState({historyVisible: true})}>更新历史</a>
                    </div>
                    <div
                        style={{
                            color: '#2B3441',
                            margin: '24px 0px 16px',
                        }}
                    >
                        更新日期: {formatDate(softDetail.versionTime)}
                    </div>
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
                        </ul>
                    </IsPower>
                </IsPower>

            </div>
        );
    }
}

export default ApplyDetail;
