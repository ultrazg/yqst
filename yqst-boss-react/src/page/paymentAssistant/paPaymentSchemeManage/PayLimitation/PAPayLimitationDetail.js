import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Form} from "antd";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";


class PAPayLimitationDetail extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: "限额详情"}]}
                topBtn={(
                    <Link to='/Pages/PAPayLimitation'>
                        <Button type='primary'>返回</Button>
                    </Link>
                )}
            >
                {this.makeBaseView()}
            </TabsViewContent>
        )
    }

    makeBaseView = () => {
        let allData = [
            {
                title: '基本信息',
                key: 'baseKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '限额名称', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '限额描述', span: 12, value: ''},
                ],
                style: {},
            },
            {
                title: '限额设置',
                key: 'limitationKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '每笔收支付金额', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '每笔充值金额', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '每笔提现金额', span: 12, value: ''},
                ],
            },
            {
                title: '限笔数设置',
                key: 'limitationNumKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '收支付笔数', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '充值笔数', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '提现笔数', span: 12, value: ''},
                ],
            },
        ];

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {marginTop: 15}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
        </div>
    }
}

export default PAPayLimitationDetail;