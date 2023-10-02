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
            typeName = '通知类';
            break;

        case '2':
            typeName = '营销类';
            break;

        case '3':
            typeName = '公告类';
            break;

        default:
            typeName = '类型有误';
            break;
    }
    return typeName;
};
const switchStatus = (status, types = 'name') => {
    let names = '', colors = '';
    switch (status + '') {
        case '0':
            names = '启用';
            colors = '#46BD4C';
            break;

        case '1':
            names = '停用';
            colors = '#F12C20';
            break;

        default:
            names = '状态有误';
            colors = '#F12C20';
            break;
    }
    if('colors' == types) return colors;
    return names;
};


class DistributionRuleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                infoType: 0,
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '消息中心'}, {name: "分发规则管理列表"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/DistributionRuleEditor'}>
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
        Model.MesInfoRPage(this.state.requestPar, (res) => {
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询规则名称', label: '关键字', maxLength: 30},
            // {key: 'tiems', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '发送时间',},
            {
                key: 'infoType', type: 'Select', value: '0', placeholder: '请输入消息类型', label: '消息类型',
                list: [
                    {value: '0', name: '全部状态'},
                    {value: 1, name: '通知类'},
                    {value: 2, name: '营销类'},
                    {value: 3, name: '公告类'},
                ],
            },
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
                title: '规则ID',
                key: 'ruleSn',
                dataIndex: 'ruleSn',
            },
            {
                title: '规则名称',
                key: 'ruleName',
                dataIndex: 'ruleName',
            },
            {
                title: '消息类型',
                key: 'infoType',
                dataIndex: 'infoType',
                render: (res) => {
                    return switchType(res);
                }
            },
            {
                title: '选择消息模版',
                key: 'template',
                dataIndex: 'template',
                width: '25%'
            },
            {
                title: '创建者',
                key: 'adminName',
                dataIndex: 'adminName'
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
                title: '状态',
                key: 'status',
                dataIndex: 'status',
                render: (res) => {
                    return <span style={{color: switchStatus(res, 'colors')}}>
                        {switchStatus(res)}
                    </span>
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 120,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/DistributionRuleDetail?id=${res.id}`}>
                            查看
                        </Link>
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

export default DistributionRuleList
