import React, {Component} from 'react';
import {Modal, Descriptions, Image, Collapse, Tabs, Empty, Select, Table, Button} from 'antd';
import CostAssistantModel from "../../CostAssistantModel";
import ShowSKUInfoModal from "./ShowSKUInfoModal";

const {Panel} = Collapse;
const {TabPane} = Tabs;
const {Option} = Select;

/**
 * 结算清单modal
 */
class PayeeInitiateDetailModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            active: '1',
            isShowSKUInfoModalVisi: false,
            currentSku: {},
            requestPar: {
                payerSn: this.props.payerSn || null,
                service: this.props.service || null,
                settlementStartTimeStr: this.props.settleBeginTime || null,
                settlementStartTime: this.props.settleBeginTime || null,
                settlementEndTimeStr: this.props.settleEndTime || null,
                settlementEndTime: this.props.settleEndTime || null,
                projectSn: this.props.projectSn || null,
                current: 1,
                pageSize: 10,
                keyWord: ''
            }
        };
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <Modal
                title="查看结算清单"
                visible={true}
                footer={null}
                width={'70%'}
                style={{top: 10}}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
            >
                {
                    this.state.requestPar.service == 1
                        ? this.renderTabPaneView()
                        : this.state.data.length === 0
                            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                            : <Collapse defaultActiveKey={0}>
                                {
                                    this.state.data.map((item, index) => (
                                        <Panel header={item.goodsParentName} key={index}>
                                            <Descriptions title="基本信息">
                                                <Descriptions.Item label="图片">
                                                    <Image width={120} src={item.goodsImageUrl}/>
                                                </Descriptions.Item>
                                                <Descriptions.Item label="单位">
                                                    {item.goodsUnit}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="费用合计">
                                                    {item.includingTaxAmount}
                                                </Descriptions.Item>
                                            </Descriptions>
                                            <div className="ant-descriptions-header">
                                                <div className="ant-descriptions-title">SKU 信息</div>
                                            </div>
                                            {
                                                item.skuList && item.skuList.map((itm, idx) => (
                                                    <Descriptions title={itm.goodsName}>
                                                        {
                                                            itm.specList ? itm.specList.map((it, id) => (
                                                                <Descriptions.Item label={it.specName}>
                                                                    {it.specValue}
                                                                </Descriptions.Item>
                                                                // it.specName + "：" + it.specValue
                                                            )) : null
                                                        }
                                                        <Descriptions.Item label="单位">
                                                            {itm.goodsUnit}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="费用小计">
                                                            {itm.includingTaxAmount}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                ))
                                            }
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                }
                {
                    this.state.isShowSKUInfoModalVisi
                        ? <ShowSKUInfoModal
                            item={this.state.currentSku}
                            onClose={() => {
                                this.setState({
                                    isShowSKUInfoModalVisi: false
                                });
                            }}
                        />
                        : null
                }
            </Modal>
        );
    }

    renderTabPaneView = () => (
        <Tabs defaultActiveKey="1" onChange={key => {
            this.setState({
                active: key
            });
        }}>
            <TabPane tab="租金" key="1">
                {
                    this.state.data.length === 0
                        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        : <Collapse defaultActiveKey={0}>
                            {
                                this.state.data.map((item, index) => (
                                    <Panel header={item.goodsParentName} key={index}>
                                        <Descriptions title="基本信息">
                                            <Descriptions.Item label="图片">
                                                <Image width={120} src={item.goodsImageUrl}/>
                                            </Descriptions.Item>
                                            <Descriptions.Item label="单位">
                                                {item.goodsUnit}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="费用合计">
                                                {item.includingTaxAmount}
                                            </Descriptions.Item>
                                        </Descriptions>
                                        <div className="ant-descriptions-header">
                                            <div className="ant-descriptions-title">SKU 信息</div>
                                        </div>
                                        {
                                            item.skuList && item.skuList.map((itm, idx) => (
                                                <Descriptions title={itm.goodsName}>
                                                    {
                                                        itm.specList ? itm.specList.map((it, id) => (
                                                            <Descriptions.Item label={it.specName}>
                                                                {it.specValue}
                                                            </Descriptions.Item>
                                                            // it.specName + "：" + it.specValue
                                                        )) : null
                                                    }
                                                    <Descriptions.Item label="单位">
                                                        {itm.goodsUnit}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="费用小计">
                                                        {itm.includingTaxAmount}
                                                    </Descriptions.Item>
                                                    <Descriptions.Item label="操作">
                                                        <Button type='link'
                                                                onClick={() => {
                                                                    this.setState({
                                                                        isShowSKUInfoModalVisi: true,
                                                                        currentSku: itm
                                                                    });
                                                                }}>查看详情</Button>
                                                    </Descriptions.Item>
                                                </Descriptions>
                                            ))
                                        }
                                    </Panel>
                                ))
                            }
                        </Collapse>
                }
            </TabPane>
            <TabPane tab="其他" key="2">
                <ListView
                    payerSn={this.state.requestPar.payerSn}
                    projectSn={this.state.requestPar.projectSn}
                    settlementStartTime={this.state.requestPar.settlementStartTime}
                    settlementEndTime={this.state.requestPar.settlementEndTime}
                />
            </TabPane>
        </Tabs>
    )

    getList = () => {
        CostAssistantModel.CostAsstSettlementGoodsListPreview(this.state.requestPar, res => {
            this.setState({
                total: res.data.total || 0,
                data: res.data || []
            });
        })
    }
}

class ListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: 0,
            expressList: [],
            maintenanceList: [],
            compensationList: [],
            data: {},
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                payeeSn: this.props.payeeSn || null,
                projectSn: this.props.projectSn || null,
                settlementStartTime: this.props.settlementStartTime || null,
                settlementEndTime: this.props.settlementEndTime || null
            }
        }
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        CostAssistantModel.CostAsstAdditionalList(this.state.requestPar, res => {
            this.setState({
                expressList: res.data.expressList,
                maintenanceList: res.data.maintenanceList,
                compensationList: res.data.compensationList
            });
        });
    }

    render() {
        return (
            <div>
                <label>类型：</label>
                <Select defaultValue={this.state.type} style={{width: 120, marginBottom: 20}} onChange={value => {
                    this.setState({type: value});
                }}>
                    <Option value={0}>附加物流</Option>
                    <Option value={1}>附加维保</Option>
                    <Option value={2}>附加赔偿</Option>
                </Select>
                {
                    this.state.type === 0
                        ? this.renderExpressListItem(this.state.expressList)
                        : this.state.type === 1
                            ? this.renderMaintenanceListItem(this.state.maintenanceList)
                            : this.state.type === 2
                                ? this.renderCompensationListItem(this.state.compensationList)
                                : null
                }
            </div>
        )
    }

    // 物流
    renderExpressListItem = data => {
        const columns = [
            {
                title: '业务时间',
                dataIndex: 'businessTime',
                key: 'businessTime',
            },
            {
                title: '运输单位',
                dataIndex: 'carrierCompanyName',
                key: 'carrierCompanyName',
            },
            {
                title: '车牌号',
                dataIndex: 'licensePlateNumber',
                key: 'licensePlateNumber',
            },
            {
                title: '公里数',
                dataIndex: 'mileage',
                key: 'mileage',
            },
            {
                title: '税率(%)',
                dataIndex: 'taxRate',
                key: 'taxRate',
            },
            {
                title: '不含税运输单价(元)',
                dataIndex: 'unitPriceExcludingTax',
                key: 'unitPriceExcludingTax',
            },
            {
                title: '含税运输单价(元)',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
            },
            {
                title: '不含税金额(元)',
                dataIndex: 'excludingTaxAmount',
                key: 'excludingTaxAmount'
            },
            {
                title: '含税金额(元)',
                dataIndex: 'includingTaxAmount',
                key: 'includingTaxAmount'
            }
        ]

        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        )
    }

    // 维保
    renderMaintenanceListItem = data => {
        const columns = [
            {
                title: '业务时间',
                dataIndex: 'businessTime',
                key: 'businessTime',
            },
            {
                title: '服务名称',
                dataIndex: 'serviceItemName',
                key: 'serviceItemName',
            },
            {
                title: '物资名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '数量',
                dataIndex: 'itemQuantity',
                key: 'itemQuantity',
            },
            {
                title: '单位',
                dataIndex: 'unit',
                key: 'unit',
            },
            {
                title: '税率(%)',
                dataIndex: 'taxRate',
                key: 'taxRate',
            },
            {
                title: '不含税单价(元)',
                dataIndex: 'unitPriceExcludingTax',
                key: 'unitPriceExcludingTax',
            },
            {
                title: '含税单价(元)',
                dataIndex: 'unitPrice',
                key: 'unitPrice',
            },
            {
                title: '不含税金额(元)',
                dataIndex: 'excludingTaxAmount',
                key: 'excludingTaxAmount',
            },
            {
                title: '含税金额(元)',
                dataIndex: 'includingTaxAmount',
                key: 'includingTaxAmount',
            },
            {
                title: '税额',
                dataIndex: 'taxAmount',
                key: 'taxAmount',
            },
        ]

        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        )
    }

    // 赔偿
    renderCompensationListItem = data => {
        const columns = [
            {
                title: '业务时间',
                dataIndex: 'businessTime',
                key: 'businessTime',
            },
            {
                title: '不含税费用金额(元)',
                dataIndex: 'feeAmountExcludingTax',
                key: 'feeAmountExcludingTax',
            },
            {
                title: '含税费用金额(元)',
                dataIndex: 'feeAmount',
                key: 'feeAmount',
            },
        ]

        return (
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
            />
        )
    }
}

export default PayeeInitiateDetailModal;
