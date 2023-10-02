import React from 'react';
import Api from '../Api';
import request from '../../../utils/request/request';
import {Input, DatePicker, Select, Button, message, Empty} from "antd";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import ReactECharts from "echarts-for-react";
import SelectCompModal from "./components/SelectCompModal";
import SelectProjectModal from "./components/SelectProjModal";
import moment from "moment";

const {Option} = Select;

class OrderData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            roleType: 0, // 角色类型 1.出租 2.承租
            startTime: '',
            endTime: '',
            companySn: '',
            companyName: '',
            projectSn: '',
            projectName: '',
            selectCompModalVisi: false,
            selectProjModalVisi: false,

            // leaseOrderNum: '', // 租赁订单数
            // leaseDeliveryNum: '', // 租赁发货单数
            // leaseEntryNum: '', // 租赁进场单数
            // leaseExitApplyNum: '', // 租赁退场申请单数
            // leasePreReturnNum: '', // 租赁退回单数
            // leaseRecoveryNum: '', // 租赁回收单数
            // leaseExitNum: '', // 租赁退场单数
            // leaseLossNum: '', // 租赁丢损赔偿单数
            // leaseReplacementNum: '', // 租赁切割赔偿单数
            // serviceOrderNum: '', // 维保订单量

            echartsVisi: false,
            option: {
                grid: {
                    x: 100,
                    y2: 100
                },
                xAxis: {
                    type: 'category',
                    data: ['租赁订单数', '租赁发货单数', '租赁进场单数', '租赁退场申请单数', '租赁退回单数', '租赁回收单数', '租赁退场单数', '租赁丢损赔偿单数', '租赁切割赔偿单数', '维保订单量'],
                    axisLabel: {
                        rotate: 45
                    }
                },
                yAxis: {
                    interval: 100,
                    type: 'value'
                },
                tooltip: {
                    show: true
                },
                series: [
                    {}
                ]
            }
        };
    }

    render() {
        return (
            <ViewContent
                crumb={[{name: '数据中心'}, {name: "单量数据"}]}
            >
                <div style={{padding: 10}}>
                    {this.renderCtrlView()}
                    {
                        this.state.echartsVisi
                            ? this.renderChartsView()
                            : <Empty description={false} style={{paddingTop: 150, paddingBottom: 150}}/>
                    }
                    {
                        this.state.selectCompModalVisi
                            ? <SelectCompModal
                                onSelect={data => {
                                    this.setState({
                                        companySn: data.companySn,
                                        companyName: data.companyName,
                                        selectCompModalVisi: false,
                                        projectSn: '',
                                        projectName: ''
                                    });
                                }}
                                onClose={() => {
                                    this.setState({selectCompModalVisi: false});
                                }}
                            />
                            : null
                    }
                    {
                        this.state.selectProjModalVisi
                            ? <SelectProjectModal
                                companySn={this.state.companySn}
                                roleType={this.state.roleType}
                                onSelect={data => {
                                    this.setState({
                                        projectSn: data.projectSn,
                                        projectName: data.projectName,
                                        selectProjModalVisi: false
                                    });
                                }}
                                onClose={() => {
                                    this.setState({selectProjModalVisi: false});
                                }}
                            />
                            : null
                    }
                </div>
            </ViewContent>
        );
    }

    /**
     *
     * @returns {JSX.Element}
     */
    renderCtrlView = () => {
        return (
            <>
                <span>
                    开始时间：
                    <DatePicker
                        onChange={(_, dateString) => this.setState({startTime: dateString})}
                        placeholder='开始时间'
                        style={{marginRight: 20}}
                        showToday={false}
                        value={this.state.startTime ? moment(this.state.startTime) : ''}
                    />
                    结束时间：
                    <DatePicker
                        onChange={(_, dateString) => this.setState({endTime: dateString})}
                        placeholder='结束时间'
                        showToday={false}
                        value={this.state.endTime ? moment(this.state.endTime) : ''}
                    />
                </span>
                <p style={{marginTop: 20, marginBottom: 20}}>
                    <span>
                    角色：
                    <Select defaultValue={0} value={this.state.roleType} style={{width: 120}} onChange={value => {
                        this.setState({
                            roleType: value,
                            companySn: '',
                            companyName: '',
                            projectSn: '',
                            projectName: '',
                        });
                    }}>
                        <Option value={0}>选择角色</Option>
                        <Option value={1}>出租</Option>
                        <Option value={2}>承租</Option>
                    </Select>
                </span>
                    <span style={{marginLeft: 20, marginRight: 20}}>
                    企业：
                    <Input
                        readOnly
                        placeholder="选择企业"
                        title={this.state.companyName}
                        style={{width: 140, cursor: 'pointer'}}
                        value={this.state.companyName}
                        onClick={() => {
                            const {roleType} = this.state;

                            if (roleType !== 0) {
                                this.setState({selectCompModalVisi: true});
                            } else {
                                message.error('请选择角色');
                            }
                        }}
                    />
                </span>
                    <span>
                    项目：
                    <Input
                        readOnly
                        placeholder="选择项目"
                        title={this.state.projectName}
                        style={{width: 140, cursor: 'pointer'}}
                        value={this.state.projectName}
                        onClick={() => {
                            const {companySn} = this.state;

                            if (companySn) {
                                this.setState({selectProjModalVisi: true});
                            } else {
                                message.error('请选择企业');
                            }
                        }}
                    />
                </span>
                    <Button
                        type='primary'
                        style={{marginLeft: 20, marginRight: 20}}
                        onClick={() => {
                            const {startTime, endTime, roleType, companySn} = this.state;

                            if (!startTime) {
                                message.error('请选择开始时间');

                                return false;
                            }
                            if (!endTime) {
                                message.error('请选择结束时间');

                                return false;
                            }
                            if (roleType === 0) {
                                message.error('请选择角色');

                                return false;
                            }
                            if (!companySn) {
                                message.error('请选择企业');

                                return false;
                            }
                            this.onSearch();
                        }}
                    >
                        查询
                    </Button>
                    <Button
                        type='primary'
                        disabled={!this.state.echartsVisi}
                        onClick={() => {
                            this.getExcelUrl();
                        }}
                    >
                        导出报表
                    </Button>
                    <Button style={{marginLeft: 20}} onClick={() => {
                        this.setState({
                            startTime: '',
                            endTime: '',
                            roleType: 0,
                            companySn: '',
                            companyName: '',
                            projectSn: '',
                            projectName: '',
                            echartsVisi: false
                        });
                    }}>重置</Button>
                </p>
            </>
        )
    }

    /**
     * echarts
     * @returns {JSX.Element}
     */
    renderChartsView = () => {
        return (
            <ReactECharts
                option={this.state.option}
                notMerge={true}
                style={{height: '550px'}}
                lazyUpdate={true}
                opts={{renderer: 'svg'}}
            />
        )
    }

    getExcelUrl = () => {
        const {startTime, endTime, roleType, companySn, projectSn} = this.state;

        request(
            Api.BusinessNumStatisticsExcelUrl,
            {
                startTime,
                endTime,
                roleType,
                companySn,
                projectSn
            },
            res => {
                if (res.data.url) {
                    window.location.href = res.data.url;

                    message.success('下载成功');
                } else {
                    message.error('导出失败')
                }
            }
        );
    }

    /**
     * 开始查询
     * @returns {MessageType}
     */
    onSearch = () => {
        const {startTime, endTime, roleType, companySn, projectSn} = this.state;
        this.setState({
            echartsVisi: false
        });
        request(
            Api.BusinessNumStatistics,
            {
                startTime,
                endTime,
                roleType,
                companySn,
                projectSn
            },
            res => {
                this.setState({
                    echartsVisi: true,
                    option: {
                        ...this.state.option,
                        series: [
                            {
                                data: [
                                    {
                                        value: res.data.leaseOrderNum,
                                        itemStyle: {
                                            color: '#5470c6'
                                        }
                                    },
                                    {
                                        value: res.data.leaseDeliveryNum,
                                        itemStyle: {
                                            color: '#91cc75'
                                        }
                                    },
                                    {
                                        value: res.data.leaseEntryNum,
                                        itemStyle: {
                                            color: '#fac858'
                                        }
                                    },
                                    {
                                        value: res.data.leaseExitApplyNum,
                                        itemStyle: {
                                            color: '#ee6666'
                                        }
                                    },
                                    {
                                        value: res.data.leasePreReturnNum,
                                        itemStyle: {
                                            color: '#73c0de'
                                        }
                                    },
                                    {
                                        value: res.data.leaseRecoveryNum,
                                        itemStyle: {
                                            color: '#3ba272'
                                        }
                                    },
                                    {
                                        value: res.data.leaseExitNum,
                                        itemStyle: {
                                            color: '#fc8452'
                                        }
                                    },
                                    {
                                        value: res.data.leaseLossNum,
                                        itemStyle: {
                                            color: '#9a60b4'
                                        }
                                    },
                                    {
                                        value: res.data.leaseReplacementNum,
                                        itemStyle: {
                                            color: '#ea7ccc'
                                        }
                                    },
                                    {
                                        value: res.data.serviceOrderNum,
                                        itemStyle: {
                                            color: '#f6efa6'
                                        }
                                    },
                                ],
                                type: 'bar',
                                label: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                        ]
                    },
                    // leaseOrderNum: res.data.leaseOrderNum,
                    // leaseDeliveryNum: res.data.leaseDeliveryNum,
                    // leaseEntryNum: res.data.leaseEntryNum,
                    // leaseExitApplyNum: res.data.leaseExitApplyNum,
                    // leasePreReturnNum: res.data.leasePreReturnNum,
                    // leaseRecoveryNum: res.data.leaseRecoveryNum,
                    // leaseExitNum: res.data.leaseExitNum,
                    // leaseLossNum: res.data.leaseLossNum,
                    // leaseReplacementNum: res.data.leaseReplacementNum,
                    // serviceOrderNum: res.data.serviceOrderNum,
                });
            }
        );
    }
}

export default OrderData;