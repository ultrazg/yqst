import React, {useState, useEffect, useImperativeHandle} from 'react'
import request from '../../../utils/request/request';
import Api from "../Api";
import ReactECharts from 'echarts-for-react';
import {Modal} from "antd";

const DistributionCharts = React.forwardRef(({timeType}, ref) => {
    const [spuSelectData, setSpuSelectData] = useState({});
    const spuRef = React.useRef(null);
    const [skuVisi, setSkuVisi] = useState(false);
    const skuRef = React.useRef(null);

    useImperativeHandle(ref, () => ({
        getData: () => {
            spuRef.current
            && spuRef.current.getData
            && spuRef.current.getData();
            setSpuSelectData({});
            setSkuVisi(false);
        },
    }));
    return <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <div>
            <h4>平台交易量</h4>
            <SpuChart timeType={timeType} ref={spuRef} callback={(data) => {
                if (data && data.data) {
                    setSpuSelectData(data.data || {});
                    setTimeout(() => {
                        skuRef.current
                        && skuRef.current.getData
                        && skuRef.current.getData();

                        setSpuSelectData(data.data);
                        setSkuVisi(true);
                    }, 1);
                }
            }}/>
        </div>
        {skuVisi ? <div>
            <h4>SPU({spuSelectData.goodsName})的SKU分布</h4>
            <SkuChart timeType={timeType} ref={skuRef} spuSelectData={spuSelectData} callback={(data) => {
                if (data && data.data) {
                    Modal.info({content: data.data.name + '：' + data.data.value});
                }
            }}/>
        </div> : null}
    </div>
});
export default DistributionCharts;

const SpuChart = React.forwardRef(({timeType, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSpuList, {
            timeType: timeType, //timeType    int    是    时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年
        }, (res) => {
            const data = res.data.map((item) => {
                return {
                    ...item,
                    name: item.goodsName,
                    value: parseFloat(item.transactionVolume),
                }
            });
            setData(data)
        }, () => {
        })
    }

    useEffect(() => {
        getData();
    }, [])
    useImperativeHandle(ref, () => ({
        getData: () => {
            getData()
        },
    }));

    if (data.length == 0) {
        return <h5>暂无数据</h5>
    }
    return <ReactECharts
        style={{width: 380, height: 200}}
        option={{
            legend: {
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: (data) => {
                    return `${data.name}: ${data.value}`
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: data,
                }
            ]
        }}
        notMerge={true}
        lazyUpdate={true}
        onEvents={{
            'click': (e) => {
                callback && callback(e);
            }
        }}
    />
});
const SkuChart = React.forwardRef(({timeType, spuSelectData, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSkuList, {
            timeType: timeType, //timeType    int    是    时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年
            goodsSn: spuSelectData.goodsSn || '',
        }, (res) => {
            const data = res.data.map((item) => {
                return {
                    ...item,
                    name: item.specList ? item.specList.map((it, idx) => {
                        return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                    }).join("") : "",
                    value: parseFloat(item.transactionVolume),
                }
            });
            setData(data)
        }, () => {
        })
    }

    useEffect(() => {
        getData();
    }, [])
    useImperativeHandle(ref, () => ({
        getData: () => {
            getData()
        },
    }));

    if (data.length == 0) {
        return <h5>暂无数据</h5>
    }
    return <ReactECharts
        style={{width: 380, height: 200}}
        option={{
            legend: {
                show: false
            },
            tooltip: {
                trigger: 'item',
                formatter: (data) => {
                    return `${data.name}: ${data.value}`
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: '50%',
                    data: data,
                }
            ]
        }}
        notMerge={true}
        lazyUpdate={true}
        onEvents={{
            'click': (e) => {
                callback && callback(e);
            }
        }}
    />
});
