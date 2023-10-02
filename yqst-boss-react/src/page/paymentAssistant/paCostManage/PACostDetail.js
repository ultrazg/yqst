import React, {Component} from 'react';
import {Button, Card, Form, Table} from "antd";
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";


class PACostDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '费用明细', link: '/Pages.PACostList'}, {name: '明细详情'}]}
                topBtn={
                    <Link to='/Pages/PACostList'>
                        <Button type='primary'>返回</Button>
                    </Link>
                }
            >
                {this.makeBaseView()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }


    makeBaseView = () => {
        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '账单状态', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '企业名称', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '应用名称', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '账单金额', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '账单日期', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '扣费日期', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '账单周期 ＃2020/05/07-2020/06/06',
                key: 'ZFKey1',
                data: [
                    {key: 'qw1', type: 'Texts', label: '支付通道', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '结算账户', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '计费项目', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '计费方式', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '费率分段', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '费率分段信息',
                key: 'ZFKey2',
                data: [
                    {key: 'qw1', type: 'Texts', label: '分段1区间', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '分段1费率', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            }
        ];

        return (
            <div>
                {
                    allData.map((item, idx) => {
                        return (
                            <Card
                                key={'car_' + idx}
                                type="inner"
                                title={item.title || '信息'}
                                style={item.style ? item.style : {}}
                                bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                            >
                                <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                            </Card>
                        )
                    })
                }
            </div>
        )
    }

    makeTableView = ()=>{

        const columns = [
            {
                title: '序号',
                dataIndex: '',
            },
            {
                title: '计费项目',
                dataIndex: '',
            },
            {
                title: '项目金额',
                dataIndex: '',
            },
            {
                title: '计费模式',
                dataIndex: ''
            },
            {
                title: '使用时间',
                dataIndex: ''
            },
            {
                title: '价格',
                dataIndex: '',
            },
        ];
        const data = [{}];

        return(
            <div>
                <h3 style={{marginLeft: 10, marginTop: 18}}>记账明细</h3>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    style={{marginTop: 18}}
                />
            </div>
        )
    }

}

export default PACostDetail;