/**
 * 经营数据
 */
import React, {useRef} from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import {Radio} from 'antd'
import GrossprofitCharts from './Component/GrossprofitCharts';
import TrendCharts from './Component/TrendCharts';
import IncomeCharts from './Component/IncomeCharts';
import useStateCallback from '../../../../utils/hooks/useStateCallback';

export default function DataAsstBusinessDataIndex() {
    const [timeType, setTimeType] = useStateCallback(1);
    const GrossprofitChartsRef = useRef(null);
    const TrendChartsRef = useRef(null);
    const IncomeChartsRef = useRef(null);

    return (
        <ViewCoat
            breadCrumb={[
                {title: "数据助手"},
                {title: "经营数据"},
            ]}
        >
            {/*timeType	int	是	时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年*/}
            <Radio.Group value={timeType} onChange={(e) => {
                setTimeType(e.target.value, (state) => {
                    GrossprofitChartsRef.current
                    && GrossprofitChartsRef.current.reset
                    && GrossprofitChartsRef.current.reset();

                    // TrendChartsRef.current
                    // && TrendChartsRef.current.reset
                    // && TrendChartsRef.current.reset();

                    IncomeChartsRef.current
                    && IncomeChartsRef.current.reset
                    && IncomeChartsRef.current.reset();
                })
            }}>
                <Radio.Button value={1}>本月</Radio.Button>
                <Radio.Button value={2}>上月</Radio.Button>
                <Radio.Button value={3}>本季</Radio.Button>
                <Radio.Button value={4}>上季</Radio.Button>
                <Radio.Button value={5}>本年</Radio.Button>
                <Radio.Button value={6}>去年</Radio.Button>
            </Radio.Group>
            <div style={{border: "1px solid rgba(43, 52, 65, 0.25)", padding: 10, marginTop: 10}}>
                <GrossprofitCharts ref={GrossprofitChartsRef} timeType={timeType}/>
            </div>
            <div style={{border: "1px solid rgba(43, 52, 65, 0.25)", padding: 10, marginTop: 10}}>
                <TrendCharts timeType={timeType}/>
            </div>
            <div style={{border: "1px solid rgba(43, 52, 65, 0.25)", padding: 10, marginTop: 10}}>
                <IncomeCharts ref={IncomeChartsRef} timeType={timeType}/>
            </div>
        </ViewCoat>
    );
}
