import React, {Component} from 'react';
import {Button, Collapse, Divider, InputNumber, message, Popconfirm} from "antd";
import SelectLeaseGoodsModal from "./SelectLeaseGoodsModal";
import cloneDeep from "lodash/cloneDeep";
import request from "../../../../../utils/request/request";
import Api from "../Api/Api";

const {Panel} = Collapse;

/**
 * 丢失损坏赔偿价格
 */
class Step3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectLeaseGoodsVisi: false,
            rate: 0
        };
    }

    componentDidMount() {
        request(Api.ContractPriceAddRate, {}, (res) => {
            this.props.setData({
                lossRate: res.data.taxRate ? res.data.taxRate : 0
            })
        }, () => {
        }, false);
    }

    priceToTaxPrice = (price) => {
        return parseFloat(
            (parseFloat(price)
                * (1 + parseFloat(this.props.data.lossRate) / 100.0)
            ).toFixed(4)
        );
    }

    taxPriceToPrice = (taxPrice) => {
        return parseFloat(
            (parseFloat(taxPrice)
                / (1 + parseFloat(this.props.data.lossRate) / 100.0)
            ).toFixed(4)
        );
    }

    render() {
        return (
            <>
                <Divider orientation="left">丢失损坏赔偿价格</Divider>
                <Button type={'primary'} onClick={() => {
                    this.setState({isSelectLeaseGoodsVisi: true})
                }}>添加物资</Button>
                <Button style={{marginLeft: 10}} onClick={() => {
                    if (this.props.data.leaseGoodsList) {
                        let leaseGoodsList = this.props.data.leaseGoodsList;
                        this.props.setData({
                            lossGoodsList: leaseGoodsList.map((item) => {
                                return {
                                    ...item,
                                    skuList: item.skuList.map((it) => {
                                        return {
                                            ...it,
                                            num: '',
                                            num2: '',
                                            num3: '',
                                            num4: '',
                                        }
                                    })
                                }
                            })
                        })
                    }
                }}>引用其他租赁价格物资</Button>
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {this.props.data.lossGoodsList.map((item, index) => (
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
                                    <span style={{flex: 0.7}}>{this.props.data.lossRate}</span>
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
                                                   let lossGoodsList = this.props.data.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num = value
                                                   lossGoodsList[index].skuList[idx].num2 = this.priceToTaxPrice(value)
                                                   this.props.setData({
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
                                                   let lossGoodsList = this.props.data.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num = this.taxPriceToPrice(value)
                                                   lossGoodsList[index].skuList[idx].num2 = value
                                                   this.props.setData({
                                                       lossGoodsList
                                                   })
                                               }}
                                               title={itm.num2}
                                           />
                                    </span>
                                    <span style={{flex: 0.7}}>{this.props.data.lossRate}</span>
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
                                                   let lossGoodsList = this.props.data.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num3 = value
                                                   lossGoodsList[index].skuList[idx].num4 = this.priceToTaxPrice(value)
                                                   this.props.setData({
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
                                                   let lossGoodsList = this.props.data.lossGoodsList;
                                                   lossGoodsList[index].skuList[idx].num3 = this.taxPriceToPrice(value)
                                                   lossGoodsList[index].skuList[idx].num4 = value
                                                   this.props.setData({
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
                                                  let lossGoodsList = this.props.data.lossGoodsList;
                                                  lossGoodsList[index].skuList.splice(idx, 1);
                                                  if (lossGoodsList[index].skuList == 0) {
                                                      lossGoodsList.splice(index, 1);
                                                  }
                                                  this.props.setData({
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
                    projectSn={this.props.data.projectSn}
                    onSelect={(data) => {
                        let lossGoodsList = this.props.data.lossGoodsList;
                        let newData = cloneDeep(this.props.data.lossGoodsList);
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
                        this.props.setData({
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

export default Step3;
