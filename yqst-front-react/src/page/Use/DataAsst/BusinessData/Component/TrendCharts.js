import React, {useState, useEffect, useImperativeHandle} from 'react';
// import {
//     Chart,
//     Interval,
//     Tooltip,
//     Legend,
//     Line
// } from 'bizcharts';
import {List} from 'antd'
import apiInterfaces from "../../apiInterfaces/index";
import request from "../../../../../utils/request/request";
import ReactECharts from "echarts-for-react";

export default function TrendCharts() {
    const [spuVisi, setSpuVisi] = useState(false);
    const [spuSelectData, setSpuSelectData] = useState({});
    const [skuSelectVisi, setSkuSelectVisi] = useState(false);
    const [skuVisi, setSkuVisi] = useState(false);
    const [skuSelectData, setSkuSelectData] = useState({});
    const spuRef = React.useRef(null);
    const skuSelectRef = React.useRef(null);
    const skuRef = React.useRef(null);
    return <div style={{}}>
        <div>
            <h4>企业总毛利走势图</h4>
            <TrendChart callback={(data) => {

            }}/>
        </div>
        <div style={{marginTop: 5}}>
            <h4>SPU毛利走势图</h4>
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
        </div>
        {skuSelectVisi ? <div style={{marginTop: 5}}>
            <h4>SKU毛利走势图</h4>
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
}
const TrendChart = () => {
    const colors = ["#6394f9", "#62daaa"];
    const [data, setData] = useState([]);
    const getData = () => {
        request(apiInterfaces.erpTrendList, {}, (res) => {
            const data = res.data.map((item) => {
                // grossProfit	string	总毛利
                // grossProfitMargin	string	毛利率
                // statisticsTime	string	统计时间
                return {
                    ...item,
                    grossProfit: parseFloat(item.grossProfit),
                    grossProfitMargin: parseFloat(item.grossProfitMargin),
                }
            });
            setData(data)
        }, () => {
        })
    }
    useEffect(() => {
        getData();
    }, []);

    if (data.length == 0) {
        return <h5>暂无数据</h5>
    }
    // return (
    //     <Chart data={data} width={600} height={260} autoFit>
    //         <Legend visible={false}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 return <div>
    //                     <div>{title}</div>
    //                     <div>毛利：{items[0].data.grossProfit}</div>
    //                     <div>毛利率：{items[0].data.grossProfitMargin}</div>
    //                 </div>
    //             }}
    //         </Tooltip>
    //         <Interval position="statisticsTime*grossProfit" color={colors[0]}/>
    //         <Line position="statisticsTime*grossProfitMargin"
    //               color={colors[1]}
    //               size={3}
    //               shape="smooth"/>
    //     </Chart>
    // );
    return <ReactECharts
        style={{width: 760, height: 360}}
        option={{
            legend: {
                show: false
            },
            tooltip: {
                trigger: 'axis',
                textStyle: {fontSize: 12, width: 300},
                formatter: (value) => {
                    return `毛利：${value[0].data}<br/>毛利率：${value[1].data}`
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((item) => item.grossProfit),
                    yAxisIndex: 0,
                },
                {
                    type: 'line',
                    data: data.map((item) => item.grossProfitMargin),
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
                    name: '毛利',
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
                    },
                },
                {
                    type: 'value',
                    name: '毛利率(%)',
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
            }
        }}
    />
}
const SpuSelectList = ({spuSelectData, callback}) => {
    const [dataSource, setDatadSource] = useState([]);
    const getData = () => {
        request(apiInterfaces.erpTrendSpuList, {}, (res) => {
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
        request(apiInterfaces.erpTrendSpuChartsList, {
            goodsSn: spuSelectData.goodsSn || '',
        }, (res) => {
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
    // return (<div style={{marginLeft: 10}}>
    //         <h5>SPU({spuSelectData.goodsName})的走势图</h5>
    //         <Chart data={data} width={560} height={260} autoFit>
    //             <Legend visible={false}/>
    //             <Tooltip showTitle={false}>
    //                 {(title, items) => {
    //                     console.log("Tooltip-=", title, items);
    //                     return <div>
    //                         <div>{title}</div>
    //                         <div>毛利：{items[0].data.grossProfit}</div>
    //                         <div>毛利率：{items[0].data.grossProfitMargin}</div>
    //                     </div>
    //                 }}
    //             </Tooltip>
    //             <Interval position="statisticsTime*grossProfit" color={colors[0]}/>
    //             <Line position="statisticsTime*grossProfitMargin"
    //                   color={colors[1]}
    //                   size={3}
    //                   shape="smooth"/>
    //         </Chart>
    //     </div>
    // );
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
                    return `毛利：${value[0].data}<br/>毛利率：${value[1].data}`
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((item) => item.grossProfit),
                    yAxisIndex: 0,
                },
                {
                    type: 'line',
                    data: data.map((item) => item.grossProfitMargin),
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
                    name: '毛利',
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
                    name: '毛利率(%)',
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
        request(apiInterfaces.erpTrendSkuList, {
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
        request(apiInterfaces.erpTrendSkuChartsList, {
            goodsSn: skuSelectData.goodsSn || '',
        }, (res) => {
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
    // return (<div style={{marginLeft: 10}}>
    //         <h5>SKU({skuSelectData.specList ? skuSelectData.specList.map((it, idx) => {
    //             return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
    //         }) : ""})的走势图</h5>
    //         <Chart data={data} width={560} height={260} autoFit>
    //             <Legend visible={false}/>
    //             <Tooltip showTitle={false}>
    //                 {(title, items) => {
    //                     return <div>
    //                         <div>{title}</div>
    //                         <div>毛利：{items[0].data.grossProfit}</div>
    //                         <div>毛利率：{items[0].data.grossProfitMargin}</div>
    //                     </div>
    //                 }}
    //             </Tooltip>
    //             <Interval position="statisticsTime*grossProfit" color={colors[0]}/>
    //             <Line position="statisticsTime*grossProfitMargin"
    //                   color={colors[1]}
    //                   size={3}
    //                   shape="smooth"/>
    //         </Chart>
    //     </div>
    // );
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
                    return `毛利：${value[0].data}<br/>毛利率：${value[1].data}`
                }
            },
            series: [
                {
                    type: 'bar',
                    data: data.map((item) => item.grossProfit),
                    yAxisIndex: 0,
                },
                {
                    type: 'line',
                    data: data.map((item) => item.grossProfitMargin),
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
                    name: '毛利',
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
                    name: '毛利率(%)',
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
