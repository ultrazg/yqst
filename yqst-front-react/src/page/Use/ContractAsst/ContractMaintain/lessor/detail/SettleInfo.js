//结算信息
import React from "react";
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";
import {Button} from "antd";
import SettleInfoEditModal from "./SettleInfoEditModal";
import SettleInfoPreviewModal from "./preview/SettleInfoPreviewModal";

export default class SettleInfo extends React.PureComponent {
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
        request(Api.LessorContractGetSettleInfo, {sn: this.props.sn}, (res) => {
            this.props.setData({
                settlementDate: res.data.settlementDate,
                entryFeePayer: res.data.entryFeePayer,
                returnFeePayer: res.data.returnFeePayer,
                settleSubmitterName: res.data.submitterName,
                settleSubmitTime: res.data.submitTime,
            })
        }, () => {
        })
    }

    render() {
        const {data} = this.props;
        return <div>
            {this.renderText('结算周期', data.settlementDate == 1 ? '自然月' : `当月 ${data.settlementDate} 号 — 次月 ${data.settlementDate - 1} 号`)}
            {this.renderText('进场物流费用结算方', data.entryFeePayer == 1 ? '我方' : '客户')}
            {this.renderText('退场物流费用结算方', data.returnFeePayer == 1 ? '我方' : '客户')}
            {this.renderText('提交人', data.settleSubmitterName)}
            {this.renderText('提交时间', data.settleSubmitTime)}
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
                <SettleInfoEditModal
                    data={{...this.props.data}}
                    refresh={() => {
                        this.getDetail()
                    }}
                    onClose={() => this.setState({isShow: false})}/> : null}
            {this.state.isShowPreview ? <SettleInfoPreviewModal
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
                <label style={{width: 130}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}
