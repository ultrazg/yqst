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

const IncomeCharts = React.forwardRef(({timeType}, ref) => {
    const spuRef = React.useRef(null);
    const [spuSelectData, setSpuSelectData] = useState({});
    const [skuVisi, setSkuVisi] = useState(false);
    const skuRef = React.useRef(null);

    useImperativeHandle(ref, () => ({
        reset: () => {
            setSkuVisi(false);
            spuRef.current
            && spuRef.current.getData
            && spuRef.current.getData();
        },
    }));
    return <div style={{display: 'flex', flexDirection: 'row', flexWrap: 'wrap'}}>
        <div>
            <h4>企业物资SPU收入分布</h4>
            <SpuChart ref={spuRef} timeType={timeType} callback={(data) => {
                if (data && data.data) {
                    setSpuSelectData(data.data || {});
                    setTimeout(() => {
                        skuRef.current
                        && skuRef.current.getData
                        && skuRef.current.getData();

                        setSkuVisi(true);
                    }, 1);
                }
            }}/>
        </div>
        {skuVisi ? <div>
            <h4>SPU({spuSelectData.goodsName})的SKU收入分布</h4>
            <SkuChart ref={skuRef} timeType={timeType} spuSelectData={spuSelectData} callback={(data) => {
                if (data && data.data) {
                }
            }}/>
        </div> : null}
    </div>
});
export default IncomeCharts;

const SpuChart = React.forwardRef(({timeType, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(apiInterfaces.erpIncomeSpuList, {
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
                //     count: parseFloat(item.totalIncome),
                // }
                return {
                    ...item,
                    name: item.goodsName,
                    value: parseFloat(item.totalIncome),
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
                },
                textStyle: {fontSize: 12, width: 300},
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
const SkuChart = React.forwardRef(({timeType, spuSelectData = {}, callback}, ref) => {
    const [data, setData] = useState([]);
    const getData = () => {
        request(apiInterfaces.erpIncomeSkuList, {
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
                //     count: parseFloat(item.totalIncome),
                // }
                return {
                    ...item,
                    name: item.specList ? item.specList.map((it, idx) => {
                        return (idx > 0 ? "；" : "") + it.specName + "：" + it.specValue
                    }).join("") : "",
                    value: parseFloat(item.totalIncome),
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
                },
                textStyle: {fontSize: 12, width: 300},
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
