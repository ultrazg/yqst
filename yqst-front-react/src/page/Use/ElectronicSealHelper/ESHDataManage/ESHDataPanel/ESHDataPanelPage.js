import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Row,
    Col,
    DatePicker,
} from 'antd';
import Model from '../Model'
import SYCanvas from './SYCanvas';
import FFCanvas from './FFCanvas';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

const {  RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class ESHDataPanelPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tStartTime: moment().subtract(0, 'days').format(dateFormat),
            tEndTime: moment().subtract(0, 'days').format(dateFormat),
            tInfo: {},
            cusList: [],
        };
    }

    componentDidMount(){
        this.openPlatformStatisticsGet();
    }

    componentWillUnmount() {
    }

    render() {
        let {tStartTime, tEndTime, tInfo} = this.state;

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '数据管理'},
                    {title: '数据面板'},
                ]}
                botStyle={{
                    background: 'none',
                    padding: '0px'
                }}
            >
                <Row
                    style={{
                        background: '#fff',
                        marginBottom: '24px',
                        borderRadius: '6px',
                        height: '166px',
                        padding: '24px'
                    }}
                >
                    <Col span={24} style={{marginBottom: '16px'}}>
                        <RangePicker
                            allowClear={false}
                            value={[moment(tStartTime, dateFormat), moment(tEndTime, dateFormat)]}
                            onChange={(date, dateString) => {
                                this.setState({
                                    tStartTime: dateString[0] || null,
                                    tEndTime: dateString[1] || null
                                },() => {this.openPlatformStatisticsGet();});
                            }}
                            disabledDate={this.disabledDate.bind(this)}
                            // disabledTime={this.disabledRangeTime.bind(this)}
                            // showTime={{
                            //     hideDisabledOptions: true,
                            //     // defaultValue: [moment('00:00:00', 'HH:mm:ss'), moment('11:59:59', 'HH:mm:ss')],
                            // }}
                        />
                    </Col>
                    {this.makeStaView('个人实名认证', tInfo.personRealNameAuthNum)}
                    {this.makeStaView('企业实名认证', tInfo.enterpriseRealNameAuthNum)}
                    {this.makeStaView('盖章数', tInfo.sealNum)}
                    {this.makeStaView('付费金额', tInfo.paymentAmount)}
                </Row>
                {/*<SYCanvas/>*/}
                {/*<FFCanvas/>*/}
            </ViewCoat>
        );
    }

    openPlatformStatisticsGet(){
        const {tStartTime, tEndTime} = this.state;
        Model.openPlatformStatisticsGet({
            startTime: tStartTime,
            endTime: tEndTime
        }, (res) => {
            this.setState({tInfo: res.data});
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

    disabledRangeTime(_, type){
        if (type === 'start') {
            return {
                disabledHours: () => this.range(0, 60).splice(4, 20),
                disabledMinutes: () => this.range(30, 60),
                disabledSeconds: () => [55, 56],
            };
        }
        return {
            disabledHours: () => this.range(0, 60).splice(20, 4),
            disabledMinutes: () => this.range(0, 31),
            disabledSeconds: () => [55, 56],
        };
    }

    makeStaView(label = '', val = ''){
        return <Col span={6}>
            <span
                style={{
                    fontSize: '14px',
                    color: 'rgba(43,52,65,0.65)',
                    lineHeight: '20px'
                }}
            >{label}</span>
            <h2 style={{
                fontSize: '30px',
                fontWeight: 500,
                color: '#2B3441',
                lineHeight: '42px',
                margin: '0px'
            }}>{val}</h2>
        </Col>
    }

}

export default ESHDataPanelPage;
