import React, {Component} from 'react';
import {Card, Form, Table} from "antd";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import Model from "../Model";

class ESServiceInstanceDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            detailInfo: {},
            useLogList: []
        };
    }

    componentDidMount() {
        let serviceInstanceSn = this.props.location.search.substr(1).split("=")[1];
        if(serviceInstanceSn){
            Model.GetServiceInstanceDetail({serviceInstanceSn}, res=>{
                this.setState({
                    detailInfo: res.data
                })
            })

            Model.GetServiceInstanceLog({serviceInstanceSn}, res=>{
                this.setState({
                    useLogList: res.data
                })
            })
        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: ''}, {name: '服务实例管理', link: '/Pages/ESServiceInstanceList'}, {name: "服务实例详情"}]}
            >
                {this.makeInfoView()}
                {this.tableView()}
            </TabsViewContent>
        )
    }

    makeInfoView = () => {
        const {serviceInstanceSn, companyName, specList=[], instanceName, goodsPrice, goodsNum, totalAmount, serviceList} = this.state.detailInfo;
        let specStr = '';

        for(let i=0; i<specList.length; i++){
            specStr += specList[i].specName + ' ' + specList[i].specValue + ';'
        }
        let allData = [
            {
                title: '基本信息',
                key: 'baseKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '实例ID', span: 12, value: serviceInstanceSn},
                    {key: 'qw3', type: 'Texts', label: '所属权用户', span: 12, value: companyName},
                    {key: 'qw4', type: 'Texts', label: '实例规格', span: 12, value: specStr},
                ],
                style: {},
            },
            {
                title: '实例详情',
                key: 'instanceKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '服务名称', span: 12, value: (<ul style={{listStyle: 'none', padding: 0}}>
                            {
                                serviceList && serviceList.map(item=>{
                                    return (
                                        <li key={item.serviceSn}>{item.serviceName} {item.serviceNum}次</li>
                                    )
                                })
                            }
                        </ul>)},
                ],
                style: {marginTop: 30},
            },
            {
                title: '购买详情',
                key: 'buyKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '规格单价', span: 12, value: goodsPrice},
                    {key: 'qw2', type: 'Texts', label: '购买数量', span: 12, value: goodsNum},
                    {key: 'qw3', type: 'Texts', label: '购买总价', span: 12, value: totalAmount},
                ],
                style: {marginTop: 30}

            },
        ];

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

    tableView = ()=> {

        const {useLogList} = this.state;

        const columns = [
            {
                title: '使用编号',
                dataIndex: 'logSn'
            },
            {
                title: '使用时间',
                dataIndex: 'createTime'
            },
            {
                title: '使用ID',
                dataIndex: 'userName'
            },
            {
                title: '服务名称',
                dataIndex: 'serviceName'
            }
        ];

        return (
            <Card title='使用记录' style={{marginTop: 30}}>
                <Table
                    columns={columns}
                    dataSource={useLogList}
                    bordered
                    rowKey='logSn'
                    // pagination={
                    //     {
                    //         total: total,
                    //         current: current,
                    //         pageSize: pageSize,
                    //         onChange: (a, b) => {
                    //             current = a;
                    //             this.setState({current}, () => {
                    //                 this.getServiceInstanceList();
                    //             })
                    //         },
                    //         showTotal: (total, range) => `共有${total}条`
                    //     }
                    // }
                />
            </Card>
        )
    }
}

export default ESServiceInstanceDetail