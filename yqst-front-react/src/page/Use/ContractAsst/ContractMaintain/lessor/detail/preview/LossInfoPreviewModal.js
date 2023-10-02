//丢损赔偿信息
import {Button, Collapse, InputNumber, Modal, Popconfirm} from "antd";
import React from "react";

const {Panel} = Collapse;
export default class LossInfoPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {data} = this.props;
        return <Modal
            title="丢损赔偿价格"
            width={'70%'}
            style={{top: 20}}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
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
