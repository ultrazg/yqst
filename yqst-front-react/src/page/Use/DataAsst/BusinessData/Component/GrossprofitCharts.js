import React, {useState, useEffect, useImperativeHandle} from 'react';
// import {
//     Chart,
//     Interval,
//     Tooltip,
//     Axis,
//     Coordinate,
//     Legend,
//     getTheme
// } from 'bizcharts';
import apiInterfaces from "../../apiInterfaces/index";
import request from "../../../../../utils/request/request";
import ReactECharts from "echarts-for-react";

const GrossprofitCharts = React.forwardRef(({timeType}, ref) => {
    const [data, setData] = useState({
        grossProfit: '',//	string	总毛利
        grossProfitMargin: '',//	string	毛利率
        totalExpenditure: '',//	string	总支出
    });
    const [spuVisi, setSpuVisi] = useState(false);
    const [spuSelectData, setSpuSelectData] = useState({});
    const [spuGrossVisi, setSpuGrossVisi] = useState(false);
    const [skuVisi, setSkuVisi] = useState(false);
    const [skuSelectData, setSkuSelectData] = useState({});
    const skuRef = React.useRef(null);
    const [skuGrossVisi, setSkuGrossVisi] = useState(false);

    const getGrossProfitData = () => {
        request(apiInterfaces.grossprofitChartsIndex, {
            timeType: timeType, //timeType	int	是	时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年
        }, (res) => {
            setData(res.data)
        }, () => {

        })
    }
    useEffect(() => {
        getGrossProfitData();
    }, []);
    useImperativeHandle(ref, () => ({
        reset: () => {
            setSpuVisi(false);
            setSpuGrossVisi(false);
            setSkuVisi(false);
            setSkuGrossVisi(false);
            getGrossProfitData();
        },
    }));

    return <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <div>
            <h4>企业总毛利率{data.grossProfitMargin}%</h4>
            <GrossProfitChart sourceData={data} callback={() => {
                setTimeout(() => {
                    setSpuVisi(true);
                }, 1)
            }}/>
        </div>
        {spuVisi ? <div>
            <h4>SPU毛利分布</h4>
            <SpuChart timeType={timeType} callback={(data) => {
                if (data && data.data) {
                    setSpuSelectData(data.data || {});
                    setTimeout(() => {
                        setSpuGrossVisi(true);
                        // console.log(skuRef, "skuRef.current");
                        skuRef.current
                        && skuRef.current.getData
                        && skuRef.current.getData();

                        setSkuVisi(true);

                        //sku需重新选择
                        setSkuSelectData({});
                        setSkuGrossVisi(false);
                    }, 1);
                }
            }}/>
        </div> : null}
        {spuGrossVisi ? <div>
            <h4>SPU({spuSelectData.goodsName})的毛利率{spuSelectData.grossProfitMargin}%</h4>
            <SpuGrossChart sourceData={spuSelectData} callback={() => {

            }}/>
        </div> : null}
        {skuVisi ? <div>
            <h4>SPU({spuSelectData.goodsName})的SKU分布</h4>
            <SkuChart ref={skuRef} timeType={timeType} spuSelectData={spuSelectData} callback={(data) => {
                if (data && data.data) {
                    setSkuSelectData(data.data || {});
                    setTimeout(() => {
                        setSkuGrossVisi(true);
                    }, 1);
                }
            }}/>
        </div> : null}
        {skuGrossVisi ? <div>
            <h4>SKU({skuSelectData.specList ? skuSelectData.specList.map((it, idx) => {
                return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
            }) : ""})的毛利率{skuSelectData.grossProfitMargin}%</h4>
            <SkuGrossChart sourceData={skuSelectData} callback={() => {

            }}/>
        </div> : null}
    </div>
});
export default GrossprofitCharts;

