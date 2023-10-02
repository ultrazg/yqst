/**
 * Created by yb on 2019/04/09.
 */
import React, {Component} from 'react';
import {Form, Button, Modal, message, Row, Col} from 'antd';
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";


class DistributionRuleEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {}

    // 视图层
    render() {
        return (
            <ViewContent crumb={[
                {name: "消息中心"},
                {name: "分发规则管理列表", link: '/Pages/DistributionRuleList'},
                {name: this.id ? '编辑分发规则' : '添加分发规则'},
            ]}>
                <div style={{textAlign: 'center', fontSize: 20}}>
                    开发中，敬请期待！
                </div>
            </ViewContent>
        );
    }
}

export default DistributionRuleEditor
