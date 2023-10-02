import React from "react";
import request from "../../../../../../utils/request/request";
import {Button, Collapse, Divider, InputNumber, message, Modal, Popconfirm, Radio, Select} from "antd";
import SelectLeaseGoodsModal from "../../Components/SelectLeaseGoodsModal";
import cloneDeep from "lodash/cloneDeep";
import Api from "../../Api/Api";

const {Panel} = Collapse;

export default class GoodsPriceInfoEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                projectSn: "",
                feeType: "",
                leaseRate: 0,
                ...this.props.data,
                leaseGoodsList: this.props.data.leaseGoodsList ?
                    this.props.data.leaseGoodsList.map((item) => {
                        return {
                            ...item,
                            skuList: item.skuList.map((it) => {
                                return {
                                    ...it,
                                    num: parseFloat(it.unitPriceExcludingTax),
                                    num2: parseFloat(it.unitPrice),
                                    cannotDel: true
                                }
                            })
                        }
                    }) : [],
            }
        }
    }

    componentDidMount() {
        request(Api.ContractPriceAddRate, {}, (res) => {
            this.setData({
                leaseRate: res.data.taxRate ? res.data.taxRate : 0
            })
        }, () => {
        }, false);
    }

    setData = (data) => {
        this.setState({
            data: {
                ...this.state.data,
                ...data
            }
        })
    }

    priceToTaxPrice = (price) => {
        return parseFloat(
            (parseFloat(price)
                * (1 + parseFloat(this.state.data.leaseRate) / 100.0)
            ).toFixed(4)
        );
    }

    taxPriceToPrice = (taxPrice) => {
        return parseFloat(
            (parseFloat(taxPrice)
                / (1 + parseFloat(this.state.data.leaseRate) / 100.0)
            ).toFixed(4)
        );
    }

    submit = () => {
        let skuList = [];
        let leaseGoodsList = this.state.data.leaseGoodsList;
        for (let i = 0; i < leaseGoodsList.length; i++) {
            if (leaseGoodsList[i].skuList && leaseGoodsList[i].skuList.length) {
                for (let j = 0; j < leaseGoodsList[i].skuList.length; j++) {
                    skuList.push({
                        leaseGoodsSn: leaseGoodsList[i].skuList[j].leaseGoodsSn,
                        unitPriceExcludingTax: leaseGoodsList[i].skuList[j].num,
                        taxRate: this.state.data.leaseRate,
                        unitPrice: leaseGoodsList[i].skuList[j].num2,
                    });
                }
            }
        }
        if (skuList.length == 0) {
            message.info("请选择物资");
            return;
        }
        request('/api/v1/contract/lease/contract/supplement/add',
            {
                sn: this.state.data.sn,
                feeType: this.state.data.feeType || '',
                skuList: skuList,//	arr-object	是	sku列表
            }, (res) => {
                message.info('修改成功')
                this.props.onClose && this.props.onClose()
                this.props.refresh && this.props.refresh()
            }, () => {

            })
    }

    render() {
        return <Modal
            title="合同价格"
            width={'70%'}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 150}}>计费方式：</label>
                <Radio.Group onChange={e => this.setData({feeType: e.target.value})}
                             value={this.state.data.feeType}>
                    <Radio value={1}>按月计费</Radio>
                    <Radio value={2}>按天计费</Radio>
                </Radio.Group>
            </div>
            <Button type={'primary'} onClick={() => {
                this.setState({isSelectLeaseGoodsVisi: true})
            }}>添加物资</Button>
            {/*<Button style={{marginLeft: 10}}>引用其他合同物资模板</Button>*/}
            <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                {this.state.data.leaseGoodsList.map((item, index) => (
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
                                <span style={{flex: 0.7}}>{this.state.data.leaseRate}</span>
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
                                                   let leaseGoodsList = this.state.data.leaseGoodsList;
                                                   leaseGoodsList[index].skuList[idx].num = value
                                                   leaseGoodsList[index].skuList[idx].num2 = this.priceToTaxPrice(value)
                                                   this.setData({
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
                                                   let leaseGoodsList = this.state.data.leaseGoodsList;
                                                   leaseGoodsList[index].skuList[idx].num = this.taxPriceToPrice(value)
                                                   leaseGoodsList[index].skuList[idx].num2 = value
                                                   this.setData({
                                                       leaseGoodsList
                                                   })
                                               }}
                                               title={itm.num2}
                                           />
                                    </span>
                                <span style={{flex: 0.7}}>{itm.goodsUnit}</span>
                                <span style={{width: 60}}>
                                          <Popconfirm
                                              disabled={itm.cannotDel}
                                              placement="topRight"
                                              title="确定删除该物资？"
                                              onConfirm={() => {
                                                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                  let leaseGoodsList = this.state.data.leaseGoodsList;
                                                  leaseGoodsList[index].skuList.splice(idx, 1);
                                                  if (leaseGoodsList[index].skuList == 0) {
                                                      leaseGoodsList.splice(index, 1);
                                                  }
                                                  this.setData({
                                                      leaseGoodsList
                                                  });
                                              }}
                                              okText="确定"
                                              cancelText="取消"
                                          >
                                              <a style={{color: itm.cannotDel ? 'gray' : '#ff4757'}}>删除</a>
                                          </Popconfirm>
                                    </span>
                            </div>))}
                    </Panel>))}
            </Collapse>
            {/*选择物资弹窗*/}
            {this.state.isSelectLeaseGoodsVisi ? <SelectLeaseGoodsModal
                projectSn={this.state.data.projectSn}
                onSelect={(data) => {
                    let leaseGoodsList = this.state.data.leaseGoodsList;
                    let newData = cloneDeep(this.state.data.leaseGoodsList);
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
                    this.setData({
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
