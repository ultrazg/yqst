import React, {useState, useRef} from 'react'
import {Radio} from 'antd'
import useStateCallback from "../../../utils/hooks/useStateCallback";
import DistributionCharts from './DistributionCharts'
import TrendCharts from './TrendCharts'
import ViewContent from "../../../baseview/viewContent/ViewContent";

export default function SalesAndTradingData() {
    const [timeType, setTimeType] = useStateCallback(1);
    const DistributionChartsRef = useRef(null);
    const TrendChartsRef = useRef(null);
    return <ViewContent
        crumb={[{name: '数据中心'}, {name: "销售需求与交易量"}]}>
        <div style={{padding: 10}}>
            <Radio.Group value={timeType} onChange={(e) => {
                //	时间类型 1.近一年 2.近三年 3.近一季度 4.近一个月
                setTimeType(e.target.value, (state) => {
                    DistributionChartsRef.current
                    && DistributionChartsRef.current.getData
                    && DistributionChartsRef.current.getData();
                })
            }}>
                <Radio.Button value={1}>近一年</Radio.Button>
                <Radio.Button value={2}>近三年</Radio.Button>
                <Radio.Button value={3}>近一季度</Radio.Button>
                <Radio.Button value={4}>近一个月</Radio.Button>
            </Radio.Group>
            <div style={{border: "1px solid rgba(43, 52, 65, 0.25)", padding: 10, marginTop: 10}}>
                <DistributionCharts ref={DistributionChartsRef} timeType={timeType}/>
            </div>
            <div style={{border: "1px solid rgba(43, 52, 65, 0.25)", padding: 10, marginTop: 10}}>
                <TrendCharts ref={TrendChartsRef} timeType={timeType}/>
            </div>
        </div>
    </ViewContent>
}
