import React from "react";
import request from "../../../../../../utils/request/request";
import {Button, Collapse, Divider, InputNumber, message, Modal, Popconfirm} from "antd";
import cloneDeep from "lodash/cloneDeep";
import SelectLeaseGoodsModal from "../../Components/SelectLeaseGoodsModal";
import Api from "../../Api/Api";

const {Panel} = Collapse;

export default class LossInfoEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isSelectLeaseGoodsVisi: false,
            lossRate: 0,
            ...this.props.data,
            lossGoodsList: this.props.data.lossGoodsList ?
                this.props.data.lossGoodsList.map((item) => {
                    return {
                        ...item,
                        skuList: item.skuList.map((it) => {
                            return {
                                ...it,
                                num: parseFloat(it.lossUnitPriceExcludingTax),
                                num2: parseFloat(it.lossUnitPrice),
                                num3: parseFloat(it.damageUnitPriceExcludingTax),
                                num4: parseFloat(it.damageUnitPrice),
                            }
                        }),
                    }
                }) : [],
        };
    }

    componentDidMount() {
        request(Api.ContractPriceAddRate, {}, (res) => {
            this.setData({
                lossRate: res.data.taxRate ? res.data.taxRate : 0
            })
        }, () => {
        }, false);
    }

    priceToTaxPrice = (price) => {
        return parseFloat(
            (parseFloat(price)
                * (1 + parseFloat(this.state.lossRate) / 100.0)
            ).toFixed(4)
        );
    }

    taxPriceToPrice = (taxPrice) => {
        return parseFloat(
            (parseFloat(taxPrice)
                / (1 + parseFloat(this.state.lossRate) / 100.0)
            ).toFixed(4)
        );
    }

    setData = (data) => {
        this.setState({
            ...data
        })
    }

    submit = () => {
        let lossList = [];
        let lossGoodsList = this.state.lossGoodsList;
        for (let i = 0; i < lossGoodsList.length; i++) {
            if (lossGoodsList[i].skuList && lossGoodsList[i].skuList.length) {
                for (let j = 0; j < lossGoodsList[i].skuList.length; j++) {
                    lossList.push({
                        leaseGoodsSn: lossGoodsList[i].skuList[j].leaseGoodsSn,
                        lossTaxRate: this.state.lossRate,
                        damageTaxRate: this.state.lossRate,
                        lossUnitPriceExcludingTax: lossGoodsList[i].skuList[j].num,
                        lossUnitPrice: lossGoodsList[i].skuList[j].num2,
                        damageUnitPriceExcludingTax: lossGoodsList[i].skuList[j].num3,
                        damageUnitPrice: lossGoodsList[i].skuList[j].num4,
                    });
                }
            }
        }
        request('/api/v1/contract/lease/contract/loss/good/update',
            {
                sn: this.state.sn,
                leaseContractLossGoodsList: lossList
            }, (res) => {
                message.info('修改成功')
                this.props.onClose && this.props.onClose()
                this.props.refresh && this.props.refresh()
            }, () => {

            })
    }

    render() {
        return <Modal
            title="丢损赔偿价格"
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
                    this.setState({isSelectLeaseGoodsVisi: true})
                }}>添加物资</Button>
                {/*<Button style={{marginLeft: 10}} onClick={() => {*/}
                {/*    if (this.state.leaseGoodsList) {*/}
                {/*        let leaseGoodsList = this.state.leaseGoodsList;*/}
                {/*        this.setData({*/}
                {/*            lossGoodsList: leaseGoodsList.map((item) => {*/}
                {/*                return {*/}
                {/*                    ...item,*/}
                {/*                    skuList: item.skuList.map((it) => {*/}
                {/*                        return {*/}
                {/*                            ...it,*/}
                {/*                            num: '',*/}
                {/*                            num2: '',*/}
                {/*                            num3: '',*/}
                {/*                            num4: '',*/}
                {/*                        }*/}
                {/*                    })*/}
                {/*                }*/}
                {/*            })*/}
                {/*        })*/}
                {/*    }*/}
                {/*}}>引用其他租赁价格物资</Button>*/}
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {this.state.lossGoodsList.map((item, index) => (
                        <Panel header={item.goodsName || ''} key={index}>
                            <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                <span style={{flex: 1}}>名称</span>
                                <span style={{flex: 1}}>规格</span>
                                <span style={{flex: 0.7}}>丢失税率(%)</span>
                                <span style={{flex: 1}}>丢失不含税单价</span>
                                <span style={{flex: 1}}>丢失含税单价</span>
                                <span style={{flex: 0.7}}>损坏税率(%)</span>
                                <span style={{flex: 1}}>损坏不含税单价</span>
                                <span style={{flex: 1}}>损坏含税单价</span>
                                <span style={{flex: 0.7}}>单位</span>
                                <span style={{width: 30}}>操作</span>
                            </div>
                            {item.skuList && item.skuList.map((itm, idx) => (
                                <div style={{display: 'flex', padding: 5, fontSize: 12, background: 'none'}} key={idx}>
                                    <span style={{flex: 1}}>{itm.goodsName}</span>
                                    <span style={{flex: 1}}>
                                        {itm.specList && itm.specList.map((it, idx) => (
                                            <p style={{margin: 0}}
                                               key={idx}>{it.specName} : {it.specValue}</p>))}
                                    </span>
                                    <span style={{flex: 0.7}}>{this.state.lossRate}</span>
                                    <span style={{flex: 1}}>
                                           <InputNumber
                                               min={0}
                                               max={999999.9999}
                                               precision={4}
                                               value={itm.num}
                                               step="1"
                                               onChange={value => {
                                                   // 给 LeaseList 的对应的 skuList 的 goodsQuantity 赋值
                                                   // this.setState(prevState => {
                                                   //     const LeaseList = [...prevState.LeaseList];
                                                   //     LeaseList[index].skuList[idx].goodsQuantity = value;
                                                   //     return {
                                                   //         LeaseList
                                                   //     };
                                                   // });
                                                   let lossGoodsList = this.state.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num = value
                                                   lossGoodsList[index].skuList[idx].num2 = this.priceToTaxPrice(value)
                                                   this.setData({
                                                       lossGoodsList
                                                   })
                                               }}
                                               title={itm.num}
                                           />
                                    </span>
                                    <span style={{flex: 1}}>
                                           <InputNumber
                                               min={0}
                                               max={999999.9999}
                                               precision={4}
                                               value={itm.num2}
                                               step="1"
                                               onChange={value => {
                                                   // 给 LeaseList 的对应的 skuList 的 goodsQuantity 赋值
                                                   // this.setState(prevState => {
                                                   //     const LeaseList = [...prevState.LeaseList];
                                                   //     LeaseList[index].skuList[idx].goodsQuantity = value;
                                                   //     return {
                                                   //         LeaseList
                                                   //     };
                                                   // });
                                                   let lossGoodsList = this.state.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num = this.taxPriceToPrice(value)
                                                   lossGoodsList[index].skuList[idx].num2 = value
                                                   this.setData({
                                                       lossGoodsList
                                                   })
                                               }}
                                               title={itm.num2}
                                           />
                                    </span>
                                    <span style={{flex: 0.7}}>{this.state.lossRate}</span>
                                    <span style={{flex: 1}}>
                                           <InputNumber
                                               min={0}
                                               max={999999.9999}
                                               precision={4}
                                               value={itm.num3}
                                               step="1"
                                               onChange={value => {
                                                   // 给 LeaseList 的对应的 skuList 的 goodsQuantity 赋值
                                                   // this.setState(prevState => {
                                                   //     const LeaseList = [...prevState.LeaseList];
                                                   //     LeaseList[index].skuList[idx].goodsQuantity = value;
                                                   //     return {
                                                   //         LeaseList
                                                   //     };
                                                   // });
                                                   let lossGoodsList = this.state.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num3 = value
                                                   lossGoodsList[index].skuList[idx].num4 = this.priceToTaxPrice(value)
                                                   this.setData({
                                                       lossGoodsList
                                                   })
                                               }}
                                               title={itm.num3}
                                           />
                                    </span>
                                    <span style={{flex: 1}}>
                                           <InputNumber
                                               min={0}
                                               max={999999.9999}
                                               precision={4}
                                               value={itm.num4}
                                               step="1"
                                               onChange={value => {
                                                   // 给 LeaseList 的对应的 skuList 的 goodsQuantity 赋值
                                                   // this.setState(prevState => {
                                                   //     const LeaseList = [...prevState.LeaseList];
                                                   //     LeaseList[index].skuList[idx].goodsQuantity = value;
                                                   //     return {
                                                   //         LeaseList
                                                   //     };
                                                   // });
                                                   let lossGoodsList = this.state.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num3 = this.taxPriceToPrice(value)
                                                   lossGoodsList[index].skuList[idx].num4 = value
                                                   this.setData({
                                                       lossGoodsList
                                                   })
                                               }}
                                               title={itm.num4}
                                           />
                                    </span>
                                    <span style={{flex: 0.7}}>{itm.goodsUnit}</span>
                                    <span style={{width: 30}}>
                                          <Popconfirm
                                              placement="topRight"
                                              title="确定删除该物资？"
                                              onConfirm={() => {
                                                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                  let lossGoodsList = this.state.lossGoodsList;
                                                  lossGoodsList[index].skuList.splice(idx, 1);
                                                  if (lossGoodsList[index].skuList == 0) {
                                                      lossGoodsList.splice(index, 1);
                                                  }
                                                  this.setData({
                                                      lossGoodsList
                                                  });
                                              }}
                                              okText="确定"
                                              cancelText="取消"
                                          >
                                              <a style={{color: '#ff4757'}}>删除</a>
                                          </Popconfirm>
                                    </span>
                                </div>))}
                        </Panel>))}
                </Collapse>
                {this.state.isSelectLeaseGoodsVisi ? <SelectLeaseGoodsModal
                    projectSn={this.state.projectSn}
                    onSelect={(data) => {
                        let lossGoodsList = this.state.lossGoodsList;
                        let newData = cloneDeep(this.state.lossGoodsList);
                        //data对比查重，lossGoodsList
                        //spu层leaseGoodsParentSn，sku层leaseGoodsSn
                        for (let i = 0; i < data.length; i++) {
                            //spu是否重复
                            let hadSpuIdx = -1;
                            for (let j = 0; j < lossGoodsList.length; j++) {
                                if (data[i].leaseGoodsParentSn == lossGoodsList[j].leaseGoodsParentSn) {
                                    hadSpuIdx = j;
                                    break;
                                }
                            }
                            if (hadSpuIdx >= 0) {
                                //sku是否重复
                                for (let i2 = 0; i2 < data[i].skuList.length; i2++) {
                                    //sku是否重复
                                    let hadSkuIdx = -1;
                                    for (let j2 = 0; j2 < lossGoodsList[hadSpuIdx].skuList.length; j2++) {
                                        if (data[i].skuList[i2].leaseGoodsSn == lossGoodsList[hadSpuIdx].skuList[j2].leaseGoodsSn) {
                                            hadSkuIdx = j2;
                                            break;
                                        }
                                    }
                                    if (hadSkuIdx >= 0) {
                                        //不处理
                                    } else {
                                        newData[hadSpuIdx].skuList.push(data[i].skuList[i2]);
                                    }
                                }
                            } else {
                                newData.push(data[i]);
                            }
                        }
                        this.setData({
                            lossGoodsList: newData
                        }, () => {
                            message.success('添加成功！');
                        });
                        this.setState({isSelectLeaseGoodsVisi: false})
                    }}
                    onClose={() => {
                        this.setState({isSelectLeaseGoodsVisi: false})
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
