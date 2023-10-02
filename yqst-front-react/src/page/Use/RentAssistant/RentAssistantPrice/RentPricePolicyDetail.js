import React, {Component} from 'react';
import {Button, message, Switch, Tree, Tooltip, Modal} from 'antd';
import RentModel from "../RentModel";
import {rent_complete_icon, rent_undone_icon, rent_disable_icon} from '../../../../resource/index';
import RentStyle from './Rent.module.css';

export default class RentPricePolicyDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            clientWidth: document.body.clientWidth,
        };
    }

    componentDidMount() {
        this.getInfo();
    }

    getInfo = () => {
        const {pricePolicySn} = this.props.match.params;
        RentModel.RentAsstPolicyInfo({
            pricePolicySn
        }, res => {
            this.setState({
                ...res.data,
                loading: false
            })
        })
    }

    render() {
        const {clientWidth} = this.state;
        return (
            <div>
                {this.makeHeaderView()}
                {this.makeStepsView()}
                <div style={{
                    padding: '22px 25px',
                    borderRadius: 6,
                    backgroundColor: '#fff',
                    marginTop: 25
                }}>
                    {this.makeContentView()}
                    {this.makeTableView()}
                    {this.makeButtonView()}
                </div>
            </div>
        )
    }

    makeHeaderView = () => {
        const {pricePolicyStatus, loading, pricePolicySn} = this.state;
        return (
            <div style={{
                width: '100%',
                height: '119px',
                borderRadius: 6,
                backgroundColor: '#fff',
                boxSizing: 'border-box',
                padding: '22px 32px',
                color: '#2B3441'
            }}>
                <p style={{fontSize: 15, color: 'rgba(44, 52, 64, 0.25)'}}>
                    出租助手 / 租赁价格 /
                    <span style={{color: '#2B3441'}}> 租赁价格政策详情</span>
                </p>
                <div style={{
                    marginTop: 18,
                    fontSize: 24,
                    display: 'flex',
                    justifyContent: "space-between",
                    alignItems: 'center'
                }}>
                    <span>租赁价格政策详情</span>
                    {
                        (pricePolicyStatus > 1) && (
                            <Switch
                                style={{marginRight: 100}}
                                loading={loading}
                                checked={pricePolicyStatus === 4}
                                onChange={e => {
                                    let api = 'RentAsstPolicyEnable';
                                    pricePolicyStatus === 4 && (api = 'RentAsstPolicyDisable');
                                    Modal.confirm({
                                        title: pricePolicyStatus === 4 ? '是否停用?' : '是否启用?',
                                        onOk: () => {
                                            RentModel[api]({
                                                pricePolicySn
                                            }, res => {
                                                message.success('状态修改成功，正在重新加载数据!')
                                                this.getInfo();
                                            })
                                        }
                                    })
                                }}
                            />
                        )
                    }
                </div>
            </div>
        )
    }

    makeStepsView = () => {
        const {
            pricePolicyStatus, submitterName, submitTime, enableTime, enableOperatorName,
            executionTime, disableOperatorName, disableTime
        } = this.state;
        return (
            <div style={{
                height: pricePolicyStatus > 1 ? 205 : 156,
                backgroundColor: '#fff',
                borderRadius: 6,
                marginTop: 25,
                padding: '22px 25px',
            }}>
                <p style={{fontSize: 16, color: '#2B3441'}}>业务处理</p>
                <div style={{
                    display: "flex",
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <div className={RentStyle.stepItem}>
                        <img className={RentStyle.stepItemIcon} src={rent_complete_icon} alt=""/>
                        <div className={RentStyle.stepItemInfo}>
                            <span style={{fontSize: 16, color: '#2B3441', marginTop: 6}}>待提交</span>
                            <span style={{
                                fontSize: 14,
                                color: 'rgba(43, 52, 65, 0.45)',
                                marginTop: 6
                            }}>{submitterName}</span>
                            <span style={{
                                fontSize: 14,
                                color: 'rgba(43, 52, 65, 0.45)',
                                marginTop: 6
                            }}>{submitTime}</span>
                        </div>
                    </div>

                    <div className={RentStyle.stepLine}/>

                    <div className={RentStyle.stepItem}>
                        <img
                            className={RentStyle.stepItemIcon}
                            src={pricePolicyStatus > 1 ? rent_complete_icon : rent_undone_icon}
                            alt=""
                        />
                        <div className={RentStyle.stepItemInfo}>
                            <span style={{fontSize: 16, color: '#2B3441', marginTop: 6}}>待启用</span>
                            <span style={{fontSize: 14, color: 'rgba(43, 52, 65, 0.45)', marginTop: 6}}>
								{enableOperatorName || ''}
							</span>
                            <span style={{fontSize: 14, color: 'rgba(43, 52, 65, 0.45)', marginTop: 6}}>
								{enableTime || ''}
							</span>
                        </div>
                    </div>

                    <div className={RentStyle.stepLine}/>

                    <div className={RentStyle.stepItem}>
                        <img
                            className={RentStyle.stepItemIcon}
                            src={pricePolicyStatus > 2 ? rent_complete_icon : rent_undone_icon}
                            alt=""
                        />
                        <div className={RentStyle.stepItemInfo}>
                            <span style={{fontSize: 16, color: '#2B3441', marginTop: 6}}>执行中</span>
                            <span style={{fontSize: 14, color: 'rgba(43, 52, 65, 0.45)', marginTop: 6}}>
								{executionTime || ''}
							</span>
                        </div>
                    </div>

                    <div className={RentStyle.stepLine}/>

                    <div className={RentStyle.stepItem}>
                        <img
                            className={RentStyle.stepItemIcon}
                            src={pricePolicyStatus >= 5 ? rent_disable_icon : rent_undone_icon}
                            alt=""
                        />
                        <div className={RentStyle.stepItemInfo}>
							<span style={{fontSize: 16, color: '#2B3441', marginTop: 6}}>
								{pricePolicyStatus === 6 ? '已失效' : '已停用'}
							</span>
                            {
                                pricePolicyStatus === 5 && (
                                    <>
										<span style={{fontSize: 14, color: 'rgba(43, 52, 65, 0.45)', marginTop: 6}}>
											{disableOperatorName || ''}
										</span>
                                        <span style={{fontSize: 14, color: 'rgba(43, 52, 65, 0.45)', marginTop: 6}}>
											{disableTime || ''}
										</span>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    makeContentView = () => {
        const {
            pricePolicyStatus, pricePolicyName, createTime, pricePolicySn, isNotify, submitTime,
            pricePolicyType, effectiveStartTime, effectiveEndTime,
        } = this.state;
        return (
            <>
                <p style={{fontSize: 16, color: 'rgba(43, 52, 65, 1)'}}>价格政策</p>
                <div style={{
                    height: 38,
                    backgroundColor: 'rgba(43, 52, 65, 0.05)',
                    color: 'rgba(43, 52, 65, 1)',
                    paddingLeft: 25,
                    lineHeight: '38px'
                }}>
                    基本信息
                </div>
                <div style={{display: 'flex', flexWrap: 'wrap', color: 'rgba(43, 52, 65, 1)', fontSize: 14}}>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格政策状态：
                        {(status => {
                            switch (status) {
                                case 1:
                                    return '待提交'
                                case 2:
                                    return '待启用'
                                case 3:
                                    return '待执行'
                                case 4:
                                    return '执行中'
                                case 5:
                                    return '已停用'
                                case 6:
                                    return '已失效'
                                default:
                                    return ''
                            }
                        })(pricePolicyStatus)}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格政策名称：{pricePolicyName}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格创建时间：{createTime}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格政策编码：{pricePolicySn}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格政策通知：{isNotify ? '发送通知' : '不发送通知'}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格提交时间：{submitTime}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格政策类型：{(type => {
                        switch (type) {
                            case 1:
                                return '通用价格'
                            case 2:
                                return '特殊价格'
                            case 3:
                                return '促销价格'
                            default:
                                return ''
                        }
                    })(pricePolicyType)}
                    </div>
                    <div style={{width: '50%', padding: '10px 10px 0 10px'}}>
                        价格有效时间：{effectiveStartTime} - {effectiveEndTime}
                    </div>
                </div>

                <p style={{fontSize: 14, color: 'rgba(43, 52, 65, 1)', padding: '10px 10px 0 10px'}}>适用对象：</p>
                {this.makeTreeView()}
            </>
        )
    }

    makeTreeView = () => {
        let customerList = this.state.customerList || [];
        const treeData = [];
        customerList.forEach((company, index) => {
            let obj = {};
            obj.title = company.lesseeName;
            obj.key = company.lesseeSn;
            obj.index = index;
            obj.children = [];
            company.projectList.forEach((project, idx) => {
                let p = {};
                p.title = project.projectName;
                p.key = project.projectSn;
                p.isLeaf = true
                p.idx = idx;
                p.index = index;
                obj.children.push(p);
            });
            treeData.push(obj);
        })

        return (
            <div style={{marginTop: 10}}>
                <Tree multiple selectable={false} showLine={true} treeData={treeData}/>
            </div>
        )
    }

    makeTableView = () => {
        const leaseGoodsList = this.state.leaseGoodsList || [];
        const {effectiveStartTime, effectiveEndTime} = this.state;
        return (
            <>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 38,
                    backgroundColor: 'rgba(43, 52, 65, 0.05)',
                    paddingLeft: 15,
                    marginTop: 25
                }}>
                    租赁明细
                </div>
                <div style={{marginTop: 15}}>
                    {/* 表头 */}
                    <div style={{
                        display: 'flex',
                        minHeight: 56,
                        backgroundColor: '#F1F1FA',
                        borderRadius: 6,
                        fontSize: 14,
                        color: '#2B3441',
                        alignItems: 'center'
                    }}>
                        <div style={{flex: 1.5, minWidth: '15%'}} className={RentStyle.policyTabelItem}>物资名称</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>SKU</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>规格</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>计费单位</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>计费周期</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>租赁单价/元(含税)</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>税率</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>租赁单价/元(不含税)</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>税金</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>折扣(%)</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>起止日期</div>
                    </div>

                    {/* 表数据展示 */}
                    {
                        leaseGoodsList && leaseGoodsList.map((item, index) => (
                            <div style={{display: 'flex', fontSize: 14, color: '#2B3441', width: '100%'}}
                                 key={item.leaseGoodsParentSn}>
                                <div style={{
                                    width: '15%',
                                    border: '1px solid #EBEDF0',
                                }}>
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: "row",
                                        width: '100%',
                                        boxSizing: "border-box",
                                        paddingTop: 10
                                    }}>
                                        <img style={{display: 'flex', width: 52, height: 52, borderRadius: 6}}
                                             src={item.goodsImageUrl} alt=''/>
                                        <div style={{
                                            width: 'calc(100% - 52px)',
                                            overflowWrap: 'break-word'
                                        }}>
                                            <Tooltip style={{width: '100%'}} title={item.goodsName}
                                                     color={'rgba(0, 0, 0, 0.6)'}>
                                                <span className={RentStyle.desc}
                                                      style={{color: '#4481EB', marginLeft: 5, cursor: 'pointer'}}>
                                                    {item.goodsName}
                                                </span>
                                            </Tooltip>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#2B3441',
                                            }}>1{item.goodsCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: '85%'}}>
                                    {
                                        item.skuList && item.skuList.map((skuItem, skuIndex) => (
                                            <div style={{display: 'flex', flexDirection: 'row'}}
                                                 key={skuItem.leaseGoodsSn}>
                                                <div style={{
                                                    width: '10%',
                                                    minHeight: 108,
                                                }} className={RentStyle.policyTabelItem}>
                                                    <div style={{
                                                        width: '100%',
                                                        textAlign: 'center'
                                                    }}>
                                                        <img style={{width: 52, height: 52, borderRadius: 6}}
                                                             src={skuItem.goodsImageUrl} alt=''/>
                                                        <div style={{
                                                            color: '#2B3441',
                                                            overflowWrap: 'anywhere'
                                                        }}>
                                                            {skuItem.goodsCode}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div style={{width: '10%', overflowWrap: 'break-word', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <Tooltip title={(
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%'
                                                        }}>
                                                            {
                                                                skuItem.specList && skuItem.specList.map((spec) => (
                                                                    <span
                                                                        style={{display: "inline-block", width: '100%'}}
                                                                        key={spec.specName}>
																		{spec.specName}: {spec.specValue}
																	</span>
                                                                ))
                                                            }
                                                        </div>
                                                    )} color={'rgba(0, 0, 0, 0.6)'}>
                                                        <div style={{
                                                            display: 'flex',
                                                            flexDirection: 'column',
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            height: '100%',
                                                            cursor: "pointer"
                                                        }}>
                                                            {skuItem.specList.length}个规格
                                                        </div>
                                                    </Tooltip>
                                                </div>
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    {skuItem.chargeUnit}
                                                </div>
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    {skuItem.timeUnit}
                                                </div>
                                                {/*租赁单价/元(含税)*/}
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <p style={{
                                                        width: '90%',
                                                        overflowWrap: 'break-word',
                                                        textAlign: 'center',
                                                        margin: 0
                                                    }}>
                                                        {skuItem.unitPrice}
                                                    </p>
                                                </div>
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    {skuItem.taxRate ? `${skuItem.taxRate}%` : '暂无数据'}
                                                </div>
                                                {/*租赁单价/元(不含税)*/}
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <p style={{
                                                        width: '90%',
                                                        overflowWrap: 'break-word',
                                                        textAlign: 'center',
                                                        margin: 0
                                                    }}>
                                                        {skuItem.unitPriceExcludingTax}
                                                    </p>
                                                </div>
                                                {/*税金*/}
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <p style={{
                                                        width: '90%',
                                                        overflowWrap: 'break-word',
                                                        textAlign: 'center',
                                                        margin: 0
                                                    }}>
                                                        {skuItem.tax}
                                                    </p>
                                                </div>
                                                {/*折扣*/}
                                                <div style={{flex: 1, width: '10%', minHeight: 108}}
                                                     className={RentStyle.policyTabelItem}>
                                                    {skuItem.discount}
                                                </div>
                                                <div style={{
                                                    flex: 1,
                                                    width: '10%',
                                                    minHeight: 108,
                                                    flexDirection: 'column',
                                                }} className={RentStyle.policyTabelItem}>
                                                    <span>{effectiveStartTime}</span>
                                                    <span>至</span>
                                                    <span>{effectiveEndTime}</span>
                                                </div>

                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }

    makeButtonView = () => {
        const {pricePolicySn, pricePolicyStatus} = this.state;
        return (
            <div style={{display: 'flex', marginTop: 25}}>
                <Button style={{borderColor: 'rgba(68, 129, 235, 1)', color: 'rgba(68, 129, 235, 1)'}} onClick={() => {
                    if (pricePolicyStatus === 4) {
                        return message.error('当前状态不允许编辑，请先停用该政策');
                    }
                    this.props.history.push(`/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyAdd/${pricePolicySn}`)
                }}>编辑</Button>
                <Button style={{marginLeft: 25}} onClick={() => {
                    this.props.history.goBack();
                }}>返回</Button>
            </div>
        )
    }

}
