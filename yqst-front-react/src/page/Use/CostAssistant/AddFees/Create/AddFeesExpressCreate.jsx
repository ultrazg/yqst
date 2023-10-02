import React, {Component} from 'react';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined} from "@ant-design/icons";
import {
    Button,
    Input,
    Descriptions,
    DatePicker,
    InputNumber,
    message,
    Radio,
    Empty,
    Divider,
    Collapse
} from "antd";
import SelectLesseeModal from "../Components/SelectLesseeModal";
import SelectProjectModal from "../Components/SelectProjectModal";
import SelectEntryModal from "../Components/SelectEntryModal";
import SelectExitModal from "../Components/SelectExitModal";
import moment from "moment";
import CostAssistantModel from "../../CostAssistantModel";
import EnterDetailModal from '../Components/EntryDetailModal';
import ExitDetailModal from "../Components/ExitDetailModal";
import {getPageQuery} from "../../../../../utils";

const {Panel} = Collapse;

class AddFeesExpressCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
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
                imgUrl: '',

                // payerSn: '',	//付款方用户编号
                projectSn: '',	//项目编号
                businessSn: '',	//业务单号
                businessType: 1,	//业务类型 1.进场单 2.退场单
                businessTime: '',	//运输日期
                carrierCompanyName: '',	//运输单位
                licensePlateNumber: '',	//车牌号
                mileage: '',//公里数
                // goodsName: '',	//运输物资
                // goodsQuantity: '',	//物资数量
                unitPriceExcludingTax: '',	//运输单价（不含税）
                unitPrice: '',	//运输单价（含税）
                taxRate: '',	//税率
                feeAmountExcludingTax: '',	//费用金额（不含税）
                feeAmount: '',//费用金额（含税）
                remark: '',	//备注
            },
            sn: '',
            GoodsLists: [],
            weightListEnclosures: [],
            weight: '',
            weightUnit: ''
        };
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
                    businessSn: res.data.businessSn || '',
                    businessType: res.data.businessType || '',
                    businessTime: res.data.businessTime || '',
                    carrierCompanyName: res.data.expressBusinessInfo.carrierCompanyName || '',
                    licensePlateNumber: res.data.expressBusinessInfo.licensePlateNumber || '',
                    mileage: res.data.expressBusinessInfo.mileage || '',
                    unitPriceExcludingTax: res.data.expressBusinessInfo.unitPriceExcludingTax || '',
                    unitPrice: res.data.expressBusinessInfo.unitPrice || '',
                    taxRate: res.data.taxRate || '',
                    feeAmountExcludingTax: res.data.feeAmountExcludingTax || '',
                    feeAmount: res.data.feeAmount || '',
                    remark: res.data.remark || '',
                }
            }, () => {
                this.getGoodsList();
            });
        });


    }

    getGoodsList = () => {
        if (this.state.requestPar.businessType == 1) {
            const leaseEntrySn = this.state.requestPar.businessSn;

            CostAssistantModel.LessorEntryGet({leaseEntrySn}, res => {
                this.setState({
                    GoodsLists: res.data.leaseGoodsList || [],
                });
            });
        } else {
            const leaseExitSn = this.state.requestPar.businessSn;

            CostAssistantModel.LessorExitGet({leaseExitSn}, res => {
                this.setState({
                    GoodsLists: res.data.leaseGoodsList || [],
                });
            });
        }
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "附加费用"},
                        {title: this.state.sn ? "修改附加物流费用" : "发起附加物流费用"},
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
                                            businessType: 1,
                                            businessSn: ''
                                        },
                                        GoodsLists: [],
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
                                            businessType: 1,
                                            businessSn: ''
                                        },
                                        GoodsLists: [],
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
                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            businessSn: leaseEntrySn,
                                        },
                                        GoodsLists: leaseGoodsList,
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

                                    this.setState({
                                        requestPar: {
                                            ...this.state.requestPar,
                                            businessSn: leaseExitSn,
                                        },
                                        SelectExitModalVisi: false,
                                        GoodsLists: leaseGoodsList,
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
                                },
                                GoodsLists: [],
                                weightListEnclosures: [],
                                weight: '',
                                weightUnit: ''
                            });
                        }}
                        value={this.state.requestPar.businessType}
                    >
                        <Radio value={1}>进场单</Radio>
                        <Radio value={2}>退场单</Radio>
                    </Radio.Group>
                </Descriptions.Item>
                <Descriptions.Item label="进/退场单据">
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
                                已选{this.state.requestPar.businessType === 1 ? '进' : '退'}场单号：{this.state.requestPar.businessSn}
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
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>运输日期</>}>
                    <DatePicker
                        value={this.state.requestPar.businessTime ? moment(this.state.requestPar.businessTime) : ''}
                        onChange={(date, dateString) => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    businessTime: dateString
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>车牌号</>}>
                    <Input
                        maxLength={10}
                        value={this.state.requestPar.licensePlateNumber}
                        onChange={e => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    licensePlateNumber: e.target.value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="公里数">
                    <InputNumber
                        min={0}
                        max={99999}
                        controls={null}
                        value={this.state.requestPar.mileage}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    mileage: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>运输单位</>}>
                    <Input
                        value={this.state.requestPar.carrierCompanyName}
                        onChange={e => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    carrierCompanyName: e.target.value
                                }
                            });
                        }}
                        maxLength={20}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="运输单价(不含税)">
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.unitPriceExcludingTax}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    unitPriceExcludingTax: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label={<><span style={{color: 'red'}}>*</span>税率(%)</>}>
                    <InputNumber
                        min={0}
                        max={100}
                        controls={false}
                        value={this.state.requestPar.taxRate}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    taxRate: value
                                }
                            });
                        }}
                    />
                </Descriptions.Item>
                <Descriptions.Item label="运输单价(含税)">
                    <InputNumber
                        min={0}
                        max={9999999}
                        controls={false}
                        value={this.state.requestPar.unitPrice}
                        formatter={this.limitDecimalsF}
                        parser={this.limitDecimalsP}
                        onChange={value => {
                            this.setState({
                                requestPar: {
                                    ...this.state.requestPar,
                                    unitPrice: value
                                }
                            });
                        }}
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
                {/*<Descriptions.Item label="磅单">*/}
                {/*    {*/}
                {/*        this.state.weightListEnclosures*/}
                {/*            ? this.state.weightListEnclosures.map((item, index) => (*/}
                {/*                <Image style={{width: 30, height: 30}} src={item}/>*/}
                {/*            ))*/}
                {/*            : null*/}
                {/*    }*/}
                {/*</Descriptions.Item>*/}
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
            {this.renderGoodsList()}
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
    )

    renderGoodsList = () => {
        return (
            <>
                <Divider orientation="left">运输物资</Divider>
                {
                    this.state.GoodsLists.length === 0
                        ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        : <>
                            <Collapse defaultActiveKey={1} destroyInactivePanel={true}>
                                {
                                    this.state.GoodsLists && this.state.GoodsLists.map((item, index) => (
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
                                                        {
                                                            this.state.requestPar.businessType === 1
                                                                ? <>
                                                                    <Descriptions.Item label='进场数量'>
                                                                        {itm.entryQuantity}({itm.deliveryUnit})
                                                                    </Descriptions.Item>
                                                                    <Descriptions.Item label='拒绝进场数量'>
                                                                        {itm.cancelQuantity}({itm.deliveryUnit})
                                                                    </Descriptions.Item>
                                                                    <Descriptions.Item label='单位'>
                                                                        {itm.deliveryUnit}
                                                                    </Descriptions.Item>
                                                                </>
                                                                : null
                                                        }
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
                        </>
                }
            </>
        )
    }

    onConfirm = () => {
        /**
         * payerSn    string    是    付款方用户编号
         projectSn    string    是    项目编号
         businessSn    string    是    业务单号
         businessType    int    是    业务类型 1.进场单 2.退场单
         businessTime    string    是    运输日期
         carrierCompanyName    string    是    运输单位
         licensePlateNumber    string    是    车牌号
         mileage    string    否    公里数
         goodsName    string    否    运输物资
         goodsQuantity    string    否    物资数量
         unitPriceExcludingTax    string    否    运输单价（不含税）
         unitPrice    string    否    运输单价（含税）
         taxRate    string    是    税率
         feeAmountExcludingTax    string    是    费用金额（不含税）
         feeAmount    string    是    费用金额（含税）
         remark    string    否    备注
         */
        const {requestPar, sn} = this.state;
        const verifyText = ['lesseeSn', 'projectSn', 'businessSn', 'businessTime', 'carrierCompanyName', 'licensePlateNumber', 'taxRate', 'feeAmountExcludingTax', 'feeAmount'];

        for (const requestParKey in requestPar) {
            if (verifyText.indexOf(requestParKey) > -1 && requestPar[requestParKey] === '') {
                return message.error('带*号为必填项！');
            }
        }

        if (sn) {
            CostAssistantModel.FeeExpressPayeeSave({
                sn,
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                businessSn: requestPar.businessSn,
                businessType: requestPar.businessType,
                businessTime: requestPar.businessTime,
                carrierCompanyName: requestPar.carrierCompanyName,
                licensePlateNumber: requestPar.licensePlateNumber,
                mileage: requestPar.mileage,
                unitPriceExcludingTax: requestPar.unitPriceExcludingTax,
                unitPrice: requestPar.unitPrice,
                taxRate: requestPar.taxRate,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                feeAmount: requestPar.feeAmount,
                remark: requestPar.remark,
            }, () => {
                message.success('处理成功！');

                this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/AddFees/AddFeesIndex');
            });
        } else {
            CostAssistantModel.FeeExpressPayeeSave({
                payerSn: requestPar.lesseeSn,
                projectSn: requestPar.projectSn,
                businessSn: requestPar.businessSn,
                businessType: requestPar.businessType,
                businessTime: requestPar.businessTime,
                carrierCompanyName: requestPar.carrierCompanyName,
                licensePlateNumber: requestPar.licensePlateNumber,
                mileage: requestPar.mileage,
                unitPriceExcludingTax: requestPar.unitPriceExcludingTax,
                unitPrice: requestPar.unitPrice,
                taxRate: requestPar.taxRate,
                feeAmountExcludingTax: requestPar.feeAmountExcludingTax,
                feeAmount: requestPar.feeAmount,
                remark: requestPar.remark,
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
                imgUrl: '',
                projectSn: '',
                businessSn: '',
                businessType: 1,
                businessTime: '',
                carrierCompanyName: '',
                licensePlateNumber: '',
                mileage: '',
                // goodsName: '',
                // goodsQuantity: '',
                unitPriceExcludingTax: '',
                unitPrice: '',
                taxRate: '',
                feeAmountExcludingTax: '',
                feeAmount: '',
                remark: '',
            },
            GoodsLists: []
        });
    }

}

export default AddFeesExpressCreate;