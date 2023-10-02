import React, {Component} from 'react';
import classnames from 'classnames'
import { FormOutlined, SearchOutlined } from '@ant-design/icons';

import {
    Avatar,
    Button,
    Descriptions,
    Empty,
    Input,
    message,
    Modal,
    Popconfirm,
    Tabs,
    Divider,
    Skeleton,
    Form
} from 'antd';
import model from '../Model'


class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contactList: [],
            data: {},
            cardData: {},
            cardList: [],
            cardLoading: false
        };
        this.formRef = React.createRef();
    }

    // ------ 生命周期函数 start-----
    componentDidMount() {
        this.getContact()
    }

    componentWillUnmount() {

    }

    // ------ 生命周期函数 end-------

    render() {
        const {contactList, cardData} = this.state
        return (
            <div className='content-wrapper'>
                {this.modifyRemark()}
                <div className='pd0 content-wrapper-left'>
                    <div style={{padding: '24px 12px 0 12px'}} className='header-search'>
                        <Input
                            placeholder='搜索'
                            size='large'
                            prefix={<SearchOutlined style={{color: '#2B3441', fontSize: 13}} />}
                            onChange={(e) => this.setState({searchValue: e.target.value})}
                            onKeyDown={(e) => {
                                if (e.keyCode === 13) {
                                    this.setState({
                                        currentKey: undefined,
                                        cardList: [],
                                        data: {},
                                        cardData: {}
                                    }, () => {
                                        this.getContact()
                                    })
                                }
                            }}
                        />
                    </div>
                    {
                        contactList.length === 0 ? <Empty style={{marginTop: 100}} description='没有联系人'/> :
                            <div className='partners-list-wrapper'>
                                {
                                    contactList && contactList.map(item => (
                                        <div
                                            onClick={() => this.partnersChange(item.friendUid)}
                                            key={item.friendUid}
                                            className={classnames('partners-list', this.state.currentKey === (item.friendUid) ? 'partners-list-active' : '')}
                                        >
                                            <Avatar className='partners-list-avatar' shape="square" src={item.photo}/>
                                            <span className='partners-list-title'>{item.remark}</span>
                                        </div>
                                    ))
                                }
                            </div>
                    }
                </div>
                <div className='content-wrapper-right partners-content-wrapper'>
                    <Skeleton loading={this.state.cardLoading}>
                        {
                            contactList.length === 0 ? <Empty style={{marginTop: 200}} description='没有联系人'/> :
                                <div>
                                    <div className={'oneLine contact-right-header flex-centerY'}>
                                        <Avatar
                                            className={'contact-right-header-avatar'}
                                            shape="square"
                                            src={cardData.photo}
                                        />
                                        <h3 style={{marginLeft: 12}} className={'big-title'}>{cardData.remark}</h3>
                                        <FormOutlined
                                            style={{
                                                fontSize: 20,
                                                color: 'rgba(43,52,65,0.65)',
                                                marginLeft: 12,
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => {
                                                this.setState({
                                                    modifyRemarkVisible: true,
                                                    remark: this.state.cardData.remark
                                                })
                                            }} />
                                        {
                                            this.state.currentKey !== '' && (
                                                <div style={{flex: 1, textAlign: 'right'}}>
                                                    <Popconfirm
                                                        title="确认把该联系人加入黑名单?"
                                                        onConfirm={this.joinBlacklist}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <Button className='default-btn'>加入黑名单</Button>
                                                    </Popconfirm>
                                                    <Popconfirm
                                                        title="确认删除该联系人?"
                                                        onConfirm={this.delete}
                                                        okText="确认"
                                                        cancelText="取消"
                                                    >
                                                        <Button
                                                            className='delete-btn'
                                                            style={{marginLeft: 7}}
                                                            type={'danger'}
                                                        >
                                                            删除
                                                        </Button>
                                                    </Popconfirm>
                                                </div>
                                            )
                                        }
                                    </div>
                                    <div style={{marginTop: 32}} className='content-tab'>
                                        <Tabs>
                                            <Tabs.TabPane tab="名片资料" key="1">
                                                {this.businessCardInformation()}
                                            </Tabs.TabPane>
                                            <Tabs.TabPane tab="个人信息" key="2">
                                                {this.personalInformation()}
                                            </Tabs.TabPane>
                                        </Tabs>
                                    </div>
                                </div>
                        }
                    </Skeleton>
                </div>
            </div>
        );
    }

    // ------ 带请求函数 start-----
    getBusinessCard = (friendUid) => {
        this.setState({cardLoading: true})
        model.friendCardList({friendUid}, res => {
            this.setState({
                cardData: res.data,
                cardList: res.data.cardList,
                cardLoading: false
            })
        })
    }

    getInformation = (friendUid) => {
        model.friendDetail({friendUid}, res => {
            this.setState({
                data: res.data
            })
        })
    }

    getContact = () => {
        const serchValue = {keyWord: this.state.searchValue}
        if (serchValue.keyWord === undefined || serchValue.keyWord === '') delete serchValue.keyWord
        model.friendListAll(serchValue, res => {
            if (this.state.currentKey) {
                this.getInformation(this.state.currentKey)
                this.getBusinessCard(this.state.currentKey)
                this.setState({
                    contactList: res.data,
                    currentKey: this.state.currentKey
                })
            } else {
                if (res.data[0]) {
                    this.getInformation(res.data[0].friendUid)
                    this.getBusinessCard(res.data[0].friendUid)
                    this.setState({
                        contactList: res.data,
                        currentKey: res.data[0].friendUid
                    })
                } else {
                    this.setState({contactList: []})
                }
            }
        })
    }

    delete = () => {
        if (this.state.currentKey === undefined) {
            message.error('请先选择要删除的企业!');
            return
        }
        model.friendDelete({friendUid: this.state.currentKey}, res => {
            message.success('联系人删除成功')
            this.setState({
                currentKey: undefined
            }, () => {
                this.getContact()
            })
        })
    }

    joinBlacklist = () => {
        // fixme 联系人加入黑名单未实现
        alert('加入黑名单成功')
    }
    // ------ 带请求函数 end-------

    // ------ 工具函数 start-----
    partnersChange = (key) => {
        this.getInformation(key)
        this.getBusinessCard(key)
        this.setState({currentKey: key})
    }
    // ------ 工具函数 end-------

    // ------ 渲染视图函数 start-----
    businessCardInformation = () => {
        const {cardList} = this.state
        return (
            <div className='descriptions'>
                {
                    cardList && cardList.map((item, index) => (
                        <div key={item.userId + index}>
                            <Descriptions style={{marginTop: 10}} title={`名片 ${index + 1}`}>
                                <Descriptions.Item span={1} label="企业">{item.authCompanyName}</Descriptions.Item>
                                <Descriptions.Item span={1} label="姓名">{item.staffName}</Descriptions.Item>
                                <Descriptions.Item span={1} label="职务">{item.jobName}</Descriptions.Item>
                                <Descriptions.Item span={1} label="工作电话">{item.workPhone}</Descriptions.Item>
                                <Descriptions.Item span={2} label="工作邮箱">{item.workEmail}</Descriptions.Item>
                                <Descriptions.Item span={3} label="办公地址">{item.address}</Descriptions.Item>
                            </Descriptions>
                            <Divider/>
                        </div>
                    ))
                }
                {
                    (cardList && cardList.length === 0) && (
                        <Empty description='暂无名片信息' style={{marginTop: 40}}/>
                    )
                }
            </div>
        )
    }

    getSexState = (sex) => {
        switch (sex) {
            case 0:
                return '未设置'
            case 1:
                return '男'
            case 2:
                return '女'
            default:
                return ''
        }
    }

    personalInformation = () => {
        const {data} = this.state

        return (
            <div className='descriptions'>
                <Descriptions>
                    <Descriptions.Item label="昵称">{data.alias}</Descriptions.Item>
                    <Descriptions.Item label="性别">{this.getSexState(data.sex)}</Descriptions.Item>
                    <Descriptions.Item label="真实姓名">{data.authName}</Descriptions.Item>
                    <Descriptions.Item label="手机号">{data.mobile}</Descriptions.Item>
                    <Descriptions.Item span={2} label="个人邮箱">
                        {data.email}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="地区">
                        {data.regionName}
                    </Descriptions.Item>
                    <Descriptions.Item span={3} label="个性签名">
                        {data.signature}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        )
    }

    modifyRemark = () => {
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 4},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 20},
            },
        };
        const onSubmit = (e) => {
            e.preventDefault()
            this.formRef.current.validateFields().then(values => {
                model.friendSave({
                    friendId: this.state.currentKey,
                    ...values
                }, res => {
                    this.setState({modifyRemarkVisible: false})
                    message.success('修改成功')
                    this.getContact()
                })
            })
        }
        return (
            <Modal
                destroyOnClose={true}
                title='修改备注名'
                className={'sw-modal'}
                visible={this.state.modifyRemarkVisible}
                onCancel={() => this.setState({modifyRemarkVisible: false})}
                onOk={onSubmit}
            >
                <Form ref={this.formRef} className={'form-wrapper'} {...formItemLayout}>
                    <Form.Item label="备注名" name={'remark'} initialValue={this.state.remark} rules={[
                        {
                            required: true,
                            message: '请输入备注名!',
                        },
                    ]}>
                        <Input maxLength={20}/>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }
    // ------ 渲染视图函数 end-------

}


export default Contact;
