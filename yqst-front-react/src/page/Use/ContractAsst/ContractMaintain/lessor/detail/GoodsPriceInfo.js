//物资价格信息
import React from "react";
import {Button, Collapse} from "antd";
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";
import GoodsPriceInfoEditModal from "./GoodsPriceInfoEditModal";
import GoodsPriceInfoPreviewModal from "./preview/GoodsPriceInfoPreviewModal";

const {Panel} = Collapse;
export default class GoodsPriceInfo extends React.PureComponent {
    previewData = {};

    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isShowPreview: false,
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(Api.LessorContractGetLastGoodsPrice, {sn: this.props.sn}, (res) => {
            this.props.setData({
                leaseGoodsList: res.data.leaseGoodsList,
                effectiveTime: res.data.effectiveTime,
                feeType: res.data.feeType,
                priceSubmitterName: res.data.submitterName,
                priceSubmitTime: res.data.submitTime,
            })
        }, () => {
        })
    }

    render() {
        const {data} = this.props
        return <div>
            {this.renderText('最新合同价格', '')}
            <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                {data.leaseGoodsList.map((item, index) => (
                    <Panel header={item.goodsName || ''} key={index}>
                        <div style={{display: 'flex', padding: 5}}>
                            <span style={{flex: 1}}>名称</span>
                            <span style={{flex: 1}}>规格</span>
                            <span style={{flex: 0.7}}>税率(%)</span>
                            <span style={{flex: 1}}>不含税单价(元/{item.goodsUnit})</span>
                            <span style={{flex: 1}}>含税单价(元/{item.goodsUnit})</span>
                            <span style={{flex: 0.7}}>单位</span>
                            {/*<span style={{width: 60}}>操作</span>*/}
                        </div>
                        {item.skuList && item.skuList.map((itm, idx) => (
                            <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                                <span style={{flex: 1}}>{itm.goodsName}</span>
                                <span style={{flex: 1}}>
                                        {itm.specList && itm.specList.map((it, idx) => (
                                            <p style={{margin: 0}}
                                               key={idx}>{it.specName} : {it.specValue}</p>))}
                                    </span>
                                <span style={{flex: 0.7}}>{itm.taxRate}</span>
                                <span style={{flex: 1}}>{itm.unitPriceExcludingTax}</span>
                                <span style={{flex: 1}}>{itm.unitPrice}</span>
                                <span style={{flex: 0.7}}>{itm.goodsUnit}</span>
                                {/*<span style={{width: 60}}>*/}
                                {/*          <Popconfirm*/}
                                {/*              placement="topRight"*/}
                                {/*              title="确定删除该物资？"*/}
                                {/*              onConfirm={() => {*/}
                                {/*                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList*/}
                                {/*                  let leaseGoodsList = this.props.data.leaseGoodsList;*/}
                                {/*                  leaseGoodsList[index].skuList.splice(idx, 1);*/}
                                {/*                  if (leaseGoodsList[index].skuList == 0) {*/}
                                {/*                      leaseGoodsList.splice(index, 1);*/}
                                {/*                  }*/}
                                {/*                  this.props.setData({*/}
                                {/*                      leaseGoodsList*/}
                                {/*                  });*/}
                                {/*              }}*/}
                                {/*              okText="确定"*/}
                                {/*              cancelText="取消"*/}
                                {/*          >*/}
                                {/*              <a style={{color: '#ff4757'}}>删除</a>*/}
                                {/*          </Popconfirm>*/}
                                {/*    </span>*/}
                            </div>))}
                    </Panel>))}
            </Collapse>

            {this.renderText('计费方式', data.feeType == 1 ? "按月计费" : "按天计费")}
            {this.renderText('租赁价格生效日', data.effectiveTime || '以首次起租日期为准')}
            {this.renderText('提交人', data.priceSubmitterName)}
            {this.renderText('提交时间', data.priceSubmitTime)}
            {this.renderText('原合同价格', <span
                style={{cursor: 'pointer', color: 'royalblue'}}
                onClick={() => {
                    request('/api/v1/contract/lease/contract/primary/good/list', {sn: this.props.sn}, (res) => {
                        this.previewData = res.data;
                        this.setState({isShowPreview: true})
                    }, () => {
                    });
                }}>查看</span>)}
            <div style={{display: 'flex'}}>
                {data.isOperate ? <Button style={{marginLeft: 15}} type={'primary'} onClick={() => {
                    this.setState({isShow: true})
                }}>新增协议</Button> : null}
                <Button style={{marginLeft: 15}} onClick={() => {
                    this.props.showRecList((data) => {
                        this.previewData = data;
                        this.setState({isShowPreview: true});
                    })
                }}>合同补充协议</Button>
            </div>
            {this.state.isShow ? <GoodsPriceInfoEditModal
                data={{...this.props.data}}
                refresh={() => {
                    this.getDetail()
                }}
                onClose={() => this.setState({isShow: false})}/> : null}
            {this.state.isShowPreview ? <GoodsPriceInfoPreviewModal
                data={{...this.previewData}}
                refresh={() => {
                    this.getDetail()
                }}
                onClose={() => {
                    this.previewData = {};
                    this.setState({isShowPreview: false});
                }}/> : null}
        </div>
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 100}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}


