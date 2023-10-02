import React from 'react';
import {Modal, Descriptions, Collapse, Button} from 'antd';
import CostAssistantModel from "../../CostAssistantModel";

const {Panel} = Collapse;

class EntryDetailModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowBtn: this.props.isShowBtn,
            leaseEntrySn: this.props.leaseEntrySn || '',
            data: {}
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        const {leaseEntrySn} = this.state;

        CostAssistantModel.LessorEntryGet({leaseEntrySn}, res => {
            this.setState({
                data: res.data || {}
            });
        });
    }

    render() {
        return (
            <div>
                <Modal
                    title="进场单详情"
                    width={'70%'}
                    style={{top: 20}}
                    visible={true}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose();
                    }}
                >
                    {
                        this.state.isShowBtn
                            ? <Button
                                type='primary'
                                style={{marginBottom: 20}}
                                onClick={() => {
                                    this.props.onSelect && this.props.onSelect(this.state.data);
                                }}
                            >
                                选择
                            </Button>
                            : null
                    }
                    <Descriptions title="进场单详情">
                        <Descriptions.Item
                            label="进场单号">{this.state.data.leaseEntrySn ? this.state.data.leaseEntrySn : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="进场时间">{this.state.data.entryTime ? this.state.data.entryTime : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="项目名称">{this.state.data.projectName ? this.state.data.projectName : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="承租方">{this.state.data.lesseeName ? this.state.data.lesseeName : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="重量">{this.state.data.weight ? this.state.data.weight : ''}{this.state.data.weightUnit ? this.state.data.weightUnit : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="车牌号">{this.state.data.licensePlateNumber ? this.state.data.licensePlateNumber : ''}</Descriptions.Item>
                        <Descriptions.Item
                            label="备注">{this.state.data.remark ? this.state.data.remark : ''}</Descriptions.Item>
                    </Descriptions>
                    <div className='ant-descriptions-title'>物资清单</div>
                    {this.renderGoodsList(this.state.data.leaseGoodsList)}
                </Modal>
            </div>
        );
    }

    renderGoodsList = lists => {
        return (
            <div style={{marginTop: 20}}>
                <Collapse defaultActiveKey={0} destroyInactivePanel={true}>
                    {
                        lists && lists.map((item, index) => (
                            <Panel header={item.goodsName} key={index}>
                                <Descriptions title={null}>
                                    <Descriptions.Item
                                        label="图片"
                                    >
                                        <img
                                            style={{width: 50, height: 50}}
                                            src={item.goodsImageUrl}
                                            alt='goodsImageUrl'
                                        />
                                    </Descriptions.Item>
                                    <Descriptions.Item label='单位'>
                                        {item.goodsUnit}
                                    </Descriptions.Item>
                                    <Descriptions.Item label='物资种类'>
                                        {item.goodsKind}
                                    </Descriptions.Item>
                                    <Descriptions.Item label='数量总计'>
                                        {item.goodsQuantity}
                                    </Descriptions.Item>
                                </Descriptions>
                                <div className="ant-descriptions-header">
                                    <div className='ant-descriptions-title'>SKU 信息</div>
                                </div>
                                {
                                    item.skuList && item.skuList.map((itm, idx) => (
                                        <Descriptions title={itm.goodsName}>
                                            <Descriptions.Item label='进场数量'>
                                                {itm.entryQuantity}({itm.deliveryUnit})
                                            </Descriptions.Item>
                                            <Descriptions.Item label='拒绝进场数量'>
                                                {itm.cancelQuantity}({itm.deliveryUnit})
                                            </Descriptions.Item>
                                            <Descriptions.Item label='单位'>
                                                {itm.deliveryUnit}
                                            </Descriptions.Item>
                                            {
                                                itm.specList && itm.specList.map((it, id) => (
                                                    <Descriptions.Item label={it.specName}>
                                                        {it.specValue}
                                                    </Descriptions.Item>
                                                    // it.specName + "：" + it.specValue
                                                ))
                                            }
                                        </Descriptions>
                                    ))
                                }
                            </Panel>
                        ))
                    }
                </Collapse>
            </div>
        );
    }

}

export default EntryDetailModal;