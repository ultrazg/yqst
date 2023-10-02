import React, {Component} from 'react';
import {Card, Form} from "antd";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import {Button, Modal} from "antd";
import './ESServiceRuleDetail.css';
import Model from "../Model";

class ESServiceRuleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            detailInfo: {
                serviceRuleSn: '',
                ruleCode: "",
                shopSn: "",
                goodsParentSn: "",
                goodsSn: "",
                goodsName: "",
                specList: [],
                serviceLife: 1,
                ruleType: "",
                createTime: "",
                serviceList: []
            }

        };
    }

    componentDidMount() {
        let serviceRuleSn = this.props.location.search.substr(1).split('=')[1];
        // 获取规则详情
        Model.GetServiceRuleDetail({serviceRuleSn}, res=>{

            this.setState({
                detailInfo: res.data
            })

        }, err => {
            console.log(err)
        });
    }

    render() {
        const {serviceRuleSn} = this.state.detailInfo;

        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: '服务管理', link: '/Pages/esServiceRulesList'}, {name: "服务规则详情"}]}
            >
                {this.makeBaseView()}

                <div style={{height: 180 ,display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Button type='primary' style={{width: 138, height: 38, marginRight: '6%'}}
                        onClick={()=>{ this.props.history.push('/Pages/ESAddServiceRule?serviceRuleSn=' + serviceRuleSn) }}>
                        修改
                    </Button>
                    <Button type='primary' style={{width: 138, height: 38, marginLeft: '6%',}}
                        onClick={()=>{this.setState({visible: true})}}>
                        删除
                    </Button>
                </div>

                {this.renderModal()}
            </TabsViewContent>
        )
    }

    makeBaseView = () => {
        const {serviceRuleSn, createTime, goodsParentSn, goodsName, serviceLife, ruleType, serviceList, specList} = this.state.detailInfo;
        let skuName = '';
        specList && specList.forEach((item) => {
            skuName += item.specValue + '； '
        });

        let allData = [
            {
                title: '基本信息',
                key: 'baseKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '规则ID', span: 12, value: serviceRuleSn},
                    {key: 'qw2', type: 'Texts', label: '创建时间', span: 12, value: createTime},
                    {key: 'qw3', type: 'Texts', label: 'spu', span: 12, value: goodsName},
                    {key: 'qw4', type: 'Texts', label: 'sku', span: 12, value: skuName},
                ],
                style: {},
            },
            {
                title: '服务内容',
                key: 'serviceContentKey',
                data: [],
                style: {marginTop: 30},
            },
            {
                title: '服务设置',
                key: 'serviceSettingKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '服务期限', span: 12, value: serviceLife ? serviceLife + '个月' : '无限'},
                    {key: 'qw3', type: 'Texts', label: '是否为认证前服务', span: 12, value: ruleType === 1 ? ' 是' : ' 否'},
                ],
                style: {marginTop: 30}
            },
        ];

        // 服务内容的数据
        serviceList && serviceList.forEach((item, index)=>{
            allData[1].data.push({key: item.serviceName, type: 'Texts', label: '服务名称', span: 12, value: item.serviceName})
            allData[1].data.push({key: item.serviceNum + '', type: 'Texts', label: '服务数量', span: 12, value: item.serviceNum})
        })

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data}/>
                    </Card>
                })
            }
        </div>
    }

    handleModalClick = (num)=>{
        // 确定删除该服务规则
        if(num === 1){
            let {serviceRuleSn} = this.state.detailInfo
            Model.DeleteServiceRule({serviceRuleSn}, res=>{
                this.props.history.replace('/Pages/esServiceRulesList')
            })
        }

        this.setState({
            visible: false
        })

    }

    renderModal = ()=>{
        return (
            <Modal
                title={null}
                visible={this.state.visible}
                closable={false}
                footer={null}
                width={266}
                onCancel={()=>{this.setState({visible: false})}}
                className='ESServiceRuleDetail-modal'
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}>
                    <h3 style={{paddingTop: 10}}>删除规则</h3>
                    <div style={{textAlign: 'center', boxSizing: 'border-box', padding: '10px 25px'}}>是否删除该规则，删除后已购买的用户可继续使用</div>
                    <div style={{width: '100%', height: 50, display: 'flex', borderTop: '1px solid #cccccc', }}>
                        <div style={{ width: '50%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', borderRight: '1px solid #cccccc', cursor: 'pointer' }}
                            onClick={()=>{this.handleModalClick(0)}}>
                            取消
                        </div>
                        <div style={{ width: '50%', height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer' }}
                            onClick={()=>{this.handleModalClick(1)}}>
                            删除
                        </div>
                    </div>
                </div>
            </Modal>
        )
    }
}

export default ESServiceRuleDetail