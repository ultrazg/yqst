//维保价格信息
import React from 'react'
import {Button, Divider} from "antd";
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";
import MaintainInfoEditModal from "./MaintainInfoEditModal";
import MaintainInfoPreviewModal from "./preview/MaintainInfoPreviewModal";

export default class MaintainInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(Api.LessorContractGetMainInfo, {sn: this.props.sn}, (res) => {
            this.props.setData({
                maintenanceItemList: res.data.maintenanceItemList,
                mainSubmitterName: res.data.submitterName,
                mainSubmitTime: res.data.submitTime,
            })
        }, () => {
        })
    }

    render() {
        const {data} = this.props
        return <div>
            <Divider orientation="left">维保价格</Divider>
            <div style={{padding: 5}}>
                <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                    <span style={{flex: 1}}>服务项目</span>
                    <span style={{flex: 1}}>单位</span>
                    <span style={{flex: 0.7}}>税率(%)</span>
                    <span style={{flex: 1}}>不含税金额</span>
                    <span style={{flex: 1}}>含税金额</span>
                </div>
                {data.maintenanceItemList && data.maintenanceItemList.map((itm, idx) => (
                    <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                        <span style={{flex: 1}}>{itm.serviceItemName}</span>
                        <span style={{flex: 1}}>{itm.unit}</span>
                        <span style={{flex: 0.7}}>{itm.taxRate}</span>
                        <span style={{flex: 1}}>{itm.excludingTaxAmount}</span>
                        <span style={{flex: 1}}>{itm.includingTaxAmount}</span>
                    </div>))}
            </div>
            <Divider orientation="left"/>
            {this.renderText('提交人', data.mainSubmitterName)}
            {this.renderText('提交时间', data.mainSubmitTime)}
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
            {this.state.isShow ? <MaintainInfoEditModal
                data={{...this.props.data}}
                refresh={() => {
                    this.getDetail()
                }}
                onClose={() => this.setState({isShow: false})}/> : null}
            {this.state.isShowPreview ?
                <MaintainInfoPreviewModal
                    data={{...this.previewData}}
                    refresh={() => {
                        this.getDetail()
                    }}
                    onClose={() => {
                        this.previewData = {};
                        this.setState({isShowPreview: false});
                    }}
                /> : null}
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
