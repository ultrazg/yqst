/**
 * Created by yb on 2020/11/24
 */

import React from 'react';
import {Button, Divider, message, Popconfirm} from 'antd';
import {PlusOutlined, CopyOutlined, VerticalAlignBottomOutlined} from '@ant-design/icons';
import ProductCentreModel from "../../ProductCentreModel";
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";

class ProductManageList extends React.Component {
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

    enable = (id) => {
        ProductCentreModel.ProductEnable({sn: id}, res => {
            message.success('启用成功')
            this.getList()
        })
    }
    disable = (id) => {
        ProductCentreModel.ProductDisable({sn: id}, res => {
            message.success('停用成功')
            this.getList()
        })
    }
    del = (id) => {
        ProductCentreModel.ProductBatchDel({snList: [id]}, res => {
            message.success('删除成功')
            this.getList()
        })
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '平台产品'}, {name: "平台产品列表"}]}
                tabs={this.tabsConfig()}
                topBtn={
                    <>
                        <Link to={'/Pages/ProductManageDetail?operation=new'}>
                            <Button type='primary' icon={<PlusOutlined/>}>新增产品</Button>
                        </Link>
                        {/*<Divider type="vertical"/>*/}
                        {/*<Link to={''}>*/}
                        {/*    <Button icon={<CopyOutlined/>}>批量导入</Button>*/}
                        {/*</Link>*/}
                        {/*<Divider type="vertical"/>*/}
                        {/*<Link to={''}>*/}
                        {/*    <Button icon={<VerticalAlignBottomOutlined/>}>下载导入模板</Button>*/}
                        {/*</Link>*/}
                    </>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>
        );
    }

    getList() {
        ProductCentreModel.ProductList(this.state.requestPar, (res) => {
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
            tabName: '启用', callback: () => {
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
            tabName: '停用', callback: () => {
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
                title: '序号',
                key: 'sn',
                dataIndex: 'sn',
                width: '13%',
            },
            {
                title: '平台产品SPU编码',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
                width: '15%',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '产品名称',
                key: 'goodsName',
                dataIndex: 'goodsName',
                width: '20%',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '产品类目',
                key: 'catNamePath',
                dataIndex: 'catNamePath',
                width: '20%',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '状态',
                key: 'goodsStatus',
                dataIndex: 'goodsStatus',
                width: 70,
                render: (text, record) => {
                    // goodsStatus	int	产品状态 1:启用 2:停用
                    switch (parseInt(text)) {
                        case 1:
                            return "启用"
                        case 2:
                            return "停用"
                        default:
                            return ""
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
                width: 150,
                render: (res, record) => {
                    return <div>
                        <Link to={`/Pages/ProductManageDetail?id=${record.sn}&operation=edit`}>
                            查看
                        </Link>
                        <Divider type="vertical"/>
                        {record.goodsStatus == 1 ?
                            <Popconfirm
                                placement="topRight"
                                title="确认停用该产品？停用之后该产品所有sku也会被停用！"
                                onConfirm={() => this.disable(record.sn)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a style={{color: '#F12C20'}}>停用</a>
                            </Popconfirm> : <Popconfirm
                                title="确认启用该产品?"
                                onConfirm={() => this.enable(record.sn)}
                                okText="确认"
                                cancelText="取消"
                            >
                                <a>启用</a>
                            </Popconfirm>}
                        <Divider type="vertical"/>
                        <Popconfirm
                            title="确认删除该条数据?"
                            onConfirm={() => this.del(record.sn)}
                            okText="确认"
                            cancelText="取消"
                        >
                            <a style={{color: '#F12C20'}}>删除</a>
                        </Popconfirm>
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

export default ProductManageList
