import React, {Component} from 'react';
import {
    Button,
    Input,
    Select,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from '../Model';
import SwitchStatus from './SwitchStatus';

const { Option } = Select;

class ESHClientList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            listPar: {
                current: 1,
                pageSize: 10,
                status: '',
                startTime: '',
                endTime: '',
                keyWord: '',
            },
        };
    }

    componentDidMount() {
        this.openPlatformCustomerPage();
    }

    componentWillUnmount() {

    }

    render() {
        let {list, listPar, total} = this.state;
        const columns = [
            {
                title: '企业编号',
                key: 'companySn',
                dataIndex: 'companySn',
            },
            {
                title: '企业名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '经办人',
                key: 'creatorName',
                dataIndex: 'creatorName',
            },
            {
                title: '联系电话',
                key: 'creatorMobile',
                dataIndex: 'creatorMobile',
            },
            {
                title: '客户状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return SwitchStatus(res);
                }
                // render: (res) => {
                //     return res ? moment(res).format("YYYY-MM-DD HH:mm") : ''
                // }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    return <div>
                        <a
                            onClick={() => {
                                this.props.history.push(`/pages/appCenter/electronicSealHelper/eshClientManage/eshClientDetail?sn=${res.companySn}`);
                            }}
                        >
                            查看
                        </a>
                        {/*<Divider type="vertical" />
                        <a style={{color: '#F12C20'}}
                           onClick={() => {
                               this.setState({delVisible: true, delSn: res.sn});
                           }}
                        >删除</a>*/}
                    </div>
                }
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '客户管理'},
                    {title: '客户列表'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}
                >搜索</h3>
                <div style={{display: 'flex', marginBottom: '24px'}}>
                    <div style={{flex: 1, display: 'flex', marginRight: '24px'}}>
                        <label style={{width: '70px', textAlign: 'left', lineHeight: '40px'}}>关键词：</label>
                        <Input placeholder="可查询：企业编号、企业名称"
                           value={listPar.keyWord}
                           style={{
                               flex: 1,
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                               marginLeft: '4px',
                               borderRadius: '6px',
                               marginRight: '8px'
                           }}
                           onChange={(e) => {
                               this.setState({listPar: {...listPar, keyWord: e.target.value}});
                           }}
                        />
                    </div>
                    <div style={{flex: 1, display: 'flex'}}>
                        <label style={{width: '70px', textAlign: 'left', lineHeight: '40px'}}>客户状态：</label>
                        <Select
                            className={'ESHSelect'}
                            value={listPar.status + ''}
                            style={{
                                flex: 1,
                                height: '40px',
                                lineHeight: '40px',
                                fontSize: '14px',
                                marginLeft: '4px',
                                borderRadius: '6px',
                            }}
                            onChange={(val) => {
                                this.setState({listPar: {...listPar, status: val}});
                            }}
                        >
                            <Option value=''>全部</Option>
                            <Option value="0">未注册</Option>
                            <Option value="1">使用中</Option>
                            <Option value="2">已注销</Option>
                        </Select>
                    </div>
                    <div style={{flex: 1}}>
                        <Button type="primary"
                            style={{
                                width: '80px',
                                height: '40px',
                                // lineHeight: '40px',
                                fontSize: '16px',
                                margin: '0px 16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => {
                                this.setState({
                                    listPar: {...listPar, current: 1},
                                }, () => {this.openPlatformCustomerPage();});
                            }}
                        >搜索</Button>
                        <Button
                            style={{
                                width: '80px',
                                height: '40px',
                                // lineHeight: '40px',
                                fontSize: '16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => {
                                this.setState({
                                    listPar: {
                                        current: 1,
                                        pageSize: 10,
                                        status: '',
                                        startTime: '',
                                        endTime: '',
                                        keyWord: '',
                                    },
                                }, () => {this.openPlatformCustomerPage();});
                            }}
                        >重置</Button>
                    </div>
                </div>
                <SWTable
                    columns={columns}
                    dataSource={list}
                    pagination={
                        {
                            total: total,
                            current: listPar.current,
                            pageSize: listPar.pageSize,
                            onChange: (a, b) => {
                                this.setState({
                                        listPar: {
                                            ...this.state.listPar,
                                            current: a,
                                        }
                                    },
                                    () => {
                                        this.openPlatformCustomerPage();
                                    }
                                )
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
            </ViewCoat>
        );
    }

    openPlatformCustomerPage(){
        let {listPar} = this.state;
        Model.openPlatformCustomerPage({...listPar}, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0
            });
        });
    }

}

export default ESHClientList;
