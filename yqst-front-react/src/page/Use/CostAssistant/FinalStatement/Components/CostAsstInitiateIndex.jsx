import React from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {Button, message, Modal, Tabs, Descriptions, Image, Collapse, Empty, Select, Table} from "antd";
import {CloudDownloadOutlined, LeftOutlined} from "@ant-design/icons";
import {getPageQuery} from "../../../../../utils";
import CostAssistantModel from "../../CostAssistantModel";
import ShowSKUInfoModal from './ShowSKUInfoModal';

const {TabPane} = Tabs;
const {Panel} = Collapse;
const {Option} = Select;

class CostAsstInitiateIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            service: '',
            active: '1',
            data: [],
            sn: '',
            isDownloadModalVisi: false,
            isShowSKUInfoModalVisi: false,
            currentSku: {},
        };
    }

    componentDidMount() {
        const {sn, service} = getPageQuery();

        this.setState({
            sn,
            service
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "结算单详情"},
                        {title: "结算清单"},
                    ]}
                >
                    <Button style={{marginBottom: 20, marginRight: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    <Button style={{marginBottom: 20}} onClick={() => {
                        this.setState({
                            isDownloadModalVisi: true
                        });
                    }}><CloudDownloadOutlined/>下载</Button>
                    {
                        this.renderDownloadModal()
                    }
                    {
                        this.state.service == 1
                            ? this.renderTabPanelView()
                            : this.state.data.length == 0
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
                </ViewCoat>
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
            </>
        );
    }

    getList = () => {
        const {sn} = this.state;

        CostAssistantModel.CostAsstSettlementGoodsList({sn}, res => {
            this.setState({
                data: res.data || []
            });
        });
    }

    renderTabPanelView = () => {
        return (
            <Tabs defaultActiveKey="1" onChange={key => {
                this.setState({
                    active: key
                });
            }}>
                <TabPane tab="租金" key="1">
                    {
                        this.state.data.length == 0
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
                                                    <Descriptions title={itm.goodsName} bordered>
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
                        sn={this.state.sn}
                    />
                </TabPane>
            </Tabs>
        )
    }

    renderDownloadModal = () => {
        return (
            <>
                <Modal
                    title="选择要下载的文件类型"
                    visible={this.state.isDownloadModalVisi}
                    onCancel={() => {
                        this.setState({
                            isDownloadModalVisi: false
                        });
                    }}
                    footer={null}
                >
                    <Button style={{marginRight: 20}} onClick={() => {
                        this.downloadHandle(0);
                    }}>统计 SPU</Button>
                    <Button onClick={() => {
                        this.downloadHandle(1);
                    }}>统计 SKU</Button>
                </Modal>
            </>
        )
    }

    downloadHandle = type => {
        const {sn} = this.state;

        CostAssistantModel[type === 0 ? 'CostAsstSettlementGoodsSpuFile' : 'CostAsstSettlementGoodsSkuFile']({sn},
            res => {
                let url = res.data.url;

                if (url) {
                    window.location.href = url;

                    message.success('开始下载');
                } else {
                    message.info('没有可下载的文件');
                }
            });
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
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                sn: this.props.sn || null,
            }
        };
    }

    componentDidMount() {
        this.getList();
    }

    getList = () => {
        CostAssistantModel.CostAsstSettlementAdditionalList(this.state.requestPar, res => {
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

export default CostAsstInitiateIndex;