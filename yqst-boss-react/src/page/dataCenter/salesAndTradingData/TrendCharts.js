import React, {useState, useEffect, useImperativeHandle} from 'react'
import request from '../../../utils/request/request';
import Api from "../Api";
import ReactECharts from 'echarts-for-react';
import {Modal, List} from "antd";

const TrendCharts = React.forwardRef(({timeType}, ref) => {
    const [spuVisi, setSpuVisi] = useState(false);
    const [spuSelectData, setSpuSelectData] = useState({});
    const [skuSelectVisi, setSkuSelectVisi] = useState(false);
    const [skuVisi, setSkuVisi] = useState(false);
    const [skuSelectData, setSkuSelectData] = useState({});
    const spuRef = React.useRef(null);
    const skuSelectRef = React.useRef(null);
    const skuRef = React.useRef(null);

    return <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <div>
            <h4>钢管需求增量对比走势</h4>
            <div style={{display: 'flex', minWidth: 360}}>
                <SpuSelectList
                    spuSelectData={spuSelectData}
                    callback={(data) => {
                        setSpuSelectData(data);
                        setTimeout(() => {
                            setSpuVisi(true);
                            spuRef.current
                            && spuRef.current.getData
                            && spuRef.current.getData();
                            //sku select
                            setSkuSelectVisi(true);
                            skuSelectRef.current
                            && skuSelectRef.current.getData
                            && skuSelectRef.current.getData();
                            setSkuVisi(false);
                        }, 1);
                    }}/>
                {spuVisi ? <SpuChart
                    ref={spuRef}
                    spuSelectData={spuSelectData}
                /> : null}
            </div>
            {skuSelectVisi ? <div style={{marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 360}}>
                    <SkuSelectList
                        ref={skuSelectRef}
                        spuSelectData={spuSelectData}
                        skuSelectData={skuSelectData}
                        callback={(data) => {
                            setSkuSelectData(data);
                            setTimeout(() => {
                                setSkuVisi(true)
                                skuRef.current
                                && skuRef.current.getData
                                && skuRef.current.getData();
                            }, 1);
                        }}/>
                    {skuVisi ? <SkuChart
                        ref={skuRef}
                        skuSelectData={skuSelectData}
                    /> : null}
                </div>
            </div> : null}
        </div>
    </div>
});
export default TrendCharts;

