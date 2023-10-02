/**
 * Created by yb on 2019/09/05.
 */

import React, {Component} from 'react';
import {Form, Button, Card} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";


class ComProductCategoryDetail extends Component {
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
                        {name: "产品管理"},
                        {name: "产品类目列表", link: '/Pages/ComProductCategoryList'},
                        {name: "产品类目详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={'/Pages/ComProductCategoryList'} style={{marginLeft: 15}}>
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
        Model.SellerGCGet({categoryId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetData = [
            {key: 'categoryId', type: 'Texts', label: '产品类目ID', span: 12, value: data.categoryId},
            {key: 'userName', type: 'Texts', label: '所属企业', span: 12, value: data.userName},
            {key: 'categoryName', type: 'Texts', label: '类目名称', span: 12, value: data.categoryName},
            // {key: 'parentCategoryUid', type: 'Texts', label: '上级类目ID', span: 12, value: data.parentCategoryUid},
            {key: 'parentCategoryName', type: 'Texts', label: '上级类目名称', span: 12, value: data.parentCategoryName},
            {key: 'createTime', type: 'Texts', label: '创建时间', span: 12, value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
        ];
        return <Card
            type="inner"
            title="基本信息"
        >
            <AssemblySet key={'makeBaseView'} data={noSetData} form={this.formRef.current}/>
        </Card>
    }
}

export default ComProductCategoryDetail
