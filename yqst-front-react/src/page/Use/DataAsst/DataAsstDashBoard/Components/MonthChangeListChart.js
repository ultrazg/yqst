/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useRef, useState, useCallback, memo} from "react";
import request from "../../../../../utils/request/request";
import apiInterfaces from "../../apiInterfaces";
import styles from "../../DataAsst.module.css";
import ChartChangeModal from "./ChartChangeModal";
import {cloneDeep} from 'lodash';
import Charts from './Charts';
import baseOptions from "./baseOptions";

const BASEOPTIONS = baseOptions.MonthChangeListChart;

export default memo(function MonthChangeListChart({height, data}) {
  // 传进来的data是默认数据，改变条件后的数据则是monthChangeList
  const [monthChangeList, setMonthChangeList] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const statusText = useRef("默认");

  const requestMonthChangeList = useCallback((kindId, {categorySn, leaseGoodsSn, leaseGoodsParentSn}) => {
    request(
      apiInterfaces.monthChangeList,
      {
        kindId,
        categorySn,
        leaseGoodsParentSn,
        leaseGoodsSn,
      },
      (res) => {
        setMonthChangeList(res.data);
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
    setMonthChangeList(null);
    // setIsModalVisible(false);
  }, []);

  const _onConfirm = useCallback((values) => {
    switch (values.kind.value) {
      case 1:
        // 物资分类
        statusText.current = values.kind.label + "-" + values.category.label;
        requestMonthChangeList(1, {categorySn: values.category.value});
        break;
      case 2:
        // SPU
        statusText.current = values.kind.label + "-" + values.SPU.label + "-" + values.SPU.value;
        requestMonthChangeList(2, {leaseGoodsParentSn: values.SPU.value});
        break;
      case 3:
        // SKU
        statusText.current = values.kind.label + "-" + values.SKU.label + "-" + values.SKU.value;
        requestMonthChangeList(3, {leaseGoodsSn: values.SKU.value});
        break;
      default:
        break;
    }
    setIsModalVisible(false);
  }, [requestMonthChangeList]);

  const dataMap = data => {
    const monthArr = [];
    const lesseeQuantityArr = [];
    const lessorQuantityArr = [];

    data.map(item => {
      // 月份，承租数量，出租数量
      const {month, lesseeQuantity, lessorQuantity} = item;
      monthArr.push(month + '月');
      lesseeQuantityArr.push(lesseeQuantity);
      lessorQuantityArr.push(lessorQuantity);
    })

    BASEOPTIONS.xAxis[0].data = monthArr;
    BASEOPTIONS.series[0].data = lesseeQuantityArr;
    BASEOPTIONS.series[1].data = lessorQuantityArr;

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
    //       lesseeQuantity: "承租数量",
    //       lessorQuantity: "出租数量",
    //       month: "月份",
    //     }
    //   })
    //   .transform({
    //     type: "fold",
    //     fields: ["承租数量", "出租数量"], // 展开字段集
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
        <h2 className={styles.indexH2}>在租物资月度变动</h2>
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
        options={cloneDeep(transform(monthChangeList || data))}
      />
      {/*<Chart*/}
      {/*  data={transform(monthChangeList || data)}*/}
      {/*  padding="auto"*/}
      {/*  scale={{*/}
      {/*    "value": {*/}
      {/*      type: "linear",*/}
      {/*    }*/}
      {/*  }}*/}
      {/*  autoFit*/}
      {/*  height={height}*/}
      {/*>*/}
      {/*  <Interval*/}
      {/*    adjust={[*/}
      {/*      {*/}
      {/*        type: "dodge",*/}
      {/*        marginRatio: 0,*/}
      {/*      },*/}
      {/*    ]}*/}
      {/*    color="key"*/}
      {/*    position="月份*value"*/}
      {/*  />*/}
      {/*  <Axis name="月份" title={{position: "end"}}/>*/}
      {/*  <Tooltip shared/>*/}
      {/*  <Interaction type="active-region"/>*/}
      {/*</Chart>*/}
      <ChartChangeModal
        visible={isModalVisible}
        title="在租物资月度变动"
        onCancel={_onCancel}
        onConfirm={_onConfirm}
        onReset={_onReset}
      />
    </>
  );
});