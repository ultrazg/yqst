//切割赔偿信息
import React from "react";
import {Button, Collapse, Divider} from "antd";
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";
import CuttingInfoEditModal from "./CuttingInfoEditModal";
import CuttingInfoPreviewModal from "./preview/CuttingInfoPreviewModal";

const {Panel} = Collapse;

export default class CuttingInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(Api.LessorContractGetCuttingInfo, {sn: this.props.sn}, (res) => {
            this.props.setData({
                replacementGoodsList: res.data.replacementGoodsList,
                replaceSubmitterName: res.data.submitterName,
                replaceSubmitTime: res.data.submitTime,
            })
        }, () => {
        })
    }

    render() {
        let {data} = this.props;
        return (
            <>
                <Divider orientation="left">切割赔偿价格</Divider>
                <Collapse defaultActiveKey={0} style={{marginTop: 15, marginBottom: 20}}>
                    {data.replacementGoodsList.map((item, index) => {
                        return <>
                            <div style={{paddingTop: 10, paddingLeft: 10,}}>物资组{(index + 1)}</div>
                            <Panel header={item.goodsName || ''} key={index}>
                                <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                    <span style={{flex: 1}}>SKU名称</span>
                                    <span style={{flex: 1}}>规格</span>
                                    <span style={{flex: 0.7}}>单位</span>
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
                                    </div>
                                }) : null}
                                <div style={{fontSize: 12, marginTop: 5, marginBottom: 5}}>切割物资</div>
                                <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                    <span style={{flex: 1}}>SKU名称</span>
                                    <span style={{flex: 1}}>规格</span>
                                    <span style={{flex: 0.7}}>单位</span>
                                    <span style={{flex: 0.7}}>税率(%)</span>
                                    <span style={{flex: 1}}>赔偿单价(不含税)</span>
                                    <span style={{flex: 1}}>赔偿单价(含税)</span>
                                </div>
                                {item.skuList[0].replacedSkuList ?
                                    item.skuList[0].replacedSkuList.map((it, idx) => {
                                        return <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                                            <span style={{flex: 1}}>{it.goodsName}</span>
                                            <span style={{flex: 1}}>{it.specList && it.specList.map((it, idx) => (
                                                <p style={{margin: 0}}
                                                   key={idx}>{it.specName} : {it.specValue}</p>))}
                                            </span>
                                            <span style={{flex: 0.7}}>{it.goodsUnit}</span>
                                            <span style={{flex: 0.7}}>{it.taxRate}</span>
                                            <span style={{flex: 1}}>{it.unitPriceExcludingTax}</span>
                                            <span style={{flex: 1}}>{it.unitPrice}</span>
                                        </div>
                                    }) : null}
                            </Panel>
                        </>
                    })}
                </Collapse>
                <Divider orientation="left"/>
                {this.renderText('提交人', data.replaceSubmitterName)}
                {this.renderText('提交时间', data.replaceSubmitTime)}
                <div style={{display: 'flex'}}>
                    {data.isOperate ? <Button style={{marginLeft: 15}} type={'primary'} onClick={() => {
                        this.setState({isShow: true})
                    }}>修改</Button> : null}
                    <Button style={{marginLeft: 15}} onClick={() => {
                        this.props.showRecList((data) => {
                            this.previewData = data;
                            this.setState({isShowPreview: true});
                        })
                    }}>修改记录</Button>
                </div>
                {this.state.isShow ?
                    <CuttingInfoEditModal
                        data={{...this.props.data}}
                        refresh={() => {
                            this.getDetail()
                        }}
                        onClose={() => this.setState({isShow: false})}/> : null}
                {this.state.isShowPreview ? <CuttingInfoPreviewModal
                    data={{...this.previewData}}
                    refresh={() => {
                        this.getDetail()
                    }}
                    onClose={() => {
                        this.previewData = {};
                        this.setState({isShowPreview: false});
                    }}
                /> : null}
            </>
        )
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
