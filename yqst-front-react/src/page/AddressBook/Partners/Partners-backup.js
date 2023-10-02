import React, {Component} from 'react';
import classnames from 'classnames'
import SwCityData from '../../../resource/SwCityData'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

import {Avatar, Button, Cascader, Col, Descriptions, Empty, Input, message, Modal, Row, Select, Tabs, Form} from 'antd';
import Editable from './EditTable'
import model from '../Model'
import {formRegExp} from '../../../utils'
import homeModel from '../../Home/Model'


class Partners extends Component {
    constructor(props) {
        super(props);
        this.state = {
            partnersData: [],
            baseInfo: {},
            contactVOList: [],
            formVisible: false,
            firstLineEdit: false
        };
        this.formRef = React.createRef();
        this.newFormRef = React.createRef();
    }

    componentDidMount() {
        this.getPage()
    }

    getIndustry = () => {
        homeModel.UserIList({}, (res) => {
            const indList = res.data && res.data.map(item => {
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
            });
            this.setState({industryList: indList})
        }, (err) => {
        });
    }

    getPage = (searchValue) => {
        model.partnerListPartner({
            pageNum: 1,
            pageSize: 1000,
            keyWord: searchValue ? searchValue : ''
        }, res => {
            if (res.data && res.data && res.data.length !== 0) {
                this.getDetail(res.data[0].id)
                this.getPartnersList(res.data[0].id)
                this.authenticationInfo(res.data[0].partnerUser)
                this.setState({
                    partnersData: res.data,
                    currentKey: res.data[0].id
                })
            } else {
                this.setState({partnersData: res.data.records})
            }
        })
    }

    authenticationInfo = (id) => {
        // 获取合作伙伴认证信息,暂时没啥用
        model.companyAuthGet({userId: id}, res => {
        })
    }

    componentWillUnmount() {

    }

    partnersChange = (item) => {
        this.setState({currentKey: item.id, baseInfo: {}})
        this.getDetail(item.id)
        this.getPartnersList(item.id)
        this.authenticationInfo(item.partnerUser)
    }

    getPartnersList = (id, searchValue) => {
        model.contactList({
            partnerid: id
        }, res => {
            res.data.forEach((item, index) => item.key = index)
            this.setState({contactVOList: res.data})
        })
    }

    getDetail = (id) => {
        model.partnerGetById({
            id: id
        }, res => {
            this.setState({
                baseInfo: res.data,
            })
        })
    }

    arrHeadPush = (arr, item, index) => {
        const newArr = arr
        newArr.splice(index, 0, item[0])
        return newArr
    }

    addPartners = () => {
        const newItem = [{
            name: '',
            phone: '',
            depName: '',
            jobName: '',
            key: this.state.contactVOList === undefined ? 0 : this.state.contactVOList.length
        }]
        const contactVOList = this.state.contactVOList === undefined
            ? [].concat(newItem)
            : this.arrHeadPush(this.state.contactVOList, newItem, 0)
        this.setState({contactVOList, firstLineEdit: true})
    }

    partnersUpdate = (submitData) => {
        if (submitData.id) {
            model.contactUpdate({
                ...submitData,
                contactName: submitData.name,
                partnerId: this.state.baseInfo.id,
                partneruser: this.state.baseInfo.partnerUser
            }, res => {
                this.getPartnersList(this.state.currentKey)
                message.success('修改成功')
            })
        } else {
            model.contactAdd({
                ...submitData,
                contactName: submitData.name,
                partnerId: this.state.baseInfo.id,
                partneruser: this.state.baseInfo.partnerUser
            }, res => {
                this.getPartnersList(this.state.currentKey)
                message.success('添加成功')
            })
        }
    }

