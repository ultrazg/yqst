/**
 * Created by yb on 2019/10/24
 */

import React from 'react';
import {Form, Button} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import SwitchName from "./SwitchName";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";

class OperationLogList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                platform: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '用户中心'}, {name: "用户日志管理"}, {name: "操作日志"}]}
                // tabs={this.tabsConfig()}
                // topBtn={
                //     <Link to={'/Pages/AttAptitudeEditor'}>
                //         <Button type='primary' icon={'plus'}>新增</Button>
                //     </Link>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.UserOLPage(this.state.requestPar, (res) => {
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + ((this.state.requestPar.current - 1) * 10) // 添加序号字段
            //     }
            // }) || [];

            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询序号、用户ID、企业ID、URL地址', label: '关键字', maxLength: 30},
            {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '时间',},
            {
                key: 'platform', type: 'Select', value: '', placeholder: '请选择平台', label: '平台',
                list: [
                    {value: '', name: '全部'},
                    {value: 1, name: 'APP'},
                    {value: 2, name: 'WEB'},
                    {value: 3, name: 'PC'},
                    {value: 4, name: '终端'},
                ],
            }
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.time [0] || '';
            obj.endTime = obj.time [1] || '';
            obj.current = 1;

            delete obj.time;
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
            },
            {
                title: '用户ID',
                key: 'uid',
                dataIndex: 'uid'
            },
            {
                title: '操作企业ID',
                key: 'userId',
                dataIndex: 'userId',
            },
            {
                title: 'IP地址',
                key: 'ipAddress',
                dataIndex: 'ipAddress',
            },
            {
                title: '平台',
                key: 'platform',
                dataIndex: 'platform',
                render: (res) => {
                    return SwitchName.platform(res);
                }
            },
            {
                title: 'Url地址',
                key: 'url',
                dataIndex: 'url',
            },
            {
                title: '结果',
                key: 'result',
                dataIndex: 'result',
                render: (res) => {
                    return <span style={{color: SwitchName.result(res, 'color')}}>
                        {SwitchName.result(res)}
                    </span>;
                }
            },
            {
                title: '时间',
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

export default OperationLogList
