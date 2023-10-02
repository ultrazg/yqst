/**
 * Created by yb on 2019/11/11.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Row, Col, message, Input, Popconfirm} from 'antd';
import {EditOutlined, RollbackOutlined, CheckOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from "./SwitchName";
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class CloudServeExDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                id: '',
            },
            isEdit: false,

            userVisible: false,
            userPar: {
                total: 0,
                list: [],
                current: 1,
                pageSize: 10,
                keyWord: '',
                status: '',
            },
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
        };
        this.id = '';

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getList();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '云服务中心'},
                    {name: "云服务实例列表", link: '/Pages/CloudServeExList'},
                    {name: "云服务实例详情"},
                ]}
                topBtn = {
                    !this.state.isEdit ? <div>
                        <Button type="primary" icon={<EditOutlined />} onClick={() => {
                            this.setState({isEdit: true}, () => {
                                this.formRef.current.resetFields();
                                this.getList();
                            })
                        }}>编辑</Button>
                        {/*<Button type="danger" icon={'delete'} style={{marginLeft: 15}}>删除</Button>*/}
                        <Link to={'/Pages/CloudServeExList'} style={{marginLeft: 15}}>
                            <Button icon={<RollbackOutlined />}>返回</Button>
                        </Link>
                    </div> : <div>
                        <Button type="primary" icon={<CheckOutlined />} loading={this.state.loading} onClick={this.onSubmit.bind(this)}>保存</Button>
                        <Button style={{marginLeft: 15}} onClick={() => {
                            this.setState({isEdit: false}, () => {
                                this.getInfo();
                                this.getList();
                            })
                        }}>取消</Button>
                    </div>
                }
            >
                {this.makeBaseView()}
                {this.makeUserMod()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.CServeSUGet({id: this.id}, (res) => {
            this.setState({
                data: res.data
            }, ()=>{
                this.formRef.current.resetFields();
            });
        }, (err) => {
        });
    }

    getList() {
        let {requestPar, isEdit} = this.state;
        Model.CServeSUAPage({
            ...requestPar,
            pageSize: isEdit ? 10000 : 10,
            id: this.id,

        }, (res) => {
            let newKey = [];
            if(isEdit){
                newKey = res.data.records && res.data.records.map(item => {
                    item.key = item.authUser;

                    return item.key
                });
            }


            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
                saveSelectedRowKeys: newKey
            })
        }, (err) => {
        })
    }

    getUserList(current) {
        let {userPar} = this.state;
        Model.UserPPage({
            current: current ? current : userPar.current,
            pageSize: userPar.pageSize,
            status: 1,
            keyWord: userPar.keyWord,

        }, (res) => {
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: item.id
                }
            });

            this.setState({
                userPar: {
                    ...userPar,
                    list : newList || [],
                    total: res.data.total || 0,
                    current: current ? current : userPar.current,
                },
                userVisible: true,
            })
        }, (err) => {
        })
    }

    makeBaseView() {
        let {data, isEdit} = this.state;
        const staTime = data.activeTime ? moment(data.activeTime).format('YYYY-MM-DD HH:mm:ss') : '';
        const endTime = data.expireTime ? moment(data.expireTime).format('YYYY-MM-DD HH:mm:ss') : '';
        const carData = [
            {
                key: 'jbKey',
                title: '基本信息',
                data: [
                    {key: 'id', type: 'Texts', label: '实例ID', span: 12, value: data.id},
                    {key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
                    {key: 'userId', type: 'Texts', label: '所属权用户ID', span: 12, value: data.userId},
                    {key: 'userName', type: 'Texts', label: '所属权用户名称', span: 12, value: data.userName},
                    // {key: 'authAccount', type: 'Texts', label: '使用权用户数', span: 12,
                    //     value: <div>
                    //         {NumberFormat.thousandBit(data.authAccount || 0, 0)}
                    //         <Button type="primary" style={{marginLeft: 15}}>查看</Button>
                    //     </div>},
                    {key: 'softGoodsId', type: 'Texts', label: '云服务规则ID', span: 12, value: data.softGoodsId},
                    {key: 'softGoodsName', type: 'Texts', label: '云服务规则名称', span: 12, value: data.softGoodsName},
                    {key: 'status', label: '实例状态', span: 12,
                        type: isEdit ? 'Select' : 'Texts',
                        value: isEdit ? data.status : SwitchName.status(data.status),
                        options: {
                            rules: [{
                                required: true, message: '实例状态不能为空',
                            }],
                        },
                        data: {
                            list: [
                                {
                                    value: '2',
                                    name: '激活中'
                                },
                                {
                                    value: '1',
                                    name: '未激活'
                                },
                                {
                                    value: '3',
                                    name: '已过期'
                                },
                                {
                                    value: '4',
                                    name: '禁用中'
                                }
                            ]
                        },
                    },
                    {key: 'dateTexts', label: '实例期限', span: 12,
                        type: isEdit ? 'RangePicker' : 'Texts',
                        value: isEdit ? [staTime, endTime] : `${staTime} ~ ${endTime}`,
                        options: {
                            rules: [{
                                required: true, message: '实例期限不能为空',
                            }],
                        },
                    },
                    {key: 'memo', label: '备注', span: 12,
                        type: isEdit ? 'Input' : 'Texts',
                        value: data.memo,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                    },
                ],
                style: {marginTop: 0},
            },
            // {
            //     key: 'gzKey',
            //     title: '规则设置',
            //     data: [
            //         {key: 'b', type: 'Texts', label: '云服务ID', span: 12, value: ''},
            //         {key: 'b1', type: 'Texts', label: '云服务名称', span: 12, value: ''},
            //         {key: 'b2', type: 'Texts', label: '规则SPU', span: 12, value: ''},
            //         {key: 'b3', type: 'Texts', label: '规则SKU', span: 12, value: ''},
            //         {key: 'b4', type: 'Texts', label: '配置参数', span: 12, value: ''},
            //     ],
            //     style: {marginTop: 15},
            // },
        ];
        return <div>
            <Form ref={this.formRef}>
                {
                    carData.map((item, idx) => {
                        return <Card
                            type="inner"
                            key={item.key}
                            title={item.title}
                            style={item.style ? item.style : ''}
                        >
                            <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                        </Card>
                    })
                }
            </Form>

            <Card
                type="inner"
                title={
                    this.state.isEdit ? <Row>
                        <Col span={12} style={{lineHeight: '30px'}}>使用权用户数</Col>
                        <Col span={12} style={{textAlign: 'right'}}>
                            <Button type="primary" onClick={() => {
                                const newChangeList = this.state.list.map(item => {
                                    item.id = item.authUser;
                                    item.mobile = item.authUserName;
                                    item.alias = item.authUserAlias;
                                    item.authCreateTime = item.createTime;
                                    item.createTime = '';

                                    return item;
                                });
                                this.setState({
                                    selectedRowKeys: this.state.saveSelectedRowKeys,
                                    changeList: newChangeList,
                                    userPar: {
                                        ...this.state.userPar,
                                        current: 1,
                                    }
                                }, () => {this.getUserList();});
                            }}>添加</Button>
                        </Col>
                    </Row> : '使用权用户数'
                }
                style={{marginTop: 15}}
                bodyStyle={{padding: this.state.isEdit ? 25 : 5}}
            >
                {this.makeTable()}
            </Card>
        </div>
    }

    makeTable(){
        let {list, requestPar, isEdit} = this.state;
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询用户ID、用户名、昵称', label: '关键字', maxLength: 30},
            // {
            //     key: 'status', type: 'Select', value: '', placeholder: '请选择实例状态', label: '实例状态',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 2, name: '激活中'},
            //         {value: 1, name: '未激活'},
            //         {value: 3, name: '已过期'},
            //         {value: 4, name: '禁用中'},
            //     ],
            // },
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        const columns = [
            {
                title: '用户ID',
                key: 'authUser',
                dataIndex: 'authUser',
            },
            {
                title: '用户名',
                key: 'authUserName',
                dataIndex: 'authUserName',
            },
            {
                title: '用户昵称',
                key: 'authUserAlias',
                dataIndex: 'authUserAlias',
            },
            {
                title: '授权时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        if(isEdit)
            columns.push({
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res, data, idx) => {
                    return <div>
                        <Popconfirm
                            title="确认要删除该数据吗？"
                            onConfirm={() => {
                                this.state.list.splice(idx, 1);
                                this.state.saveSelectedRowKeys = this.state.list.map(pItem => {
                                    return pItem.key
                                });
                                this.setState({
                                    list: this.state.list,
                                    saveSelectedRowKeys: this.state.saveSelectedRowKeys
                                })
                            }}
                            onCancel={() => {}}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a style={{color: '#f00'}}>删除</a>
                        </Popconfirm>
                    </div>
                }
            });

        return <div>
            {
                !isEdit && <HeadSearch data={searchDatas} callBack={(obj) => {
                    // obj.startTime = obj.times [0] || '';
                    // obj.endTime = obj.times [1] || '';
                    obj.current = 1;

                    // delete obj.times;
                    this.setState({
                        requestPar: {
                            ...this.state.requestPar,
                            ...obj
                        }
                    }, () => {
                        this.getList();
                    });
                }}/>
            }

            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    !isEdit ? {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            this.setState({requestPar: {
                                ...requestPar,
                                current: a,

                            }}, () => {
                                this.getList();

                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    } : false
                }
            />
        </div>
    }

    makeUserMod(){
        let { userVisible, selectedRowKeys, userPar, changeList } = this.state;
        const columns = [
            {
                title: '用户ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '用户名',
                key: 'mobile',
                dataIndex: 'mobile'
            },
            {
                title: '用户昵称',
                key: 'alias',
                dataIndex: 'alias',
            },
            {
                title: '注册时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                let preChangeRowData = [];
                // 收集当前分页下的所有key
                const preKey = userPar.list.map(item => {
                    // 保存当前页面的选中的数据
                    rowKeys.forEach(cKey => {
                        if('' + item.key === '' + cKey){
                            preChangeRowData.push(item);
                            return false;
                        }
                    });
                    return item.key
                });

                // 去除当前页面选中的key，剩下当前页面未选中的key
                const noChangeRowKey = difference(preKey, rowKeys);

                // 合并所有选中的key，并去重
                selectedRowKeys = union(selectedRowKeys, rowKeys);

                // 去除之前选中过的值
                selectedRowKeys = difference(selectedRowKeys, noChangeRowKey);

                // 合并所有的选中的数据
                changeList = unionWith(changeList, preChangeRowData);

                // 去掉重复的数据
                changeList = uniqBy(changeList, 'key');

                // 去除当前页面下没有的数据
                let newChangeList = [];
                changeList.forEach(item => {
                    let isChange = true;
                    noChangeRowKey.forEach(cKey => {
                        if('' + item.key === '' + cKey){
                            isChange = false;
                        }
                    });
                    if(isChange){
                        newChangeList.push(item);
                    }
                });

                this.setState({selectedRowKeys, changeList: newChangeList});
            },
        };

        return <Modal
            title="添加使用权用户"
            width={888}
            maskClosable={false}
            visible={userVisible}
            onOk={() => {
                if(this.state.changeList.length <= 0){
                    return message.error('请至少选择一个用户添加！');
                }
                const newList = this.state.changeList.map(item => {
                    item.authId = item.authId ? item.authId : 0;
                    item.authUser = item.id;
                    item.authUserName = item.mobile;
                    item.authUserAlias = item.alias;
                    item.createTime = item.authCreateTime ? item.authCreateTime : '';

                    return item;
                });

                this.setState({
                    saveSelectedRowKeys: this.state.selectedRowKeys,
                    list: newList,
                    userVisible: false,
                })
            }}
            onCancel={() => {
                this.setState({userVisible: false})
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Row>
                        <Col span={24}>
                            关键字：
                            <Input value={userPar.keyWord} style={{ width: '80%' }} placeholder={'可查询用户ID、用户名、昵称'} onChange={(e) => {
                                this.setState({
                                    userPar: {
                                        ...userPar,
                                        keyWord: e.target.value
                                    }
                                });
                            }}/>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            userPar: {
                                ...userPar,
                                current: 1,
                                keyWord: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getUserList(1);
                    }}>搜索</Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={userPar.list}
                rowSelection={rowSelection}
                pagination={
                    {
                        total: userPar.total,
                        current: userPar.current,
                        pageSize: userPar.pageSize,
                        onChange: (a, b) => {
                            this.setState({userPar: {
                                ...userPar,
                                current: a,

                            }}, () => {
                                this.getUserList();

                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    onSubmit(e){
        e.preventDefault();
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields(['status', 'dateTexts', 'memo']).then((values) => {

            if(this.state.list.length <= 0){
                message.error('请添加使用权用户！');
                this.setState({loading: false});
                return false;
            }
            values.authUserList = JSON.stringify(this.state.list.map(item => {
                return {
                    authId: item.authId,
                    authUser: item.authUser,
                    authUserName: item.authUserName,
                    authUserAlias: item.authUserAlias,
                }
            }));

            values.id = this.id;
            values.activeTime = values.dateTexts[0].format('YYYY-MM-DD');
            values.expireTime = values.dateTexts[1].format('YYYY-MM-DD');

            delete values.dateTexts;
            // console.log('xxxxxxxxx: ', values);
            // return false;

            Model.CServeSUSave(values, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/CloudServeExList');

            }, (err) => {
                this.setState({loading: false});

            });

        }).catch(()=>{
            this.setState({loading: false});
        })
    }
}

export default CloudServeExDetail
