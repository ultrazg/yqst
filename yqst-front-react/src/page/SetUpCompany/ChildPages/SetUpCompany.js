import React, {Component} from 'react';
import { LeftOutlined } from '@ant-design/icons';
import { Form, Button, Input, Select, Cascader } from 'antd';
import './ChildCss.less';
import Model from '../Model';
import LoginSucceed from './LoginSucceed';
import JoinCompany from './JoinCompany';
import SetUpResult from './SetUpResult';
import EnterSystem from './EnterSystem';
import CityData from '../../../resource/SwCityData';

const { Option } = Select;

class SetUpCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginMes: localStorage.loginMes ? JSON.parse(localStorage.loginMes) : null,
            step: this.props.location.search.substr(1).split("=")[1] ? this.props.location.search.substr(1).split("=")[1] : 1,
            indList: [],
            resMes: {}
        };
        this.formRef = React.createRef();
        if(!localStorage.loginMes){
            this.props.history.push('/users/login/index');
        }
    }

    componentDidMount() {
        this.getUserIList();
    }

    componentWillUnmount() {
        localStorage.removeItem('loginMes');
    }

    render() {
        return (
            <div style={{flex: 1}}>
                {this.stepView()}
            </div>
        );
    }

    getUserIList(){
        Model.UserIList({}, (res) => {
            const indList =  res.data &&  res.data.map(item => {
                item.childList = item.childList && item.childList.map(cItem => {
                    return {
                        ...cItem,
                        value: cItem.id,
                        label: cItem.industryName,
                    }
                });
                item.children = item.childList;
                delete item.childList;
                return {
                    ...item,
                    value: item.id,
                    label: item.industryName,
                }
            });
            this.setState({indList})
        }, (err) => {});
    }

    loadData(selectedOptions){
        const targetOption = selectedOptions[selectedOptions.length - 1];
        targetOption.loading = true;

        Model.UserIList({parentId: targetOption.value}, (res) => {
            targetOption.loading = false;
            const indList =  res.data &&  res.data.map(item => {
                return {
                    ...item,
                    value: item.id,
                    label: item.industryName,
                }
            });
            targetOption.children = indList;
            this.setState({indList: [...this.state.indList]});
        }, (err) => {});
    }

    stepView(){
        let {loginMes, step} = this.state;
        if(loginMes && ('1' === '' + loginMes.accountStatus || '0' ===  '' + loginMes.accountStatus))
            step = '5';
        switch ('' + step) {
            case '5': // 登录成功，并且已经有企业，选择企业即可进入首页
                return <EnterSystem
                    {...{
                        ...this.props,
                    }}
                    callBack={() => {}}
                />;

            case '4': // 创建企业成功
                return <SetUpResult
                    {...{
                        ...this.props,
                        ...this.state.resMes
                    }}
                    callBack={() => {}}
                />;

            case '3': // 加入企业
                return <JoinCompany
                    {
                        ...this.props
                    }
                    callBack={() => {
                        this.props.history.replace(`/users/setUpCompany/index`);
                        this.setState({step: 1});
                    }}
                />;

            case '2': // 创建企业
                return this.makeBaseView();

            case '1': // 登录成功的页面
            default:
                return <LoginSucceed
                    {
                        ...this.props
                    }
                    callBack={() => {}}
                    onSetUpBtn={() =>{
                        this.setState({step: 2});
                        this.getUserIList();
                    }}
                    onAddBtn={() => {
                        this.setState({step: 3});
                    }}
                />;
        }
    }

    makeBaseView(){
        let {indList} = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 20 },
            },
        };
        return (
            <div className={'sucCss'}>
                <Button icon={<LeftOutlined />} onClick={() => {
                    // this.props.history.push('/users/login/loginResult');
                    this.props.history.replace(`/users/setUpCompany/index`);
                    this.setState({step: 1});
                }}>返回</Button>
                <h1>创建企业</h1>
                <Form
                    {...formItemLayout}
                    ref={this.formRef}
                    autoComplete="off"
                    className={'formCss'}
                    onFinish={this.onSubmit.bind(this)}
                    initialValues={{
                        regionId: ['87', '486', '850']
                    }}
                >
                    <Form.Item
                        label={"企业名称"}
                        name={'companyName'}
                        rules={[
                            {required: true, message: '企业名称不能为空!'}
                        ]}
                    >
                        <Input
                            maxLength={30}
                            placeholder="请输入企业名称"
                        />
                    </Form.Item>
                    <Form.Item
                        label={"所属行业"}
                        name={'industryId'}
                        rules={[
                            {required: true, message: '所属行业不能为空!'}
                        ]}
                    >
                        <Cascader
                            popupClassName={'setUpCom_hyCas'}
                            placeholder="请选择所属行业"
                            options={indList}
                            showSearch={{
                                filter: (inputValue, path) => {
                                    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                }
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        label={"所在地区"}
                        name={"regionId"}
                        rules={[
                            {required: true, message: '所在地区不能为空!'}
                        ]}
                    >
                        <Cascader
                            popupClassName={'sucCss_cas setUp_Cas'}
                            options={CityData.data}
                            placeholder="请选择所在地区"
                            showSearch={{
                                filter: (inputValue, path) => {
                                    return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                }
                            }}
                        />
                    </Form.Item>
                    <div className={'btn'}>
                        <Button type="primary" htmlType="submit"
                            // onClick={() => {
                            //     this.props.history.push('/users/setUpCompany/setUpResult');
                            // }}
                        >
                            创建企业
                        </Button>
                    </div>
                </Form>
            </div>
        );
    }

    onSubmit(values){
        let {loginMes} = this.state;
        if(values.regionId[2]){
            values.regionId = values.regionId[2];

        }else if(values.regionId[1]){
            values.regionId = values.regionId[1];

        }else{
            values.regionId = values.regionId[0];

        }
        values.industryId = values.industryId[1];

        Model.CreatEnterprise({
            ...values,
            sessionKey: loginMes.sessKey,

        }, (res) => {
            this.setState({resMes: res.data, step: 4}, () => {
                loginMes.accountSn = res.data.accountSn;
                localStorage.loginMes = JSON.stringify(loginMes);
            });

        }, (err) => {});
    }
}

export default SetUpCompany;
