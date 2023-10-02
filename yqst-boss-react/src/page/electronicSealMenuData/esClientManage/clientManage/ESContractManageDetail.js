import React from 'react';
import {Card, Table, Form, Button} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import Model from "../Model";

class ESContractManageDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companySn: '',
            companyName: '',
            platformSn: '',
            platformName: '',
            legalName: '',
            creatorName: '',
            creatorMobile: '',
            totalPaymentAmount: '',
            status: '',
            list: [],
        };
    }

    componentDidMount() {
        let companySn = this.props.location.search.substr(1).split("=")[1];
        if(companySn){
            this.setState({
                companySn
            })

            Model.GetCustomerDetail({companySn}, res=>{
                this.setState({
                    ...res.data
                })
            })

            Model.GetCustomerPurchaseList({companySn}, res=>{
                this.setState({
                    list: res.data
                })
            })

        }

    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "客户管理",  link: '/Pages/ESClientList'}, {name: "客户详情"}]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Link to={'/Pages/ESClientList'}>
                        <Button icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
            >
                {this.makeBaseView()}
                {this.tableView()}
            </TabsViewContent>
        );
    }


    makeBaseView() {
        const {companySn, companyName, platformName, legalName, creatorName, creatorMobile, totalPaymentAmount, status} = this.state
        let allData = [
            {
                title: '客户信息',
                key: 'SQKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '客户编号', span: 12, value: companySn},
                    {key: 'qw2', type: 'Texts', label: '客户名称', span: 12, value: companyName},
                    {key: 'qw3', type: 'Texts', label: '客户所属平台', span: 12, value: platformName},
                    {key: 'qw4', type: 'Texts', label: '客户法人', span: 12, value: legalName},
                    {key: 'qw5', type: 'Texts', label: '客户经办人', span: 12, value: creatorName},
                    {key: 'qw6', type: 'Texts', label: '客户电话', span: 12, value: creatorMobile},
                    {key: 'qw7', type: 'Texts', label: '客户累计付费金额', span: 12, value: totalPaymentAmount},
                    {key: 'qw8', type: 'Texts', label: '客户状态', span: 12, value: status},
                ],
                style: {},
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
        const columns = [
            {
                title: '购买编号',
                dataIndex: 'orderSn',
            },
            {
                title: '购买商品',
                dataIndex: 'goodsName',
            },
            {
                title: '规格',
                dataIndex: 'specList',
                render(text){
                    return (
                        <ul style={{listStyle: 'none', width: '100%', height: '100%', margin: 0, padding: 0}}>
                            {
                                text && text.map(item=>{
                                    return (
                                        <li key={item.specName}>{item.specName} {item.specValue}</li>
                                    )
                                })
                            }
                        </ul>
                    )
                }
            },
            {
                title: '购买时间',
                dataIndex: 'createTime',
            },
            {
                title: '购买金额',
                dataIndex: 'totalAmount',
            }
        ];
        const {list} = this.state;
        return (
            <div style={{
                marginTop: 26,
                width: '95%',
                margin: '26px auto 0'
            }}>
                <span style={{fontSize: 15}}>客户购买记录</span>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'orderSn'}
                    bordered
                    style={{
                        marginTop: 26
                    }}
                />
            </div>

        )
    }

}

export default ESContractManageDetail
