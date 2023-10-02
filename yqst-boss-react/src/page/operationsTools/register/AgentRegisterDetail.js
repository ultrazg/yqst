import React from 'react';
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Link} from "react-router-dom";
import {Button, Checkbox, Col, Form, Input, message, Modal, Popconfirm, Row, Table} from "antd";
import {RollbackOutlined} from "@ant-design/icons";
import request from "../../../utils/request/request";
import ApiInterface from "./ApiInterface";
import {getPageQuery} from "../../../utils";
import SWTable from 'SWViews/table';
import cloneDeep from "lodash/cloneDeep";
import CheckInput from "../../../utils/checkInput/CheckInput";

class AgentRegisterDetail extends React.Component {
    constructor(props) {
        super(props);
        let query = getPageQuery();
        this.sn = query.sn || ''
        this.state = {
            isLoaded: false,
            SelectCompantVisible: false,
            info: {},
            supplierList: []
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(ApiInterface.AgentProjectDetail, {sn: this.sn}, (res) => {
            this.setState({
                isLoaded: true,
                info: res.data
            }, () => {
                this.getSupplierList();
            })
        }, () => {
        });
    }

    getSupplierList = () => {
        request(ApiInterface.AgentProjectSupplierList,
            {
                current: 1,//	int	是	当前页
                pageSize: 1000,//	int	是	每页大小
                keyWord: '',//	string	是	关键词
                relationCompanyUserSn: this.state.info.relationCompanyUserSn || '',
                sn: this.sn
            }, (res) => {
                this.setState({
                    isLoaded: true,
                    supplierList: res.data.records
                })
            }, () => {
            });
    }

    render() {
        return <Form ref={(c) => this.formRef = c} onFinish={(values) => {
            this.submit(values);
        }} onFinishFailed={(err) => {
            console.log(err)
        }}>
            <ViewContent
                crumb={[
                    {name: "代办注册", link: '/Pages/AgentRegisterList'},
                    {name: "项目详情"},
                ]}
                topBtn={
                    <div>
                        <Link to={'/Pages/AgentRegisterList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined/>}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.state.isLoaded ? this.makeContent() : null}
                {this.state.isLoaded && this.state.info.insteadStatus == 1 ?
                    <div style={{disaplay: 'flex', flexDirection: 'row'}}>
                        <Button type={'primary'} style={{margin: '0rem 1rem 1rem 1rem'}}
                                onClick={() => {
                                    // this.props.history.replace('/Pages/AgentRegisterCreate?sn=' + this.sn)
                                    this.setState({editInfoModal: true})
                                }}>编辑</Button>
                        {/*<Button style={{margin: '0rem 1rem 1rem 1rem'}}*/}
                        {/*        onClick={() => {*/}
                        {/*            alert('暂不支持');*/}
                        {/*        }}>删除</Button>*/}
                    </div> : null}
            </ViewContent>
            {this.state.editInfoModal ?
                <EditInfoModal
                    sn={this.sn}
                    info={this.state.info}
                    refresh={() => this.getDetail()}
                    closeModal={() => {
                        this.setState({editInfoModal: false});
                    }}/> : null}
        </Form>
    }

    makeContent() {
        let {info} = this.state
        return <div>
            <div style={{padding: '1rem 1rem 1rem 1rem'}}>
                <div style={{fontSize: 16, color: '#2B3441FF'}}>
                    项目详情
                </div>
                <div style={{
                    fontSize: 14,
                    color: '#2B3441FF',
                    paddingLeft: 10,
                    lineHeight: '36px',
                    backgroundColor: '#2B34410D',
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    基本信息
                </div>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="状态"
                >
                    <div>{(() => {
                        //1.运营代注册未激活，2运营代注册已激活
                        switch (info.insteadStatus) {
                            case 1:
                                return "未激活"
                            case 2:
                                return "已激活"
                            default:
                                return ""
                        }
                    })()}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目名称"
                    name="projectName"
                >
                    <div>{info.userName}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目编号"
                    name="projectCode"
                >
                    <div>{info.projectCode}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目地区"
                    name={'address'}
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: '请选择项目地区',
                        },
                    ]}
                >
                    <div>{(info.provinceName || '') + (info.cityName || '') + (info.districtName || '')}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="详细地址"
                    name="projectAddress"
                >
                    <div>{info.projectAddress}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="联系人"
                    name="contacts"
                >
                    <div>{info.contacts}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="联系电话"
                    name="contactNumber"
                >
                    <div>{info.contactNumber}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="管理员手机"
                    name="adminPhone"
                >
                    <div>{info.adminPhone}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目状态"
                    name="projectStatus"
                >
                    <div>{info.projectStatus}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="交易类型"
                >
                    <div>租赁</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="备注"
                    name="remark"
                >
                    <div>{info.remark}</div>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="关联企业"
                    name={'relationCompanyUserName'}
                    rules={[
                        {
                            required: true,
                            message: '请选择关联企业',
                        },
                    ]}
                >
                    <div>{info.relationCompanyName}</div>
                </Form.Item>
            </div>
            <div style={{padding: '0rem 1rem 1rem 1rem'}}>
                <div style={{
                    fontSize: 14,
                    color: '#2B3441FF',
                    paddingLeft: 10,
                    lineHeight: '36px',
                    backgroundColor: '#2B34410D',
                    marginTop: 10,
                    marginBottom: 10,
                }}>
                    项目供应商
                </div>
                {info.insteadStatus == 2 ? null : <Button style={{marginBottom: 10}} onClick={() => {
                    this.setState({SelectSupplierVisible: true})
                }}>添加供应商</Button>}
                <SupplierListTable
                    insteadStatus={info.insteadStatus}
                    list={this.state.supplierList}
                    del={(record, index) => {
                        let supplierList = this.state.supplierList;
                        request(ApiInterface.AgentProjectSupplierDel, {
                            sn: this.sn,
                            snListStr: record.sn,
                        }, (res) => {
                            supplierList.splice(index, 1);
                            this.setState({supplierList})
                        }, () => {
                        })
                    }}/>
                {this.state.SelectSupplierVisible ? <SelectSupplierModal
                    sn={this.sn}
                    closeModal={() => {
                        this.setState({SelectSupplierVisible: false})
                    }}
                    onSelect={(data) => {
                        // data
                        if (data.length <= 0) {
                            return message.info("请至少选择一个供应商");
                        }
                        request(ApiInterface.AgentProjectSupplierAdd, {
                            sn: this.sn,
                            partnerUserSnListStr: data.map((item) => item.partnerSn).toString()
                        }, (res) => {
                            message.info("添加成功");
                            this.getSupplierList();
                        }, () => {

                        })
                        this.setState({
                            SelectSupplierVisible: false
                        })
                    }}
                    selectedList={[]}
                /> : null}
            </div>
        </div>
    }
}

class SelectSupplierModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            list: [],
            orgList: [],
        }
    }

    componentDidMount() {
        this.getList();
    }

    searchLocal = () => {
        let {orgList, keyWord} = this.state;
        this.setState({
            list: orgList.map((item) => {
                if ((item.partnerUserId + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0
                    || (item.partnerAccountSn + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0
                    || (item.partnerName + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0) {
                    return item
                } else
                    return false;
            }).filter(Boolean)
        })
    }

    getList = () => {
        request(ApiInterface.AgentProjectSurplusSupplierList, {
            current: 1,
            pageSize: 1000,
            sn: this.props.sn
        }, (res) => {
            let selectedIds = this.props.selectedList.map((item) => {
                return item.partnerUserId
            });
            const newList = res.data.records ? res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.partnerUserId,
                    isChose: selectedIds.includes(item.partnerUserId)
                }
            }) : [];
            this.setState({
                list: cloneDeep(newList),
                orgList: cloneDeep(newList),
                total: newList.length || 0,
                visible: true,
            })
        }, (err) => {
        })
    }
    chose = (record, index) => {
        let {orgList, list} = this.state;
        //设置当前数据选择
        let choseIdx = -1;
        for (let i = 0; i < list.length; i++) {
            if (list[i].partnerUserId == record.partnerUserId) {
                choseIdx = i;
                list[i].isChose = !list[i].isChose;
                break;
            }
        }
        if (choseIdx >= 0) {
            //同步当前数据（完整数据）选择
            for (let i = 0; i < orgList.length; i++) {
                if (orgList[i].partnerUserId == record.partnerUserId) {
                    orgList[i].isChose = list[choseIdx].isChose;
                    break;
                }
            }
        }
        this.setState({
            orgList,
            list
        })
    }

    render() {
        let {onSelect, closeModal} = this.props;
        let {keyWord, list} = this.state;
        const columns = [
            {
                title: '操作',
                width: '10%',
                key: 'isChose',
                dataIndex: 'isChose',
                render: (res, record, index) => {
                    return <Checkbox checked={res ? true : false} onChange={(e) => {
                        this.chose(record, index);
                    }}/>
                }
            },
            {
                title: '企业ID',
                key: 'partnerUserId',
                dataIndex: 'partnerUserId',
                width: '20%'
            },
            {
                title: '企业号',
                key: 'partnerAccountSn',
                dataIndex: 'partnerAccountSn',
                width: '20%'
            },
            {
                title: '企业名称',
                key: 'partnerName',
                dataIndex: 'partnerName',
                width: '50%'
            },
        ];
        return <Modal
            style={{top: 15}}
            title="选择供应商"
            width={650}
            className={'sw-modal'}
            visible={true}
            onOk={() => {
                let result = [];
                let {orgList} = this.state;
                for (let i = 0; i < orgList.length; i++) {
                    if (orgList[i].isChose) {
                        result.push({...orgList[i]});
                    }
                }
                onSelect && onSelect(result)
            }}
            onCancel={() => {
                closeModal && closeModal()
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={16}>
                    <Col span={24}>
                        关键字：
                        <Input maxLength={30} value={keyWord} style={{width: '80%'}}
                               placeholder={'可查询企业ID、企业号、企业名称'} onChange={(e) => {
                            this.setState({
                                keyWord: e.target.value
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={8}>
                    <Button onClick={() => {
                        this.setState({
                            keyWord: '',
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.searchLocal();
                    }}>搜索</Button>
                </Col>
            </Row>
            <div>选中{(() => {
                let count = 0;
                for (let i = 0; i < list.length; i++) {
                    if (list[i].isChose)
                        count++
                }
                return count;
            })()}条
            </div>
            <Table
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        showSizeChanger: false,
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }
}

const SupplierListTable = ({insteadStatus, list, total, del}) => {
    // partnerUserId	long	合作伙伴用户id
    // partnerSn	string	合作伙伴系统编码
    // partnerName	string	合作伙伴名
    // partnerAccountSn	string	合作伙伴账套号
    let columns = [
        {
            title: '序号',
            key: 'index',
            dataIndex: 'index',
            render: (value, record, index) => {
                return index + 1;
            },
            width: '15%'
        },
        {
            title: '企业号',
            key: 'partnerAccountSn',
            dataIndex: 'partnerAccountSn',
            width: '30%'
        },
        {
            title: '企业名称',
            key: 'partnerName',
            dataIndex: 'partnerName',
            width: '40%'
        },
        (insteadStatus == 2 ? {} : {
            title: '操作',
            key: 'opera',
            dataIndex: 'opera',
            width: '15%',
            render: (res, record, index) => {
                return <Popconfirm
                    title="确认删除该供应商！"
                    onConfirm={() => {
                        del && del(record, index);
                    }}
                    okText="是"
                    cancelText="否">
                    <a style={{color: 'red'}}>删除</a>
                </Popconfirm>
            }
        }),
    ]
    return <SWTable
        columns={columns}
        dataSource={list}
        pagination={
            {
                total: total,
                showTotal: (total, range) => `共有${total}条`
            }
        }
    />
}

class EditInfoModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            adminPhone: this.props.info.adminPhone || ""
        }
    }

    updateInfo = () => {
        let {closeModal, sn} = this.props;
        if (CheckInput.checkPhone(this.state.adminPhone, false)) {
            message.info("请输入正确的管理员手机");
            return;
        }
        request(ApiInterface.AgentErpCreate, {
            sn: sn || '',//	string	是	系统编码
            adminPhone: this.state.adminPhone || '',//	string	是	企业管理员手机号
        }, (res) => {
            message.info("修改成功");
            closeModal && closeModal();
            this.props.refresh && this.props.refresh()
        }, () => {
        });
    }

    render() {
        let {closeModal} = this.props;
        return <Modal
            style={{top: 15}}
            title="修改信息"
            width={650}
            className={'sw-modal'}
            visible={true}
            onOk={() => {
                this.updateInfo()
            }}
            onCancel={() => closeModal && closeModal()}
        >
            <Form.Item
                labelCol={{span: 4}}
                wrapperCol={{span: 14}}
                label="管理员手机"
                rules={[
                    {
                        required: true,
                    },
                ]}
            >
                <Input
                    value={this.state.adminPhone}
                    onChange={(e) => {
                        this.setState({
                            adminPhone: e.target.value
                        })
                    }} maxLength={11}/>
            </Form.Item>
        </Modal>
    }
}

export default AgentRegisterDetail;
