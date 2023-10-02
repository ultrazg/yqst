import React, {Component} from 'react';
import CostAssistantModel from "../../../CostAssistantModel";
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {getPageQuery} from "../../../../../../utils";
import {Input, message, DatePicker, Descriptions, Button, Modal, InputNumber} from "antd";
import moment from "moment";
import {LeftOutlined, DeleteOutlined} from "@ant-design/icons";
import SelectLesseeModal from "../../Components/SelectLesseeModal";
import SelectProjectModal from "../../Components/SelectProjectModal";

/**
 * 租赁物流费用详情
 */
class ExpressFeeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lesseeName: '',
            newLesseeName: '',
            lesseeSn: '',
            newLesseeSn: '',
            projectName: '',
            newProjectName: '',
            projectSn: '',
            newProjectSn: '',
            feeType: '',
            feeBusinessSn: '',
            createTime: '',
            status: '',
            data: {},
            temData: {},
            sn: '',
            idEdit: false,
            delModalVisi: false,
            SelectLesseeModalVisi: false,
            SelectProjectModalVisi: false,
        };
    }

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            sn
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: "结算中心"},
                    {title: "制费用单"},
                    {title: "租赁物流费用详情"},
                ]}
            >
                <p>
                    <Button onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {
                        this.state.status == 1
                            ? <>
                                <Button style={{marginLeft: 20, marginRight: 20}} onClick={() => {
                                    this.setState({
                                        isEdit: !this.state.isEdit
                                    });
                                }}>{this.state.isEdit ? '放弃修改' : '修改'}</Button>
                                <Button danger onClick={() => {
                                    this.setState({
                                        delModalVisi: true
                                    });
                                }}><DeleteOutlined/>删除</Button>
                            </>
                            : null
                    }
                </p>
                {
                    this.state.isEdit
                        ? this.renderEditFormView()
                        : this.renderFormView()
                }
                {
                    <Modal
                        title="提示"
                        visible={this.state.delModalVisi}
                        onOk={() => {
                            this.onDelete();
                        }}
                        onCancel={() => {
                            this.setState({
                                delModalVisi: false
                            });
                        }}
                    >
                        <p>请确定是否删除</p>
                    </Modal>
                }
                {
                    // 选择付款方modal
                    this.state.SelectLesseeModalVisi
                        ? <SelectLesseeModal
                            onSelect={data => {
                                const {lesseeName, lesseeSn} = data;

                                this.setState({
                                    newLesseeName: lesseeName,
                                    newLesseeSn: lesseeSn,
                                    newProjectSn: '',
                                    newProjectName: '',
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
                                    newProjectName: projectName,
                                    newProjectSn: projectSn,
                                    SelectProjectModalVisi: false
                                });
                            }}
                            lesseeSn={this.state.newLesseeSn}
                            onClose={() => {
                                this.setState({SelectProjectModalVisi: false});
                            }}
                        />
                        : null
                }
            </ViewCoat>
        );
    }

    onConfirm = () => {
        const {
            newLesseeSn,// 必填
            newProjectSn,// 必填
            sn, // 修改必填
        } = this.state;
        const {
            businessTime,// 必填
            mileage,
            licensePlateNumber,// 必填
            goodsName,
            goodsQuantity,
            unitPriceExcludingTax,
            unitPrice,
            taxRate,// 必填
            feeAmountExcludingTax,// 必填
            feeAmount,// 必填
            remark
        } = this.state.temData;
        CostAssistantModel.FeeExpressPayeeSave({
            sn,
            payerSn: newLesseeSn,
            projectSn: newProjectSn,
            businessTime,
            licensePlateNumber,
            mileage,
            goodsName,
            goodsQuantity,
            unitPriceExcludingTax,
            unitPrice,
            taxRate,
            feeAmountExcludingTax,
            feeAmount,
            remark
        }, res => {
            message.success('提交成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList');
        });
    }

    onDelete = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeDel({sn}, res => {
            message.success('处理成功');

            this.props.history.push('/pages/appCenter/costAssistant/costAssistantHome/ExpressFeeList');
        });
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
                <Descriptions title={null} bordered>
                    <Descriptions.Item label='费用单号'>
                        {this.state.feeBusinessSn}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用类型'>
                        {this.switchStatus(this.state.feeType)}
                    </Descriptions.Item>
                    <Descriptions.Item label='制单时间'>
                        {this.state.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label='付款方'>
                        {this.state.lesseeName}
                    </Descriptions.Item>
                    <Descriptions.Item label='项目'>
                        {this.state.projectName}
                    </Descriptions.Item>
                    <Descriptions.Item label='运输日期'>
                        {this.state.data.businessTime ? moment(this.state.data.businessTime).format('YYYY-MM-DD') : ''}
                    </Descriptions.Item>
                    <Descriptions.Item label="公里数">
                        {this.state.data.mileage}
                    </Descriptions.Item>
                    <Descriptions.Item label='车牌号'>
                        {this.state.data.licensePlateNumber}
                    </Descriptions.Item>
                    <Descriptions.Item label="运输物资">
                        {this.state.data.goodsName}
                    </Descriptions.Item>
                    <Descriptions.Item label="物资数量">
                        {this.state.data.goodsQuantity}
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(不含税)">
                        {this.state.data.unitPriceExcludingTax}
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(含税)">
                        {this.state.data.unitPrice}
                    </Descriptions.Item>
                    <Descriptions.Item label='税率'>
                        {this.state.data.taxRate}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用金额(不含税)'>
                        {this.state.data.feeAmountExcludingTax}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用金额(含税)'>
                        {this.state.data.feeAmount}
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        {this.state.data.remark}
                    </Descriptions.Item>
                </Descriptions>
            </>
        )
    }

    renderEditFormView = () => {
        return (
            <>
                <p style={{fontSize: 'smaller'}}>
                    <span style={{color: 'red'}}>*</span><span> 为必填项</span>
                </p>
                <Descriptions title={null} bordered>
                    <Descriptions.Item label='费用单号'>
                        {this.state.feeBusinessSn}
                    </Descriptions.Item>
                    <Descriptions.Item label='费用类型'>
                        {this.switchStatus(this.state.feeType)}
                    </Descriptions.Item>
                    <Descriptions.Item label='制单时间'>
                        {this.state.createTime}
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>付款方</span></>}>
                        <Input
                            readOnly
                            placeholder='请选择付款方'
                            style={{cursor: 'pointer'}}
                            value={this.state.newLesseeName ? this.state.newLesseeName : ''}
                            title={this.state.newLesseeName}
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
                            placeholder={!this.state.newLesseeSn ? '请先选择付款方' : '请选择项目'}
                            disabled={!this.state.newLesseeSn}
                            style={!this.state.newLesseeSn ? {} : {cursor: 'pointer'}}
                            value={this.state.newProjectName ? this.state.newProjectName : ''}
                            title={this.state.newProjectName}
                            onClick={() => {
                                this.setState({
                                    SelectProjectModalVisi: true
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>运输日期</span></>}>
                        <DatePicker
                            allowClear={false}
                            value={this.state.temData.businessTime ? moment(this.state.temData.businessTime) : ''}
                            onChange={(date, dateString) => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        businessTime: dateString
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="公里数">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.mileage}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        mileage: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>车牌号</span></>}>
                        <Input
                            maxLength={10}
                            value={this.state.temData.licensePlateNumber}
                            onChange={e => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        licensePlateNumber: e.target.value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输物资">
                        <Input
                            maxLength={20}
                            value={this.state.temData.goodsName}
                            onChange={e => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        goodsName: e.target.value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="物资数量">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.goodsQuantity}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        goodsQuantity: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(不含税)">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.unitPriceExcludingTax}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        unitPriceExcludingTax: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="运输单价(含税)">
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.unitPrice}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        unitPrice: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>税率</span></>}>
                        <InputNumber
                            min={0}
                            max={100}
                            controls={false}
                            value={this.state.temData.taxRate}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        taxRate: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(不含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.feeAmountExcludingTax}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        feeAmountExcludingTax: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label={<><span style={{color: 'red'}}>*</span><span>费用金额(含税)</span></>}>
                        <InputNumber
                            min={0}
                            controls={false}
                            value={this.state.temData.feeAmount}
                            formatter={this.limitDecimalsF}
                            parser={this.limitDecimalsP}
                            onChange={value => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        feeAmount: value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                    <Descriptions.Item label="备注">
                        <Input
                            value={this.state.temData.remark}
                            style={{width: 450}}
                            maxLength={50}
                            onChange={e => {
                                this.setState({
                                    temData: {
                                        ...this.state.temData,
                                        remark: e.target.value
                                    }
                                });
                            }}
                        />
                    </Descriptions.Item>
                </Descriptions>
                <Button style={{marginTop: 20}} type='primary' onClick={() => {
                    const {
                        newLesseeSn,// 必填
                        newProjectSn,// 必填
                    } = this.state;
                    const {
                        businessTime,// 必填
                        licensePlateNumber,// 必填
                        taxRate,// 必填
                        feeAmountExcludingTax,// 必填
                        feeAmount,// 必填
                    } = this.state.temData;
                    if (!newLesseeSn || !newProjectSn || !businessTime || !licensePlateNumber || !taxRate || !feeAmountExcludingTax || !feeAmount) {
                        return message.error('带 * 号为必填项目！');
                    }
                    this.onConfirm();
                }}>确认</Button>
            </>
        )
    }

    switchStatus = type => {
        switch (type) {
            case 5:
                return '租赁物流';
            case 6:
                return '租赁保底';
            default:
                return '';
        }
    }

    getList = () => {
        const {sn} = this.state;

        CostAssistantModel.LeaseFeeGet({sn}, res => {
            this.setState({
                data: res.data || {},
                temData: res.data || {},
                lesseeSn: res.data.payerSn || '',
                newLesseeSn: res.data.payerSn || '',
                lesseeName: res.data.payerName || '',
                newLesseeName: res.data.payerName || '',
                projectName: res.data.projectName || '',
                newProjectName: res.data.projectName || '',
                projectSn: res.data.projectSn || '',
                newProjectSn: res.data.projectSn || '',
                feeBusinessSn: res.data.feeBusinessSn || '',
                feeType: res.data.feeType || '',
                createTime: res.data.createTime || '',
                status: res.data.status || ''
            });
        });
    }
}

export default ExpressFeeDetail;