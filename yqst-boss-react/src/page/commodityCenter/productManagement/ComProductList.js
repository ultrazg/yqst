/**
 * Created by yb on 2019/09/02
 */

import React from 'react';
import {Button, Form, message,} from 'antd';
import Model from "../Model";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class ComProductList extends React.Component {
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
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '商品中心'}, {name: "产品管理"}, {name: "产品列表"}]}
                // tabs={this.tabsConfig()}
                // topBtn={
                //     <Link to={'/Pages/MessageTemplateEditor'}>
                //         <Button type='primary' icon={'plus'}>添加</Button>
                //     </Link>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.SellerGPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;
            const newList = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    sNum: (++idx) + ((this.state.requestPar.current - 1) * 10) // 添加序号字段
                }
            }) || [];

            this.setState({
                list: newList,
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
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询产品编号、产品名称、所属企业', label: '关键字', maxLength: 30},
            {key: 'time', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
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
                key: 'sNum',
                dataIndex: 'sNum',
                width: 85
            },
            {
                title: '所属企业',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '产品编号',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
                width: '10%'
            },
            {
                title: '产品类目',
                key: 'goodsCat',
                dataIndex: 'goodsCat'
            },
            {
                title: '产品名称',
                key: 'goodsName',
                dataIndex: 'goodsName'
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
                        <Link to={`/Pages/ComProductDetail?id=${res.goodsUid}`}>
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

export default ComProductList