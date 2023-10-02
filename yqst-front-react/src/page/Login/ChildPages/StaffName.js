import React, {Component} from 'react';
import { Form, Tabs, Input, Button, Row, Col } from 'antd';
import {head} from '../../../resource'
import Model from "../Model";

const { TabPane } = Tabs;

class StaffName extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    componentDidMount() {

    }

    componentWillUnmount() {

    }

    render() {
        const {comData} = this.props;

        return (
            <div className={'SUNCss'}>
                <h1>
                    <div>
                        <img src={comData.companyLogo} alt=""/>
                        <span>{comData.companyName}</span>
                    </div>
                </h1>
                <div>
                    <h2>创建您的个人账号，加入企业</h2>
                    <Form
                        ref={this.formRef}
                        autoComplete="off"
                        className={'formCss'}
                        onFinish={this.onSubmit.bind(this)}
                    >
                        <Form.Item
                            label={''}
                            name={'staffName'}
                            rules={[
                                { required: true, message: '员工姓名不能为空!' }
                            ]}
                        >
                            <Input
                                maxLength={30}
                                placeholder="请输入员工姓名"
                            />
                        </Form.Item>
                        <Form.Item
                            label={''}
                            name={'remark'}
                            rules={[
                                { required: true, message: '验证信息不能为空!' }
                            ]}
                        >
                            <Input
                                maxLength={200}
                                placeholder="请输入验证信息"
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit"
                                // onClick={() => {
                                //     this.props.history.push(`/users/login/setPassword?key=${true}`);
                                // }}
                            >
                                下一步
                            </Button>
                        </Form.Item>
                    </Form>
                    <a onClick={() => this.props.history.push('/users/login/index')}>返回登录</a>
                </div>
            </div>
        );
    }

    onSubmit(values){
        this.props.callBack && this.props.callBack(values);
    }
}

export default StaffName;
