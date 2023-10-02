import React, {Component} from 'react';
// import {Chart, Line, Point, Tooltip, Legend, Axis, Area} from 'bizcharts';
import ESHDataPanelPage from "./ESHDataPanelPage";
import {DatePicker, Select, Empty} from "antd";
import Model from '../Model'
import moment from 'moment';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
const { Option } = Select;
const dateFormat = 'YYYY-MM-DD';

class SYCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cusList: [],
            serList: [],
            companySn: '',
            serviceSn: '',
            startTime: moment().subtract(7, 'days').format(dateFormat),
            endTime: moment().subtract(0, 'days').format(dateFormat),
            canvasList: []
        };
    }

    componentDidMount(){
        this.openPlatformCustomerList();
        this.openPlatformStatisticsServiceList();
        this.openSunawServiceList();
    }

    componentWillUnmount() {
    }

    render(){
        const {cusList, companySn, serviceSn, startTime, endTime, serList, canvasList} = this.state;
        let maxNumber = 0;
        const data = canvasList && canvasList.map(item => {
            if(maxNumber < Number(item.val - 0)){
                maxNumber = Number(item.val - 0);
            }
            return {
                date: item.date,
                次数: item.val
            }
        });

        const scale = {
            次数: {
                min: 0,
                max: maxNumber * 1.25
            },
        };

        return <div
            style={{
                height: '302px',
                background: '#fff',
                marginBottom: '24px',
                borderRadius: '6px',
            }}
        >
            <div
                style={{
                    padding: '11px 24px',
                    display: 'flex',
                    borderBottom: '1px solid rgba(43,52,65,0.09)'
                }}
            >
                <h1
                    style={{
                        fontSize: '16px',
                        fontWeight: 500,
                        color: '#2B3441',
                        width: '200px',
                        margin: '0px'
                    }}
                >终端企业使用数据</h1>
                <div
                    style={{
                        flex: 1,
                        textAlign: 'right'
                    }}
                >
                    <Select
                        placeholder={'请选择'}
                        dropdownStyle={{fontSize: '14px'}}
                        value={companySn + ''}
                        style={{ width: 168, marginRight: '16px', fontSize: '14px' }}
                        onChange={(val) => {
                            this.setState({companySn: val}, () => {
                                this.openPlatformStatisticsServiceList();
                            });
                        }}
                    >
                        <Option value={''}>全部</Option>
                        {
                            cusList && cusList.map(item => {
                                return <Option key={item.companySn + ''} value={item.companySn + ''}>
                                    {item.companyName}
                                </Option>
                            })
                        }
                    </Select>
                    <Select
                        placeholder={'请选择'}
                        dropdownStyle={{fontSize: '14px'}}
                        value={serviceSn + ''}
                        style={{ width: 128, marginRight: '16px', fontSize: '14px' }}
                        onChange={(val) => {
                            this.setState({serviceSn: val}, () => {
                                this.openPlatformStatisticsServiceList();
                            });
                        }}
                    >
                        <Option value=''>全部</Option>
                        {
                            serList && serList.map(item => {
                                return <Option key={item.serviceSn + ''} value={item.serviceSn + ''}>
                                    {item.serviceName || ''}
                                </Option>
                            })
                        }
                    </Select>
                    <RangePicker
                        allowClear={false}
                        value={[moment(startTime, dateFormat), moment(endTime, dateFormat)]}
                        onChange={(date, dateString) => {
                            this.setState({
                                startTime: dateString[0] || null,
                                endTime: dateString[1] || null
                            }, () => {this.openPlatformStatisticsServiceList();});
                        }}
                        disabledDate={this.disabledDate.bind(this)}
                    />
                </div>
            </div>
            {/*{*/}
            {/*    canvasList && canvasList.length > 0 ? <Chart scale={scale} height={240} data={data} autoFit placeholder padding={[36, 60]}>*/}
            {/*        <Tooltip showCrosshairs>*/}
            {/*            {(title,items) => {*/}
            {/*                const {name, value} = items[0];*/}
            {/*                return (*/}
            {/*                    <div style={{width: 110, height: 56, display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>*/}
            {/*                        <div style={{margin: 0}}>{title}</div>*/}
            {/*                        <div style={{margin: 0, display: 'flex', alignItems: 'center'}}>*/}
            {/*                            <span style={{display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: '#6698f6'}}/>*/}
            {/*                            <span style={{marginLeft: 8}}>使用{name}：{value}</span>*/}
            {/*                        </div>*/}
            {/*                    </div>*/}
            {/*                )*/}
            {/*            }}*/}
            {/*        </Tooltip>*/}
            {/*        <Axis name="次数" visible position={'left'} line={{style:{fill: '#e8e8e8', lineWidth: 1}}}/>*/}
            {/*        <Area shape="smooth" position={"date*次数"} />*/}
            {/*        <Line shape="smooth" position={"date*次数"} />*/}
            {/*        <Point*/}
            {/*            position={"date*次数"}*/}
            {/*            label={[*/}
            {/*                '次数',*/}
            {/*                (value) => {*/}
            {/*                    let contentTxt = value ? `${value} ${'次'}` : '';*/}
            {/*                    return {*/}
            {/*                        content: contentTxt,*/}
            {/*                        style: {*/}
            {/*                            fill: 'orange',*/}
            {/*                        },*/}
            {/*                    };*/}
            {/*                }*/}
            {/*            ]}*/}
            {/*        />*/}
            {/*    </Chart> : <div style={{marginTop: '60px'}}>*/}
            {/*        <Empty />*/}
            {/*    </div>*/}
            {/*}*/}
        </div>
    }

    openPlatformCustomerList(){
        Model.openPlatformCustomerList({}, (res) => {
            this.setState({cusList: res.data});
        });
    }

    openSunawServiceList(){
        Model.openSunawServiceList({}, (res) => {
            this.setState({serList: res.data});
        });
    }

    openPlatformStatisticsServiceList(){
        const {companySn, serviceSn, startTime, endTime} = this.state;
        Model.openPlatformStatisticsServiceList({
            companySn,
            serviceSn,
            startTime,
            endTime,
        }, (res) => {
            const canvasList = res.data && res.data.map(item => {
                return {
                    ...item,
                    date: item.statisticsTime,
                    label: "使用次数",
                    val: Number(item.serviceUseNum || 0)
                }
            });
            this.setState({canvasList});
        });
    }

    range(start, end){
        const result = [];
        for (let i = start; i < end; i++) {
            result.push(i);
        }
        return result;
    }

    disabledDate(current){
        return current && current > moment().startOf('day');
    }
}

export default SYCanvas;
