import React, {Component} from 'react';
import {Button, Input, Modal, Checkbox, Empty, Pagination, Collapse} from "antd";
import Model from "../Model";
import lodash from 'lodash';
import './selectGoodsModal.css'

const {Panel} = Collapse;

/**
 * 出租方选择物资
 */
class SelectLeaseGoodsModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            selectedGoodsList: [],
            temp: [],
            requestPar: {
                current: 1,
                pageSize: 5,
                keyWord: '',
            },
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList() {
        Model.LeaseGoodsPage(this.state.requestPar, res => {
            this.setState({
                list: this.makeData(res.data.records) || [],
                total: res.data.total || 0,
            });
        });
    }

    render() {
        return (<>
            <Modal
                title="选择物资"
                visible={true}
                footer={null}
                style={{top: 20}}
                width={'70%'}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}>
                {this.makeSearch()}
                {this.makeTable()}
            </Modal>
        </>);
    }

    makeSearch = () => {
        return <p>
            <label>关键词：</label>
            <Input
                placeholder="请输入关键词"
                style={{
                    width: 300, marginRight: 20
                }}
                name='keyWord'
                onChange={e => this.setState({requestPar: {...this.state.requestPar, keyWord: e.target.value}})}
                value={this.state.requestPar.keyWord}
            />
            <Button type="primary" style={{marginRight: 20, marginBottom: 10}} onClick={() => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar, current: 1
                    }
                }, () => {
                    this.getList();
                });
            }}>搜索</Button>
            <Button style={{marginRight: 20}} onClick={() => {
                this.setState({
                    requestPar: {
                        ...this.state.requestPar, current: 1, keyWord: '',
                    }
                }, () => {
                    this.getList();
                });
            }}>重置</Button>
            <Button
                type='primary'
                disabled={this.state.selectedGoodsList.length === 0}
                onClick={() => {
                    const {temp} = this.state;
                    // 去掉temp里面的skuList里isSelected为false的数据
                    const list = temp.map((item, index) => {
                        return {
                            ...item,
                            skuList: item.skuList.filter(sku => sku.isSelected)
                        }
                    });

                    this.props.onSelect && this.props.onSelect(list);
                }}
            >
                {
                    this.state.selectedGoodsList.length > 0
                        ? `已选择 ${this.state.selectedGoodsList.length} 个物资，添加物资`
                        : '选择物资'
                }
            </Button>
        </p>
    }

    makeTable = () => {
        return (
            <>
                {
                    this.state.list.length === 0
                        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        : this.renderGoodsView()
                }
                <Pagination
                    defaultCurrent={1}
                    current={this.state.requestPar.current}
                    total={this.state.total}
                    pageSize={this.state.requestPar.pageSize}
                    hideOnSinglePage={true}
                    showTotal={total => `共 ${total} 条`}
                    onChange={(page, pageSize) => {
                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                current: page
                            }
                        }, () => {
                            this.getList();
                        });
                    }}
                />
            </>
        );
    }

    renderGoodsView = () => {
        return (
            <>
                <Collapse defaultActiveKey={0} style={{marginBottom: 20}}>
                    {
                        this.state.list.map((item, index) => (
                            <Panel header={item.goodsName} key={index}>
                                <div className="title-bar">
                                    <span>选择</span>
                                    <span>SKU 名称</span>
                                    <span>SKU 规格</span>
                                    <span>SKU 单位</span>
                                </div>
                                {
                                    item.skuList && item.skuList.map((itm, idx) => (
                                        <div className="title-bar" style={{background: 'none'}} key={idx}>
                                            <span>
                                                <Checkbox
                                                    // checked={this.state.selectedGoodsList.findIndex(it => it.leaseGoodsSn === itm.leaseGoodsSn) > -1}
                                                    checked={itm.isSelected}
                                                    onChange={e => {
                                                        const currentSpu = item; // 当前 spu
                                                        const currentSku = itm; // 当前 sku
                                                        const {temp} = this.state;

                                                        if (e.target.checked) {
                                                            currentSku.isSelected = true;

                                                            // 判断当前spu是否存在与temp中，如果不存在则添加, 如果存在则更新
                                                            const index = temp.findIndex(it => it.leaseGoodsParentSn === currentSpu.leaseGoodsParentSn);

                                                            if (index > -1) {
                                                                temp[index] = currentSpu;
                                                            } else {
                                                                temp.push(currentSpu);
                                                            }

                                                            // console.log(temp);

                                                            this.setState({
                                                                temp,
                                                                selectedGoodsList: [...this.state.selectedGoodsList, itm]
                                                            });
                                                        } else {
                                                            currentSku.isSelected = false;
                                                            // 如果当前spu里的skuList里的所有sku都没有被选中，则将当前spu从temp中删除
                                                            const index = temp.findIndex(it => it.leaseGoodsParentSn === currentSpu.leaseGoodsParentSn);

                                                            if (index > -1) {
                                                                const currentSpu = temp[index];
                                                                const currentSkuList = currentSpu.skuList;
                                                                const isAllSkuSelected = currentSkuList.every(it => it.isSelected === false);

                                                                if (isAllSkuSelected) {
                                                                    temp.splice(index, 1);
                                                                } else {
                                                                    temp[index] = currentSpu;
                                                                }
                                                            }

                                                            this.setState({
                                                                temp,
                                                                selectedGoodsList: this.state.selectedGoodsList.filter(it => it.leaseGoodsSn !== itm.leaseGoodsSn)
                                                            });
                                                        }
                                                    }}
                                                />
                                            </span>
                                            <span title={itm.goodsName}>{itm.goodsName}</span>
                                            <span
                                                title={
                                                    itm.specList && itm.specList.map((it, idx) => {
                                                        return `${it.specName} : ${it.specValue}`
                                                    })
                                                }
                                            >
                                                {
                                                    itm.specList && itm.specList.map((it, idx) => (
                                                        <p style={{margin: 0}} key={idx}>{it.specName} : {it.specValue}</p>
                                                    ))
                                                }
                                            </span>
                                            <span title={itm.goodsUnit}>{itm.goodsUnit}</span>
                                        </div>
                                    ))
                                }
                            </Panel>
                        ))
                    }
                </Collapse>
            </>
        )
    }

    makeData = data => {
        const dataSource = lodash.cloneDeep(data);
        let {selectedGoodsList} = this.state;

        let lists = dataSource.map((item, index) => {
            item.skuList.forEach((itm, idx) => {
                itm.goodsQuantity = 1;
                itm.isSelected = selectedGoodsList.some(it => it.leaseGoodsSn === itm.leaseGoodsSn);
            });

            return item;
        });

        return lists;
    }
}

export default SelectLeaseGoodsModal;
