import React, {Component} from 'react';
import {Card, DatePicker, Select} from "antd";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import moment from "moment";
import Model from "../Model";
import './ESDataTemplate.css'

const {RangePicker} = DatePicker;
const {Option} = Select;

export default class ESDataTemplate extends Component {

    constructor(props) {
        super(props);
        this.state = {

            dataForToday: {
                startTime: moment(new Date(), 'YYYY-MM-DD'),
                endTime: moment(new Date(), 'YYYY-MM-DD'),
                enterpriseRealNameAuthNum: 0,
                paymentAmount: 0,
                personRealNameAuthNum: 0,
                sealNum: 0
            },

            // 筛选条件： 平台列表
            platformOptions: [],
            // 筛选条件: 服务列表
            serviceOptions: [],

            // 使用数据
            dataForUse: {
                platformSn: '',
                companySn: '',
                serviceSn: '',
                startTime: moment(new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), 'YYYY-MM-DD'),
                endTime: moment(new Date(), 'YYYY-MM-DD'),
                customerOption: []
            },
            useList: [],

            // 付费数据
            dataForPay: {
                platformSn: '',
                companySn: '',
                startTime: moment(new Date(Date.now() - (7 * 24 * 60 * 60 * 1000)), 'YYYY-MM-DD'),
                endTime: moment(new Date(), 'YYYY-MM-DD'),
                customerOption: []
            },
            payList: []

        };
    }


    // 获取平台数据
    getPlatformDataStatistics = ()=>{
        let {startTime, endTime} = this.state.dataForToday;
        Model.GetPlatformDataStatistics({
            startTime,
            endTime
        }, res=> {
            this.setState({
                dataForToday: res.data
            })
        })
    };

    // 根据平台获取企业列表
    getCustomerList = (platformSn, type)=>{
        Model.GetCustomerList({platformSn}, res=>{
            if(type === 'dataForUse'){
                const {dataForUse} = this.state;
                dataForUse.customerOption = res.data;
                dataForUse.companySn = '';
                this.setState({
                    dataForUse
                }, ()=>{
                    this.getUseDateList();
                })
            }else if(type === 'dataForPay'){
                const {dataForPay} = this.state;
                dataForPay.customerOption = res.data;
                dataForPay.companySn = '';
                this.setState({
                    dataForPay
                }, ()=>{
                    this.getPayDateList();
                })
            }else {
                const {dataForUse, dataForPay} = this.state;
                dataForUse.customerOption = res.data;
                dataForPay.customerOption = res.data;
                dataForUse.companySn = '';
                dataForPay.companySn = '';
                this.setState({
                    dataForUse,
                    dataForPay
                }, ()=>{
                    this.getUseDateList();
                    this.getPayDateList();
                })
            }
        })
    };

    // 获取终端企业使用数据
    getUseDateList = ()=>{
        const {platformSn, companySn, serviceSn, startTime, endTime} = this.state.dataForUse;
        Model.GetUseDateList({
            platformSn,
            companySn,
            serviceSn,
            startTime,
            endTime
        }, res=>{
            this.setState({
                useList: res.data
            })
        })
    };

    // 获取终端企业付费数据
    getPayDateList = ()=>{
        let {platformSn, companySn, startTime, endTime} = this.state.dataForPay;
        Model.GetPayDateList({
            platformSn,
            companySn,
            startTime,
            endTime
        }, res=>{
            this.setState({
                payList: res.data
            })

        })
    };

    componentDidMount() {
        const {startTime, endTime} = this.state.dataForToday;
        this.getPlatformDataStatistics({
            startTime,
            endTime
        });

        Model.GetPlatformList({}, res=>{
            const platformOptions = res.data;
            const {dataForUse, dataForPay} = this.state;
            this.setState({
                platformOptions,
                dataForUse: {
                    ...dataForUse,
                    platformSn: platformOptions[0].platformSn
                },
                dataForPay: {
                    ...dataForPay,
                    platformSn: platformOptions[0].platformSn
                },
            }, ()=>{
                this.getCustomerList(this.state.platformOptions[0].platformSn);
            })
        });

        Model.GetServiceList({}, res=>{
            const serviceOptions = res.data;
            this.setState({
                serviceOptions
            })
        })
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "数据管理"}, {name: "数据看板"}]}
            >
                {this.todayDataView()}
                {this.useDataView()}
                {this.payDataView()}
            </TabsViewContent>
        )
    }

    disabledDate(current) {
        return current && current > moment().endOf("day");
    }

    todayDataView = ()=> {
        let {dataForToday} = this.state;
        const {startTime, endTime, enterpriseRealNameAuthNum, paymentAmount, personRealNameAuthNum, sealNum} = dataForToday;
        const rangeTime = startTime && endTime ? [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')] : null;
        const rangePicker = (
                <RangePicker
                    value={rangeTime}
                    onChange={(dates, dateStrings)=>{
                        dataForToday.startTime = dateStrings[0];
                        dataForToday.endTime = dateStrings[1];
                        this.setState({
                            dataForToday
                        }, ()=>{
                            this.getPlatformDataStatistics();
                        })
                    }}
                    disabledDate={this.disabledDate}
                />
            )
        return (
            <Card title="今日数据" extra={rangePicker} style={{position: 'relative', paddingBottom: 30}}>
                <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
                    <div style={{width: '21%', borderRadius: 15, border: '1px solid rgba(0,0,0,.3)'}}>
                        <p style={{padding: '10px 0', textAlign: 'center'}}>个人实名认证</p>
                        <p style={{padding: '8px 0', textAlign: 'center'}}>{personRealNameAuthNum}</p>
                    </div>

                    <div style={{width: '21%', borderRadius: 15, border: '1px solid rgba(0,0,0,.3)'}}>
                        <p style={{padding: '10px 0', textAlign: 'center'}}>企业实名认证</p>
                        <p style={{padding: '8px 0', textAlign: 'center'}}>{enterpriseRealNameAuthNum}</p>
                    </div>

                    <div style={{width: '21%', borderRadius: 15, border: '1px solid rgba(0,0,0,.3)'}}>
                        <p style={{padding: '10px 0', textAlign: 'center'}}>盖章数</p>
                        <p style={{padding: '8px 0', textAlign: 'center'}}>{sealNum}</p>
                    </div>

                    <div style={{width: '21%', borderRadius: 15, border: '1px solid rgba(0,0,0,.3)'}}>
                        <p style={{padding: '10px 0', textAlign: 'center'}}>充值金额</p>
                        <p style={{padding: '8px 0', textAlign: 'center'}}>{paymentAmount}</p>
                    </div>
                </div>

                <p style={{position: 'absolute', left: '5%', bottom: 0}}>注：认证次数为认证使用次数，非认证成功次数</p>
            </Card>
        )
    };

    useDataView = ()=> {
        const {platformOptions, serviceOptions, dataForUse} = this.state;
        const {platformSn, companySn, serviceSn, startTime, endTime, customerOption} = dataForUse;
        const rangeTime = startTime && endTime ? [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')] : null;
        return (
            <Card title='终端企业使用数据' style={{marginTop: 30}}>
                {/*筛选条件区域*/}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {/*左边三个select*/}
                    <div style={{display: 'flex'}}>
                        <Select
                            value={platformSn}
                            onChange={(value)=>{
                                dataForUse.platformSn = value;
                                this.setState({
                                    dataForUse
                                }, ()=>{
                                    // 更换企业列表，再获取使用数据
                                    this.getCustomerList(value, 'dataForUse')
                                })
                            }}
                            style={{width: 180}}
                        >
                            {
                                platformOptions.map(item=>{
                                    return (
                                        <Option key={item.platformSn} value={item.platformSn}>{item.platformName}</Option>
                                    )
                                })
                            }
                        </Select>

                        <Select value={companySn} style={{marginLeft: 18, width: 180}} onChange={(value)=>{
                            dataForUse.companySn = value;
                            this.setState({
                                dataForUse
                            }, ()=>{
                                this.getUseDateList()
                            })
                        }}>
                            <Option key='' value=''>全部</Option>
                            {
                                customerOption.map(item=>{
                                    return <Option key={item.companySn} value={item.companySn}>{item.companyName}</Option>
                                })
                            }
                        </Select>

                        <Select
                            value={serviceSn}
                            style={{marginLeft: 18, width: 180}}
                            onChange={(value)=>{
                                dataForUse.serviceSn = value;
                                this.setState({
                                    dataForUse
                                }, ()=>{
                                    this.getUseDateList()
                                })
                            }}
                        >
                            <Option key='' value=''>全部</Option>
                            {
                                serviceOptions.map(item=>{
                                    return <Option key={item.serviceSn} value={item.serviceSn}>{item.serviceName}</Option>
                                })
                            }
                        </Select>
                    </div>
                    {/*右边时间范围选择器*/}
                    <RangePicker
                        value={rangeTime}
                        onChange={(dates, dateStrings)=>{
                            dataForUse.startTime = dateStrings[0];
                            dataForUse.endTime = dateStrings[1];
                            this.setState({
                                dataForUse
                            }, ()=>{
                                this.getUseDateList()
                            })
                        }}
                        disabledDate={this.disabledDate}
                    />
                </div>


                {/*曲线图*/}
                {/*<div style={{padding: '30px 0 6px'}}>*/}
                {/*    {this.chartView('use')}*/}
                {/*</div>*/}

            </Card>
        )
    };

    payDataView = ()=> {
        const {platformOptions, dataForPay} = this.state;
        const {platformSn, companySn, startTime, endTime, customerOption} = this.state.dataForPay;
        const rangeTime = [moment(startTime, 'YYYY-MM-DD'), moment(endTime, 'YYYY-MM-DD')]
        return (
            <Card title='终端企业付费金额数据' style={{marginTop: 30}}>
                {/*筛选条件区域*/}
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    {/*左边三个select*/}
                    <div style={{display: 'flex'}}>
                        <Select
                            value={platformSn ? platformSn : ''}
                            onChange={(value)=>{
                                dataForPay.platformSn = value;
                                this.setState({
                                    dataForPay
                                }, ()=>{
                                    // 更换企业列表，再获取使用数据
                                    this.getCustomerList(value, 'dataForPay')
                                })
                            }}
                            style={{width: 180}}
                        >
                            {
                                platformOptions.map(item=>{
                                    return (
                                        <Option key={item.platformSn} value={item.platformSn}>{item.platformName}</Option>
                                    )
                                })
                            }
                        </Select>

                        <Select value={companySn} style={{marginLeft: 18, width: 180}} onChange={(value)=>{
                            dataForPay.companySn = value;
                            this.setState({
                                dataForPay
                            }, ()=>{
                                this.getPayDateList()
                            })
                        }}>
                            <Option key='' value=''>全部</Option>
                            {
                                customerOption.map(item=>{
                                    return <Option key={item.companySn} value={item.companySn}>{item.companyName}</Option>
                                })
                            }
                        </Select>

                    </div>
                    {/*右边时间范围选择器*/}
                    <RangePicker
                        value={rangeTime}
                        onChange={(dates, dateStrings)=>{
                            dataForPay.startTime = dateStrings[0];
                            dataForPay.endTime = dateStrings[1];
                            this.setState({
                                dataForPay
                            }, ()=>{
                                this.getPayDateList()
                            })
                        }}
                        disabledDate={this.disabledDate}
                    />
                </div>


                {/*曲线图*/}
                {/*<div style={{padding: '30px 0 6px'}}>*/}
                {/*    {this.chartView('pay')}*/}
                {/*</div>*/}
            </Card>
        )
    };

    // 曲线图
    // chartView = (type)=>{
    //     let data = [];
    //     let max = 0;
    //     let scale = {};
    //     if(type === 'use'){
    //         const {useList} = this.state;
    //         for(let i=0; i<useList.length; i++){
    //             let num = Number(useList[i]['serviceUseNum'] - 0);
    //             if(max < num){
    //                 max = num;
    //             }
    //             data.push({date: useList[i]['statisticsTime'], 次数: num })
    //         }
    //
    //         scale['次数'] = {
    //             min: 0,
    //             max: max * 1.25
    //         }
    //     }else {
    //         const {payList} = this.state;
    //         for(let i=0; i<payList.length; i++){
    //             let num = Number(payList[i]['paymentAmount'] - 0);
    //             if(max < num){
    //                 max = num;
    //             }
    //             data.push({date: payList[i]['statisticsTime'], 金额: num })
    //         }
    //
    //         scale['金额'] = {
    //             min: 0,
    //             max: max * 1.25
    //         }
    //     }
    //
    //
    //     return (
    //         <Chart scale={scale} height={360} data={data} autoFit placeholder padding={[36, 60]}>
    //             <Tooltip showCrosshairs/>
    //             {
    //                 type === 'use' ?
    //                     <Axis name="次数" visible position={'left'} line={{style:{fill: '#e8e8e8', lineWidth: 1}}}/>:
    //                     <Axis name="金额" visible position={'left'} line={{style:{fill: '#e8e8e8', lineWidth: 1}}}/>
    //             }
    //
    //             <Area shape="smooth" position={type === 'use' ? "date*次数" : "date*金额"} />
    //             <Line shape="smooth" position={type === 'use' ? "date*次数" : "date*金额"} />
    //             <Point
    //                 position={type === 'use' ? "date*次数" : "date*金额"}
    //                 label={[
    //                     type === 'use' ? '次数' : '金额',
    //                     (value) => {
    //                         let contentTxt = value ? `${value} ${type === 'use' ? '次' : '元'}` : '';
    //                         return {
    //                             content: contentTxt,
    //                             style: {
    //                                 fill: 'orange'
    //                             },
    //                         };
    //                     }
    //                 ]}
    //             />
    //         </Chart>
    //     );
    //
    //
    //
    // }

}
