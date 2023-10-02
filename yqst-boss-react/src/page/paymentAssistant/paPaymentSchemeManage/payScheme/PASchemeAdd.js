import React, {Component} from 'react';
import {Button, Card, Input, Select, message, notification} from "antd";
import {PlusOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import Model from "../../Model";

const {Option} = Select;

export default class PASchemeAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            planName: '',
            planDescribe: '',
            bossPayPlanRelationAssistListVOList: [
                {
                    payChannelSn: '',
                    payRateSn: '',
                    payLimitSn: ''
                }
            ],
            channelOption: [],
            rateOption: [],
            limitOption: [],
        };
        this.sn = '';
        this.loading = true;
        this.requestNum = 0; // 请求次数，模拟promise.all
    }


    // 获取要编辑的方案信息
    getSchemeInfo = (sn)=>{
        Model.GetPayPlanInfo({sn}, res=>{
            const {planName, planDescribe, bossPayPlanRelationAssistListVOList} = res.data;
            this.setState({
                planName,
                planDescribe,
                bossPayPlanRelationAssistListVOList
            })
        })
    }


    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1];
        this.requestNum = 3;
        // 获取支付通道列表
        Model.GetChannelOptionList({}, res=>{
            this.requestNum -= 1;
            this.setState({
                channelOption: res.data
            }, ()=>{
                this.initSelect();
            })
        })

        Model.GetRateList({}, res=>{
            this.requestNum -= 1;
            this.setState({
                rateOption: res.data
            }, ()=>{
                this.initSelect()
            })
        })

        Model.GetLimitList({}, res=>{
            this.requestNum -= 1;
            this.setState({
                limitOption: res.data
            }, ()=>{
                this.initSelect()
            })
        })
    }

    // 初始化选框的值
    initSelect = ()=>{
        if(this.requestNum === 0){
            let {bossPayPlanRelationAssistListVOList, channelOption, rateOption, limitOption} = this.state;
            if(channelOption.length === 0){
                message.error(
                    <span>未创建支付通道！</span>
                )
                return true;
            }else if(rateOption.length === 0){
                message.error(
                    <span>请先添加支付费率方案！
                        <a onClick={()=>{
                            this.props.history.replace('/Pages/PAPayRateAdd')
                            message.destroy()
                        }}>去添加</a>
                    </span>
                )

                return true;
            }else if(limitOption.length === 0){
                message.error(
                    <span>请先添加支付限额方案！
                        <a onClick={()=>{
                            this.props.history.replace('/Pages/PAPayLimitationAdd')
                            message.destroy()
                        }}>去添加</a>
                    </span>
                )
                return true;
            }

            if(this.loading === true){
                this.loading = false;
                if(this.sn){
                    this.getSchemeInfo(this.sn)
                }else {
                    bossPayPlanRelationAssistListVOList[0].payChannelSn = channelOption[0].sn;
                    bossPayPlanRelationAssistListVOList[0].payRateSn = rateOption[0].sn;
                    bossPayPlanRelationAssistListVOList[0].payLimitSn = limitOption[0].sn;
                    this.setState({
                        bossPayPlanRelationAssistListVOList
                    })
                }
            }

        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '支付方案', link: '/Pages/PASchemeList'}, {name: "增加支付方案"}]}
                topBtn={
                    <Link to='/Pages/PASchemeList'>
                        <Button type='primary' icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
            >
                {this.makeBaseInfo()}
                {this.makePayChannelView()}
                {this.addPayChannelView()}
                {this.saveButton()}
            </TabsViewContent>
        )
    }


    makeBaseInfo = ()=>{
        const {planName, planDescribe} = this.state;
        return (
            <Card title='基本信息' headStyle={{backgroundColor: '#f3f3f3'}}>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                    <div>
                        <span>方案名称：</span>
                        <Input value={planName} placeholder='请输入内容' style={{width: 300}} onChange={(e)=>{
                            this.handleBaseInfoChange('planName', e.target.value)
                        }}/>
                    </div>
                    <div style={{marginTop: 15}}>
                        <span style={{verticalAlign: 'top'}}>方案描述：</span>
                        <Input.TextArea value={planDescribe} placeholder='请输入内容' style={{width: 300}} autoSize={{minRows: 3}} onChange={e=>{
                            this.handleBaseInfoChange('planDescribe', e.target.value)
                        }}/>
                    </div>
                </div>
            </Card>
        )
    }

    handleBaseInfoChange = (name, value)=>{
        this.setState({
            [name]: value
        })
    }

    makePayChannelView = ()=>{
        const {bossPayPlanRelationAssistListVOList, channelOption, rateOption, limitOption} = this.state;
        return (
            <ul style={{listStyle: 'none', padding: 0}}>
                {
                    bossPayPlanRelationAssistListVOList && bossPayPlanRelationAssistListVOList.map((item, index)=>{
                        return (
                            <li key={index} style={{marginTop: 15}}>
                                <Card title={'支付通道 #' + (index + 1)} headStyle={{backgroundColor: '#f3f3f3'}} extra={
                                    bossPayPlanRelationAssistListVOList.length > 1 ?
                                    <Button type='danger' onClick={()=>{this.deletePayChannel(index)}}>删除</Button> : null
                                }>
                                    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-around'}}>
                                        <div>
                                            <span>支付通道：</span>
                                            <Select value={item.payChannelSn} style={{width: 300}} onChange={(value)=>{
                                                this.editPayChannel(index, 'payChannelSn', value)
                                            }}>
                                                {
                                                    channelOption && channelOption.map(item=>
                                                        <Option key={item.sn} value={item.sn}>{item.channelName}</Option>
                                                    )
                                                }
                                            </Select>
                                        </div>
                                        <div style={{margin: '15px 0'}}>
                                            <span>支付费率：</span>
                                            <Select value={item.payRateSn} style={{width: 300}} onChange={(value)=>{
                                                this.editPayChannel(index, 'payRateSn', value)
                                            }}>
                                                {
                                                    rateOption && rateOption.map(item=>
                                                        <Option key={item.sn} value={item.sn}>{item.rateName}</Option>
                                                    )
                                                }
                                            </Select>
                                        </div>
                                        <div>
                                            <span>支付限额：</span>
                                            <Select value={item.payLimitSn} style={{width: 300}} onChange={(value)=>{
                                                this.editPayChannel(index, 'payLimitSn', value)
                                            }}>
                                                {
                                                    limitOption && limitOption.map(item=>
                                                        <Option key={item.sn} value={item.sn}>{item.limitName}</Option>
                                                    )
                                                }
                                            </Select>
                                        </div>
                                    </div>
                                </Card>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    addPayChannelView = ()=>{
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: 30,
                border: '1px dashed #e9e9e9',
                cursor: 'pointer',
                borderRadius: 6,
                marginTop: 10
            }} onClick={()=>{
                let {bossPayPlanRelationAssistListVOList, channelOption, rateOption, limitOption} = this.state;
                bossPayPlanRelationAssistListVOList.push({
                    payChannelSn: channelOption[0] ? channelOption[0].sn : '',
                    payRateSn: rateOption[0] ? rateOption[0].sn : '',
                    payLimitSn: limitOption[0] ? limitOption[0].sn : '',
                });
                this.setState({
                    bossPayPlanRelationAssistListVOList
                })
            }}>
                <PlusOutlined />
                添加
            </div>
        )
    }

    deletePayChannel = (index)=>{
        let {bossPayPlanRelationAssistListVOList} = this.state;
        bossPayPlanRelationAssistListVOList.splice(index, 1);
        this.setState({
            bossPayPlanRelationAssistListVOList
        })
    }

    editPayChannel = (index, attr, newValue)=>{
        let {bossPayPlanRelationAssistListVOList} = this.state;
        bossPayPlanRelationAssistListVOList[index][attr] = newValue;
        this.setState({
            bossPayPlanRelationAssistListVOList
        })
    }

    // 检验对象数组中是否有重复的值
    checkArr = (arr)=>{
        for(let i=0; i<arr.length; i++){
            for(let j=0; j<arr.length; j++){

                if( i !== j
                    &&arr[i].payChannelSn === arr[j].payChannelSn
                    // && arr[i].payRateSn === arr[j].payRateSn
                    // && arr[i].payLimitSn === arr[j].payLimitSn
                ){
                    message.error(`支付通道选项不能重复！`);
                    return true
                }
            }
        }
    }

    saveButton = ()=>{
        return (
            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80}}>
                <Button type='primary' onClick={()=>{
                    const {planName, planDescribe, bossPayPlanRelationAssistListVOList} = this.state;
                    if(!planName){
                        message.error('请输入方案名称！');
                        return
                    }else if(!planDescribe){
                        message.error('请输入方案描述！');
                        return
                    }

                    // 初始化过一次，不会再初始化，这里调用是为了做校验
                    let isInit = this.initSelect();
                    if (isInit){
                        return;
                    }

                    // 是否存在重复项
                    let flag = this.checkArr(bossPayPlanRelationAssistListVOList);
                    if(flag){
                        return;
                    }


                    Model.AddOrEditPayPlanInfo({
                        sn: this.sn,
                        planName,
                        planDescribe,
                        payPlanRelationAssistDTOList: bossPayPlanRelationAssistListVOList
                    }, res=>{
                        if(this.sn){
                            message.success('编辑方案成功！');
                        }else {
                            message.success('添加方案成功！');
                        }

                        this.props.history.replace('/Pages/PASchemeList');
                    })
                }}>确认保存</Button>
            </div>
        )
    }
}
