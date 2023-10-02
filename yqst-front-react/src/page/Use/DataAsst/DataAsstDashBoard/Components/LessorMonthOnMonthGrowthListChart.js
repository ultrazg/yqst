/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 月度出租物资增量环比
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-25 12:05:39
 * @LastEditTime : 2021-06-01 15:02:58
 */
import React, {useRef, useState, useCallback, memo} from "react";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import styles from "../../DataAsst.module.css";
import ChartChangeModal from "./ChartChangeModal";
import {cloneDeep} from "lodash";
import Charts from "./Charts";
import baseOptions from "./baseOptions";

const BASEOPTIONS = baseOptions.LessorMonthOnMonthGrowthListChart;

export default memo(function LessorMonthOnMonthGrowthListChart({height, data}) {
  const [lessorMonthOnMonthGrowthList, setLessorMonthOnMonthGrowthList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusText = useRef("默认");
  const lessorMonthOnMonthGrowthListChartIns = useRef();

  const requestLessorMonthOnMonthGrowthList = useCallback((kindId, {categorySn, leaseGoodsSn, leaseGoodsParentSn}) => {
    request(
      apiInterfaces.lessorMonthOnMonthGrowthList,
      {
        kindId,
        categorySn,
        leaseGoodsParentSn,
        leaseGoodsSn,
      },
      (res) => {
        setLessorMonthOnMonthGrowthList(res.data);
      },
      (err) => {
        console.warn(err);
      },
    );
  }, []);

  const _onCancel = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const _onReset = useCallback(() => {
    statusText.current = "默认";
    setLessorMonthOnMonthGrowthList(null);
    // setIsModalVisible(false);
  }, []);

  const _onConfirm = useCallback((values) => {
    switch (values.kind.value) {
      case 1:
        // 物资分类
        statusText.current = values.kind.label + "-" + values.category.label;
        requestLessorMonthOnMonthGrowthList(1, {categorySn: values.category.value});
        break;
      case 2:
        // SPU
        statusText.current = values.kind.label + "-" + values.SPU.label + "-" + values.SPU.value;
        requestLessorMonthOnMonthGrowthList(2, {leaseGoodsParentSn: values.SPU.value});
        break;
      case 3:
        // SKU
        statusText.current = values.kind.label + "-" + values.SKU.label + "-" + values.SKU.value;
        requestLessorMonthOnMonthGrowthList(3, {leaseGoodsSn: values.SKU.value});
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  }, [requestLessorMonthOnMonthGrowthList]);

  const dataMap = data => {
    const monthArr = [];
    const growthQuantityArr = [];
    const monthOnMonthGrowthRateArr = [];

    data.map(item => {
      // 月份，出租增长量，环比增长率
      const {month, growthQuantity, monthOnMonthGrowthRate} = item;
      monthArr.push(month + '月');
      growthQuantityArr.push(growthQuantity);
      monthOnMonthGrowthRateArr.push(monthOnMonthGrowthRate);
    })

    BASEOPTIONS.xAxis[0].data = monthArr;
    BASEOPTIONS.series[0].data = growthQuantityArr;
    BASEOPTIONS.series[1].data = monthOnMonthGrowthRateArr;

    return BASEOPTIONS;
  }

  // 对数据进行变换
  const transform = useCallback((data) => {
    if (!data) {
      return [];
    }

    return dataMap(data);

    // const rows = new View().source(data)
    //   .transform({
    //     type: "map",
    //     callback(row) {
    //       row.month = row.month + "月";
    //       return row;
    //     }
    //   })
    //   .transform({
    //     type: "rename",
    //     map: {
    //       growthQuantity: "出租增长量",
    //       monthOnMonthGrowthRate: "环比增长率",
    //       month: "月份",
    //     }
    //   })
    //   .rows;
    // return rows;
  }, []);

  const _onLegendChange = useCallback(
    (ev) => {
      const item = ev.item;
      const value = item.value;
      const checked = !item.unchecked;
      const geoms = lessorMonthOnMonthGrowthListChartIns.current.geometries;

      for (let i = 0; i < geoms.length; i++) {
        const geom = geoms[i];

        if (geom.getYScale().field === value) {
          if (checked) {
            geom.show();
          } else {
            geom.hide();
          }
        }
      }
    }, []
  );

  return (
    <>
      <div className={styles.indexTitle}>
        <h2 className={styles.indexH2}>月度出租物资增量环比</h2>
        <a
          className={styles.indexbutton}
          onClick={
            () => {
              setIsModalVisible(true);
            }
          }
        >调整</a>
      </div>
      <p>当前：{statusText.current}</p>
      {/*<Chart*/}
      {/*  data={transform(lessorMonthOnMonthGrowthList || data)}*/}
      {/*  padding="auto"*/}
      {/*  autoFit*/}
      {/*  height={height}*/}
      {/*  onGetG2Instance={*/}
      {/*    (chartIns) => {*/}
      {/*      lessorMonthOnMonthGrowthListChartIns.current = chartIns;*/}
      {/*    }*/}
      {/*  }*/}
      {/*  scale={{*/}
      {/*    "环比增长率": {*/}
      {/*      alias: "环比增长率(%)",*/}
      {/*      type: "linear",*/}
      {/*    },*/}
      {/*    "出租增长量": {*/}
      {/*      type: "linear",*/}
      {/*    },*/}
      {/*  }}*/}
      {/*>*/}
      {/*  <Interval*/}
      {/*    adjust={[*/}
      {/*      {*/}
      {/*        type: "dodge",*/}
      {/*        marginRatio: 0,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    color="#6394f9"*/}
      {/*    position="月份*出租增长量"*/}
      {/*  />*/}
      {/*  <Line*/}
      {/*    position="月份*环比增长率"*/}
      {/*    size={3}*/}
      {/*    color="#62daaa"*/}
      {/*    shape="smooth"*/}
      {/*  />*/}
      {/*  <Point*/}
      {/*    position="月份*环比增长率"*/}
      {/*    size={3}*/}
      {/*    color="#62daaa"*/}
      {/*    shape="circle"*/}
      {/*  />*/}
      {/*  <Tooltip shared/>*/}
      {/*  <Interaction type="active-region"/>*/}
      {/*  <Axis name="月份" title={{position: "end"}}/>*/}
      {/*  <Axis name="出租增长量" title={{position: "end"}}/>*/}
      {/*  <Axis name="环比增长率" title={{position: "end"}}/>*/}
      {/*  <Legend*/}
      {/*    custom={true}*/}
      {/*    allowAllCanceled={true}*/}
      {/*    items={[*/}
      {/*      {*/}
      {/*        value: "出租增长量",*/}
      {/*        name: "出租增长量",*/}
      {/*        marker: {*/}
      {/*          symbol: "square",*/}
      {/*          style: {fill: "#6394f9", r: 5},*/}
      {/*        },*/}
      {/*      },*/}
      {/*      {*/}
      {/*        value: "环比增长率",*/}
      {/*        name: "环比增长率",*/}
      {/*        marker: {*/}
      {/*          symbol: "hyphen",*/}
      {/*          style: {stroke: "#62daaa", r: 5, lineWidth: 3},*/}
      {/*        },*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    onChange={_onLegendChange}*/}
      {/*  />*/}
      {/*</Chart>*/}
      <Charts
        height={height}
        options={cloneDeep(transform(lessorMonthOnMonthGrowthList || data))}
      />
      <ChartChangeModal
        visible={isModalVisible}
        title="月度出租物资增量环比"
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onReset={_onReset}
      />
    </>
  );
});
