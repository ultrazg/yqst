//丢损赔偿信息
import {Button, Collapse, InputNumber, Popconfirm} from "antd";
import React from "react";
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";
import LossInfoEditModal from "./LossInfoEditModal";
import LossInfoPreviewModal from "./preview/LossInfoPreviewModal";

const {Panel} = Collapse;
export default class LossInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(Api.LessorContractGetLossInfo, {sn: this.props.sn}, (res) => {
            this.props.setData({
                lossGoodsList: res.data.lossGoodsList,
                lossSubmitterName: res.data.submitterName,
                lossSubmitTime: res.data.submitTime,
            })
        }, () => {
        })
    }

    render() {
        const {data} = this.props;
        return <div>
            {this.renderText('丢损赔偿价格', '')}
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
                        </div>
                        {item.skuList && item.skuList.map((itm, idx) => (
                            <div style={{display: 'flex', padding: 5, fontSize: 12, background: 'none'}} key={idx}>
                                <span style={{flex: 1}}>{itm.goodsName}</span>
                                <span style={{flex: 1}}>
                                        {itm.specList && itm.specList.map((it, idx) => (
                                            <p style={{margin: 0}}
                                               key={idx}>{it.specName} : {it.specValue}</p>))}
                                    </span>
                                <span style={{flex: 0.7}}>{itm.lossTaxRate}</span>
                                <span style={{flex: 1}}>{itm.lossUnitPriceExcludingTax}</span>
                                <span style={{flex: 1}}>{itm.lossUnitPrice}</span>
                                <span style={{flex: 0.7}}>{itm.damageTaxRate}</span>
                                <span style={{flex: 1}}>{itm.damageUnitPriceExcludingTax}</span>
                                <span style={{flex: 1}}>{itm.damageUnitPrice}</span>
                                <span style={{flex: 0.7}}>{itm.goodsUnit}</span>
                            </div>))}
                    </Panel>))}
            </Collapse>
            {this.renderText('提交人', data.lossSubmitterName)}
            {this.renderText('提交时间', data.lossSubmitTime)}
            <div style={{display: 'flex'}}>
                {data.isOperate ? <Button style={{marginLeft: 15}} type={'primary'} onClick={() => {
                    this.setState({isShow: true})
                }}>修改</Button>:null}
                <Button style={{marginLeft: 15}} onClick={() => {
                    this.props.showRecList((data) => {
                        this.previewData = data;
                        this.setState({isShowPreview: true});
                    })
                }}>修改记录</Button>
            </div>
            {this.state.isShow ? <LossInfoEditModal
                data={{...this.props.data}}
                refresh={() => {
                    this.getDetail()
                }}
                onClose={() => this.setState({isShow: false})}/> : null}
            {this.state.isShowPreview ? <LossInfoPreviewModal
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
