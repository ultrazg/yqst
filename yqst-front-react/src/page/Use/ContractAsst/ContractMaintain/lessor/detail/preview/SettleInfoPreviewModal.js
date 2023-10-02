//结算信息
import React from "react";
import {Modal} from "antd";
import moment from "moment";

export default class SettleInfoPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    render() {
        const {data} = this.props;
        return <Modal
            title="结算信息"
            width={'70%'}
            style={{top: 20}}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
            {this.renderText('结算周期', data.settlementDate == 1 ? '自然月' : `当月 ${data.settlementDate} 号 — 次月 ${data.settlementDate - 1} 号`)}
            {this.renderText('进场物流费用结算方', data.entryFeePayer == 1 ? '我方' : '客户')}
            {this.renderText('退场物流费用结算方', data.returnFeePayer == 1 ? '我方' : '客户')}
            {this.renderText('提交人', data.submitterName)}
            {this.renderText('提交时间', data.submitTime ?
                moment(data.submitTime).format("YYYY-MM-DD HH:mm:ss") : "")}
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
