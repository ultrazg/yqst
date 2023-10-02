/* eslint-disable jsx-a11y/anchor-is-valid */
/*
 * @Description  : 承租进场量-退场量月度走势对比
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-25 14:47:35
 * @LastEditTime : 2021-06-01 12:32:20
 */
import React, {useRef, useState, useCallback, memo} from "react";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import styles from "../../DataAsst.module.css";
import ChartChangeModal from "./ChartChangeModal";
import {cloneDeep} from 'lodash';
import Charts from "./Charts";
import baseOptions from "./baseOptions";

const BASEOPTIONS = baseOptions.LesseeEntryExitMonthComparisonListChart;

export default memo(function LesseeEntryExitMonthComparisonListChart({height, data}) {
  const [lesseeEntryExitMonthComparisonList, setLesseeEntryExitMonthComparisonList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusText = useRef("默认");

  const requestLesseeEntryExitMonthComparisonList = useCallback((kindId, {categorySn, leaseGoodsSn, leaseGoodsParentSn}) => {
    request(
      apiInterfaces.lesseeEntryExitMonthComparisonList,
      {
        kindId,
        categorySn,
        leaseGoodsParentSn,
        leaseGoodsSn,
      },
      (res) => {
        setLesseeEntryExitMonthComparisonList(res.data);
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
    setLesseeEntryExitMonthComparisonList(null);
    // setIsModalVisible(false);
  }, []);

  const _onConfirm = useCallback((values) => {
    // console.log(values);
    switch (values.kind.value) {
      case 1:
        // 物资分类
        statusText.current = values.kind.label + "-" + values.category.label;
        requestLesseeEntryExitMonthComparisonList(1, {categorySn: values.category.value});
        break;
      case 2:
        // SPU
        statusText.current = values.kind.label + "-" + values.SPU.label + "-" + values.SPU.value;
        requestLesseeEntryExitMonthComparisonList(2, {leaseGoodsParentSn: values.SPU.value});
        break;
      case 3:
        // SKU
        statusText.current = values.kind.label + "-" + values.SKU.label + "-" + values.SKU.value;
        requestLesseeEntryExitMonthComparisonList(3, {leaseGoodsSn: values.SKU.value});
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  }, [requestLesseeEntryExitMonthComparisonList]);

  const dataMap = data => {
    const monthArr = [];
    const entryQuantityArr = [];
    const exitQuantityArr = [];

    data.map(item => {
      // 月份，承租进场量，承租退场量
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
    //       entryQuantity: "承租进场量",
    //       exitQuantity: "承租退场量",
    //       month: "月份",
    //     }
    //   })
    //   .transform({
    //     type: "fold",
    //     fields: ["承租进场量", "承租退场量"], // 展开字段集
    //     key: "key",                   // key字段
    //     value: "value",               // value字段
    //     retains: ["月份"]        // 保留字段集，默认为除 fields 以外的所有字段
    //   })
    //   .rows;
    //
    // console.log('变换函数返回的数据：', rows);
    //
    // return rows;
  }, []);

  return (
    <>
      <div className={styles.indexTitle}>
        <h2 className={styles.indexH2}>承租进场量-退场量月度走势对比</h2>
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
      <Charts
        height={height}
        options={cloneDeep(transform(lesseeEntryExitMonthComparisonList || data))}
      />
      <ChartChangeModal
        visible={isModalVisible}
        title="承租进场量-退场量月度走势对比"
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onReset={_onReset}
      />
    </>
  );
});
