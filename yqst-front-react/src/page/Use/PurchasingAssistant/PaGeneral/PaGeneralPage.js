import React, {Component} from 'react';
import {Card} from 'antd'
import {dd_11, hw_11, ys_11, fp_11, sh_11, jy_11, ht_11, sp_11, kh_11, yg_11, pz_11} from '../../../../resource';

const featureData = [
    {
        icon: dd_11,
        label: '订单管理'
    },
    {
        icon: hw_11,
        label: '货物管理'
    },
    {
        icon: ys_11,
        label: '运输管理'
    },
    {
        icon: fp_11,
        label: '发票管理'
    },
    {
        icon: sh_11,
        label: '售后管理'
    },
    {
        icon: jy_11,
        label: '交易单管理'
    },
    {
        icon: ht_11,
        label: '合同管理'
    },
    {
        icon: sp_11,
        label: '商品管理'
    },
    {
        icon: kh_11,
        label: '客户管理'
    },
    {
        icon: yg_11,
        label: '员工管理'
    },
    {
        icon: pz_11,
        label: '交易配置'
    },
];

class PaGeneralPage extends Component {
    state = {};

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
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
                        采购助手
                    </h1>
                </Card>
                <Card
                    style={{marginTop: 24, borderRadius: 6, minHeight: '571px'}}
                    title={
                        <h1
                            style={{fontSize: 16, margin: 0, color: '#2B3441'}}
                        >
                            常用功能
                        </h1>
                    }
                >
                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            featureData && featureData.map((n, index) => {
                                return (
                                    <div
                                        style={{
                                            width: '20%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            marginBottom: (index + 1 > (parseInt((featureData.length - 1) / 5) * 5)) ? 0 : 32,
                                        }}
                                        key={index}
                                    >
                                        <img style={{cursor: 'pointer'}} width={32} height={32} src={n.icon} alt=""/>
                                        <h4
                                            style={{
                                                flex: 1,
                                                marginBottom: 0,
                                                marginLeft: 8,
                                                cursor: 'pointer'
                                            }}
                                        >
                                            {n.label}
                                        </h4>
                                    </div>
                                )
                            })
                        }
                    </div>
                </Card>
            </>
        );
    }
}

export default PaGeneralPage;
