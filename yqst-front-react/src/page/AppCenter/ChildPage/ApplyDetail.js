import React, {Component} from 'react';
import {Row, Col, Button, Modal, message, Radio, Empty} from 'antd';
import model from '../model'
import {getQueryVariable} from "../../../utils";
import IsPower from '../../Power/IsPower';
import JudgePath from './JudgePath';
import {LeftOutlined} from "@ant-design/icons";
import {RViewer, RViewerTrigger} from "react-viewerjs";

class ApplyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            softDetail: {},
            chargeVisible: false,
            btnData: {},
            chargeDetail: {},
            activeShop: undefined,
            activeTime: undefined,
            picIdx: 0
        };
    }

    componentDidMount() {
        this.getDetail()
    }

    componentWillUnmount() {

    }

    getDetail = () => {
        const softId = getQueryVariable('softId');
        model.softMarketSoftGet({softId: softId}, res => {
            if (res.data && res.data.screenshotUrl) {
                res.data.screenshotUrl = res.data.screenshotUrl.split(',')
            }
            this.setState({softDetail: res.data})
        })
        model.softGoodsList({softId: softId}, res => {
            this.setState({btnData: res.data});
        })
    }

    showConfirm = () => {
        Modal.confirm({
            title: '您确定要开通此应用?',
            onOk: () => {
                // status：软件状态 0:免费激活，1:已激活，2:购买激活，3:购买激活到期
                model.softFreeActive({softId: this.state.softDetail.softId}, res => {
                    message.success('免费激活成功')
                })
                // if (this.state.softDetail.status === 0) {
                //     // 免费激活
                //     model.softFreeActive({softId: this.state.softDetail.softId}, res => {
                //         message.success('免费激活成功')
                //     })
                // } else if (this.state.softDetail.status === 2 || this.state.softDetail.status === 3) {
                //     model.softGoodsList({softId: this.state.softDetail.softId}, res => {
                //         message.success('购买激活成功')
                //     })
                // }
            },
        });
    }

    freeActive = () => {
        window.globalPermissions.checkPermission('SOFT_MARKET_OPEN', (res) => {
            if (res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            Modal.confirm({
                title: '确认开通该应用?',
                okText: '确定',
                cancelText: '取消',
                onOk: () => {
                    model.softFreeActive({softId: this.state.softDetail.softId}, res => {
                        message.success('免费激活成功')
                        const tabTag = getQueryVariable('tabTag')
                        this.props.history.push(`/pages/appCenter/applyBazaar?tabTag=${tabTag}`)
                    })
                },
            });
        });
    }

    chargeActive = () => {
        const {softDetail, btnData, chargeDetail} = this.state;
        const params = {
            shopId: btnData.shopId,
        }
        if (this.state.activeTime === undefined) return
        if (this.state.activeShop === undefined) return
        model.SubSoftwareDetails({
            goodsId: this.state.activeTime,
            shopId: this.state.activeShop,
        }, res1 => {
            model.orderBuyerFast({
                goodsNumber: 1,
                goodsSn: res1.data.goodsEncoding,
                shopId: btnData.shopId
            }, res2 => {
                model.orderBuyerConfirm({
                    goodsNumber: 1,
                    goodsSn: res1.data.goodsEncoding,
                    shopId: btnData.shopId,
                    tradeCode: 'cash'
                }, res => {


                })
            })
            message.success('购买激活成功')
        })
    }

    showButton = () => {
        const {softDetail, btnData} = this.state;
        const btnStyle = {
            width: '96px',
            height: '32px',
            // lineHeight: '32px',
            margin: '0 5px'
        }
        const entrance = getQueryVariable('entrance');
        const freeActive = this.freeActive
        const chargeActive = () => {
            message.info('暂不支持')
            return;
            const requestParams = {
                goodsId: btnData.goodsId,
                shopId: btnData.shopId,
            }
            model.softwareGoodsDetail(requestParams, res => {
                this.setState({
                    chargeVisible: true,
                    chargeDetail: res.data
                })
            })

        }
        const btnArr = []
        if (entrance === 'applyIndex') {
            btnArr.push(
                <div>
                    <Button style={btnStyle} type='primary'>xxx</Button>
                </div>
            )
            return btnArr
        }
        if (softDetail.status === 1) {
            btnArr.push(
                <div key={1}>
                    <Button style={btnStyle} type='primary'
                            onClick={() => {
                                if (softDetail.isAuth == 0) {
                                    Modal.info({
                                        title: '该应用未被授权.',
                                        okText: '确定',
                                    });
                                    return;
                                }
                                JudgePath(softDetail.serviceTag, this.props)
                            }}
                    >进入应用</Button>
                </div>
            )
        } else {
            if (btnData && btnData.freeButtonPar && btnData.freeButtonPar.isShow === 1) {
                btnArr.push(
                    <Button key={1} onClick={freeActive} style={btnStyle}
                            type='primary'>{btnData.freeButtonPar.buttonName}</Button>
                )
            }
            if (btnData && btnData.chargeButtonPar && btnData.chargeButtonPar.isShow === 1) {
                btnArr.push(
                    <Button key={2} onClick={chargeActive} style={btnStyle}
                            type='primary'>{btnData.chargeButtonPar.buttonName}</Button>
                )
            }
        }
        return btnArr
    }

    render() {
        const {softDetail, chargeDetail} = this.state;
        return (
            <div
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    background: '#fff',
                    borderRadius: '6px',
                    margin: '24px auto',
                    padding: '0 138px',
                    fontSize: '14px',
                    position: 'relative'
                }}
            >
                {this.updateHistory()}
                <Modal
                    title='收费开通'
                    className={'sw-modal'}
                    visible={this.state.chargeVisible}
                    onCancel={() => this.setState({chargeVisible: false})}
                    onOk={this.chargeActive}
                >
                    <h3>请选择购买云服务规则</h3>
                    <h3>店铺数:</h3>
                    <div style={{margin: '8px 0'}}>
                        <Radio.Group onChange={(e) => {
                            this.setState({activeShop: e.target.value})
                        }}>
                            {
                                chargeDetail.allGoodsSpecList && chargeDetail.allGoodsSpecList[0].specResList.map(item => (
                                    <Radio.Button key={item.goodsId}
                                                  value={item.goodsId}>{item.specValue}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>
                    <h3>使用时长</h3>
                    <div style={{margin: '8px 0'}}>
                        <Radio.Group onChange={(e) => {
                            this.setState({activeTime: e.target.value})
                        }}>
                            {
                                chargeDetail.allGoodsSpecList && chargeDetail.allGoodsSpecList[1].specResList.map(item => (
                                    <Radio.Button key={item.goodsId}
                                                  value={item.goodsId}>{item.specValue}</Radio.Button>
                                ))
                            }
                        </Radio.Group>
                    </div>
                </Modal>
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined/>}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '25px',
                    }}
                    onClick={() => {
                        const tabTag = getQueryVariable('tabTag')
                        this.props.history.push(`/pages/appCenter/applyBazaar?tabTag=${tabTag}`);
                    }}
                >返回</Button>
                <IsPower
                    key={'SOFT_MARKET_INF0'}
                    permissionsName={'SOFT_MARKET_INF0'}
                >
                    <h1
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                            margin: '0px'
                        }}
                    >
                        应用详情
                    </h1>
                    <Row
                        style={{
                            padding: '24px 0',
                        }}
                    >
                        <Col span={17} style={{display: 'flex'}}>
                            <img src={softDetail.logo} alt=""
                                 style={{
                                     height: '64px',
                                     verticalAlign: 'bottom',
                                     marginRight: '16px',
                                     borderRadius: '6px',
                                 }}
                            />
                            <div
                                style={{
                                    display: 'inline-block'
                                }}
                            >
                                <h1
                                    style={{
                                        marginBottom: '8px',
                                        fontSize: '20px'
                                    }}
                                >{softDetail.name}(版本号:{softDetail.softVersion})</h1>
                                <span
                                    style={{
                                        color: 'rgba(43,52,65,0.65)'
                                    }}
                                >{softDetail.description}</span>
                            </div>
                        </Col>
                        <Col span={7}
                             style={{
                                 textAlign: 'right',
                                 marginTop: '19px'
                             }}
                        >
                            {
                                this.showButton()
                            }
                        </Col>
                    </Row>
                    <div
                        style={{
                            color: '#2B3441',
                            marginBottom: '12px'
                        }}
                    >
                        应用截图
                    </div>
                    {
                        softDetail.screenshotUrl && softDetail.screenshotUrl.length > 0 ? (
                            <div
                                style={{
                                    width: '100%',
                                    height: '110px',
                                    overflowY: 'hidden',
                                    overflowX: 'auto',
                                    whiteSpace: 'nowrap',
                                }}
                            >
                                <div
                                    style={{
                                        minWidth: '100%',
                                        height: '100%',
                                    }}
                                >
                                    {
                                        softDetail.screenshotUrl && softDetail.screenshotUrl.map((url, idx) => {
                                            return <img src={url} alt="" key={'img_' + idx}
                                                        style={{
                                                            width: '160px',
                                                            height: '90px',
                                                            marginRight: '16px',
                                                            display: 'inline-block',
                                                            borderRadius: '4px',
                                                            cursor: 'pointer'
                                                        }}
                                                        className={'imgCover'}
                                                        onClick={()=>{
                                                            this.showPicPreview && this.showPicPreview.click();
                                                        }}
                                            />
                                        })
                                    }
                                </div>
                                <RViewer options={{
                                    toolbar: {//Since there is only one picture, let's hide "prev" and "next"
                                        prev: true,
                                        next: true
                                    }
                                }} imageUrls={softDetail.screenshotUrl || []}>
                                    <RViewerTrigger index={this.state.picIdx}>
                                        <div ref={(c) => {
                                            this.showPicPreview = c
                                        }}></div>
                                    </RViewerTrigger>
                                </RViewer>
                            </div>
                        ) : '无'
                    }

                    <div
                        style={{
                            color: '#2B3441',
                            margin: '24px 0px 16px',
                        }}
                    >
                        更新日志
                        <a
                            style={{float: 'right'}}
                            onClick={() => this.setState({historyVisible: true})}
                        >
                            历史版本
                        </a>
                    </div>
                    <div style={{
                        color: 'rgba(43,52,65,0.85)',
                        fontSize: '12px',
                        lineHeight: '17px'
                    }}>
                        {
                            (softDetail.memo === undefined || softDetail.memo === '') ? (
                                '无'
                            ) : softDetail.memo
                        }
                    </div>
                </IsPower>
            </div>
        );
    }

    updateHistory = () => {
        let {softDetail} = this.state;
        return (
            <Modal
                title={'历史版本'}
                className={'sw-modal'}
                bodyStyle={{padding: '10px 20px 20px 20px'}}
                visible={this.state.historyVisible}
                onCancel={() => this.setState({historyVisible: false})}
                footer={[
                    <Button key={1} onClick={() => this.setState({historyVisible: false})} type={'primary'}>确定</Button>
                ]}
            >
                {
                    (softDetail && softDetail.versionLogList && softDetail.versionLogList.length !== 0) ? (
                        softDetail.versionLogList.map((item, index) => {
                            return (
                                <div key={item.softVersion}
                                     style={{borderBottom: '1px solid #E8E8E8', padding: '16px 0'}}>
                                    <h3 style={{fontSize: 14, lineHeight: '20px', color: '#2B3441'}}>版本
                                        : {item.softVersion}</h3>
                                    <h3 style={{fontSize: 14, lineHeight: '20px', color: '#2B3441'}}>版本说明
                                        : {item.memo}</h3>
                                </div>
                            )
                        })
                    ) : <Empty/>
                }
            </Modal>
        )
    }
}

export default ApplyDetail;
