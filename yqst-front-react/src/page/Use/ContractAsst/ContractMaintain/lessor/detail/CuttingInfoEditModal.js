import React from "react";
import request from "../../../../../../utils/request/request";
import {Button, Collapse, Divider, InputNumber, message, Modal, Popconfirm, Radio, Select} from "antd";
import SelectLeaseCuttingAfterModal from "../../Components/SelectLeaseCuttingAfterModal";
import cloneDeep from "lodash/cloneDeep";
import SelectLeaseCuttingBeforeModal from "../../Components/SelectLeaseCuttingBeforeModal";

const {Panel} = Collapse;

export default class CuttingInfoEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.createUserType = this.props.data.createUserType || 1
        this.state = {
            data: {
                sn: this.props.data.sn || '',
                cuttingList: this.props.data.replacementGoodsList ?
                    this.props.data.replacementGoodsList.map((item) => {
                        return {
                            ...item,
                            replacedSkuList: item.skuList[0].replacedSkuList.map((it) => {
                                return {
                                    ...it,
                                    num: parseFloat(it.unitPriceExcludingTax),
                                    num2: parseFloat(it.unitPrice),
                                }
                            })
                        }
                    }) : [],
            }
        }
    }

    componentDidMount() {

    }

    setData = (data) => {
        this.setState({
            data: {
                ...this.state.data,
                ...data
            }
        })
    }

    submit = () => {
        let cuttingList = this.state.data.cuttingList;
        for (let i = 0; i < cuttingList.length; i++) {
            if (cuttingList[i].replacedSkuList.length <= 0) {
                return message.info("物资组"
                    + (i + 1) + "请选择切割物资");
            }
        }
        let replacementGoodsList = [];
        for (let i = 0; i < cuttingList.length; i++) {
            replacementGoodsList.push({
                leaseGoodsSn: cuttingList[i].skuList[0].leaseGoodsSn,
                replacedSkuList: cuttingList[i].replacedSkuList.map((item) => {
                    return {
                        leaseGoodsSn: item.leaseGoodsSn,
                        unitPriceExcludingTax: item.num,
                        unitPrice: item.num2,
                        taxRate: item.taxRate
                    }
                })
            });
        }
        request('/api/v1/contract/lease/contract/replacement/goods/update',
            {
                sn: this.state.data.sn,
                leaseContractReplacementGoodsList: replacementGoodsList
            }, (res) => {
                message.info('修改成功')
                this.props.onClose && this.props.onClose()
                this.props.refresh && this.props.refresh()
            }, () => {

            })
    }

    render() {
        return <Modal
            title="切割赔偿价格"
            width={'70%'}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
            <>
                <Button type={'primary'} onClick={() => {
                    this.setState({isSelectBeforeGoodsVisi: true})
                }}>添加原物资</Button>
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {this.state.data.cuttingList.map((item, index) => {
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
                                                    let cuttingList = this.state.data.cuttingList;
                                                    cuttingList.splice(index, 1);
                                                    this.setData({
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
                                                        let cuttingList = this.state.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].taxRate = value
                                                        this.setData({
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
                                                        let cuttingList = this.state.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].num = value
                                                        this.setData({
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
                                                        let cuttingList = this.state.data.cuttingList;
                                                        cuttingList[index].replacedSkuList[idx].num2 = value
                                                        this.setData({
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
                                                        let cuttingList = this.state.data.cuttingList;
                                                        cuttingList[index].replacedSkuList.splice(idx, 1);
                                                        this.setData({
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
                    type={this.createUserType == 1 ? 0 : 1}
                    leaseGoodsSn={this.state.data.cuttingList[this.tempIndex].skuList[0].leaseGoodsSn}
                    onSelect={(data) => {
                        let cuttingList = this.state.data.cuttingList;
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
                        this.setData({
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
                    type={this.createUserType == 1 ? 0 : 1}
                    projectSn={this.state.data.projectSn}
                    singleSelect={true}
                    onSelect={(data) => {
                        let cuttingList = this.state.data.cuttingList;
                        let newData = cloneDeep(this.state.data.cuttingList);
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
                        this.setData({
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
            </>
            <Popconfirm
                title="确定提交？"
                onConfirm={this.submit}
                okText="确定"
                cancelText="取消"
            >
                <Button type={'primary'}>提交</Button>
            </Popconfirm>
        </Modal>
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 130}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}
