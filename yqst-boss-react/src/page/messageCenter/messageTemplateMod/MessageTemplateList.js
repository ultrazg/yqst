/**
 * Created by yb on 2019/09/02
 */

import React from 'react';
import {Button} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";

const switchType = (types) => {
    let typeName = '';
    switch (types + '') {
        case '1':
            typeName = '业务通知';
            break;

        case '2':
            typeName = '系统通知';
            break;

        case '3':
            typeName = '营销通知';
            break;

        default:
            typeName = '类型有误';
            break;
    }
    return typeName;
};


class MessageTemplateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '消息中心'}, {name: "消息模板管理列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/MessageTemplateEditor'}>
                        <Button type='primary' icon={<PlusOutlined />}>添加</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.MesInfoTPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + (this.state.requestPar.current * 10) // 添加序号字段
            //     }
            // });

            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询模板ID、模版名称', label: '关键字', maxLength: 30},
            // {key: 'tiems', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发送时间',},
            // {
            //     key: 'status', type: 'Select', value: '', placeholder: '请输入申请状态', label: '消息状态',
            //     list: [
            //         {value: '', name: '全部状态'},
            //         {value: 0, name: '已发送'},
            //         {value: 1, name: '发送失败'},
            //     ],
            // },
            // {
            //     key: 'catId', type: 'Select', value: '', placeholder: '请输入申请状态', label: '消息类型',
            //     list: [
            //         {value: '', name: '全部类型'},
            //         ...this.state.catList
            //     ],
            // },
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            // obj.startTime = obj.tiems [0] || '';
            // obj.endTime = obj.tiems [1] || '';
            obj.current = 1;

            // delete obj.tiems;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {this.getList();});
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '序号',
                key: 'id',
                dataIndex: 'id',
                width: 85
            },
            {
                title: '消息模板ID',
                key: 'templateSn',
                dataIndex: 'templateSn',
            },
            {
                title: '消息模版名称',
                key: 'templateName',
                dataIndex: 'templateName',
            },
            {
                title: '模版类型',
                key: 'infoType',
                dataIndex: 'infoType',
                // render: (res) => {
                //     return switchType(res);
                // }
            },
            {
                title: '消息模板内容',
                key: 'templateContent',
                dataIndex: 'templateContent',
                width: '30%'
            },
            {
                title: '创建者',
                key: 'createAdminName',
                dataIndex: 'createAdminName'
            },
            {
                title: '创建时间',
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
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 120,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/MessageTemplateDetail?id=${res.id}`}>
                            查看
                        </Link>
                        {/*<span style={{
                            margin: '0 10px',
                            borderRight: '1px solid #d7d6d6',
                        }}/>
                        <Link to={`/Pages/MessageTemplateEditor?id=${res.id}`}>
                            编辑
                        </Link>*/}
                    </div>
                }
            },
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

}

export default MessageTemplateList