const GrossProfitChart = ({sourceData, callback}) => {
    // let data = [
    //     {
    //         item: '总毛利',
    //         count: parseFloat(sourceData.grossProfit),
    //         percent: parseFloat(sourceData.grossProfitMargin)
    //     },
    //     {
    //         item: '总支出',
    //         count: parseFloat(sourceData.totalExpenditure),
    //         percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
    //     },
    // ];
    //
    // return (
    //     <Chart width={360} height={180} data={data} autoFit
    //            onClick={(e) => {
    //                callback && callback(e.data);
    //            }}>
    //         <Coordinate type="theta" radius={0.75}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 return `${title}(${items[0].value})`
    //                     + (title == '总毛利' ? ` 毛利率(${items[0].data.percent}%)` : "");
    //             }}
    //         </Tooltip>
    //         <Axis visible={false}/>
    //         <Legend visible={false}/>
    //         <Interval
    //             position="count"
    //             adjust="stack"
    //             color="item"
    //             style={{
    //                 lineWidth: 1,
    //                 stroke: '#fff',
    //             }}
    //             label={['count', {
    //                 content: (data) => {
    //                     return `${data.item}: ${data.count}`;
    //                 },
    //             }]}
    //             state={{
    //                 selected: {
    //                     style: (t) => {
    //                         const res = getTheme().geometries.interval.rect.selected.style(t);
    //                         return {...res}
    //                     }
    //                 }
    //             }}
    //         />
    //         {/*<Interaction type='element-single-selected'/>*/}
    //     </Chart>
    // );

    let data = [
        {
            name: '总毛利',
            value: parseFloat(sourceData.grossProfit),
            percent: parseFloat(sourceData.grossProfitMargin)
        },
        {
            name: '总支出',
            value: parseFloat(sourceData.totalExpenditure),
            percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
        },
    ];

    return <ReactECharts
        style={{width: 360, height: 200}}
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
                callback && callback(e.data);
            }
        }}
    />
}

