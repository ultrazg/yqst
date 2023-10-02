/**
 * Created by yb on 2019/09/03.
 */

import React, {Component} from 'react';
import {Form, Collapse, Row, Col} from 'antd';
import Model from "../Model";
import moment from 'moment'
import ViewContent from "../../../baseview/viewContent/ViewContent";
import RulePublicMod from "./RulePublicMod";

const { Panel } = Collapse;


class RuleAmendantRecord extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                listRuleLogVO: []
            },
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
                <ViewContent crumb={[
                    {name: "消息中心"},
                    {name: "分发规则管理列表", link: '/Pages/DistributionRuleList'},
                    {name: "分发规则详情", link: `/Pages/DistributionRuleDetail?id=${this.id}`},
                    {name: "规则修改记录"},
                ]}>
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.MesInfoRLGet({ruleId: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        if(this.state.data.listRuleLogVO.length <= 0){
            return <div style={{textAlign: 'center', fontSize: 20}}>暂时无修改记录...</div>
        }
        return <Collapse accordion defaultActiveKey={[0]}>
            {this.state.data.listRuleLogVO.map((item, idx) => {
                return <Panel key={idx}
                    header={<Row>
                        <Col span={12}>
                            <span style={{marginRight: 15}}>修改者：</span>
                            {item.updateAdmin}
                        </Col>
                        <Col span={12}>
                            <span style={{marginRight: 15}}>修改时间：</span>
                            {item.updateTime ? moment(item.updateTime).format('YYYY-MM-DD HH:mm:ss') : ''}
                        </Col>
                    </Row>}
                >
                    <RulePublicMod key={'log_' + idx} data={item}/>
                </Panel>
            })}
        </Collapse>
    }
}

export default RuleAmendantRecord
