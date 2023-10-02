//切割赔偿信息
import React from "react";
import {Collapse, Divider, Modal} from "antd";

const {Panel} = Collapse;

export default class CuttingInfoPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false
        }
    }

    render() {
        let {data} = this.props;
        return (
            <Modal
                title="切割赔偿价格"
                width={'70%'}
                style={{top: 20}}
                visible={true}
                footer={null}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
                maskClosable={false}
            >
                <>
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
                    {this.renderText('提交人', data.submitterName)}
                    {this.renderText('提交时间', data.submitTime)}
                </>
            </Modal>
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
