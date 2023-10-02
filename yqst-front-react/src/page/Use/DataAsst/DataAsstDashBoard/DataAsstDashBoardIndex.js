/*
 * @Description  : 数据助手仪表盘
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-05-19 15:25:47
 * @LastEditTime : 2021-06-01 12:28:20
 */
import React, { useEffect, useState } from "react";
import ViewCoat from "../../PublicModule/ViewCoat/ViewCoat";
import request from "../../../../utils/request/request";
import apiInterfaces from "../apiInterfaces";
import MonthChangeListChart from "./Components/MonthChangeListChart";
import LesseeMonthOnMonthGrowthListChart from "./Components/LesseeMonthOnMonthGrowthListChart";
import LessorMonthOnMonthGrowthListChart from "./Components/LessorMonthOnMonthGrowthListChart";
import LesseeEntryExitMonthComparisonListChart from "./Components/LesseeEntryExitMonthComparisonListChart";
import LessorEntryExitMonthComparisonListChart from "./Components/LessorEntryExitMonthComparisonListChart";

export default function DataAsstDashBoardIndex() {

    const [indexStatistics, setIndexStatistics] = useState(null);

    useEffect(() => {
        const cancel = request(
            apiInterfaces.leaseGoodsStatistics,
            {},
            (res) => {
                setIndexStatistics(res.data);
            },
            (err) => {
                console.warn(err);
            }
        );
        return () => {
            cancel && cancel();
        };
    }, []);

    return (
        <ViewCoat
            breadCrumb={[
                { title: "数据助手" },
                { title: "仪表盘" },
            ]}
        >
            <MonthChangeListChart data={indexStatistics ? indexStatistics.monthChangeList : []} height={400} />
            <LesseeMonthOnMonthGrowthListChart data={indexStatistics ? indexStatistics.lesseeMonthOnMonthGrowthList : []} height={400} />
            <LessorMonthOnMonthGrowthListChart data={indexStatistics ? indexStatistics.lessorMonthOnMonthGrowthList : []} height={400} />
            <LesseeEntryExitMonthComparisonListChart data={indexStatistics ? indexStatistics.lesseeEntryExitMonthComparisonList : []} height={400} />
            <LessorEntryExitMonthComparisonListChart data={indexStatistics ? indexStatistics.lessorEntryExitMonthComparisonList : []} height={400} />
        </ViewCoat>
    );
}
