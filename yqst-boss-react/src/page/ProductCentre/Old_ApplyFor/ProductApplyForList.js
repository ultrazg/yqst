/**
 * Created by yb on 2020/11/24
 */

import React from 'react';
import {Button, Form, message, Divider, Tabs} from 'antd';
import {PlusOutlined, CopyOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import ProductCentreModel from "../ProductCentreModel";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";

class ProductApplyForList extends React.Component {
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
                sortType: 2,
                listType: 0,
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '产品中心'}, {name: "申请列表"}]}
                tabs={this.tabsConfig()}
                // topBtn={
                //     <>
                //         <Link to={''}>
                //             <Button type='primary' icon={<PlusOutlined />}>新增产品</Button>
                //         </Link>
                //         <Divider type="vertical" />
                //         <Link to={''}>
                //             <Button icon={<CopyOutlined />}>批量导入</Button>
                //         </Link>
                //         <Divider type="vertical" />
                //         <Link to={''}>
                //             <Button icon={<VerticalAlignBottomOutlined />}>下载导入模板</Button>
                //         </Link>
                //     </>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        ProductCentreModel.ApplyList(this.state.requestPar, (res) => {
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

    tabsConfig() {
        return [{
            tabName: '全部', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        listType: 0,
                        current: 1,
                    }
                }, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '待审核', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        listType: 1,
                        current: 1,
                    }
                }, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '已添加', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        listType: 2,
                        current: 1,
                    }
                }, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '已驳回', callback: () => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar,
                        listType: 3,
                        current: 1,
                    }
                }, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '关键字', maxLength: 30},
            {key: 'times', type: 'RangePicker', value: '', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            obj.startTime = obj.times [0] || '';
            obj.endTime = obj.times [1] || '';
            obj.current = 1;

            delete obj.times;
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
                title: '申请单号',
                key: 'applySn',
                dataIndex: 'applySn',
            },
            {
                title: '申请企业',
                key: 'applyCompanyName',
                dataIndex: 'applyCompanyName',
            },
            {
                title: '申请类型',
                key: 'applyType',
                dataIndex: 'applyType',
                render: (text) => {
                    switch (parseInt(text)) {
                        case 1:
                            return "新增产品"
                        default:
                            return ""
                    }
                }
            },
            {
                title: '状态',
                key: 'applyStatus',
                dataIndex: 'applyStatus',
                render: (text) => {
                    //申请状态 1:待审核 2:已添加 3:已驳回
                    switch (parseInt(text)) {
                        case 1:
                            return "待审核";
                        case 2:
                            return "已添加";
                        case 3:
                            return "已驳回";
                        default:
                            return "";
                    }
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 110,
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
                render: (res, record) => {
                    return <div>
                        <Link to={`/Pages/ProductApplyForDetail?id=${record.applySn}`}>
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

export default ProductApplyForList
