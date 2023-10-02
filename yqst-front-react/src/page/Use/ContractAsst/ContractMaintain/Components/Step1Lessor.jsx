import React, {Component} from 'react';
import {
    Button,
    Input,
    Radio,
    Select,
    Divider,
    Collapse,
    InputNumber,
    Popconfirm, message
} from "antd";

import SelectLesseeModal from '../Components/SelectLesseeModal';
import SelectLesseeProjectModal from "./SelectLesseeProjectModal";
import request from "../../../../../utils/request/request";
import Api from "../Api/Api";
import SelectLeaseGoodsModal from "./SelectLeaseGoodsModal";
import cloneDeep from "lodash/cloneDeep";

const {Option} = Select;
const {Panel} = Collapse;

/**
 * 租赁价格&结算信息
 */
class Step1Lessor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSelectLesseeModalVisible: false,
            isSelectLesseeProjectVisible: false,
            isSelectLeaseGoodsVisi: false,
        };
    }

    componentDidMount() {
        request(Api.ContractPriceAddRate, {}, (res) => {
            this.props.setData({
                leaseRate: res.data.taxRate ? res.data.taxRate : 0
            })
        }, () => {
        }, false);
    }

    getSettleTime = () => {
        request(Api.ContractPriceAddSettleTime, {
            lesseeSn: this.props.data.lesseeSn || '',//	string	是	承租方企业用户编号
            projectSn: this.props.data.projectSn || '',
        }, (res) => {
            this.props.setData({
                settlementStartTime: res.data.settlementStartTime
            })
        }, () => {
        })
    }

    priceToTaxPrice = (price) => {
        return parseFloat(
            (parseFloat(price)
                * (1 + parseFloat(this.props.data.leaseRate) / 100.0)
            ).toFixed(4)
        );
    }

    taxPriceToPrice = (taxPrice) => {
        return parseFloat(
            (parseFloat(taxPrice)
                / (1 + parseFloat(this.props.data.leaseRate) / 100.0)
            ).toFixed(4)
        );
    }

    render() {
        return (
            <>
                <Divider orientation="left">基础信息</Divider>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>承租方：</label>
                    <Input
                        style={{width: 300, cursor: 'pointer'}}
                        placeholder="请选择承租企业"
                        title={this.props.data.lesseeName}
                        value={this.props.data.lesseeName}
                        readOnly
                        onClick={() => {
                            this.setState({
                                isSelectLesseeModalVisible: true
                            });
                        }}
                    />
                </div>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>项目类型：</label>
                    <Radio.Group
                        onChange={e => this.props.setData({projectType: e.target.value})}
                        value={this.props.data.projectType}>
                        <Radio value={0}>非特供项目</Radio>
                        <Radio value={1}>特供项目</Radio>
                    </Radio.Group>
                </div>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>项目：</label>
                    {this.props.data.projectType == 0 ?
                        "非特供项目" :
                        <Input
                            style={{width: 300, cursor: 'pointer'}}
                            placeholder={!this.props.data.lesseeSn ? '请先选择承租企业' : '选择项目'}
                            disabled={!this.props.data.lesseeSn}
                            title={this.props.data.projectName}
                            value={this.props.data.projectName}
                            readOnly
                            onClick={() => {
                                this.setState({
                                    isSelectLesseeProjectVisible: true
                                })
                            }}
                        />}
                </div>
                <Divider orientation="left">租赁价格</Divider>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>计费方式：</label>
                    <Radio.Group onChange={e => this.props.setData({feeType: e.target.value})}
                                 value={this.props.data.feeType}>
                        <Radio value={1}>按月计费</Radio>
                        <Radio value={2}>按天计费</Radio>
                    </Radio.Group>
                </div>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>租赁价格生效日：</label>
                    {this.props.data.settlementStartTime || '以首次起租日期为准'}
                </div>
                <Divider orientation="left">合同物资价格</Divider>
                <Button type={'primary'} onClick={() => {
                    if (!this.props.data.lesseeSn) {
                        message.info("请选择承租方");
                        return;
                    }
                    if (!this.props.data.projectSn && this.props.data.projectType === 1) {
                        message.info("请输入项目");
                        return;
                    }
                    this.setState({isSelectLeaseGoodsVisi: true})
                }}>添加物资</Button>
                {/*<Button style={{marginLeft: 10}}>引用其他合同物资模板</Button>*/}
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {this.props.data.leaseGoodsList.map((item, index) => (
                        <Panel header={item.goodsName || ''} key={index}>
                            <div style={{display: 'flex', padding: 5}}>
                                <span style={{flex: 1}}>名称</span>
                                <span style={{flex: 1}}>规格</span>
                                <span style={{flex: 0.7}}>税率(%)</span>
                                <span style={{flex: 1}}>不含税单价(元/{item.goodsUnit})</span>
                                <span style={{flex: 1}}>含税单价(元/{item.goodsUnit})</span>
                                <span style={{flex: 0.7}}>单位</span>
                                <span style={{width: 60}}>操作</span>
                            </div>
                            {item.skuList && item.skuList.map((itm, idx) => (
                                <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                                    <span style={{flex: 1}}>{itm.goodsName}</span>
                                    <span style={{flex: 1}}>
                                        {itm.specList && itm.specList.map((it, idx) => (
                                            <p style={{margin: 0}}
                                               key={idx}>{it.specName} : {it.specValue}</p>))}
                                    </span>
                                    <span style={{flex: 0.7}}>{this.props.data.leaseRate}</span>
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
                                                   let leaseGoodsList = this.props.data.leaseGoodsList;
                                                   leaseGoodsList[index].skuList[idx].num = value
                                                   leaseGoodsList[index].skuList[idx].num2 = this.priceToTaxPrice(value)
                                                   this.props.setData({
                                                       leaseGoodsList
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
                                                   let leaseGoodsList = this.props.data.leaseGoodsList;
                                                   leaseGoodsList[index].skuList[idx].num = this.taxPriceToPrice(value)
                                                   leaseGoodsList[index].skuList[idx].num2 = value
                                                   this.props.setData({
                                                       leaseGoodsList
                                                   })
                                               }}
                                               title={itm.num2}
                                           />
                                    </span>
                                    <span style={{flex: 0.7}}>{itm.goodsUnit}</span>
                                    <span style={{width: 60}}>
                                          <Popconfirm
                                              placement="topRight"
                                              title="确定删除该物资？"
                                              onConfirm={() => {
                                                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                  let leaseGoodsList = this.props.data.leaseGoodsList;
                                                  leaseGoodsList[index].skuList.splice(idx, 1);
                                                  if (leaseGoodsList[index].skuList == 0) {
                                                      leaseGoodsList.splice(index, 1);
                                                  }
                                                  this.props.setData({
                                                      leaseGoodsList
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
                <Divider orientation="left">结算信息</Divider>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>结算周期：</label>
                    <Select
                        defaultValue={this.props.data.settlementDate}
                        style={{width: 200}}
                        onChange={value => this.props.setData({
                            settlementDate: value
                        })}
                    >
                        <Option value={1}>自然月</Option>
                        {
                            [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(item => {
                                return <Option value={item}>{`当月 ${item} 号至次月 ${item - 1} 号`}</Option>
                            })
                        }
                    </Select>
                </div>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>进场物流费用结算方：</label>
                    <Radio.Group
                        onChange={e => this.props.setData({entryFeePayer: e.target.value})}
                        value={this.props.data.entryFeePayer}
                    >
                        <Radio value={1}>我方</Radio>
                        <Radio value={2}>客户</Radio>
                    </Radio.Group>
                </div>
                <div style={{
                    display: 'flex',
                    marginBottom: 20
                }}>
                    <label style={{width: 150}}>退场物流费用结算方：</label>
                    <Radio.Group
                        onChange={e => this.props.setData({returnFeePayer: e.target.value})}
                        value={this.props.data.returnFeePayer}
                    >
                        <Radio value={1}>我方</Radio>
                        <Radio value={2}>客户</Radio>
                    </Radio.Group>
                </div>
                <Button
                    type='primary'
                    style={{marginRight: 20}}
                    onClick={() => {
                        this.props.onNext && this.props.onNext();
                    }}
                >下一步</Button>
                {/*<Button style={{marginLeft: 20, marginRight: 20}}>预览</Button>*/}
                {/*选择承租方弹窗*/}
                {
                    this.state.isSelectLesseeModalVisible
                        ? <SelectLesseeModal
                            onClose={() => {
                                this.setState({
                                    isSelectLesseeModalVisible: false
                                });
                            }}
                            onSelect={data => {
                                this.props.setData
                                && this.props.setData({
                                    lesseeSn: data.lesseeSn,
                                    lesseeName: data.lesseeName,
                                }, () => {
                                    if (this.props.data.projectType == 0)
                                        this.getSettleTime()
                                })
                                this.setState({
                                    isSelectLesseeModalVisible: false
                                })
                            }}
                        />
                        : null
                }
                {/*选择项目弹窗*/}
                {
                    this.state.isSelectLesseeProjectVisible
                        ? <SelectLesseeProjectModal
                            lesseeSn={this.props.data.lesseeSn}
                            onClose={() => {
                                this.setState({
                                    isSelectLesseeProjectVisible: false
                                });
                            }}
                            onSelect={data => {
                                this.props.setData
                                && this.props.setData({
                                    projectSn: data.projectSn,
                                    projectName: data.projectName,
                                }, () => {
                                    this.getSettleTime()
                                })
                                this.setState({
                                    isSelectLesseeProjectVisible: false
                                })
                            }}
                        />
                        : null
                }
                {/*选择物资弹窗*/}
                {this.state.isSelectLeaseGoodsVisi ? <SelectLeaseGoodsModal
                    projectSn={this.props.data.projectSn}
                    onSelect={(data) => {
                        let leaseGoodsList = this.props.data.leaseGoodsList;
                        let newData = cloneDeep(this.props.data.leaseGoodsList);
                        //data对比查重，leaseGoodsList
                        //spu层leaseGoodsParentSn，sku层leaseGoodsSn
                        for (let i = 0; i < data.length; i++) {
                            //spu是否重复
                            let hadSpuIdx = -1;
                            for (let j = 0; j < leaseGoodsList.length; j++) {
                                if (data[i].leaseGoodsParentSn == leaseGoodsList[j].leaseGoodsParentSn) {
                                    hadSpuIdx = j;
                                    break;
                                }
                            }
                            if (hadSpuIdx >= 0) {
                                //sku是否重复
                                for (let i2 = 0; i2 < data[i].skuList.length; i2++) {
                                    //sku是否重复
                                    let hadSkuIdx = -1;
                                    for (let j2 = 0; j2 < leaseGoodsList[hadSpuIdx].skuList.length; j2++) {
                                        if (data[i].skuList[i2].leaseGoodsSn == leaseGoodsList[hadSpuIdx].skuList[j2].leaseGoodsSn) {
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
                            leaseGoodsList: newData
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
        );
    }
}

export default Step1Lessor;