    render() {
        const {partnersData} = this.state;
        return (
            <div className='content-wrapper'>
                {this.renderFormDrawer()}
                {this.renderNewFormDrawer()}
                <div className='pd0 content-wrapper-left'>
                    <div style={{padding: '24px 12px 0 12px'}} className='header-search'>
                        <Input
                            onChange={(e) => {
                                this.setState({
                                    searchValue: e.target.value
                                })
                            }}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    this.getPage(this.state.searchValue)
                                }
                            }}
                            placeholder='搜索'
                            size='large'
                            prefix={<SearchOutlined style={{color: '#2B3441', fontSize: 13}} />}
                        />
                    </div>
                    <div style={{textAlign: 'center'}}>
                        <Button
                            onClick={() => {
                                this.getIndustry()
                                this.setState({newFormVisible: true})
                            }}
                            style={{
                                marginTop: 16,
                                width: 88,
                                height: 32,
                                fontSize: 14,
                                fontWeight: 500
                            }}
                        >
                            添加
                        </Button>
                    </div>
                    <div className='partners-list-wrapper'>
                        {
                            partnersData && partnersData.map(item => (
                                <div
                                    onClick={() => this.partnersChange(item)}
                                    key={item.id}
                                    className={classnames('partners-list', this.state.currentKey === item.id ? 'partners-list-active' : '')}
                                >
                                    <Avatar className='partners-list-avatar' shape="square" src={item.image}/>
                                    <span className='partners-list-title'>{item.name}</span>
                                </div>
                            ))
                        }
                        {
                            (!partnersData || partnersData.length === 0) && (
                                <Empty style={{marginTop: 100}}/>
                            )
                        }
                    </div>
                </div>
                <div className='content-wrapper-right partners-content-wrapper'>
                    {
                        !this.state.baseInfo || JSON.stringify(this.state.baseInfo) === '{}' ?
                            <Empty style={{marginTop: 200}} description='没有合作伙伴'/>
                            : <div>
                                <div>
                                    <h3>{this.state.baseInfo.parName}</h3>
                                </div>
                                <div className='content-tab'>
                                    <Tabs>
                                        <Tabs.TabPane tab="基本信息" key="1">
                                            {this.renderPane1()}
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="认证信息" key="2">
                                            {this.renderPane2()}
                                        </Tabs.TabPane>
                                        <Tabs.TabPane tab="企业资料" key="3">
                                            {this.renderPane3()}
                                        </Tabs.TabPane>
                                    </Tabs>
                                </div>
                            </div>
                    }

                </div>
            </div>
        );
    }

    renderPane1 = () => {
        const {baseInfo} = this.state;
        return (
            <div className='baseinfo'>
                <div className='oneLine'>
                    <Avatar
                        className='baseinfo-avatar'
                        src={baseInfo.logo}
                    />
                    <div className='baseinfo-title'>
                        <h4>{baseInfo.parName}</h4>
                        <h5>合作伙伴类型: {baseInfo.isSupplier === '1' ? '供应商' : ''}{baseInfo.isCustomer === '1' ? '、客户' : ''}</h5>
                    </div>
                </div>
                <div className='baseinfo-fieldinfo'>
                    <Descriptions className='baseinfo-fieldinfo-item'>
                        <Descriptions.Item label="行业">{baseInfo.industry}</Descriptions.Item>
                        <Descriptions.Item label="电话">{baseInfo.phone}</Descriptions.Item>
                        <Descriptions.Item label="传真">{baseInfo.fax}</Descriptions.Item>
                        <Descriptions.Item label="国家">{baseInfo.countryCode}</Descriptions.Item>
                        <Descriptions.Item label="地区">
                            {
                                baseInfo.state
                                    ? baseInfo.state + '-' + baseInfo.city + '-' + baseInfo.district
                                    : ''
                            }
                        </Descriptions.Item>
                        <Descriptions.Item label="地址">{baseInfo.detailAddress}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{baseInfo.email}</Descriptions.Item>
                        <Descriptions.Item label="邮编">{baseInfo.postCode}</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        )
    }

    renderPane2 = () => {
        const {baseInfo} = this.state
        return (
            <div className='baseinfo'>
                <div className='oneLine'>
                    <Avatar
                        className='baseinfo-avatar'
                        src={baseInfo.logo}
                    />
                    <div className='baseinfo-title'>
                        <h4>{baseInfo.parName}</h4>
                        <h5>合作伙伴类型: {baseInfo.isSupplier === '1' ? '供应商' : ''}{baseInfo.isCustomer === '1' ? '、客户' : ''}</h5>
                    </div>
                </div>
                <div className='baseinfo-fieldinfo'>
                    <Descriptions className='baseinfo-fieldinfo-item' title='基本信息'>
                        <Descriptions.Item span={3} label="企业名称">{baseInfo.parName}</Descriptions.Item>
                        <Descriptions.Item span={3} label="地址">
                            {`${baseInfo.state}-${baseInfo.city}-${baseInfo.district}-${baseInfo.detailAddress}`}
                        </Descriptions.Item>
                    </Descriptions>
                    <Descriptions column={3} className='baseinfo-fieldinfo-item' title='主题证件信息'>
                        <Descriptions.Item span={1} label="企业类型">有限责任公司</Descriptions.Item>
                        <Descriptions.Item span={2} label="工商执照注册号/统一社会信用代码">91440300796623595F-D</Descriptions.Item>
                        <Descriptions.Item className={'desc-oneline'} span={3}
                                           label="经营范围">一般经营项目是:互联网技术开发、移动互联网技术开发、手机软件开发、计算机软硬件技术开发与销售;经营电子商务;汽车零配件批发零售;汽车维修工具、汽车美容装饰用品、润滑油的销售;经济信息咨询;信息技术开发;数据库管理;数据库服务;电子信息技术咨询;科技信息咨询;受金融企业委托提供非金融业务服务。(法律、行政法规禁止的项目除外;法律、行政法规限制的项目须取得许可后方可经营);自有物业租赁;租赁信息咨询-D</Descriptions.Item>
                        <Descriptions.Item span={3} label="企业成立日期">2006-02-02</Descriptions.Item>
                        <Descriptions.Item span={3} label="企业营业期限">无固定期限</Descriptions.Item>
                    </Descriptions>
                </div>
            </div>
        )
    }


    renderPane3 = () => {
        const {baseInfo} = this.state
        return (
            <div className='baseinfo'>
                <div className='baseinfo-fieldinfo'>
                    <Descriptions className='baseinfo-fieldinfo-item'>
                        <Descriptions.Item label="企业名称">{baseInfo.parName}</Descriptions.Item>
                        <Descriptions.Item label="行业">{baseInfo.industry}</Descriptions.Item>
                        <Descriptions.Item label="电话">{baseInfo.phone}</Descriptions.Item>
                        <Descriptions.Item label="传真">{baseInfo.fax}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{baseInfo.email}</Descriptions.Item>
                        <Descriptions.Item label="国家">{baseInfo.countryCode}</Descriptions.Item>
                        <Descriptions.Item label="地区">
                            {
                                baseInfo.state
                                    ? baseInfo.state + '-' + baseInfo.city + '-' + baseInfo.district
                                    : ''
                            }
                        </Descriptions.Item>
                        <Descriptions.Item span={1} label="邮编">{baseInfo.postCode}</Descriptions.Item>
                        <Descriptions.Item span={2} label="地址">{baseInfo.detailAddress}</Descriptions.Item>
                        <Descriptions.Item span={3} label="备注">{baseInfo.content}</Descriptions.Item>
                    </Descriptions>
                </div>
                <div style={{textAlign: 'center'}}>
                    <Button
                        onClick={() => {
                            this.getIndustry()
                            this.setState({formVisible: true})
                        }}
                        className='edit-button'
                        type='primary'
                    >
                        编辑
                    </Button>
                </div>
                <div style={{marginTop: 20}}>
                    <h4 style={{marginBottom: 16}} className='mid-title'>联系人</h4>
                    <Button
                        disabled={this.state.firstLineEdit === true}
                        onClick={this.addPartners}
                        style={{width: '100%'}}
                        type="dashed"
                    >
                        <PlusOutlined />
                        添加联系人
                    </Button>
                    <Editable
                        propsSetEdit={(state) => {
                            this.setState({
                                firstLineEdit: state
                            })
                            this.getPartnersList(this.state.currentKey)
                        }}
                        getDelete={(key) => {
                            model.contactDelete({
                                id: key
                            }, res => {
                                message.success('删除成功')
                                this.getPartnersList(this.state.currentKey)
                            })
                        }}
                        dataSource={this.state.contactVOList}
                        edit={this.state.firstLineEdit}
                        setDataSource={(data, submitData) => {
                            this.partnersUpdate(submitData)
                        }}
                    />
                </div>
            </div>
        );
    }

    onOk = (e) => {
        e.preventDefault();
        this.formRef.current.validateFields([
            'parName', 'type', 'phone',  'fax', 'email', 'country', 'address', 'detailAddress', 'postCode', 'content'
        ]).then(values => {
            const {baseInfo} = this.state;
            if (values.type) {
                values.isSupplier = values.type.includes('1') ? '1' : '0'
                values.isCustomer = values.type.includes('2') ? '1' : '0'
            }
            delete values.type
            if (values.address) {
                values.state = values.address[0]
                values.city = values.address[1]
                values.district = values.address[2]
            }
            delete values.address
            model.partnerUpdate({
                ...values,
                partnerUser: baseInfo.partnerUser,
                partnerId: baseInfo.id,
                id: baseInfo.id,
                userId: baseInfo.userId,
            }, res => {
                message.success('更新成功')
                this.setState({formVisible: false})
                this.getDetail(this.state.currentKey)
            })
        });
    }

    renderFormDrawer = () => {
        const {baseInfo} = this.state
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        return (
            <Modal
                title="修改"
                width={960}
                onClose={() => this.setState({formVisible: false})}
                visible={this.state.formVisible}
                bodyStyle={{paddingBottom: 80}}
                className={'sw-modal'}
                footer={null}
            >
                <Row className={'aaa'}>
                    <Form ref={this.formRef} scrollToFirstError={true} {...formItemLayout} className={'sw-form-item'}>
                        <Col span={12}>
                            <Form.Item label="公司名称" name={'parName'} initialValue={baseInfo.parName} rules={[
                                {
                                    required: true,
                                    message: '请输入公司名称!',
                                },
                            ]}>
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="合作伙伴类型"
                                name={'type'}
                                initialValue={
                                    (() => {
                                        const arr = []
                                        if (baseInfo.isSupplier === '1') arr.push('1')
                                        if (baseInfo.isCustomer === '1') arr.push('2')
                                        return arr
                                    })()
                                }
                            >
                                <Select mode="multiple">
                                    <Select.Option value={'1'}>供应商</Select.Option>
                                    <Select.Option value={'2'}>客户</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="行业" name={'industryId'} initialValue={[baseInfo.parIndustryId, baseInfo.industryId]}>
                                <Cascader options={this.state.industryList}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="电话" name={'phone'} initialValue={baseInfo.phone}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="传真" name={'fax'} initialValue={baseInfo.fax} rules={[
                                formRegExp.range(7, 15),
                                formRegExp.number()
                            ]}>
                                <Input maxLength={15} style={{width: '100%'}}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="邮箱" name={'email'} initialValue={baseInfo.email} rules={[
                                formRegExp.email()
                            ]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="国家" name={'country'} initialValue={baseInfo.countryCode || '中国'}>
                                <Input disabled={true} maxLength={20}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="地区" name={'address'} initialValue={[baseInfo.state, baseInfo.city, baseInfo.district]}>
                                <Cascader
                                    fieldNames={{
                                        label: 'label',
                                        value: 'label',
                                        children: 'children'
                                    }}
                                    options={SwCityData.data}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="地址" name={'detailAddress'} initialValue={baseInfo.detailAddress}>
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="邮编" name={'postCode'} initialValue={baseInfo.postCode} rules={[
                                formRegExp.range(6, 6),
                                formRegExp.number()
                            ]}>
                                <Input style={{width: '100%'}} maxLength={6}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="备注" name={'content'} initialValue={baseInfo.content}>
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={() => this.setState({formVisible: false})} style={{marginRight: 8}}>
                        取消
                    </Button>
                    <Button onClick={this.onOk} type="primary">
                        保存
                    </Button>
                </div>
            </Modal>
        )
    }

    renderNewFormDrawer = () => {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 6},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 18},
            },
        };
        return (
            <Modal
                title="添加"
                width={960}
                onClose={() => this.setState({newFormVisible: false})}
                visible={this.state.newFormVisible}
                bodyStyle={{paddingBottom: 80}}
                footer={null}
                className={'sw-modal'}
            >
                <Row>
                    <Form ref={this.newFormRef} {...formItemLayout} className={'sw-form-item'}>
                        <Col span={12}>
                            <Form.Item
                                label="公司名称"
                                name={'parName1'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入公司名称!',
                                    },
                                ]}
                            >
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item
                                label="合作伙伴类型"
                                name={'type1'}
                            >
                                <Select mode="multiple">
                                    <Select.Option value={'1'}>供应商</Select.Option>
                                    <Select.Option value={'2'}>客户</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="行业" name={'industryId1'}>
                                <Cascader options={this.state.industryList}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="电话" name={'phone1'}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="传真" name={'fax1'} rules={[
                                formRegExp.min(7),
                                formRegExp.number(),
                            ]}>
                                <Input style={{width: '100%'}} maxLength={15}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="邮箱" name={'email1'} rules={[
                                formRegExp.email()
                            ]}>
                                <Input/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="国家" name={'country1'} initialValue={'中国'}>
                                <Input disabled={true} maxLength={20}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="地区" name={'address1'}>
                                <Cascader
                                    fieldNames={{
                                        label: 'label',
                                        value: 'label',
                                        children: 'children'
                                    }}
                                    options={SwCityData.data}
                                />
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="地址" name={'detailAddress1'}>
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="邮编" name={'postCode1'} rules={[
                                formRegExp.min(6),
                                formRegExp.max(6),
                                formRegExp.number()
                            ]}>
                                <Input style={{width: '100%'}} maxLength={6}/>
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="备注" name={'content1'}>
                                <Input maxLength={50}/>
                            </Form.Item>
                        </Col>
                    </Form>
                </Row>

                <div
                    style={{
                        position: 'absolute',
                        right: 0,
                        bottom: 0,
                        width: '100%',
                        borderTop: '1px solid #e9e9e9',
                        padding: '10px 16px',
                        background: '#fff',
                        textAlign: 'right',
                    }}
                >
                    <Button onClick={() => this.setState({newFormVisible: false})} style={{marginRight: 8}}>
                        取消
                    </Button>
                    <Button onClick={this.onNewOk} type="primary">
                        保存
                    </Button>
                </div>
            </Modal>
        )
    }

    onNewOk = (e) => {
        e.preventDefault();
        this.newFormRef.current.validateFields([
            'parName1', 'type1', 'phone1', 'mobile1', 'fax1', 'email1', 'country1', 'address1', 'detailAddress1', 'postCode1', 'postCode1', 'content1', 'industryId1'
        ]).then(values => {
            if (values.type1) {
                values.isSupplier = values.type1.includes('1') ? '1' : '0'
                values.isCustomer = values.type1.includes('2') ? '1' : '0'
            }
            delete values.type1
            if (values.address1) {
                values.state = values.address1[0]
                values.city = values.address1[1]
                values.district = values.address1[2]
            }
            delete values.address1
            if (values.postCode1) values.postCode = values.postCode1
            delete values.postCode1
            if (values.detailAddress1) values.detailAddress = values.detailAddress1
            delete values.detailAddress1
            if (values.country1) values.country = '中国'
            delete values.country1
            if (values.email1) values.email = values.email1
            delete values.email1
            if (values.fax1) values.fax = values.fax1
            delete values.fax1
            if (values.phone1) values.phone = values.phone1
            delete values.phone1
            if (values.content1) values.content = values.content1
            delete values.content1
            if (values.parName1) values.parName = values.parName1
            delete values.parName1
            if (values.industryId1) values.industryId = values.industryId1[values.industryId1.length - 1]
            delete values.industryId1
            model.erpCrmAppend({
                ...values,
                contactDTOList: []
            }, res => {
                message.success('添加成功')
                this.setState({newFormVisible: false})
                this.getPage()
            })
        })
    }

}

export default Partners;
