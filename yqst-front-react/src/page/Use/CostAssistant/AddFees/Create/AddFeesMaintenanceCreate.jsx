import React from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined, PlusOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {Button, DatePicker, Descriptions, Input, InputNumber, Radio, Tooltip, Table, message} from "antd";
import SelectLesseeModal from "../Components/SelectLesseeModal";
import SelectProjectModal from "../Components/SelectProjectModal";
import moment from "moment";
import lodash from "lodash";
import CostAssistantModel from "../../CostAssistantModel";
import SelectEntryModal from "../Components/SelectEntryModal";
import SelectExitModal from "../Components/SelectExitModal";
import EnterDetailModal from "../Components/EntryDetailModal";
import ExitDetailModal from "../Components/ExitDetailModal";
import {getPageQuery} from "../../../../../utils";

class AddFeesMaintenanceCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SelectLesseeModalVisi: false,
            SelectProjectModalVisi: false,
            SelectEntryModalVisi: false,
            SelectExitModalVisi: false,
            EnterDetailModalVisi: false,
            ExitDetailModal: false,

            requestPar: {
                lesseeSn: '',
                lesseeName: '',
                projectName: '',
                projectSn: '',	//项目编号
                businessTime: '',	//维保日期
                remark: '',	//备注
                feeAmountExcludingTax: '',	//费用金额（不含税）
                feeAmount: '',	//费用金额（含税）

                businessSn: '',	//业务单号
                businessType: 2,	//业务类型 1.进场单 2.退场单
            },
            sn: '',
            serviceItemList: [] // 维保物资
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
                        max={9999999}
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
                title: '税率(%)',
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
                        max={9999999}
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
                        max={9999999}
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
                        max={9999999}
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
                    return <span>含税维保金额(元)</span>
                },
                render: (text, record, index) => {
                    return <InputNumber
                        min={0}
                        max={9999999}
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
                        max={9999999}
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

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            sn
        }, () => {
            this.state.sn && this.getDetailData();
        });
    }

    getDetailData = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeGet({sn}, res => {
            this.setState({
                requestPar: {
                    lesseeSn: res.data.payerSn || '',
                    lesseeName: res.data.payerName || '',
                    projectName: res.data.projectName || '',
                    projectSn: res.data.projectSn || '',
                    businessTime: res.data.businessTime || '',
                    remark: res.data.remark || '',
                    feeAmountExcludingTax: res.data.feeAmountExcludingTax || '',
                    feeAmount: res.data.feeAmount || '',
                    businessSn: res.data.businessSn || '',
                    businessType: 2,
                },
                serviceItemList: res.data.serviceItemList || []
            });
        });
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "附加费用"},
                        {title: this.state.sn ? "修改附加维保费用" : "发起附加维保费用"},
                    ]}
                >
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>{this.state.sn ? '放弃修改' : '返回'}</Button>
                    {this.renderFormView()}
                    {
                        // 选择付款方modal
                        this.state.SelectLesseeModalVisi
                            ? <SelectLesseeModal
                                onSelect={data => {
                                    const {lesseeName, lesseeSn} = data;

                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            lesseeName,
                                            lesseeSn,
                                            projectSn: '',
                                            projectName: '',
                                            businessType: 2,
                                            businessSn: ''
                                        },
                                        serviceItemList: [],
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
                                        requestPar: {
                                            ...this.state.requestPar,
                                            projectName,
                                            projectSn,
                                            businessType: 2,
                                            businessSn: ''
                                        },
                                        serviceItemList: [],
                                        SelectProjectModalVisi: false
                                    });
                                }}
                                lesseeSn={this.state.requestPar.lesseeSn}
                                onClose={() => {
                                    this.setState({SelectProjectModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 进场单modal
                        this.state.SelectEntryModalVisi
                            ? <SelectEntryModal
                                projectSn={this.state.requestPar.projectSn}
                                feeType={5}
                                onSelect={data => {
                                    const {leaseEntrySn, leaseGoodsList, weightListEnclosures, weight, weightUnit} = data;
                                    const newList = [];

                                    leaseGoodsList.map((item, index) => {
                                        const newObj = {
                                            goodsCode: item.goodsCode,
                                            goodsName: item.goodsName,
                                            serviceItemName: '',
                                            itemQuantity: '',
                                            unit: '',
                                            taxRate: '',
                                            unitPriceExcludingTax: '',
                                            unitPrice: '',
                                            excludingTaxAmount: '',
                                            includingTaxAmount: '',
                                            taxAmount: '',
                                        };

                                        newList.push(newObj);
                                    });

                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            businessSn: leaseEntrySn,
                                        },
                                        serviceItemList: newList,
                                        SelectEntryModalVisi: false,
                                        weightListEnclosures,
                                        weight,
                                        weightUnit
                                    });
                                }}
                                onClose={() => {
                                    this.setState({SelectEntryModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 退场单modal
                        this.state.SelectExitModalVisi
                            ? <SelectExitModal
                                projectSn={this.state.requestPar.projectSn}
                                feeType={5}
                                onSelect={data => {
                                    const {leaseExitSn, leaseGoodsList, weightListEnclosures, weight, weightUnit} = data;

                                    const newList = [];

                                    leaseGoodsList.map((item, index) => {
                                        const newObj = {
                                            goodsCode: item.goodsCode,
                                            goodsName: item.goodsName,
                                            serviceItemName: '',
                                            itemQuantity: '',
                                            unit: '',
                                            taxRate: '',
                                            unitPriceExcludingTax: '',
                                            unitPrice: '',
                                            excludingTaxAmount: '',
                                            includingTaxAmount: '',
                                            taxAmount: '',
                                        };

                                        newList.push(newObj);
                                    });

                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            businessSn: leaseExitSn,
                                        },
                                        SelectExitModalVisi: false,
                                        serviceItemList: newList,
                                        weightListEnclosures,
                                        weight,
                                        weightUnit
                                    });
                                }}
                                onClose={() => {
                                    this.setState({SelectExitModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        // 进场单详情
                        this.state.EnterDetailModalVisi
                            ? <EnterDetailModal
                                leaseEntrySn={this.state.requestPar.businessSn}
                                isShowBtn={false}
                                onClose={() => {
                                    this.setState({
                                        EnterDetailModalVisi: false
                                    });
                                }}
                            />
                            : null
                    }
                    {
                        // 退场单详情
                        this.state.ExitDetailModalVisi
                            ? <ExitDetailModal
                                leaseExitSn={this.state.requestPar.businessSn}
                                isShowBtn={false}
                                onClose={() => {
                                    this.setState({
                                        ExitDetailModalVisi: false
                                    });
                                }}
                            />
                            : null
                    }
                </ViewCoat>
            </>
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

    renderFormView = () => (
        <>
            <Descriptions title={null} bordered>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>选择付款方</>}>
                    <Input
                        readOnly
                        style={{cursor: 'pointer'}}
                        placeholder='请选择付款方'
                        value={this.state.requestPar.lesseeName ? this.state.requestPar.lesseeName : ''}
                        title={this.state.requestPar.lesseeName}
                        onClick={() => {
                            this.setState({
                                SelectLesseeModalVisi: true
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>选择项目</>}>
                    <Input
                        readOnly
                        style={!this.state.requestPar.lesseeSn ? {} : {cursor: 'pointer'}}
                        placeholder={!this.state.requestPar.lesseeSn ? '请先选择付款方' : '请选择项目'}
                        disabled={!this.state.requestPar.lesseeSn}
                        value={this.state.requestPar.projectName ? this.state.requestPar.projectName : ''}
                        title={this.state.requestPar.projectName}
                        onClick={() => {
                            this.setState({
                                SelectProjectModalVisi: true
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>业务类型</>}>
                    <Radio.Group
                        onChange={e => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    businessType: e.target.value,
                                    businessSn: ''
                                }
                            });
                        }}
                        value={this.state.requestPar.businessType}
                    >
                        {/*<Radio value={1}>进场单</Radio>*/}
                        <Radio value={2}>退场单</Radio>
                    </Radio.Group>
                </Descriptions.Item>
                <Descriptions.Item label="退场单据">
                    <Button
                        type='primary'
                        style={{marginRight: 20}}
                        disabled={!this.state.requestPar.projectSn}
                        onClick={() => {
                            const {businessType} = this.state.requestPar;

                            if (businessType === 1) {
                                this.setState({
                                    SelectEntryModalVisi: true
                                });
                            } else {
                                this.setState({
                                    SelectExitModalVisi: true
                                });
                            }
                        }}
                    >选择{this.state.requestPar.businessType === 1 ? '进' : '退'}场单</Button>
                    {
                        this.state.requestPar.businessSn
                            ? <>
                                已选租赁单号：{this.state.requestPar.businessSn}
                                <Button type='link' onClick={() => {
                                    if (this.state.requestPar.businessType === 1) {
                                        this.setState({
                                            EnterDetailModalVisi: true
                                        });
                                    } else {
                                        this.setState({
                                            ExitDetailModalVisi: true
                                        });
                                    }
                                }}>详情</Button>
                            </>
                            : null
                    }
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>维保日期</>}>
                    <DatePicker
                        onChange={(date, dateString) => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    businessTime: dateString
                                }
                            });
                        }}
                        value={this.state.requestPar.businessTime ? moment(this.state.requestPar.businessTime) : ''}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>费用金额(不含税)</>}>
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.feeAmountExcludingTax}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    feeAmountExcludingTax: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>费用金额(含税)</>}>
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.feeAmount}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    feeAmount: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="备注">
                    <Input
                        maxLength={50}
                        style={{width: 300}}
                        value={this.state.requestPar.remark}
                        onChange={e => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    remark: e.target.value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
            </Descriptions>
            <p style={{marginTop: 20}}>
                维保物资
                <Button type='primary' style={{marginLeft: 20}} onClick={() => {
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
                }}><PlusOutlined/>新增</Button>
            </p>
            <Table
                style={{marginTop: 20}}
                columns={this.columns}
                rowKey={record => record.registered}
                dataSource={this.state.serviceItemList}
                scroll={{x: 1300}}
                pagination={false}
            />
            <Button
                type='primary'
                style={{marginTop: 20, marginRight: 20}}
                onClick={() => {
                    this.onConfirm();
                }}
            >
                确认
            </Button>
            <Button onClick={() => {
                this.onReset();
            }}>重置</Button>
        </>
    );

    onConfirm = () => {
        /**
         * payerSn    string    是    付款方系统编码
         projectSn    string    是    项目编号
         businessTime    string    是    维保日期
         remark    string    否    备注
         feeAmountExcludingTax    string    是    费用金额（不含税）
         feeAmount    string    是    费用金额（含税）
         */
        const {requestPar, serviceItemList, sn} = this.state;
        const verifyText = ['lesseeSn', 'projectSn', 'businessTime', 'feeAmountExcludingTax', 'feeAmount'];

        for (const requestParKey in requestPar) {
            if (verifyText.indexOf(requestParKey) > -1 && requestPar[requestParKey] === '') {
                return message.error('带*号为必填项！');
            }
        }

        if (serviceItemList.length <= 0) {
            return message.error('维保物资为空');
        }

        if (serviceItemList.some(item => item.includingTaxAmount == '' || item.goodsName == '' || item.serviceItemName == '' || item.unit == '' || item.itemQuantity == '' || item.unitPriceExcludingTax == '' || item.taxRate == '' || item.unitPrice == '' || item.excludingTaxAmount == '' || item.taxAmount == '')) {
            return message.error('维保物资中存在空内容！');
        }

        if (sn) {
            CostAssistantModel.FeeServiceSave({
                sn,
                businessSn: requestPar.businessSn,
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                businessTime: requestPar.businessTime,
                remark: requestPar.remark,
                feeAmount: requestPar.feeAmount,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                serviceItemList
            }, () => {
                message.success('处理成功！');

                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
            });
        } else {
            CostAssistantModel.FeeServiceSave({
                businessSn: requestPar.businessSn,
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                businessTime: requestPar.businessTime,
                remark: requestPar.remark,
                feeAmount: requestPar.feeAmount,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                serviceItemList
            }, () => {
                message.success('处理成功！');

                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
            });
        }
    }

    onReset = () => {
        this.setState({
            requestPar: {
                lesseeSn: '',
                lesseeName: '',
                projectName: '',
                projectSn: '',
                businessTime: '',
                remark: '',
                feeAmountExcludingTax: '',
                feeAmount: '',
            },
            serviceItemList: []
        });
    }

}

export default AddFeesMaintenanceCreate;