const SpuSelectList = ({spuSelectData, callback}) => {
    const [dataSource, setDatadSource] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSelectSpuList, {}, (res) => {
            // goodsSn	string	物资sn
            // goodsCode	string	物资编码
            // goodsName	string	物资名称
            // goodsUnit	string	物资单位
            setDatadSource(res.data)
        }, () => {
        })
    }
    useEffect(() => {
        getData();
    }, [])
    return <div>
        <h5>选择SPU</h5>
        <div style={{minHeight: 320, maxHeight: 380, overflow: "auto"}}>
            <List style={{width: 200}}
                  bordered size="small"
                  dataSource={dataSource}
                  renderItem={item => (
                      <List.Item
                          key={item.goodsSn}
                          title={item.goodsName}
                          style={{
                              cursor: 'pointer',
                              whiteSpace: 'normal',
                              wordBreak: 'break-all',
                              wordWrap: 'break-word',
                              backgroundColor: spuSelectData.goodsSn == item.goodsSn ?
                                  '#e8e8e8' : 'transparent'
                          }}
                          onClick={() => {
                              callback && callback(item);
                          }}>{item.goodsName}</List.Item>
                  )}
            />
        </div>
    </div>
}
const SpuChart = React.forwardRef(({spuSelectData, callback}, ref) => {
    const colors = ["#6394f9", "#62daaa"];
    const [data, setData] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSpuTrendList, {
            goodsSn: spuSelectData.goodsSn || '',
        }, (res) => {
            // statisticsTime	string	统计时间
            // growthQuantity	double	出租增长量
            // monthOnMonthGrowthRate	double	环比增长率
            setData(res.data)
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
        style={{width: 600, height: 360}}
        option={{
            legend: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {fontSize: 12, width: 300},
                formatter: (value) => {
                    return `出租增长量：${value[0].data}<br/>环比增长率：${value[1].data}`
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((item) => item.growthQuantity),
                    yAxisIndex: 0,
                },
                {
                    type: 'line',
                    data: data.map((item) => item.monthOnMonthGrowthRate),
                    yAxisIndex: 1,
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.map((item) => item.statisticsTime),
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '出租增长量',
                    axisLabel: {
                        formatter: (value) => {
                            let flag = false;
                            if (value < 0) {
                                flag = true;
                                value = Math.abs(value);
                            }
                            if (value >= 10000 * 10000 * 10000 * 10000) {
                                return (value / (10000 * 10000 * 10000 * 10000))
                                    * (flag ? -1 : 1) + '万万亿'
                            } else if (value >= 10000 * 10000 * 10000) {
                                return (value / (10000 * 10000 * 10000))
                                    * (flag ? -1 : 1) + '万亿'
                            } else if (value >= 10000 * 10000) {
                                return (value / (10000 * 10000))
                                    * (flag ? -1 : 1) + '亿'
                            } else if (value >= 10000)
                                return (value / 10000)
                                    * (flag ? -1 : 1) + '万'
                            else
                                return value * (flag ? -1 : 1)
                        }
                    }
                },
                {
                    type: 'value',
                    name: '环比增长率(%)',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],

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
const SkuSelectList = React.forwardRef(({spuSelectData, skuSelectData, callback}, ref) => {
    const [dataSource, setDatadSource] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSelectSkuList, {
            goodsSn: spuSelectData.goodsSn
        }, (res) => {
            // goodsSn	string	物资sn
            // goodsCode	string	物资编码
            // goodsName	string	物资名称
            // goodsUnit	string	物资单位
            setDatadSource(res.data)
        }, () => {
        })
    }
    useEffect(() => {
        getData();
    }, []);
    useImperativeHandle(ref, () => ({
        getData: () => {
            getData()
        },
    }));
    return <div>
        <h5>选择SKU</h5>
        <div style={{minHeight: 320, maxHeight: 380, overflow: "auto"}}>
            <List style={{width: 200}}
                  bordered size="small"
                  dataSource={dataSource}
                  renderItem={item => (
                      <List.Item
                          key={item.goodsSn}
                          title={item.specList ? item.specList.map((it, idx) => {
                              return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                          }) : ""}
                          style={{
                              cursor: 'pointer',
                              whiteSpace: 'normal',
                              wordBreak: 'break-all',
                              wordWrap: 'break-word',
                              backgroundColor: skuSelectData.goodsSn == item.goodsSn ?
                                  '#e8e8e8' : 'transparent'
                          }}
                          onClick={() => {
                              callback && callback(item);
                          }}>
                          {item.specList ? item.specList.map((it, idx) => {
                              return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                          }) : ""}
                      </List.Item>
                  )}
            />
        </div>
    </div>
});
const SkuChart = React.forwardRef(({skuSelectData, callback}, ref) => {
    const colors = ["#6394f9", "#62daaa"];
    const [data, setData] = useState([]);
    const getData = () => {
        request(Api.salesAndTradingDataSkuTrendList, {
            goodsSn: skuSelectData.goodsSn || '',
        }, (res) => {
            // statisticsTime	string	统计时间
            // growthQuantity	double	出租增长量
            // monthOnMonthGrowthRate	double	环比增长率
            setData(res.data)
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
        style={{width: 600, height: 360}}
        option={{
            legend: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {fontSize: 12, width: 300},
                formatter: (value) => {
                    return `出租增长量：${value[0].data}<br/>环比增长率：${value[1].data}`
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((item) => item.growthQuantity),
                    yAxisIndex: 0,
                },
                {
                    type: 'line',
                    data: data.map((item) => item.monthOnMonthGrowthRate),
                    yAxisIndex: 1,
                }
            ],
            xAxis: [
                {
                    type: 'category',
                    data: data.map((item) => item.statisticsTime),
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '出租增长量',
                    axisLabel: {
                        formatter: (value) => {
                            let flag = false;
                            if (value < 0) {
                                flag = true;
                                value = Math.abs(value);
                            }
                            if (value >= 10000 * 10000 * 10000 * 10000) {
                                return (value / (10000 * 10000 * 10000 * 10000))
                                    * (flag ? -1 : 1) + '万万亿'
                            } else if (value >= 10000 * 10000 * 10000) {
                                return (value / (10000 * 10000 * 10000))
                                    * (flag ? -1 : 1) + '万亿'
                            } else if (value >= 10000 * 10000) {
                                return (value / (10000 * 10000))
                                    * (flag ? -1 : 1) + '亿'
                            } else if (value >= 10000)
                                return (value / 10000)
                                    * (flag ? -1 : 1) + '万'
                            else
                                return value * (flag ? -1 : 1)
                        }
                    }
                },
                {
                    type: 'value',
                    name: '环比增长率(%)',
                    axisLabel: {
                        formatter: '{value}'
                    }
                }
            ],

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
