/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 出租进场量-退场量月度走势对比
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-25 14:47:35
 * @LastEditTime : 2021-06-01 12:33:07
 */
import React, {useRef, useState, useCallback, memo} from "react";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import styles from "../../DataAsst.module.css";
import ChartChangeModal from "./ChartChangeModal";
import {cloneDeep} from "lodash";
import baseOptions from "./baseOptions";
import Charts from "./Charts";

const BASEOPTIONS = baseOptions.LessorEntryExitMonthComparisonListChart;

export default memo(function LessorEntryExitMonthComparisonListChart({height, data}) {
  const [lessorEntryExitMonthComparisonList, setLessorEntryExitMonthComparisonList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusText = useRef("默认");

  const requestLessorEntryExitMonthComparisonList = useCallback((kindId, {categorySn, leaseGoodsSn, leaseGoodsParentSn}) => {
    request(
      apiInterfaces.lessorEntryExitMonthComparisonList,
      {
        kindId,
        categorySn,
        leaseGoodsParentSn,
        leaseGoodsSn,
      },
      (res) => {
        setLessorEntryExitMonthComparisonList(res.data);
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
    setLessorEntryExitMonthComparisonList(null);
    // setIsModalVisible(false);
  }, []);

  const _onConfirm = useCallback((values) => {
    switch (values.kind.value) {
      case 1:
        // 物资分类
        statusText.current = values.kind.label + "-" + values.category.label;
        requestLessorEntryExitMonthComparisonList(1, {categorySn: values.category.value});
        break;
      case 2:
        // SPU
        statusText.current = values.kind.label + "-" + values.SPU.label + "-" + values.SPU.value;
        requestLessorEntryExitMonthComparisonList(2, {leaseGoodsParentSn: values.SPU.value});
        break;
      case 3:
        // SKU
        statusText.current = values.kind.label + "-" + values.SKU.label + "-" + values.SKU.value;
        requestLessorEntryExitMonthComparisonList(3, {leaseGoodsSn: values.SKU.value});
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  }, [requestLessorEntryExitMonthComparisonList]);

  const dataMap = data => {
    const monthArr = [];
    const entryQuantityArr = [];
    const exitQuantityArr = [];

    data.map(item => {
      // 月份，出租进场量，出租退场量
      const {month, entryQuantity, exitQuantity} = item;
      monthArr.push(month + '月');
      entryQuantityArr.push(entryQuantity);
      exitQuantityArr.push(exitQuantity);
    })

    BASEOPTIONS.xAxis[0].data = monthArr;
    BASEOPTIONS.series[0].data = entryQuantityArr;
    BASEOPTIONS.series[1].data = exitQuantityArr;

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
    //       entryQuantity: "出租进场量",
    //       exitQuantity: "出租退场量",
    //       month: "月份",
    //     }
    //   })
    //   .transform({
    //     type: "fold",
    //     fields: ["出租进场量", "出租退场量"], // 展开字段集
    //     key: "key",                   // key字段
    //     value: "value",               // value字段
    //     retains: ["月份"]        // 保留字段集，默认为除 fields 以外的所有字段
    //   })
    //   .rows;
    // return rows;
  }, []);

  return (
    <>
      <div className={styles.indexTitle}>
        <h2 className={styles.indexH2}>出租进场量-退场量月度走势对比</h2>
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
      {/*    data={transform(lessorEntryExitMonthComparisonList || data)}*/}
      {/*    padding="auto"*/}
      {/*    scale={{*/}
      {/*        "value": {*/}
      {/*            type: "linear",*/}
      {/*        }*/}
      {/*    }}*/}
      {/*    autoFit*/}
      {/*    height={height}*/}
      {/*>*/}
      {/*    <Interval*/}
      {/*        adjust={[*/}
      {/*            {*/}
      {/*                type: "dodge",*/}
      {/*                marginRatio: 0,*/}
      {/*            },*/}
      {/*        ]}*/}
      {/*        color="key"*/}
      {/*        position="月份*value"*/}
      {/*    />*/}
      {/*    <Axis name="月份" title={{ position: "end" }} />*/}
      {/*    <Tooltip shared />*/}
      {/*    <Interaction type="active-region" />*/}
      {/*</Chart>*/}
      <Charts
        height={height}
        options={cloneDeep(transform(lessorEntryExitMonthComparisonList || data))}
      />
      <ChartChangeModal
        visible={isModalVisible}
        title="出租进场量-退场量月度走势对比"
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onReset={_onReset}
      />
    </>
  );
});