const SpuChart = React.forwardRef(({timeType, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(apiInterfaces.grossprofitChartsSpuList, {
            timeType: timeType, //timeType	int	是	时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年
        }, (res) => {
            const data = res.data.map((item) => {
                // goodsSn	string	物资sn
                // goodsCode	string	物资编码
                // goodsName	string	物资名称
                // goodsUnit	string	物资单位
                // grossProfit	string	毛利
                // grossProfitMargin	string	毛利率
                // totalExpenditure	string	总支出
                // return {
                //     ...item,
                //     item: item.goodsName,
                //     count: parseFloat(item.grossProfit),
                // }
                return {
                    ...item,
                    name: item.goodsName,
                    value: parseFloat(item.grossProfit),
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
    // return (
    //     <Chart width={360} height={180} data={data} autoFit
    //            onClick={(e) => {
    //                callback && callback(e.data);
    //            }}>
    //         <Coordinate type="theta" radius={0.75}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 // console.log(title, items, "Tooltip");
    //                 // items 是个数组，即被触发tooltip的数据。
    //                 // 获取items的颜色
    //                 // const color = items[0].color;
    //                 return `${title}:${items[0].value}`;
    //             }}
    //         </Tooltip>
    //         <Axis visible={false}/>
    //         <Legend visible={false}/>
    //         <Interval
    //             position="count"
    //             adjust="stack"
    //             color="item"
    //             style={{
    //                 lineWidth: 1,
    //                 stroke: '#fff',
    //             }}
    //             label={['count', {
    //                 content: (data) => {
    //                     return `${data.item}: ${data.count}`;
    //                 },
    //             }]}
    //             state={{
    //                 selected: {
    //                     style: (t) => {
    //                         const res = getTheme().geometries.interval.rect.selected.style(t);
    //                         return {...res}
    //                     }
    //                 }
    //             }}
    //         />
    //         {/*<Interaction type='element-single-selected'/>*/}
    //     </Chart>
    // );
    return <ReactECharts
        style={{width: 360, height: 200}}
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
                console.log(e.data, "sssee");
                callback && callback(e);
            }
        }}
    />
});
const SpuGrossChart = ({sourceData = {}, callback}) => {
    // const data = [
    //     {
    //         item: '总毛利',
    //         count: parseFloat(sourceData.grossProfit),
    //         percent: parseFloat(sourceData.grossProfitMargin)
    //     },
    //     {
    //         item: '总支出',
    //         count: parseFloat(sourceData.totalExpenditure),
    //         percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
    //     },
    // ];
    //
    // return (
    //     <Chart width={360} height={180} data={data} autoFit
    //            onClick={(e) => {
    //                callback && callback(e.data);
    //            }}>
    //         <Coordinate type="theta" radius={0.75}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 return `${title}(${items[0].value})`
    //                     + (title == '总毛利' ? ` 毛利率(${items[0].data.percent}%)` : "");
    //             }}
    //         </Tooltip>
    //         <Axis visible={false}/>
    //         <Legend visible={false}/>
    //         <Interval
    //             position="count"
    //             adjust="stack"
    //             color="item"
    //             style={{
    //                 lineWidth: 1,
    //                 stroke: '#fff',
    //             }}
    //             label={['count', {
    //                 content: (data) => {
    //                     return `${data.item}: ${data.count}`;
    //                 },
    //             }]}
    //             state={{
    //                 selected: {
    //                     style: (t) => {
    //                         const res = getTheme().geometries.interval.rect.selected.style(t);
    //                         return {...res}
    //                     }
    //                 }
    //             }}
    //         />
    //         {/*<Interaction type='element-single-selected'/>*/}
    //     </Chart>
    // );
    let data = [
        {
            name: '总毛利',
            value: parseFloat(sourceData.grossProfit),
            percent: parseFloat(sourceData.grossProfitMargin)
        },
        {
            name: '总支出',
            value: parseFloat(sourceData.totalExpenditure),
            percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
        },
    ];
    return <ReactECharts
        style={{width: 360, height: 200}}
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
}
const SkuChart = React.forwardRef(({timeType, spuSelectData = {}, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(apiInterfaces.grossprofitChartsSkuList, {
            timeType: timeType, //timeType	int	是	时间类型 1.本月 2.上月 3.本季 4.上季 5.本年 6.去年
            goodsSn: spuSelectData.goodsSn || '',
        }, (res) => {
            const data = res.data.map((item) => {
                // goodsSn	string	物资sn
                // goodsCode	string	物资编码
                // goodsName	string	物资名称
                // goodsUnit	string	物资单位
                // grossProfit	string	毛利
                // grossProfitMargin	string	毛利率
                // totalExpenditure	string	总支出
                // return {
                //     ...item,
                //     item: item.specList ? item.specList.map((it, idx) => {
                //         return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                //     }) : "",
                //     count: parseFloat(item.grossProfit),
                // }
                return {
                    ...item,
                    name: item.specList ? item.specList.map((it, idx) => {
                        return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                    }).join("") : "",
                    value: parseFloat(item.grossProfit),
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
    // return (
    //     <Chart width={360} height={180} data={data} autoFit
    //            onClick={(e) => {
    //                callback && callback(e.data);
    //            }}>
    //         <Coordinate type="theta" radius={0.75}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 // console.log(title, items, "Tooltip");
    //                 // items 是个数组，即被触发tooltip的数据。
    //                 // 获取items的颜色
    //                 // const color = items[0].color;
    //                 return `${title}(${items[0].value})`;
    //             }}
    //         </Tooltip>
    //         <Axis visible={false}/>
    //         <Legend visible={false}/>
    //         <Interval
    //             position="count"
    //             adjust="stack"
    //             color="item"
    //             style={{
    //                 lineWidth: 1,
    //                 stroke: '#fff',
    //             }}
    //             label={['count', {
    //                 content: (data) => {
    //                     return `${data.item}(${data.count})`;
    //                 },
    //                 style: {fontSize: 10}
    //             }]}
    //             state={{
    //                 selected: {
    //                     style: (t) => {
    //                         const res = getTheme().geometries.interval.rect.selected.style(t);
    //                         return {...res}
    //                     }
    //                 }
    //             }}
    //         />
    //         {/*<Interaction type='element-single-selected'/>*/}
    //     </Chart>
    // );
    return <ReactECharts
        style={{width: 360, height: 200}}
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
const SkuGrossChart = ({sourceData = {}, callback}) => {
    // const data = [
    //     {
    //         item: '总毛利',
    //         count: parseFloat(sourceData.grossProfit),
    //         percent: parseFloat(sourceData.grossProfitMargin)
    //     },
    //     {
    //         item: '总支出',
    //         count: parseFloat(sourceData.totalExpenditure),
    //         percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
    //     },
    // ];

    // return (
    //     <Chart width={360} height={180} data={data} autoFit
    //            onClick={(e) => {
    //                callback && callback(e.data);
    //            }}>
    //         <Coordinate type="theta" radius={0.75}/>
    //         <Tooltip showTitle={false}>
    //             {(title, items) => {
    //                 return `${title}(${items[0].value})`
    //                     + (title == '总毛利' ? ` 毛利率(${items[0].data.percent}%)` : "");
    //             }}
    //         </Tooltip>
    //         <Axis visible={false}/>
    //         <Legend visible={false}/>
    //         <Interval
    //             position="count"
    //             adjust="stack"
    //             color="item"
    //             style={{
    //                 lineWidth: 1,
    //                 stroke: '#fff',
    //             }}
    //             label={['count', {
    //                 content: (data) => {
    //                     return `${data.item}: ${data.count}`;
    //                 },
    //             }]}
    //             state={{
    //                 selected: {
    //                     style: (t) => {
    //                         const res = getTheme().geometries.interval.rect.selected.style(t);
    //                         return {...res}
    //                     }
    //                 }
    //             }}
    //         />
    //         {/*<Interaction type='element-single-selected'/>*/}
    //     </Chart>
    // );

    let data = [
        {
            name: '总毛利',
            value: parseFloat(sourceData.grossProfit),
            percent: parseFloat(sourceData.grossProfitMargin)
        },
        {
            name: '总支出',
            value: parseFloat(sourceData.totalExpenditure),
            percent: 100.00 - parseFloat(sourceData.grossProfitMargin)
        },
    ];
    return <ReactECharts
        style={{width: 360, height: 200}}
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
}
