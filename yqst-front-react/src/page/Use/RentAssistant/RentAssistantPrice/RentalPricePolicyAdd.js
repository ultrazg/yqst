import React, {Component} from 'react';
import {Select, Input, DatePicker, Radio, Button, Tree, message, Tooltip} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import RentStyle from './Rent.module.css';
import SelectProjectModal from "./component/SelectProjectModal";
import RentModel from "../RentModel";
import moment from "moment";
import MultipleChangeModal from './component/MultipleChangeModal';

const {Option} = Select;
const {RangePicker} = DatePicker;


export default class RentalPricePolicyAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rangeDate: [],
            showModal: false,
            projectInfo: [],
            isSend: 1, // 是否发送通知
            policyName: '',
            policyType: '',
            selectedArr: [],
            startTime: '',
            endTime: '',
            isAllCustomer: 0,
            isAllProject: 0,
            isShowMultipleChangeModal: false,
            follow: true
        };
        this.modalRef = React.createRef();
    }

    componentDidMount() {
        const state = this.props.location.state || {};
        const {pricePolicySn} = this.props.match.params;

        this.setState({
            ...state
        })


        // 编辑
        if (pricePolicySn && pricePolicySn !== '0' && !state.havePolicyInfo) {
            this.getPolicyInfo(pricePolicySn)
        }

    }

    render() {
        const {showModal, isShowMultipleChangeModal, selectedArr, follow} = this.state;
        return (
            <>
                {this.makeHeaderView()}

                <div style={{
                    width: '100%',
                    backgroundColor: '#fff',
                    marginTop: 25,
                    borderRadius: 6,
                    padding: 24
                }}>
                    {this.makeBaseInfoView()}
                    {this.makeTableView()}
                    {this.makeSaveButton()}
                </div>

                <SelectProjectModal
                    ref={this.modalRef}
                    showModal={showModal}
                    follow={follow}
                    changeFollow={(follow) => {
                        this.setState({
                            follow
                        })
                    }}
                    closeModal={(data, isAllCustomer, isAllProject) => {
                        let {projectInfo} = this.state;
                        projectInfo = data || projectInfo;
                        this.setState({
                            projectInfo,
                            showModal: false,
                            isAllCustomer: isAllCustomer - 0,
                            isAllProject: isAllProject - 0
                        })
                    }}
                />

                <MultipleChangeModal
                    showModal={isShowMultipleChangeModal}
                    closeModal={(unitPrice, discount) => {
                        selectedArr.forEach(item => {
                            item.skuList.forEach(sku => {
                                (unitPrice !== '') && (sku.unitPrice = unitPrice);
                                (discount !== '') && (sku.discount = discount);
                            })
                        })

                        this.setState({
                            isShowMultipleChangeModal: false,
                            selectedArr
                        })
                    }}
                />

            </>
        )
    }

    makeHeaderView = () => {
        const {pricePolicySn} = this.state;
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
                    <span style={{color: '#2B3441'}}> {pricePolicySn ? '编辑租赁价格政策' : '创建租赁价格政策'}</span>
                </p>
                <p style={{marginTop: 18, fontSize: 24}}>
                    {pricePolicySn ? '编辑租赁价格政策' : '创建租赁价格政策'}
                </p>
            </div>
        )
    }

    makeBaseInfoView = () => {
        const {rangeDate, isSend, policyName, policyType, pricePolicySn} = this.state;
        return (
            <>
                <p style={{color: '#2B3441', fontSize: 15}}>价格政策</p>
                <div style={{
                    height: 38,
                    backgroundColor: 'rgba(43, 52, 65, 0.05)',
                    lineHeight: '38px',
                    paddingLeft: 15
                }}>
                    基本信息
                </div>
                {
                    (pricePolicySn && pricePolicySn !== '0') && (
                        <div style={{
                            display: 'flex',
                            fontSize: 14,
                            color: 'rgba(43, 52, 65, 1)',
                            alignItems: 'center',
                            marginTop: 15
                        }}>
                            <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>价格政策编码：</div>
                            <span style={{color: 'rgba(44, 52, 64, 0.85)'}}>{pricePolicySn}</span>
                        </div>
                    )
                }

                <div style={{
                    display: 'flex',
                    fontSize: 14,
                    color: 'rgba(43, 52, 65, 1)',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>价格政策类型：</div>
                    <Select value={policyType} style={{width: 356}} onChange={(value) => {
                        this.setState({
                            policyType: value
                        })
                    }}>
                        <Option value="" disabled>请选择</Option>
                        <Option value={1}>通用价格</Option>
                        <Option value={2}>特殊价格</Option>
                        <Option value={3}>促销价格</Option>
                    </Select>
                </div>

                <div style={{
                    display: 'flex',
                    fontSize: 14,
                    color: 'rgba(43, 52, 65, 1)',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>价格政策名称：</div>
                    <Input
                        style={{width: 356}}
                        value={policyName}
                        onChange={(e) => {
                            this.setState({
                                policyName: e.target.value
                            })
                        }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    fontSize: 14,
                    color: 'rgba(43, 52, 65, 1)',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>价格有效时间：</div>
                    <RangePicker
                        style={{width: 356}}
                        value={rangeDate}
                        onChange={(date, dateString) => {
                            this.setState({
                                rangeDate: date,
                                startTime: dateString[0],
                                endTime: dateString[1]
                            })
                        }}
                    />
                </div>

                <div style={{
                    display: 'flex',
                    fontSize: 14,
                    color: 'rgba(43, 52, 65, 1)',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>价格政策通知：</div>
                    <Radio.Group
                        value={isSend}
                        onChange={(e) => {
                            this.setState({
                                isSend: e.target.value
                            })
                        }}
                    >
                        <Radio value={1}>发送通知</Radio>
                        <Radio value={0}>不发送通知</Radio>
                    </Radio.Group>
                </div>

                <div style={{
                    display: 'flex',
                    fontSize: 14,
                    color: 'rgba(43, 52, 65, 1)',
                    alignItems: 'center',
                    marginTop: 15
                }}>
                    <div style={{width: 125, textAlign: 'right', paddingRight: 10}}>适用对象：</div>
                    <Button
                        style={{border: '1px solid rgba(68, 129, 235, 1)', color: 'rgba(68, 129, 235, 1)', width: 88}}
                        onClick={() => {
                            const {projectInfo} = this.state;
                            const companyIdArr = [];
                            const projectIdArr = [];
                            projectInfo.forEach(item => {
                                companyIdArr.push(item.companyId);
                                item.projectArr.forEach(p => {
                                    projectIdArr.push(p.projectId);
                                })
                            })
                            this.modalRef.current.syncCheckedStatus(companyIdArr, projectIdArr);
                            this.setState({
                                showModal: true
                            })
                        }}
                    >
                        点击添加
                    </Button>
                </div>

                {this.makeTreeView()}
            </>
        )
    }

    makeTreeView = () => {
        let {projectInfo} = this.state;
        const treeData = [];
        projectInfo.forEach((company, index) => {
            let obj = {};
            obj.title = company.company;
            obj.key = company.companyId;
            obj.index = index;
            obj.children = [];
            company.projectArr.forEach((project, idx) => {
                let p = {};
                p.title = project.projectName;
                p.key = project.projectId;
                p.isLeaf = true
                p.idx = idx;
                p.index = index;
                obj.children.push(p);
            });
            treeData.push(obj);
        })

        return (
            <div style={{paddingLeft: 125, marginTop: 25}}>
                <Tree
                    multiple
                    selectable={false}
                    showLine={true}
                    titleRender={nodeData => {
                        const {title, key, index, idx, isLeaf} = nodeData;
                        return (
                            <div className={RentStyle.treeNode} key={key}>
                                <span>{title}</span>
                                <DeleteOutlined className={RentStyle.treeIcon} onClick={() => {
                                    if (isLeaf) {
                                        let projectArr = projectInfo[index].projectArr;
                                        projectArr.splice(idx, 1);
                                        this.setState({
                                            isAllProject: 0,
                                            projectInfo
                                        })

                                    } else {
                                        projectInfo.splice(index, 1);
                                        this.setState({
                                            isAllCustomer: 0,
                                            projectInfo
                                        })
                                    }
                                }}/>
                            </div>
                        )
                    }}
                    treeData={treeData}
                />
            </div>
        )
    }

    makeTableView = () => {
        const {selectedArr, startTime, endTime, pricePolicySn = '0'} = this.state;
        return (
            <>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    height: 38,
                    backgroundColor: 'rgba(43, 52, 65, 0.05)',
                    padding: '0 15px',
                    marginTop: 25
                }}>
                    <span>租赁明细</span>
                    <div style={{
                        width: 260,
                        display: "flex",
                        justifyContent: "space-between",
                        flexDirection: 'row-reverse'
                    }}>
                        <Button
                            style={{width: 88, height: 33, borderRadius: 3}}
                            type={'primary'}
                            onClick={() => {
                                this.props.history.replace({
                                    pathname: '/pages/appCenter/rentAssistant/rentAssistantHome/rentalWarehouse',
                                    state: {
                                        ...this.state,
                                        pricePolicySn,
                                        havePolicyInfo: pricePolicySn !== '0'
                                    }
                                })
                            }}
                        >
                            添加
                        </Button>

                        {
                            Boolean(selectedArr.length) && (
                                <Button
                                    style={{
                                        width: 125,
                                        height: 33,
                                        borderRadius: 3,
                                        borderColor: 'rgba(68, 129, 235, 1)',
                                        color: 'rgba(68, 129, 235, 1)'
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            isShowMultipleChangeModal: true
                                        })
                                    }}
                                >
                                    批量修改
                                </Button>
                            )
                        }

                    </div>
                </div>
                <div style={{width: '100%', marginTop: 15}}>
                    {/* 表头 */}
                    <div style={{
                        display: 'flex',
                        height: 56,
                        backgroundColor: '#F1F1FA',
                        borderRadius: 6,
                        fontSize: 14,
                        color: '#2B3441',
                        alignItems: 'center'
                    }}>
                        <div style={{flex: 1.8}} className={RentStyle.policyTabelItem}>物资名称</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>SKU</div>
                        <div style={{flex: 1.25}} className={RentStyle.policyTabelItem}>规格</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>计费单位</div>
                        <div style={{flex: 0.75}} className={RentStyle.policyTabelItem}>计费周期</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>租赁单价/元(含税)</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>折扣(%)</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>起止日期</div>
                        <div style={{flex: 1}} className={RentStyle.policyTabelItem}>操作</div>
                    </div>

                    {/* 表数据展示 */}
                    {
                        selectedArr && selectedArr.map((item, index) => (
                            <div style={{display: 'flex', fontSize: 14, color: '#2B3441', paddingTop: 10}}
                                 key={item.leaseGoodsParentSn}>
                                <div style={{width: '18%', border: '1px solid #EBEDF0', borderTop: null}}>
                                    <div style={{display: 'flex', boxSizing: "border-box", paddingTop: 10}}>
                                        <img style={{width: 62, height: 62, borderRadius: 6}} src={item.goodsImageUrl}
                                             alt=''/>
                                        <div style={{
                                            display: 'flex',
                                            flexDirection: "column",
                                            justifyContent: 'space-between',
                                            width: 'calc(100% - 62px)',
                                            overflowWrap: 'break-word'
                                        }}>
                                            <Tooltip title={item.goodsName} color={'rgba(0, 0, 0, 0.6)'}>
                                                <p className={RentStyle.desc}
                                                   style={{color: '#4481EB', marginLeft: 10}}>
                                                    {item.goodsName}
                                                </p>
                                            </Tooltip>
                                            <span style={{
                                                fontSize: 12,
                                                color: '#2B3441',
                                                marginLeft: 10
                                            }}>{item.goodsCode}</span>
                                        </div>
                                    </div>
                                </div>
                                <div style={{width: '82%'}}>
                                    {
                                        item.skuList && item.skuList.map((skuItem, skuIndex) => (
                                            <div style={{display: 'flex'}} key={skuItem.leaseGoodsSn}>
                                                {/*sku*/}
                                                <div style={{
                                                    flex: 1,
                                                    height: 108,
                                                    borderBottom: '1px solid #EBEDF0',
                                                    flexDirection: 'column'
                                                }} className={RentStyle.policyTabelItem}>
                                                    <img style={{width: 62, height: 62, borderRadius: 6}}
                                                         src={skuItem.goodsImageUrl} alt=''/>
                                                    <span style={{fontSize: 12, color: '#2B3441'}}>
														{skuItem.goodsCode}
													</span>
                                                </div>
                                                {/*规格*/}
                                                <div style={{
                                                    flex: 1.25,
                                                    height: 108,
                                                    borderBottom: '1px solid #EBEDF0',
                                                    flexDirection: 'column'
                                                }} className={RentStyle.policyTabelItem}>
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
                                                {/*计费单位*/}
                                                <div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0'}}
                                                     className={RentStyle.policyTabelItem}>
                                                    {skuItem.chargeUnit}
                                                </div>
                                                {/*计费周期*/}
                                                <div
                                                    style={{flex: 0.75, height: 108, borderBottom: '1px solid #EBEDF0'}}
                                                    className={RentStyle.policyTabelItem}>
                                                    {skuItem.timeUnit}
                                                </div>
                                                {/*租赁单价/元(含税)*/}
                                                <div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0'}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <Input
                                                        style={{width: 78}}
                                                        value={skuItem.unitPrice}
                                                        onChange={(e) => {
                                                            const unitPrice = e.target.value;
                                                            selectedArr[index].skuList[skuIndex].unitPrice = unitPrice;
                                                            this.setState({
                                                                selectedArr
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                {/*折扣*/}
                                                <div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0'}}
                                                     className={RentStyle.policyTabelItem}>
                                                    <Input
                                                        style={{width: 78}}
                                                        value={skuItem.discount}
                                                        onChange={(e) => {
                                                            const discount = e.target.value;
                                                            selectedArr[index].skuList[skuIndex].discount = discount;
                                                            this.setState({
                                                                selectedArr
                                                            })
                                                        }}
                                                    />
                                                </div>
                                                {/*起止日期*/}
                                                <div style={{
                                                    flex: 1,
                                                    height: 108,
                                                    borderBottom: '1px solid #EBEDF0',
                                                    flexDirection: 'column'
                                                }} className={RentStyle.policyTabelItem}>
                                                    <span>{startTime}</span>
                                                    <span>{endTime ? '至' : ''}</span>
                                                    <span>{endTime}</span>
                                                </div>
                                                {/*操作*/}
                                                <div style={{flex: 1, height: 108, borderBottom: '1px solid #EBEDF0'}}
                                                     className={RentStyle.policyTabelItem}>
													<span
                                                        style={{color: 'rgba(241, 44, 32, 1)', cursor: 'pointer'}}
                                                        onClick={() => {
                                                            this.deleteSku(index, skuIndex)
                                                        }}
                                                    >删除</span>
                                                </div>
                                            </div>
                                        ))
                                    }

                                </div>
                            </div>
                        ))
                    }

                    {/*无数据提示*/}
                    {
                        (selectedArr && selectedArr.length === 0) && (
                            <div style={{
                                height: 300,
                                border: '2px solid rgba(43, 52, 65, 0.06)',
                                borderTop: null,
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                fontSize: 18,
                                color: 'rgba(43, 52, 65, 0.5)'
                            }}>
                                暂无数据
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    makeSaveButton = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', marginTop: 38}}>
                <Button
                    style={{width: 256, height: 50, fontSize: 18, borderRadius: 6}}
                    type={'primary'}
                    onClick={() => {
                        this.savePricePolicy();
                    }}
                >
                    保存
                </Button>
            </div>
        )
    }

    deleteSku = (index, skuIndex) => {
        let {selectedArr} = this.state;
        selectedArr[index].skuList.splice(skuIndex, 1);
        selectedArr = selectedArr.filter(item => {
            return item.skuList.length
        })
        this.setState({
            selectedArr
        })
    }

    savePricePolicy = () => {
        const {
            projectInfo, isSend, policyName, policyType, selectedArr, startTime, endTime, isAllCustomer, isAllProject,
            follow
        } = this.state;
        if (!policyType) {
            return message.error('请选择价格政策类型!')
        } else if (!policyName) {
            return message.error('请输入价格政策名称!')
        } else if (policyName.length > 50) {
            return message.error('价格政策名称最大长度为50个字符!')
        } else if (!startTime || !endTime) {
            return message.error('请选择价格有效时间!')
        } else if (projectInfo.length === 0) {
            return message.error('请选择适用对象!')
        } else if (selectedArr.length === 0) {
            return message.error('请添加租赁明细!')
        }

        const newSkuList = [];
        for (let i = 0; i < selectedArr.length; i++) {
            const {skuList} = selectedArr[i];
            for (let k = 0; k < skuList.length; k++) {
                const {leaseGoodsSn, unitPrice, discount} = skuList[k];

                // 租赁单价（含税）
                if (!unitPrice) {
                    return message.error('请输入租赁单价（含税）!');
                } else if (isNaN(unitPrice)) {
                    return message.error('租赁单价（含税）需为数字!');
                } else if (Number(unitPrice) < 0) {
                    return message.error('租赁单价（含税）需为大于等于0的数字!');
                }
                if (Number(unitPrice) > 999999999999999999) {
                    return message.error('租赁单价（含税）最大为999999999999999999')
                }

                const valueArr = unitPrice.split('.');
                if (valueArr[1] && valueArr[1].length > 4) {
                    return message.error('租赁单价（含税）最多保留4位小数')
                }

                // 折扣
                if (!discount) {
                    return message.error('请输入折扣!');
                } else if (isNaN(discount)) {
                    return message.error('折扣需为数字!');
                } else if (Number(discount) < 0) {
                    return message.error('折扣需为大于等于0的数字!');
                }
                if (Number(discount) > 100) {
                    return message.error('折扣最大为100')
                }

                const discountValueArr = unitPrice.split('.');
                if (discountValueArr[1] && discountValueArr[1].length > 4) {
                    return message.error('折扣最多保留4位小数')
                }

                newSkuList.push({
                    leaseGoodsSn,
                    unitPrice,
                    discount
                })
            }
        }

        const customerList = [];
        projectInfo.forEach(company => {
            const data = {
                lesseeSn: company.companyId,
                projectSnList: []
            }
            company.projectArr.forEach(p => {
                data.projectSnList.push(p.projectId)
            })
            customerList.push(data)
        })

        const {pricePolicySn} = this.props.match.params;
        const flag = pricePolicySn === '0';
        const api = flag ? 'RentAsstAddPolicy' : 'RentAsstPolicyUpdate';
        const params = {
            pricePolicySn,
            pricePolicyName: policyName,
            pricePolicyType: policyType,
            effectiveStartTime: startTime,
            effectiveEndTime: endTime,
            isNotify: isSend,
            isAllCustomer: follow ? isAllCustomer : 0,
            isAllProject: follow ? isAllCustomer : 0,
            customerList,
            skuList: newSkuList
        }
        flag && delete params.pricePolicySn;

        RentModel[api](params, res => {
            message.success(flag ? '创建成功!' : '修改成功!');
            this.props.history.replace('/pages/appCenter/rentAssistant/rentAssistantHome/rentalPricePolicyList');
        })

    }

    getPolicyInfo = (pricePolicySn) => {
        // 获取用户信息
        RentModel.RentAsstPolicyInfo({
            pricePolicySn
        }, res => {
            const {
                pricePolicyName, pricePolicyType, effectiveStartTime, effectiveEndTime, isAllCustomer,
                isAllProject, customerList, leaseGoodsList, isNotify
            } = res.data;
            const projectInfo = [];

            customerList.forEach((item) => {
                let obj = {
                    company: item.lesseeName,
                    companyId: item.lesseeSn,
                    projectArr: []
                };

                item.projectList.forEach(p => {
                    obj.projectArr.push({
                        projectId: p.projectSn,
                        projectName: p.projectName
                    })
                })

                projectInfo.push(obj)
            })

            this.setState({
                pricePolicySn,
                policyName: pricePolicyName,
                policyType: pricePolicyType,
                startTime: effectiveStartTime,
                endTime: effectiveEndTime,
                rangeDate: [moment(effectiveStartTime), moment(effectiveEndTime)],
                isSend: isNotify,
                isAllCustomer,
                isAllProject,
                projectInfo,
                selectedArr: leaseGoodsList,
                follow: isAllCustomer && isAllProject
            })
        })
    }

}

