/**
 * 项目用户管理列表
 */
import React, {Component} from 'react';
import Model from './Model';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import moment from "moment";
import SwitchName from "../companyUser/SwitchName";
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';

class ProjectUserList extends Component {
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
        };
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '用户中心'}, {name: "项目用户管理列表"}]}
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    componentDidMount() {
        this.getList();
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询项目名称', label: '关键字', maxLength: 30},
            // {
            //     key: 'status', type: 'Select', value: '', placeholder: '请选择状态', label: '状态',
            //     list: [
            //         {value: '', name: '全部'},
            //         {value: 1, name: '启用中'},
            //         {value: 2, name: '停用中'},
            //     ],
            // },
            // {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.time [0] || '';
            // obj.endTime = obj.time [1] || '';
            obj.current = 1;
            //
            // delete obj.time;
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

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [
            {
                title: '项目ID',
                key: 'uid',
                dataIndex: 'uid',
            },
            {
                title: '项目号',
                key: 'accountSn',
                dataIndex: 'accountSn'
            },
            {
                title: '项目名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '项目成员数',
                key: 'staffNum',
                dataIndex: 'staffNum',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
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
                width: 90,
                render: (res) => {
                    return <div>
                        <Link to={`/Pages/ProjectUserDetail?id=${res.id}`}>
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

    getList() {
        Model.UserProjectPage(this.state.requestPar, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

}

export default ProjectUserList;
