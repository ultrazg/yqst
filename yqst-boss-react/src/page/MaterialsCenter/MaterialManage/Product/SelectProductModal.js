import {Button, Divider, Input, Modal, Popconfirm} from "antd";
import React from "react";
import MaterialCenterModel from "../../MaterialCenterModel";
import moment from "moment";
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';

export default class SelectProductModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchRequestPar: {
                current: 1,
                pageSize: 10,
                keyWord: ''
            },
            keyWord: '',
            total: 0,
            dataSource: [],
        }
    }

    componentDidMount() {
        this.getPlatformGoods();
    }

    getPlatformGoods = (current) => {
        this.state.searchRequestPar.current = current
            ? current
            : this.state.searchRequestPar.current

        MaterialCenterModel.MaterialsCenterPlatformGoodsSelecct({
            ...this.state.searchRequestPar,
            listType: 1,
            unit: this.props.unit || '',
        }, res => {
            this.setState({
                total: res.data.total,
                dataSource: res.data.records,
            })
        })
    }

    render() {
        return <Modal
            width={800}
            style={{top: 20}}
            title={'选择平台产品'}
            visible={true}
            onCancel={() => this.props.onClose && this.props.onClose()}
            footer={null}>
            <div>
                <p style={{display: 'flex'}}>
                    <Input style={{width: '200px'}}
                           placeholder="请输入产品编号、产品名称"
                           value={this.state.keyWord}
                           onChange={(e) => {
                               this.setState({keyWord: e.target.value})
                           }}/>
                    <Button type="primary" style={{marginLeft: '10px'}} onClick={() => {
                        this.setState({
                            searchRequestPar: {
                                ...this.state.searchRequestPar,
                                keyWord: this.state.keyWord,
                                current: 1
                            }
                        }, () => {
                            this.getPlatformGoods();
                        })
                    }}>搜索</Button>
                    <Button style={{marginLeft: '10px'}} onClick={() => {
                        this.setState({
                            keyWord: "",
                            searchRequestPar: {
                                ...this.state.searchRequestPar,
                                keyWord: "",
                                current: 1
                            }
                        }, () => {
                            this.getPlatformGoods();
                        })
                    }}>重置</Button>
                </p>
                {this.makeTable()}
            </div>
        </Modal>
    }

    makeTable() {
        let {dataSource, searchRequestPar} = this.state;
        const columns = [
            {
                title: '',
                key: 'chose',
                dataIndex: 'chose',
                width: 50,
                render: (text, record) => {
                    return <a onClick={() => {
                        this.props.onSelect
                        && this.props.onSelect(record)
                    }}>选择</a>
                }
            },
            {
                title: '平台产品编码',
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
                width: '15%',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '规格',
                key: 'specList',
                dataIndex: 'specList',
                width: '15%',
                render: (text) => {
                    return <span
                        title={text ? text.map((item) => {
                            return item.specName + "：" + item.specValue
                        }).join("；") : ""}
                        className={'text-elli2'}>
                        {text ? text.map((item) => {
                            return item.specName + "：" + item.specValue
                        }).join("；") : ""}</span>
                }
            },
            {
                title: '流通单位',
                key: 'unitList',
                dataIndex: 'unitList',
                width: '15%',
                render: (text) => {
                    return <span
                        title={text ? text.map((item) => {
                            return item.unit
                        }).toString() : ""}
                        className={'text-elli2'}>
                        {text ? text.map((item) => {
                            return item.unit
                        }).toString() : ""}</span>
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
            }
        ];
        return <div>
            <SWTable
                columns={columns}
                dataSource={dataSource}
                pagination={
                    {
                        total: this.state.total,
                        current: searchRequestPar.current,
                        pageSize: searchRequestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.searchRequestPar;
                            obj.current = a;
                            this.setState({searchRequestPar: obj}, () => {
                                this.getPlatformGoods();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }
}
