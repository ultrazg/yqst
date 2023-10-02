import React, {Component} from 'react';
import {Button, Collapse, Divider, InputNumber, message, Popconfirm} from "antd";
import cloneDeep from 'lodash/cloneDeep'
import SelectLeaseCuttingAfterModal from "./SelectLeaseCuttingAfterModal";
import SelectLeaseCuttingBeforeModal from "./SelectLeaseCuttingBeforeModal";

const {Panel} = Collapse;

/**
 * 切割赔偿
 */
class Step2Lessee extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Divider orientation="left">切割赔偿价格</Divider>
                <Button type={'primary'} onClick={() => {
                    this.setState({isSelectBeforeGoodsVisi: true})
                }}>添加原物资</Button>
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {this.props.data.cuttingList.map((item, index) => {
                        return <>
                            <div style={{paddingTop: 10, paddingLeft: 10,}}>物资组{(index + 1)}</div>
                            <Panel header={item.goodsName || ''} key={index}>
                                <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                    <span style={{flex: 1}}>SKU名称</span>
                                    <span style={{flex: 1}}>规格</span>
                                    <span style={{flex: 0.7}}>单位</span>
                                    <span style={{width: 30}}>操作</span>
                                </div>
                                {item.skuList ? item.skuList.map((it) => {
                                    return <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                        <span style={{flex: 1}}>{it.goodsName}</span>
                                        <span style={{flex: 1}}>
                                            {it.specList && it.specList.map((it, idx) => (
                                                <p style={{margin: 0}}
                                                   key={idx}>{it.specName} : {it.specValue}</p>))}
                                        </span>
                                        <span style={{flex: 0.7}}>{it.goodsUnit}</span>
                                        <span style={{width: 30}}>
                                            <Popconfirm
                                                placement="topRight"
                                                title="确定删除该物资组？"
                                                onConfirm={() => {
                                                    let cuttingList = this.props.data.cuttingList;
                                                    cuttingList.splice(index, 1);
                                                    this.props.setData({
                                                        cuttingList
                                                    });
                                                }}
                                                okText="确定"
                                                cancelText="取消"
                                            ><a style={{color: '#ff4757'}}>删除</a></Popconfirm>
                                        </span>
                                    </div>
                                }) : null}
                                <Button type={'primary'} onClick={() => {
                                    this.tempIndex = index;
                                    this.setState({isSelectAfterGoodsVisi: true})
                                }}>添加切割物资</Button>
                                <div style={{fontSize: 12, marginTop: 5, marginBottom: 5}}>切割物资</div>
                                <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                    <span style={{flex: 1}}>SKU名称</span>
                                    <span style={{flex: 1}}>规格</span>
                                    <span style={{flex: 0.7}}>单位</span>
                                    <span style={{flex: 0.7}}>税率(%)</span>
                                    <span style={{flex: 1}}>赔偿单价(不含税)</span>
                                    <span style={{flex: 1}}>赔偿单价(含税)</span>
                                    <span style={{width: 30}}>操作</span>
                                </div>
                                {item.replacedSkuList ?
                                    item.replacedSkuList.map((it, idx) => {
                                        return <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                            <span style={{flex: 1}}>{it.goodsName}</span>
                                            <span style={{flex: 1}}>{it.specList && it.specList.map((it, idx) => (
                                                <p style={{margin: 0}}
                                                   key={idx}>{it.specName} : {it.specValue}</p>))}
                                            </span>
                                            <span style={{flex: 0.7}}>{it.goodsUnit}</span>
                                            <span style={{flex: 0.7}}>
                                                <InputNumber
                                                    min={0}
                                                    max={100}
                                                    precision={2}
                                                    value={it.taxRate}
                                                    step="1"
                                                    onChange={value => {
                                                        let cuttingList = this.props.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].taxRate = value
                                                        this.props.setData({
                                                            cuttingList
                                                        })
                                                    }}
                                                    title={it.taxRate}
                                                />
                                            </span>
                                            <span style={{flex: 1}}>
                                                <InputNumber
                                                    min={0}
                                                    max={999999.9999}
                                                    precision={4}
                                                    value={it.num}
                                                    step="1"
                                                    onChange={value => {
                                                        let cuttingList = this.props.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].num = value
                                                        this.props.setData({
                                                            cuttingList
                                                        })
                                                    }}
                                                    title={it.num}
                                                />
                                            </span>
                                            <span style={{flex: 1}}>
                                                <InputNumber
                                                    min={0}
                                                    max={999999.9999}
                                                    precision={4}
                                                    value={it.num2}
                                                    step="1"
                                                    onChange={value => {
                                                        let cuttingList = this.props.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].num2 = value
                                                        this.props.setData({
                                                            cuttingList
                                                        })
                                                    }}
                                                    title={it.num2}
                                                />
                                            </span>
                                            <span style={{width: 30}}>
                                                <Popconfirm
                                                    placement="topRight"
                                                    title="确定删除该切割物资？"
                                                    onConfirm={() => {
                                                        let cuttingList = this.props.data.cuttingList;
                                                        cuttingList[index].replacedSkuList.splice(idx, 1);
                                                        this.props.setData({
                                                            cuttingList
                                                        });
                                                    }}
                                                    okText="确定"
                                                    cancelText="取消"
                                                ><a style={{color: '#ff4757'}}>删除</a></Popconfirm>
                                            </span>
                                        </div>
                                    }) : null}
                            </Panel>
                        </>
                    })}
                </Collapse>
                {this.state.isSelectAfterGoodsVisi ? <SelectLeaseCuttingAfterModal
                    type={1}
                    leaseGoodsSn={this.props.data.cuttingList[this.tempIndex].skuList[0].leaseGoodsSn}
                    onSelect={(data) => {
                        let cuttingList = this.props.data.cuttingList;
                        let replacedSkuList = cuttingList[this.tempIndex].replacedSkuList;
                        let newData = cloneDeep(replacedSkuList);
                        //data对比查重，replacedSkuList
                        //spu层leaseGoodsParentSn，sku层leaseGoodsSn
                        for (let i = 0; i < data[0].skuList.length; i++) {
                            let hasSkuIdx = -1;
                            for (let j = 0; j < replacedSkuList.length; j++) {
                                if (data[0].skuList[i].leaseGoodsSn == replacedSkuList[j].leaseGoodsSn) {
                                    hasSkuIdx = j;
                                    break;
                                }
                            }
                            if (hasSkuIdx >= 0) {
                                //不处理
                            } else {
                                newData.push(data[0].skuList[i]);
                            }
                        }
                        cuttingList[this.tempIndex].replacedSkuList = newData;
                        this.props.setData({
                            cuttingList
                        }, () => {
                            message.success('添加成功！');
                        });
                        this.setState({isSelectAfterGoodsVisi: false})
                    }}
                    onClose={() => {
                        this.setState({isSelectAfterGoodsVisi: false})
                    }}
                /> : null}
                {this.state.isSelectBeforeGoodsVisi ? <SelectLeaseCuttingBeforeModal
                    type={1}
                    projectSn={this.props.data.projectSn}
                    lessorSn={this.props.data.lessorSn}
                    singleSelect={true}
                    onSelect={(data) => {
                        let cuttingList = this.props.data.cuttingList;
                        let newData = cloneDeep(this.props.data.cuttingList);
                        //data对比查重，cuttingList
                        //spu层leaseGoodsParentSn，sku层leaseGoodsSn
                        for (let i = 0; i < cuttingList.length; i++) {
                            if (data[0].leaseGoodsParentSn == cuttingList[i].leaseGoodsParentSn) {
                                if (data[0].skuList[0].leaseGoodsSn == cuttingList[i].skuList[0].leaseGoodsSn) {
                                    message.info('物资组' + (i + 1) + '已存在该物资');
                                    return;
                                }
                            }
                        }
                        newData.push({...data[0], replacedSkuList: []});
                        this.props.setData({
                            cuttingList: newData
                        }, () => {
                            message.success('添加成功！');
                        });
                        this.setState({isSelectBeforeGoodsVisi: false})
                    }}
                    onClose={() => {
                        this.setState({isSelectBeforeGoodsVisi: false})
                    }}
                /> : null}
                <div>
                    <Button
                        style={{marginRight: 20}}
                        onClick={() => {
                            this.props.onNext && this.props.onPrev();
                        }}
                    >上一步</Button>
                    <Button
                        type='primary'
                        style={{marginRight: 20}}
                        onClick={() => {
                            this.props.onNext && this.props.onNext();
                        }}
                    >下一步</Button>
                </div>
            </>
        );
    }
}

export default Step2Lessee;
