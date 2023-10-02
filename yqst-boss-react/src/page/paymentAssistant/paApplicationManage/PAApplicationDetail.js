import React, {Component} from 'react';
import {Button, Card} from "antd";
import {Link} from "react-router-dom";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import {RollbackOutlined} from '@ant-design/icons'

class PAApplicationDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '收支付助手'},
                    {name: '应用管理'},
                    {name: "应用列表", link: '/Pages/PAApplicationList'},
                    {name: "应用详情"}
                ]}
                topBtn={
                    <div>
                        <Link to={'/Pages/PAApplicationList'}>
                            <Button icon={<RollbackOutlined/>}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
            </ViewContent>
        )
    }

    makeBaseView = () => {
        let allData = [
            {
                title: '应用信息',
                key: 'YYKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '应用名称', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '申请企业', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '接口权限', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '应用状态', span: 12, value: ''},
                    {key: 'qw8', type: 'Texts', label: '申请说明', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
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
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
        </div>
    }
}

export default PAApplicationDetail;
