import React, {Component} from 'react';
import {Modal, Divider, Empty, Descriptions} from 'antd';
import moment from "moment";

class ShowSkuInfoModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.item || {}
        }
    }

    render() {
        const {data} = this.state;

        return (
            <Modal
                title="结算清单详情"
                width={'50%'}
                style={{top: 20}}
                visible={true}
                footer={null}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
            >
                <Divider orientation="left" plain>
                    基本信息
                </Divider>
                <div style={{fontSize: 'small'}}>{data.goodsName}</div>
                <div style={{fontSize: 'small'}}>
                    {
                        data.specList && data.specList.map((item, index) => {
                            return <div key={index}>{item.specName}：{item.specValue}</div>
                        })
                    }
                </div>
                <div style={{fontSize: 'small'}}>含税单价：{data.unitPrice}元/{data.goodsUnit}•{data.timeUnit}</div>
                <div style={{fontSize: 'small'}}>费用小计(含税)：{data.includingTaxAmount}</div>
                <Divider orientation="left" plain>
                    期初
                </Divider>
                {
                    data.beginPeriod
                        ? <>
                            <div style={{fontSize: 'small'}}>
                                数量({data.goodsUnit})：{data.beginPeriod.goodsQuantity}
                            </div>
                            <div style={{fontSize: 'small'}}>
                                费用(含税)：{data.beginPeriod.includingTaxAmount}
                            </div>
                        </>
                        : <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                }
                <Divider orientation="left" plain>
                    期间
                </Divider>
                {this.makeList(data.duringPeriodList.filter(i => i.type === 2))}
                {this.makeList(data.duringPeriodList.filter(i => i.type === 3))}
                {this.makeList(data.duringPeriodList.filter(i => i.type === 4))}
                <Divider orientation="left" plain>
                    小计
                </Divider>
                <div style={{fontSize: 'small'}}>费用(含税)：{data.includingTaxAmount}</div>
            </Modal>
        );
    }

    makeList = data => {
        return data.map((item, index) => {
            return (
                <Descriptions
                    title={
                        item.type === 2
                            ? '起租单'
                            : item.type === 3
                                ? '退租单'
                                : '停租单'
                    }
                    bordered
                    key={index}
                    style={{marginBottom: 20}}
                >
                    <Descriptions.Item
                        label={
                            item.type === 2
                                ? '起租日期'
                                : item.type === 3
                                    ? '退租日期'
                                    : '停租日期'
                        }
                    >
                        {
                            (() => {
                                switch (item.type) {
                                    case 2:
                                    case 3:
                                        return item.startTime ? moment(item.startTime).format('YYYY-MM-DD') : '';
                                    case 4:
                                        return (item.startTime ? moment(item.startTime).format('YYYY-MM-DD') : '')
                                            + ' - '
                                            + (item.endTime ? moment(item.endTime).format('YYYY-MM-DD') : '');
                                    default:
                                        return "";
                                }
                            })()
                        }
                    </Descriptions.Item>
                    <Descriptions.Item label="数量">{item.goodsQuantity}</Descriptions.Item>
                    <Descriptions.Item label="计费天数(天)">{item.dayNum}</Descriptions.Item>
                    <Descriptions.Item label="费用(含税)">{item.includingTaxAmount}</Descriptions.Item>
                </Descriptions>
            )
        });
    }
}

export default ShowSkuInfoModal;