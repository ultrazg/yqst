import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Input, Form, Card, message} from "antd";
import {RollbackOutlined, CheckOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import Model from "../../Model";

// 判断小数位数，提示用户修改为2位小数
const TipDecimal = (num)=>{
    let arr = `${num}`.split('.');
    let str = arr[1];
    // 是小数
    if(str){
        if(str.length > 2){
            message.error('数字最多为2位小数，请修改');
            return true
        }
    }
};


class PAPayLimitationAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {};
        this.formRef = React.createRef();
    }

    getInfo = (sn)=>{
        Model.GetLimitInfo({sn}, res=>{
            const {
                limitName,
                limitDescribe,
                paymentNum,
                rechargeNum,
                withdrawalNum,
                singlePaymentMoney,
                singleRechargeMoney,
                singleWithdrawalMoney
            } = res.data;

            const {setFieldsValue} = this.formRef.current;
            setFieldsValue({
                limitName,
                limitDescribe,
                paymentNum,
                rechargeNum,
                withdrawalNum,
                singlePaymentMoney,
                singleRechargeMoney,
                singleWithdrawalMoney
            })
        })
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1];
        if(this.sn){
            this.getInfo(this.sn);
        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: "添加限额"}]}
                topBtn={(
                    <Link to='/Pages/PAPayLimitation'>
                        <Button type='primary' icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                )}
            >
                {this.makeFormView()}
            </TabsViewContent>
        )
    }

    makeFormView = ()=>{
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 10 },
        };

        return (
            <Form
                {...formItemLayout}
                ref={this.formRef}
                hideRequiredMark
                autoComplete="off"
                onFinish={(values) => {
                    this.savePayLimitation(values);
                }}
            >
                <Card title='基本信息' headStyle={{background: '#f9f9f9'}}>
                    <Form.Item label='限额名称' name={'limitName'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>

                    <Form.Item label='限额描述' name={'limitDescribe'}>
                        <Input.TextArea autoSize={{minRows: 3}} placeholder='请输入' style={{width: 360}}/>
                    </Form.Item>
                </Card>


                <Card title='限额设置' headStyle={{background: '#f9f9f9'}} style={{marginTop: 15}}>
                    <Form.Item label='每笔收支付金额' name={'singlePaymentMoney'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>

                    <Form.Item label='每笔充值金额' name={'singleRechargeMoney'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>

                    <Form.Item label='每笔提现金额' name={'singleWithdrawalMoney'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>
                </Card>

                <Card title='限笔数设置' headStyle={{background: '#f9f9f9'}} style={{marginTop: 15}}>
                    <Form.Item label='收支付笔数' name={'paymentNum'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>

                    <Form.Item label='充值笔数' name={'rechargeNum'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>

                    <Form.Item label='提现笔数' name={'withdrawalNum'}>
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>
                </Card>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80}}>
                    <Button style={{width: 138, height: 38}} type="primary" htmlType="submit" icon={<CheckOutlined />}>
                        确认保存
                    </Button>
                </div>
            </Form>
        )
    }


    // 数据合法校验
    checkData = (values, callback)=>{
        let {
            limitName,
            limitDescribe,
            singlePaymentMoney,
            singleRechargeMoney,
            singleWithdrawalMoney,
            paymentNum,
            rechargeNum,
            withdrawalNum
        } = values;

        if(!limitName){
            return message.error('限额名称不能为空!');
        }else if(limitName && limitName.length > 20){
            return message.error('限额名称最大长度为20!');
        }

        if(limitDescribe && limitDescribe.length > 200){
            return message.error('限额描述最大长度为200!');
        }

        singlePaymentMoney = Number(singlePaymentMoney);
        if(!singlePaymentMoney || singlePaymentMoney <= 0 ){
            return message.error('每笔收支付金额需为大于0的正数，且不为空!');
        }else if(singlePaymentMoney > 999999999.99){
            return message.error('每笔收支付金额不能大于999999999.99(保留小数点后两位)!');
        }

        singleRechargeMoney = Number(singleRechargeMoney);
        if( !singleRechargeMoney || singleRechargeMoney <= 0 ){
            return message.error('每笔充值金额需为大于0的正数，且不为空!');
        }else if(singleRechargeMoney > 999999999.99){
            return message.error('每笔充值金额不能大于999999999.99(保留小数点后两位)!');
        }else if(singleRechargeMoney === 0){
            return message.error('每笔充值金额不能为0!');
        }

        singleWithdrawalMoney = Number(singleWithdrawalMoney);
        if( !singleWithdrawalMoney || singleWithdrawalMoney <= 0 ){
            return message.error('每笔提现金额需为大于0的正数，且不为空!');
        }else if(singleWithdrawalMoney > 999999999.99){
            return message.error('每笔提现金额不能大于999999999.99(保留小数点后两位)!');
        }else if(singleWithdrawalMoney === 0){
            return message.error('每笔提现金额不能为0!');
        }

        // 小数位数不能超过2
        if(TipDecimal(singlePaymentMoney) || TipDecimal(singleRechargeMoney) || TipDecimal(singleWithdrawalMoney)){
            return
        }

        paymentNum = Number(paymentNum);
        if( !paymentNum || paymentNum <= 0 || paymentNum > Math.floor(paymentNum) ){
            return message.error('收支付笔数需为大于0的正整数，且不为空!');
        }else if(paymentNum > 999999999){
            return message.error('收支付笔数不能大于999999999!');
        }else if(paymentNum === 0){
            return message.error('收支付笔数不能为0!');
        }

        rechargeNum = Number(rechargeNum);
        if( !rechargeNum || rechargeNum <= 0 || rechargeNum > Math.floor(rechargeNum) ){
            return message.error('充值笔数需为大于0的正整数，且不为空!');
        }else if(rechargeNum > 999999999){
            return message.error('充值笔数不能大于999999999!');
        }else if(rechargeNum === 0){
            return message.error('充值笔数不能为0!');
        }

        withdrawalNum = Number(withdrawalNum);
        if( !withdrawalNum || withdrawalNum <= 0 || withdrawalNum > Math.floor(withdrawalNum) ){
            return message.error('提现笔数需为大于0的正整数，且不为空!');
        }else if(withdrawalNum > 999999999){
            return message.error('提现笔数不能大于999999999!');
        }else if(withdrawalNum === 0){
            return message.error('提现笔数不能为0!');
        }

        callback();
    };

    savePayLimitation = (values)=>{
        this.checkData(values, ()=>{
            Model.AddOrEditLimit({
                sn: this.sn,
                ...values
            }, res=>{
                if(this.sn){
                    message.success('修改成功!');
                }else {
                    message.success('增加成功!');
                }
                this.props.history.replace('/Pages/PAPayLimitation')
            })
        })
    }
}

export default PAPayLimitationAdd;
