//维保价格信息
import React from 'react'
import {Button, Divider, Modal} from "antd";

export default class MaintainInfoPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {data} = this.props
        return <Modal
            title="维保价格"
            width={'70%'}
            style={{top: 20}}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
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
            {this.renderText('提交人', data.submitterName)}
            {this.renderText('提交时间', data.submitTime)}
        </Modal>
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
