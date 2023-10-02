/*
 * @Description  :
 * @version      : 0.1
 * @Author       : Chenglin Huang
 * @Date         : 2021-03-24 17:00:29
 * @LastEditTime : 2021-05-13 15:41:37
 */
import React from "react";


export default function StepLine({ iconList, line, activeLine }) {
    return (
        <>
            <div style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
                {
                    iconList.map((icon, index) => {
                        return (
                            <div
                                key={index}
                                style={{ display: "flex", flexDirection: "column", alignItems: "center", marginRight: "160px", width: "32px", position: "relative" }}>
                                <div style={{ position: "relative" }}>
                                    {icon.icon}
                                    {
                                        index === iconList.length - 1 ?
                                            null :
                                            <div style={{ position: "absolute", left: "calc(50% + 15px + 8px)" }}>
                                                {
                                                    icon.isActive ?
                                                        <>
                                                            {activeLine}
                                                        </> :
                                                        <>
                                                            {line}
                                                        </>
                                                }
                                            </div>
                                    }
                                </div>
                                <div style={{ position: "absolute", textAlign: "center", marginTop: "40px" }}>
                                    <p style={{ whiteSpace: "nowrap", fontWeight: "500", fontSize: "16px", marginBottom: "4px" }}>{icon.status}</p>
                                    {
                                        icon.name ?
                                            <p style={{ whiteSpace: "nowrap", marginBottom: "4px", color: "#2B3441" }}>{icon.name}</p> :
                                            null
                                    }
                                    {
                                        icon.time ?
                                            <p style={{ whiteSpace: "nowrap", color: "#2B3441" }}>{icon.time}</p> :
                                            null
                                    }
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
}
