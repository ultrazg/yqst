import React from 'react'
import {Card} from "antd";

export default function BusinessAdjustIndex() {
    return (
        <>
            <Card bodyStyle={{padding: 0}} style={{padding: '36px 24px', borderRadius: '6px'}}>
                <h1
                    style={{
                        margin: 0,
                        fontSize: '24px',
                        fontWeight: 500,
                        lineHeight: '33px',
                        color: '#2B3441'
                    }}
                >
                    结算调整
                </h1>
            </Card>
            <div style={{padding: '24px', borderRadius: '6px', marginTop: '24px', background: '#fff'}}>
                请移步到 APP 操作
            </div>
        </>
    )
}
