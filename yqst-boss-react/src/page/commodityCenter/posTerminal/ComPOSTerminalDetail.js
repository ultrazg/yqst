/**
 * Created by yb on 2019/09/05.
 */

import React, {Component} from 'react';
import {Form, Button, Card} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import TypeChange from "./TypeChange";
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

let formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};


class ComPOSTerminalDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "商品中心"},
                        {name: "销售终端列表", link: '/Pages/ComPOSTerminalList'},
                        {name: "销售终端详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={'/Pages/ComPOSTerminalList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.ShopGet({shopId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetData = [
            {key: 'shopName', type: 'Texts', label: '终端名称', span: 12, formItemLayout, value: data.shopName},
            {key: 'shopType', type: 'Texts', label: '终端类型', span: 12, formItemLayout, value: TypeChange.typeName(data.shopType)},
            {key: 'diText', type: 'Texts', label: '终端地址', span: 12, formItemLayout,
                value: data.provinceName + data.cityName + data.districtName + data.shopAddress
            },
            {key: 'contactTel', type: 'Texts', label: '终端电话', span: 12, formItemLayout, value: data.contactTel},
            {key: 'userName', type: 'Texts', label: '所属企业', span: 12, formItemLayout, value: data.userName},
            {key: 'shopId', type: 'Texts', label: '终端ID', span: 12, formItemLayout, value: data.shopId},
            {key: 'expireTime', type: 'Texts', label: '终端服务有限期至', span: 12, formItemLayout,
                value: data.expireTime ? moment(data.expireTime).format('YYYY-MM-DD') : ''},
            {key: 'createTime', type: 'Texts', label: '终端创建时间', span: 12, formItemLayout,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
        ];
        return <Card
            type="inner"
            title="基本信息"
        >
            <AssemblySet key={'makeBaseView'} data={noSetData} form={this.formRef.current}/>
        </Card>
    }
}

export default ComPOSTerminalDetail
