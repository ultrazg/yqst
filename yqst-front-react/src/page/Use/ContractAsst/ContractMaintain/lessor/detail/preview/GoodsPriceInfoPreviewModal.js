//物资价格信息
import React from "react";
import {Button, Collapse, Modal} from "antd";

const {Panel} = Collapse;
export default class GoodsPriceInfoPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
    }

    render() {
        const {data} = this.props
        return <Modal
            title="合同价格"
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
                {data.leaseGoodsList.map((item, index) => (
                    <Panel header={item.goodsName || ''} key={index}>
                        <div style={{display: 'flex', padding: 5}}>
                            <span style={{flex: 1}}>名称</span>
                            <span style={{flex: 1}}>规格</span>
                            <span style={{flex: 0.7}}>税率(%)</span>
                            <span style={{flex: 1}}>不含税单价(元/{item.goodsUnit})</span>
                            <span style={{flex: 1}}>含税单价(元/{item.goodsUnit})</span>
                            <span style={{flex: 0.7}}>单位</span>
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
                            </div>))}
                    </Panel>))}
            </Collapse>

            {this.renderText('计费方式', data.feeType == 1 ? "按月计费" : "按天计费")}
            {this.renderText('租赁价格生效日', data.effectiveTime || '以首次起租日期为准')}
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


