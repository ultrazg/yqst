/**
 * Created by yb on 2020/11/24
 */

import React from 'react';
import {Collapse, Pagination} from 'antd';
import {SettingOutlined} from '@ant-design/icons';
import SWTable from 'SWViews/table';
import moment from 'moment';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import ProductCentreModel from "../ProductCentreModel";
import ProductPlatformGoodsModal from "./ProductPlatformGoodsModal";
import ProductCompanyGoodsModal from "./ProductCompanyGoodsModal";

const {Panel} = Collapse;

class ProductRelevanceList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            current: 1,
            total: 0,
            keyWord: '',

            visiPlatformGoods: false,
            visiPlatformGoodsId: '',
        }
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '产品中心'}, {name: "关联列表"}]}
            >
                {this.makeHeadSearch()}
                {this.makeCollapse()}
            </TabsViewContent>
        );
    }

    getList() {
        ProductCentreModel.CorrelationPlatformGoodsList({
            current: this.state.current,
            pageSize: 10,
            keyWord: this.state.keyWord
        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '查询平台产品编号', label: '关键字', maxLength: 30},
            // {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            // obj.current = 1;

            // delete obj.times;
            this.setState({
                current: 1,
                keyWord: obj.keyWord
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeCollapse() {
        return <div>
            <Collapse
                accordion={true}
                onChange={(key) => {
                    this.setState({activeKey: key})
                }}
                expandIconPosition={'left'}
            >
                {this.state.list && this.state.list.map((item, index) => {
                    return <Panel
                        key={index}
                        extra={<a onClick={(e) => {
                            e.stopPropagation();
                            this.setState({
                                visiPlatformGoods: true,
                                visiPlatformGoodsId: item.platformGoodsParentSn || '',
                            });
                        }}>查看</a>}
                        header={<>
                        <span style={{marginRight: '24px'}}>
                            平台产品编号：{item.goodsCode}
                        </span>
                            <span>
                            平台产品名称：{item.goodsName}
                        </span>
                        </>}
                    >
                        {this.state.activeKey == index ?
                            <SubView platformGoodsSn={item.platformGoodsSn}/> : null}
                    </Panel>
                })}
            </Collapse>
            {this.state.list && this.state.list.length > 0 ?
                <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: 15, marginBottom: 10}}>
                    <Pagination defaultCurrent={1} current={this.state.current} pageSize={10}
                                total={this.state.total} showSizeChanger={false}
                                onChange={(page, pageSize) => {
                                    this.setState({current: page}, () => {
                                        this.getList();
                                    })
                                }}/>
                </div> : null}
            {this.renderPlatformGoodsModal()}
        </div>
    }

    renderPlatformGoodsModal = () => {
        return this.state.visiPlatformGoods ?
            <ProductPlatformGoodsModal id={this.state.visiPlatformGoodsId} close={() => {
                this.setState({visiPlatformGoods: false})
            }}/> : null;
    }
}

class SubView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            subList: [],
            subCurrent: 1,
            subTotal: 0,

            visiGoods: false,
            visiGoodsId: '',
        }
    }

    componentDidMount() {
        this.getSubList();
    }

    getSubList() {
        ProductCentreModel.CorrelationErpGoodsList({
            platformGoodsSn: this.props.platformGoodsSn || "",
            current: this.state.subCurrent,
            pageSize: 10,
        }, (res) => {
            this.setState({
                subList: res.data.records || [],
                subTotal: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    render() {
        return this.makeTable();
    }

    makeTable() {
        const columns = [
            {
                title: '企业产品编号',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
            },
            {
                title: '企业产品名称',
                key: 'goodsName',
                dataIndex: 'goodsName',
            },
            {
                title: '企业产品类目',
                key: 'catNamePath',
                dataIndex: 'catNamePath',
            },
            {
                title: '所属企业',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '关联时间',
                key: 'relationTime',
                dataIndex: 'relationTime',
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
                render: (text, record) => {
                    return <a onClick={(e) => {
                        e.stopPropagation();
                        this.setState({
                            visiGoods: true,
                            visiGoodsId: record.goodsParentSn || '',
                        });
                    }}>查看</a>
                }
            },
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={this.state.subList}
                pagination={
                    {
                        total: this.state.subTotal,
                        current: this.state.subCurrent,
                        pageSize: 10,
                        onChange: (page, pageSize) => {
                            this.setState({subCurrent: page}, () => {
                                this.getSubList();
                            })
                        },
                        showTotal: (total, range) => `共有 ${total} 条`
                    }
                }
            />
            {this.renderProductCompanyGoodsModal()}
        </div>
    }

    renderProductCompanyGoodsModal = () => {
        return this.state.visiGoods ?
            <ProductCompanyGoodsModal id={this.state.visiGoodsId} close={() => {
                this.setState({visiGoods: false})
            }}/> : null;
    }
}

export default ProductRelevanceList
