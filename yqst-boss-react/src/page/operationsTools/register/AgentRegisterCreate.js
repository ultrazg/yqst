import React from 'react';
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {Link} from "react-router-dom";
import {
    Modal, Input, Button, Form, message, Row, Col, Table, Cascader,
    Checkbox, Popconfirm, Radio
} from "antd";
import {RollbackOutlined} from "@ant-design/icons";
import Model from "../../serveCenter/Model";
import CityData from "../../../resource/SwCityData";
import request from "../../../utils/request/request";
import ApiInterface from "./ApiInterface";
import CheckInput from "../../../utils/checkInput/CheckInput";
import {getPageQuery} from "../../../utils";
import SWTable from 'SWViews/table';
import cloneDeep from 'lodash/cloneDeep'

class AgentRegisterCreate extends React.Component {
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
        if (this.sn)
            this.getDetail()
        else
            this.setState({isLoaded: true})
    }

    getDetail = () => {
        request(ApiInterface.AgentProjectDetail, {sn: this.sn}, (res) => {
            this.formRef && this.formRef.setFieldsValue({
                projectName: res.data.userName || '',//	string	是	项目用户名
                projectCode: res.data.projectCode || '',//	string	是	项目编码
                address: [res.data.provinceId + "", res.data.cityId + "", res.data.districtId + ""],//	Long	是	所属地区
                projectAddress: res.data.projectAddress || '',//	string	是	项目地址
                contacts: res.data.contacts || '',//	string	是	联系人
                contactNumber: res.data.contactNumber || '',//	string	是	联系电话
                projectStatus: res.data.projectStatus || '',//	Integer	是	项目状态
                transactionType: 1,//	Integer	是	交易类型： 1.租赁 2,外租 3.维保
                remark: res.data.remark || '',//	string	是	备注
                adminPhone: res.data.adminPhone || '',//	string	是	企业管理员手机号
                relationCompanyUserSn: res.data.relationCompanyUserSn || '', //  Integer    是    关联企业系统编码
                relationCompanyUserName: res.data.relationCompanyName || '',
            })
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
                sn: this.sn,
            }, (res) => {
                this.setState({
                    isLoaded: true,
                    supplierList: res.data.records
                })
            }, () => {
            });
    }

    submit = (values) => {
        if (CheckInput.checkUsuallyPhone(values.contactNumber, '联系电话')) {
            return;
        }
        if (CheckInput.checkPhone(values.adminPhone, false)) {
            message.info("请输入正确的管理员手机");
            return;
        }
        request(ApiInterface.AgentProjectSave, {
                sn: this.sn,//	string	是	系统编码
                projectName: values.projectName || '',//	string	是	项目用户名
                projectCode: values.projectCode || '',//	string	是	项目编码
                regionId: values.address[2] || '',//	Long	是	所属地区
                projectAddress: values.projectAddress || '',//	string	是	项目地址
                contacts: values.contacts || '',//	string	是	联系人
                contactNumber: values.contactNumber || '',//	string	是	联系电话
                projectStatus: values.projectStatus || '',//	Integer	是	项目状态
                transactionType: 1,//	Integer	是	交易类型： 1.租赁 2,外租 3.维保
                remark: values.remark || '',//	string	是	备注
                adminPhone: values.adminPhone || '',//	string	是	企业管理员手机号
                relationCompanyUserSn: values.relationCompanyUserSn || '', //  Integer    是    关联企业系统编码
                projectSupplierSnListStr: this.state.supplierList
                    .map((item) => item.partnerSn).toString() || '',//   Integer    是    添加的合作伙伴企业系统编码字符串，用逗号分隔
            },
            (res) => {
                message.info("创建成功");
                this.props.history.push('/Pages/AgentRegisterList');
            }, () => {
            }
        )
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
                    {name: this.sn ? "编辑项目用户" : "新增项目用户"},
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
                {this.state.SelectCompantVisible ? <SelectCompanyModal
                    closeModal={() => {
                        this.setState({SelectCompantVisible: false})
                    }}
                    onSelect={(data) => {
                        this.formRef.setFieldsValue({
                            relationCompanyUserSn: data.companySn,
                            relationCompanyUserName: data.companyName
                        });
                        this.setState({SelectCompantVisible: false})
                    }}/> : null}
                {this.state.CreateCompantVisible ? <CreateCompanyModal
                    closeModal={() => {
                        this.setState({CreateCompantVisible: false})
                    }}/> : null}
                {this.state.SelectSupplierVisible ? <SelectSupplierModal
                    relationCompanyUserSn={this.formRef && this.formRef.getFieldsValue ?
                        this.formRef.getFieldValue("relationCompanyUserSn") || '' : ""}
                    closeModal={() => {
                        this.setState({SelectSupplierVisible: false})
                    }}
                    onSelect={(data) => {
                        this.setState({
                            supplierList: data,
                            SelectSupplierVisible: false
                        })
                    }}
                    selectedList={this.state.supplierList}
                /> : null}
                {this.state.SelectPartnerVisible ? <SelectPartnerModal
                    relationCompanyUserSn={this.formRef && this.formRef.getFieldsValue ?
                        this.formRef.getFieldValue("relationCompanyUserSn") || '' : ""}
                    closeModal={() => {
                        this.setState({SelectPartnerVisible: false})
                    }}
                    onSelect={(data, partnerType) => {
                        //添加合作伙伴操作
                        request(ApiInterface.AgentProjectAddPartner, {
                            companySn: (this.formRef && this.formRef.getFieldsValue ?
                                this.formRef.getFieldValue("relationCompanyUserSn") || '' : ""),//	string	是	企业用户系统编码
                            partnerUserSn: data[0].sn,//	string	是	合作伙伴系统编码
                            isSupplier: partnerType == 1 || partnerType == 3 ? 1 : 0,//	Integer	是	是否为供应商 （0为否，1为是）
                            isCustomer: partnerType == 2 || partnerType == 3 ? 1 : 0,//	Integer	是	是否为客户（0为否，1为是）
                        }, (res) => {
                            message.success("操作成功")
                        }, () => {
                        });
                        this.setState({
                            SelectPartnerVisible: false
                        })
                    }}
                    selectedList={this.state.supplierList}
                /> : null}
                <Button type={'primary'} style={{margin: '0rem 1rem 1rem 1rem'}}
                        onClick={() => {
                            this.formRef && this.formRef.submit();
                        }}>{this.sn ? "保存" : "提交"}</Button>
            </ViewContent>
        </Form>
    }

    makeContent() {
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
                    label="项目名称"
                    name="projectName"
                    rules={[
                        {
                            required: true,
                            message: '请输入项目名称',
                            max: 50
                        },
                    ]}
                >
                    <Input maxLength={50}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目编号"
                    name="projectCode"
                    rules={[
                        {
                            required: true,
                            message: '请输入项目编号',
                            max: 30
                        },
                    ]}
                >
                    <Input maxLength={30}/>
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
                    <Cascader options={CityData.data}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="详细地址"
                    name="projectAddress"
                    rules={[
                        {
                            required: true,
                            message: '请输入详细地址',
                            max: 30
                        },
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="联系人"
                    name="contacts"
                    rules={[
                        {
                            required: true,
                            message: '请输入联系人',
                            max: 30
                        },
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="联系电话"
                    name="contactNumber"
                    rules={[
                        {
                            required: true,
                            message: '请输入正确的联系电话',
                            max: 20
                        },
                    ]}
                >
                    <Input maxLength={20}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="管理员手机"
                    name="adminPhone"
                    rules={[
                        {
                            required: true,
                            message: '请输入正确的管理员手机',
                            max: 11
                        },
                    ]}
                >
                    <Input maxLength={11}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="项目状态"
                    name="projectStatus"
                    rules={[
                        {
                            required: true,
                            message: '请输入项目状态',
                            max: 20
                        },
                    ]}
                >
                    <Input maxLength={20}/>
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
                    rules={[
                        {
                            required: false,
                            message: '请输入备注',
                            max: 50
                        },
                    ]}
                >
                    <Input maxLength={50}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 3}}
                    wrapperCol={{span: 12}}
                    label="关联企业Sn"
                    name={'relationCompanyUserSn'}
                    rules={[
                        {
                            required: true,
                            message: '请选择关联企业',
                        },
                    ]}
                    hidden={true}
                >
                    <Input onClick={() => {
                        this.setState({SelectCompantVisible: true})
                    }}/>
                </Form.Item>
                <Form.Item>
                    <Row>
                        <Col span={18}>
                            <Form.Item
                                labelCol={{span: 4}}
                                wrapperCol={{span: 16}}
                                label="关联企业"
                                name={'relationCompanyUserName'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请选择关联企业',
                                    },
                                ]}
                            >
                                <Input onClick={() => {
                                    this.setState({SelectCompantVisible: true})
                                }}/>
                            </Form.Item>
                        </Col>
                        <Col pull={2}>
                            <Button onClick={() => {
                                this.setState({CreateCompantVisible: true})
                            }}>创建企业</Button>
                        </Col>
                    </Row>
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
                <SupplierListTable list={this.state.supplierList}
                                   del={(index) => {
                                       let supplierList = this.state.supplierList;
                                       supplierList.splice(index, 1);
                                       this.setState({
                                           supplierList
                                       })
                                   }}/>
                <Button onClick={() => {
                    if (!(this.formRef && this.formRef.getFieldValue("relationCompanyUserSn"))) {
                        message.info("请先选择关联企业")
                        return;
                    }
                    this.setState({SelectSupplierVisible: true})
                }}>添加供应商</Button>
                <Button onClick={() => {
                    if (!(this.formRef && this.formRef.getFieldValue("relationCompanyUserSn"))) {
                        message.info("请先选择关联企业")
                        return;
                    }
                    this.setState({SelectPartnerVisible: true})
                }}>添加合作伙伴</Button>
            </div>
        </div>
    }
}

class CreateCompanyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            indList: []
        }
    }

    componentDidMount() {
        this.getIndList();
    }

    getIndList() {
        request(ApiInterface.AgentErpIndustryList, {}, (res) => {
            this.setState({
                indList: res.data ? res.data.map(item => {
                    item.childList = item.childList && item.childList.map(cItem => {
                        return {
                            ...cItem,
                            value: cItem.id,
                            label: cItem.industryName,
                        }
                    });
                    item.children = item.childList;
                    delete item.childList;
                    return {
                        ...item,
                        value: item.id,
                        label: item.industryName,
                    }
                }) : []
            });
        }, (err) => {
        });
    }

    submit = (values) => {
        if (CheckInput.checkInputValue(values.creditCode, '统一社会信用代码')) {
            return;
        }
        if (CheckInput.checkPhone(values.adminPhone, false)) {
            message.info("请输入正确的管理员手机");
            return;
        }
        request(ApiInterface.AgentErpCreate, {
                sn: '',//	string	是	系统编码
                companyName: values.companyName,//	string	是	公司名称
                creditCode: values.creditCode,//	string	是	统一社会信用代码
                industryId: values.industryId[1],//	Long	是	所属行业
                regionId: values.address[2],//	Long	是	所属地区
                adminPhone: values.adminPhone,//	string	是	企业管理员手机号
            },
            (res) => {
                message.info("创建成功");
                this.props.closeModal && this.props.closeModal()
            }, () => {
            }
        )
    }

    render() {
        let {closeModal} = this.props;
        return <Modal
            style={{top: 15}}
            title="创建企业"
            width={650}
            className={'sw-modal'}
            visible={true}
            onOk={() => {
                this.form && this.form.submit();
            }}
            onCancel={() => {
                closeModal && closeModal()
            }}
        >
            {/*sn	string	是	系统编码*/}
            {/*companyName	string	是	公司名称*/}
            {/*creditCode	string	是	统一社会信用代码*/}
            {/*industryId	Long	是	所属行业*/}
            {/*regionId	Long	是	所属地区*/}
            {/*adminPhone	string	是	企业管理员手机号*/}
            <Form ref={(c) => this.form = c} onFinish={(values) => {
                this.submit(values);
            }}>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="企业名称"
                    name="companyName"
                    rules={[
                        {
                            required: true,
                            message: '请输入企业名称',
                            max: 30
                        },
                    ]}
                >
                    <Input maxLength={30}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="统一社会信用代码"
                    name="creditCode"
                    rules={[
                        {
                            required: true,
                            message: '请输入统一社会信用代码',
                            max: 18
                        },
                    ]}
                >
                    <Input maxLength={18}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="所属行业"
                    name={'industryId'}
                    rules={[
                        {
                            required: true,
                            message: '所属行业不能为空!',
                        }
                    ]}
                >
                    <Cascader
                        placeholder="请选择所属行业"
                        options={this.state.indList}
                        showSearch={{
                            filter: (inputValue, path) => {
                                return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                            }
                        }}
                    />
                </Form.Item>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="所在地区"
                    name={'address'}
                    rules={[
                        {
                            type: 'array',
                            required: true,
                            message: '请选择所在地区',
                        },
                    ]}
                >
                    <Cascader options={CityData.data}/>
                </Form.Item>
                <Form.Item
                    labelCol={{span: 6}}
                    wrapperCol={{span: 14}}
                    label="管理员手机"
                    name="adminPhone"
                    rules={[
                        {
                            required: true,
                            message: '请输入正确的管理员手机',
                            max: 11
                        },
                    ]}
                >
                    <Input maxLength={11}/>
                </Form.Item>
            </Form>
        </Modal>
    }
}

class SelectCompanyModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
            },
            list: [],
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList(current) {
        this.state.requestPar.current = current ? current : this.state.requestPar.current;

        Model.UserAPage(this.state.requestPar, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.uid
                }
            });
            this.setState({
                list: newList || [],
                total: res.data.total || 0,
                visible: true,
                requestPar: this.state.requestPar
            })
        }, (err) => {
        })
    }

    render() {
        let {onSelect, closeModal} = this.props;
        let {requestPar, list} = this.state;
        const columns = [
            {
                title: '企业ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '操作',
                width: 80,
                render: (res, record) => {
                    return <a onClick={() => {
                        onSelect && onSelect(record)
                    }}>选择</a>
                }
            }
        ];
        return <Modal
            style={{top: 15}}
            title="选择企业"
            width={650}
            className={'sw-modal'}
            visible={true}
            footer={<Button onClick={() => {
                closeModal && closeModal()
            }}>关闭</Button>}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={16}>
                    <Col span={24}>
                        关键字：
                        <Input maxLength={30} value={requestPar.keyWord} style={{width: '80%'}}
                               placeholder={'可查询企业名称'} onChange={(e) => {
                            this.setState({
                                requestPar: {
                                    ...requestPar,
                                    keyWord: e.target.value
                                }
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={8}>
                    <Button onClick={() => {
                        this.setState({
                            requestPar: {
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                                status: 1,
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getList(1);
                    }}>搜索</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        showSizeChanger: false,
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            this.getList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }
}

class SelectPartnerModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyWord: '',
            list: [],
            orgList: [],
            partnerType: 1
        }
    }

    componentDidMount() {
        this.getList();
    }

    searchLocal = () => {
        let {orgList, keyWord} = this.state;
        this.setState({
            list: orgList.map((item) => {
                if ((item.id + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0
                    || (item.accountSn + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0
                    || (item.userName + '').toLowerCase()
                        .indexOf(keyWord.toLowerCase()) >= 0) {
                    return item
                } else
                    return false;
            }).filter(Boolean)
        })
    }

    getList = () => {
        request(ApiInterface.AgentProjectAddPartnerList, {
            current: 1,
            pageSize: 1000,
            sn: this.props.relationCompanyUserSn || '',
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
        for (let i = 0; i < list.length; i++) {
            list[i].isChose = list[i].id == record.id
        }
        //同步当前数据（完整数据）选择
        for (let i = 0; i < orgList.length; i++) {
            orgList[i].isChose = orgList[i].id == record.id;
        }
        this.setState({
            orgList: orgList,
            list: list
        })
    }

    render() {
        let {onSelect, closeModal} = this.props;
        let {keyWord, list, orgList} = this.state;
        const columns = [
            {
                title: '操作',
                width: 80,
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
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '企业号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName',
            },
        ];
        return <Modal
            style={{top: 15}}
            title="添加合作伙伴"
            width={650}
            className={'sw-modal'}
            visible={true}
            onOk={() => {
                let result = [];
                for (let i = 0; i < orgList.length; i++) {
                    if (orgList[i].isChose) {
                        result.push({...orgList[i]});
                    }
                }
                if (result.length == 0) {
                    return message.info("请选择一个企业作为合作伙伴");
                }
                onSelect && onSelect(result, this.state.partnerType)
            }}
            onCancel={() => {
                closeModal && closeModal()
            }}
        >
            <Row style={{marginBottom: 8}}>
                <Col span={16} style={{marginBottom: 5}}>
                    <Col span={24}>
                        合作伙伴类型：
                        <Radio.Group onChange={(e) => {
                            this.setState({partnerType: e.target.value});
                        }} value={this.state.partnerType}>
                            <Radio value={1}>供应商</Radio>
                            <Radio value={2}>客户</Radio>
                            <Radio value={3}>客户及供应商</Radio>
                        </Radio.Group>
                    </Col>
                </Col>
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
                for (let i = 0; i < orgList.length; i++) {
                    if (orgList[i].isChose)
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
        request(ApiInterface.AgentProjectSurplusSupplierListByCompanySn, {
            current: 1,
            pageSize: 1000,
            relationCompanyUserSn: this.props.relationCompanyUserSn || '',
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
        let {keyWord, list, orgList} = this.state;
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
                for (let i = 0; i < orgList.length; i++) {
                    if (orgList[i].isChose)
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

const SupplierListTable = ({list, total, del}) => {
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
        {
            title: '操作',
            key: 'opera',
            dataIndex: 'opera',
            width: '15%',
            render: (res, record, index) => {
                return <Popconfirm
                    title="确认删除该供应商！"
                    onConfirm={() => {
                        del && del(index);
                    }}
                    okText="是"
                    cancelText="否">
                    <a style={{color: 'red'}}>删除</a>
                </Popconfirm>
            }
        },
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
export default AgentRegisterCreate;
