import React, {Component} from 'react';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {Input, message, DatePicker, Descriptions, Button, Modal, InputNumber, Table, Tooltip} from "antd";
import SelectLesseeModal from "../../Components/SelectLesseeModal";
import SelectProjectModal from "../../Components/SelectProjectModal";
import moment from "moment";
import {QuestionCircleOutlined, PlusOutlined} from '@ant-design/icons';
import lodash from "lodash";

/**
 * 制租赁维保单
 */
class ServiceFeeCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            confirmModal: false,
            SelectLesseeModalVisi: false,
            SelectProjectModalVisi: false,

            lesseeName: '',
            lesseeSn: '',
            projectName: '',
            projectSn: '',
            remark: '', // 备注
            businessTime: '', // 维保日期
            feeAmountExcludingTax: 0, // 费用金额（不含税）
            feeAmount: 0, // 费用金额（含税）
            totalItemQuantity: 0, // 数量
            serviceItemList: [] // 服务项目列表
        };
        this.columns = [
            {
                title: '序号',
                width: 100,
                fixed: 'left',
                render: (text, record, index) => index + 1
            },
            {
                title: '维保物资',
                render: (text, record, index) => {
                    return <Input
                        maxLength={20}
                        value={record.goodsName}
                        title={record.goodsName}
                        onChange={e => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.goodsName = e.target.value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: () => {
                    return <span>服务项<Tooltip
                        title="服务费用项指：维保服务费用项目，如单面喷漆费、双面喷漆费等"><QuestionCircleOutlined
                        style={{marginLeft: 5}}/></Tooltip></span>
                },
                render: (text, record, index) => {
                    return <Input
                        maxLength={20}
                        value={record.serviceItemName}
                        title={record.serviceItemName}
                        onChange={e => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.serviceItemName = e.target.value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: '数量',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.itemQuantity}
                        title={record.itemQuantity}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.itemQuantity = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                            const {serviceItemList} = this.state;

                            let totalItemQuantity = 0;
                            let totalExcludingTaxAmount = 0;
                            let totalIncludingTaxAmount = 0;

                            serviceItemList.forEach(({itemQuantity, excludingTaxAmount, includingTaxAmount}) => {
                                totalItemQuantity += itemQuantity;
                                totalExcludingTaxAmount += excludingTaxAmount;
                                totalIncludingTaxAmount += includingTaxAmount;
                            });

                            this.setState({
                                feeAmountExcludingTax: totalExcludingTaxAmount,
                                feeAmount: totalIncludingTaxAmount,
                                totalItemQuantity
                            });
                        }}
                    />
                }
            },
            {
                title: '单位',
                render: (text, record, index) => {
                    return <Input
                        maxLength={10}
                        value={record.unit}
                        title={record.unit}
                        onChange={e => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.unit = e.target.value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: '税率',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        max={100}
                        value={record.taxRate}
                        title={record.taxRate}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.taxRate = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: '不含税维保价格(元)',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.unitPriceExcludingTax}
                        title={record.unitPriceExcludingTax}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.unitPriceExcludingTax = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: '含税维保价格(元)',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.unitPrice}
                        title={record.unitPrice}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.unitPrice = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            {
                title: '不含税维保金额(元)',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.excludingTaxAmount}
                        title={record.excludingTaxAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.excludingTaxAmount = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                            const {serviceItemList} = this.state;

                            let totalItemQuantity = 0;
                            let totalExcludingTaxAmount = 0;
                            let totalIncludingTaxAmount = 0;

                            serviceItemList.forEach(({itemQuantity, excludingTaxAmount, includingTaxAmount}) => {
                                totalItemQuantity += itemQuantity;
                                totalExcludingTaxAmount += excludingTaxAmount;
                                totalIncludingTaxAmount += includingTaxAmount;
                            });

                            this.setState({
                                feeAmountExcludingTax: totalExcludingTaxAmount,
                                feeAmount: totalIncludingTaxAmount,
                                totalItemQuantity
                            });
                        }}
                    />
                }
            },
            {
                title: () => {
                    return <><span style={{color: 'red'}}>*</span>含税维保金额(元)</>
                },
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.includingTaxAmount}
                        title={record.includingTaxAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.includingTaxAmount = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                            const {serviceItemList} = this.state;

                            let totalItemQuantity = 0;
                            let totalExcludingTaxAmount = 0;
                            let totalIncludingTaxAmount = 0;

                            serviceItemList.forEach(({itemQuantity, excludingTaxAmount, includingTaxAmount}) => {
                                totalItemQuantity += itemQuantity;
                                totalExcludingTaxAmount += excludingTaxAmount;
                                totalIncludingTaxAmount += includingTaxAmount;
                            });

                            this.setState({
                                feeAmountExcludingTax: totalExcludingTaxAmount,
                                feeAmount: totalIncludingTaxAmount,
                                totalItemQuantity
                            });
                        }}
                    />
                }
            },
            {
                title: '维保税额(元)',
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        value={record.taxAmount}
                        title={record.taxAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            let newList = this.state.serviceItemList.map((item, idx) => {
                                if (index === idx) {
                                    item.taxAmount = value;
                                }
                                return item;
                            });
                            this.setState({
                                serviceItemList: newList
                            });
                        }}
                    />
                }
            },
            // {
            //     title: '备注',
            //     render: (text, record, index) => {
            //         return <Input
            //             maxLength={50}
            //             value={record.remark}
            //             title={record.remark}
            //             onChange={e => {
            //                 let newList = this.state.serviceItemList.map((item, idx) => {
            //                     if (index === idx) {
            //                         item.remark = e.target.value;
            //                     }
            //                     return item;
            //                 });
            //                 this.setState({
            //                     serviceItemList: newList
            //                 });
            //             }}
            //         />
            //     }
            // },
            {
                title: '操作',
                key: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record, index) => <Button type='link' danger onClick={() => {
                    // let newList = this.state.serviceItemList.filter((i, idx) => idx !== index);
                    let newList = this.state.serviceItemList;
                    newList.splice(index, 1);

                    this.setState({
                        serviceItemList: lodash.cloneDeep(newList)
                    });

                    const {serviceItemList} = this.state;

                    let totalItemQuantity = 0;
                    let totalExcludingTaxAmount = 0;
                    let totalIncludingTaxAmount = 0;

                    serviceItemList.forEach(({itemQuantity, excludingTaxAmount, includingTaxAmount}) => {
                        totalItemQuantity += itemQuantity;
                        totalExcludingTaxAmount += excludingTaxAmount;
                        totalIncludingTaxAmount += includingTaxAmount;
                    });

                    this.setState({
                        feeAmountExcludingTax: totalExcludingTaxAmount,
                        feeAmount: totalIncludingTaxAmount,
                        totalItemQuantity
                    });
                }}>删除</Button>,
            },
        ]
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "制租赁维保单"},
                ]}
            >
                {this.renderFormView()}
                {
                    // 选择付款方modal
                    this.state.SelectLesseeModalVisi
                        ? <SelectLesseeModal
                            onSelect={data => {
                                const {lesseeName, lesseeSn} = data;

                                this.setState({
                                    lesseeName,
                                    lesseeSn,
                                    projectSn: '',
                                    projectName: '',
                                    SelectLesseeModalVisi: false
                                });
                            }}
                            onClose={() => {
                                this.setState({SelectLesseeModalVisi: false});
                            }}
                        />
                        : null
                }
                {
                    // 选择项目modal
                    this.state.SelectProjectModalVisi
                        ? <SelectProjectModal
                            onSelect={data => {
                                const {projectName, projectSn} = data;

                                this.setState({
                                    projectName,
                                    projectSn,
                                    SelectProjectModalVisi: false
                                });
                            }}
                            lesseeSn={this.state.lesseeSn}
                            onClose={() => {
                                this.setState({SelectProjectModalVisi: false});
                            }}
                        />
                        : null
                }
            </ViewCoat>
        );
    }

    limitDecimalsF = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\B(?=(\d{3})+(?!\d))/g, '').replace(reg, '$1$2.$3');
    };

    limitDecimalsP = (value) => {
        let reg = /^(-)*(\d+)\.(\d\d\d\d).*$/;
        return value.replace(/\s?|(,*)/g, '').replace(reg, '$1$2.$3');
    };

    renderFormView = () => {
        return (
            <>
                <p style={{fontSize: 'smaller'}}>
                    <span style={{color: 'red'}}>*</span><span> 为必填项</span>
                </p>
                <Descriptions title={null} bordered>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>付款方</span></>}>
                        <Input
                            readOnly
                            placeholder='请选择付款方'
                            style={{cursor: 'pointer'}}
                            value={this.state.lesseeName ? this.state.lesseeName : ''}
                            title={this.state.lesseeName}
                            onClick={() => {
                                this.setState({
                                    SelectLesseeModalVisi: true
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>项目</span></>}>
                        <Input
                            readOnly
                            placeholder={!this.state.lesseeSn ? '请先选择付款方' : '请选择项目'}
                            disabled={!this.state.lesseeSn}
                            style={!this.state.lesseeSn ? {} : {cursor: 'pointer'}}
                            value={this.state.projectName ? this.state.projectName : ''}
                            title={this.state.projectName}
                            onClick={() => {
                                this.setState({
                                    SelectProjectModalVisi: true
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>维保日期</span></>}>
                        <DatePicker
                            value={this.state.businessTime ? moment(this.state.businessTime) : ''}
                            onChange={(date, dateString) => {
                                this.setState({
                                    businessTime: dateString
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        <Input
                            value={this.state.remark}
                            style={{width: 450}}
                            maxLength={50}
                            onChange={e => {
                                this.setState({
                                    remark: e.target.value
                                });
                            }}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <span style={{marginTop: 20}}>
                    维保清单明细
                    <Button type='primary' style={{marginLeft: 20, marginTop: 20}} onClick={() => {
                        const newObj = {
                            goodsName: '',
                            serviceItemName: '',
                            itemQuantity: '',
                            unit: '',
                            taxRate: '',
                            unitPriceExcludingTax: '',
                            unitPrice: '',
                            excludingTaxAmount: '',
                            includingTaxAmount: '',
                            taxAmount: '',
                            // remark: ''
                        };
                        const newServiceItemList = this.state.serviceItemList;
                        newServiceItemList.push(newObj);
                        this.setState({
                            serviceItemList: lodash.cloneDeep(newServiceItemList)
                        });
                    }}><PlusOutlined/>新增一项明细</Button>
                </span>
                <Table
                    style={{marginTop: 20}}
                    columns={this.columns}
                    rowKey={record => record.registered}
                    dataSource={this.state.serviceItemList}
                    scroll={{x: 1300}}
                    pagination={false}
                />
                <p>
                    {this.renderTotalView()}
                </p>
                <Button type='primary' style={{marginTop: 20}} onClick={() => {
                    /**
                     * lesseeName: '',
                     lesseeSn: '',
                     projectName: '',
                     projectSn: '',
                     remark: '', // 备注
                     businessTime: '', // 维保日期
                     serviceItemList: [] // 服务项目列表
                     feeAmountExcludingTax: '', // 费用金额（不含税）
                     feeAmount: '', // 费用金额（含税）
                     totalItemQuantity: '', // 数量
                     */
                    const {
                        lesseeSn,
                        projectSn,
                        remark,
                        businessTime,
                        serviceItemList,
                        feeAmountExcludingTax,
                        feeAmount,
                        totalItemQuantity
                    } = this.state;

                    if (!lesseeSn) {
                        return message.error('请选择付款方');
                    }

                    if (!projectSn) {
                        return message.error('请选择项目');
                    }

                    if (!businessTime) {
                        return message.error('请选择维保日期');
                    }

                    if (serviceItemList.length <= 0) {
                        return message.error('维保清单为空');
                    }

                    if (serviceItemList.some(item => item.includingTaxAmount == '' || item.goodsName == '' || item.serviceItemName == '' || item.unit == '' || item.itemQuantity == '' || item.unitPriceExcludingTax == '' || item.taxRate == '' || item.unitPrice == '' || item.excludingTaxAmount == '' || item.taxAmount == '')) {
                        return message.error('维保清单明细中存在空内容！');
                    }

                    this.onConfirm();
                }}>确认</Button>
            </>
        )
    }

    /**
     * 合计
     * @returns {JSX.Element}
     */
    renderTotalView = () => {
        return (
            <>
                <p>合计：</p>
                <span>
                    数量：
                    <InputNumber
                        style={{width: 120}}
                        value={this.state.totalItemQuantity}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                totalItemQuantity: value
                            });
                        }}
                    />
                </span>
                <span style={{marginLeft: 20, marginRight: 20}}>
                    不含税维保金额(元)：
                    <InputNumber
                        style={{width: 120}}
                        value={this.state.feeAmountExcludingTax}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                feeAmountExcludingTax: value
                            });
                        }}
                    />
                </span>
                <span>
                    含税维保金额(元)：
                    <InputNumber
                        style={{width: 120}}
                        value={this.state.feeAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                feeAmount: value
                            });
                        }}
                    />
                </span>
            </>
        )
    }

    onConfirm = () => {
        /**
         * lesseeName: '',
         lesseeSn: '',
         projectName: '',
         projectSn: '',
         remark: '', // 备注
         businessTime: '', // 维保日期
         serviceItemList: [] // 服务项目列表
         feeAmountExcludingTax: '', // 费用金额（不含税）
         feeAmount: '', // 费用金额（含税）
         totalItemQuantity: '', // 数量
         */
        const {
            lesseeSn,
            projectSn,
            remark,
            businessTime,
            serviceItemList,
            feeAmountExcludingTax,
            feeAmount,
            totalItemQuantity
        } = this.state;

        CostAssistantModel.FeeServiceSave({
            payerSn: lesseeSn,
            projectSn,
            businessTime,
            remark,
            feeAmountExcludingTax,
            feeAmount,
            serviceItemList
        }, res => {
            message.success('处理成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/ServiceFeeList');
        });
    }

}

export default ServiceFeeCreate;