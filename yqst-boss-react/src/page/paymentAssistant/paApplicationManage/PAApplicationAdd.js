import React, {Component} from 'react';
import {Button, Form, Switch, Input, Checkbox, Row, Col, Card} from "antd";
import {Link} from "react-router-dom";
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";


class PAApplicationAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '应用列表', link: '/Pages/PAApplicationList'}, {name: '应用详情'}]}
                topBtn={
                    <Link to='/Pages/PAApplicationList'>
                        <Button>返回</Button>
                    </Link>
                }
            >
                {this.makeFormView()}
            </TabsViewContent>
        )
    }

    makeFormView = ()=>{
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 15 },
        };

        return (
            <Card title='基本信息'>
                <Form {...formItemLayout} onSubmit={()=>{}}>

                    <Form.Item label='应用名称'>
                        {getFieldDecorator('appName', {
                            rules: [{ required: true, message: '请输入应用名！', whitespace: true }],
                        })(<Input placeholder='输入应用名' style={{width: 250}}/>)}
                    </Form.Item>

                    <Form.Item label='申请企业'>
                        {getFieldDecorator('reason', {
                            rules: [{ required: true, message: '请输入申请的企业名!', whitespace: true }],
                        })(<Input placeholder='输入申请企业名' style={{width: 250}}/>)}
                    </Form.Item>

                    <Form.Item label='申请说明'>
                        {getFieldDecorator('enterpriseName', {
                            rules: [{ required: true, message: '请输入申请说明!', whitespace: true }],
                        })(<Input.TextArea autoSize={{minRows: 3}} placeholder='请输入申请说明' style={{width: 360}}/>)}
                    </Form.Item>

                    <Form.Item label="启用应用">
                        {
                            getFieldDecorator('switch', { valuePropName: 'checked' })
                            (<Switch checkedChildren="ON" unCheckedChildren="OFF"/>)
                        }
                    </Form.Item>


                    <Form.Item label="接口权限" style={{display: 'flex', alignItems: 'center'}}>
                        {getFieldDecorator('permissions', {
                            initialValue: ['A', 'B'],
                        })(
                            <Checkbox.Group style={{ width: '100%' }}>
                                <Row style={{marginTop: 18}}>
                                    <Col span={6}>
                                        <Checkbox value="A">银联开户</Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox disabled={false} value="B">银联充值</Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox value="C">银联转账</Checkbox>
                                    </Col>
                                    <Col span={6}>
                                        <Checkbox value="D">银联提现</Checkbox>
                                    </Col>

                                </Row>
                            </Checkbox.Group>,
                        )}
                    </Form.Item>



                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Button style={{width: 138, height: 38}} type="primary" htmlType="submit">确认保存</Button>
                    </div>
                </Form>
            </Card>

        )
    }
}

export default PAApplicationAdd;