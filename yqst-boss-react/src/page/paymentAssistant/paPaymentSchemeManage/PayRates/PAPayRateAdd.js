import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Card, Checkbox, Col, Form, Input, Row, Radio, message} from "antd";
import {MinusCircleOutlined, RollbackOutlined, CheckOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import Model from "../../Model";
import "./PayRatesCss.less";

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

class PAPayRateAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            rateArr: [
                {startNum: '', endNum: '', rate: ''}
            ]
        };
        this.sn = '';
        this.formRef = React.createRef();
    }

    getRateInfo = (sn)=>{
        Model.GetRateInfo({sn}, res=>{
            const {
                rateName,  // 费率名称
                rateDescribe,  // 费率描述
                isRecharge, // 是否用于充值
                isTransferAccounts, // 是否用于转账
                isWithdrawal, // 是否用于提现
                chargeType, // 计费方式  1按费率；2每笔固定金额,
                isPiecewise, // 是否费率分段   1是；0否,
                bossPayRatePiecewiseIntervalListVOList, // 费率分段区间列表
            } = res.data;

            let chargingProjects = [];
            if(isRecharge){
                chargingProjects.push('isRecharge')
            }
            if(isTransferAccounts){
                chargingProjects.push('isTransferAccounts')
            }
            if(isWithdrawal){
                chargingProjects.push('isWithdrawal')
            }

            // 给表单赋值
            const {setFieldsValue} = this.formRef.current;
            setFieldsValue({
                rateName,
                rateDescribe,
                chargingProjects,
                chargeType,
                isPiecewise
            });

            if(isPiecewise){
                let rateArr = [];
                for(let i=0; i<bossPayRatePiecewiseIntervalListVOList.length; i++){
                    let startNum = bossPayRatePiecewiseIntervalListVOList[i].minInterval;
                    let endNum = bossPayRatePiecewiseIntervalListVOList[i].maxInterval;
                    let rate = bossPayRatePiecewiseIntervalListVOList[i].chargeType === 1 ?
                        bossPayRatePiecewiseIntervalListVOList[i].piecewiseRate:
                        bossPayRatePiecewiseIntervalListVOList[i].singleAmount;

                    rateArr.push({
                        startNum,
                        endNum,
                        rate
                    })
                }

                this.setState({
                    rateArr
                })
            }


        })
    };

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1] || '';
        if(this.sn){
            this.getRateInfo(this.sn);
        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '支付费率'}, {name: '添加费率方案'}]}
                topBtn={
                    <Link to='/Pages/PAPayRateList'>
                        <Button type='primary' icon={<RollbackOutlined />}>返回</Button>
                    </Link>
                }
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
                className={'PayRatesAddForm'}
                scrollToFirstError={true}
                ref={this.formRef}
                onFinish={this.onFinish}
                initialValues={{
                    chargeType: 1,
                    chargingProjects: [],
                    isPiecewise: 1,
                }}
            >
                <Card title='基本信息' headStyle={{background: '#f9f9f9'}}>
                    <Form.Item
                        label='费率名称'
                        name={'rateName'}
                        rules={[
                            { required: true, message: '请输入费率名称！', whitespace: true },
                            { max: 20, message: '费率名称长度不能大于20！', whitespace: true }
                        ]}
                    >
                        <Input placeholder='请输入' style={{width: 250}}/>
                    </Form.Item>


                    <Form.Item
                        label='费率描述'
                        name='rateDescribe'
                        rules={[
                            { required: true, message: '请输入费率描述!', whitespace: true },
                            { max: 200, message: '费率描述长度不能大于200！', whitespace: true }
                        ]}
                    >
                        <Input.TextArea autoSize={{minRows: 3}} placeholder='请输入' style={{width: 360}}/>
                    </Form.Item>
                </Card>


                <Card title='费率设置' headStyle={{background: '#f9f9f9'}} style={{marginTop: 15}}>

                    <Form.Item
                        label="计费项目"
                        name="chargingProjects"
                        style={{display: 'flex', alignItems: 'center'}}
                    >
                        <Checkbox.Group style={{ width: '100%' }}>
                            <Row style={{marginTop: 18}}>
                                <Col span={6}>
                                    <Checkbox value="isRecharge">充值</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="isTransferAccounts">转账</Checkbox>
                                </Col>
                                <Col span={6}>
                                    <Checkbox value="isWithdrawal">提现</Checkbox>
                                </Col>
                            </Row>
                        </Checkbox.Group>
                    </Form.Item>

                    <Form.Item
                        label="计费方式"
                        name="chargeType"
                    >
                        <Radio.Group>
                            <Radio value={1}>按费率</Radio>
                            <Radio value={2}>每笔固定金额</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        label="费率分段"
                        name="isPiecewise"
                    >
                        <Radio.Group>
                            <Radio value={1}>是</Radio>
                            <Radio value={0}>否</Radio>
                        </Radio.Group>
                    </Form.Item>

                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.isPiecewise !== currentValues.isPiecewise}
                    >
                        {({ getFieldValue }) => {
                            return getFieldValue('isPiecewise') === 1 ? (
                                <div style={{width: 800, border: '1px solid #f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', padding: '15px 0'}}>
                                    <ul style={{ width: '90%', listStyle: 'none', padding: 0}}>
                                        {
                                            this.state.rateArr && this.state.rateArr.map((item, index)=>{
                                                return(
                                                    <li key={index} style={{display: 'flex', alignItems: 'center', marginTop: index ? 15 : 0 }}>
                                                        <span>分段{index + 1}区间:</span>
                                                        <Input
                                                            placeholder='请输入内容'
                                                            style={{width: 100, marginLeft: 18}}
                                                            size='small'
                                                            value={item.startNum}
                                                            onChange={(e)=>{
                                                                this.handleRateArrChange(index, 'startNum', e.target.value);
                                                            }}
                                                        />
                                                        <span style={{marginLeft: 10}}>至</span>
                                                        <Input
                                                            placeholder='请输入内容'
                                                            style={{width: 100, marginLeft: 10}}
                                                            size='small'
                                                            value={item.endNum}
                                                            onChange={(e)=>{
                                                                this.handleRateArrChange(index, 'endNum', e.target.value);
                                                            }}
                                                        />
                                                        <span style={{marginLeft: 36}}>
                                        分段{index + 1}{getFieldValue('chargeType') === 1 ? '费率' : '每笔固定金额'}:
                                    </span>
                                                        <Input
                                                            placeholder='请输入内容'
                                                            style={{width: 100, marginLeft: 18}}
                                                            size='small'
                                                            value={item.rate}
                                                            onChange={(e)=>{
                                                                this.handleRateArrChange(index, 'rate', e.target.value);
                                                            }}
                                                        />
                                                        <span style={{marginLeft: 6}}>{getFieldValue('chargeType') === 1 ? '%' : '元'}</span>
                                                        <MinusCircleOutlined
                                                            style={{
                                                                fontSize: 15,
                                                                cursor: 'pointer',
                                                                color: '#e6272d',
                                                                marginLeft: 36,
                                                                visibility: this.state.rateArr.length > 1 ? "visible" : "hidden"
                                                            }}
                                                            onClick={()=>{
                                                                this.state.rateArr.splice(index, 1);
                                                                this.setState({
                                                                    rateArr: this.state.rateArr
                                                                })
                                                            }}
                                                        />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    {/*添加*/}
                                    <div
                                        onClick={()=>{
                                            const {rateArr} = this.state;
                                            this.setState({
                                                rateArr: [...rateArr, {startNum: '', endNum: '', rate: ''}]
                                            })
                                        }}
                                        style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '1px dashed #cccccc', width: '90%', height: 26, borderRadius: 6}}>
                                        + 添加
                                    </div>
                                </div>
                            ) : null;
                        }}
                    </Form.Item>

                    {/*{this.makeSectionView()}*/}

                </Card>

                <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: 80}}>
                    <Button style={{width: 138, height: 38}} type="primary" htmlType="submit" icon={<CheckOutlined />}>确认保存</Button>
                </div>
            </Form>
        )
    };

    makeSectionView = ()=>{
        // 是否费率分段
        const {getFieldValue} = this.formRef.current;
        const isPiecewise = getFieldValue('isPiecewise');
        if(isPiecewise === 0){
            return null
        }

        const {rateArr} = this.state;
        // 获取计费方式
        const chargeType = getFieldValue('chargeType');
        return (
            <div style={{width: 800, border: '1px solid #f3f3f3', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', padding: '15px 0'}}>
                <ul style={{ width: '90%', listStyle: 'none', padding: 0}}>
                    {
                        rateArr && rateArr.map((item, index)=>{
                            return(
                                <li key={index} style={{display: 'flex', alignItems: 'center', marginTop: index ? 15 : 0 }}>
                                    <span>分段{index + 1}区间:</span>
                                    <Input
                                        placeholder='请输入内容'
                                        style={{width: 100, marginLeft: 18}}
                                        size='small'
                                        value={item.startNum}
                                        onChange={(e)=>{
                                            this.handleRateArrChange(index, 'startNum', e.target.value);
                                        }}
                                    />
                                    <span style={{marginLeft: 10}}>至</span>
                                    <Input
                                        placeholder='请输入内容'
                                        style={{width: 100, marginLeft: 10}}
                                        size='small'
                                        value={item.endNum}
                                        onChange={(e)=>{
                                            this.handleRateArrChange(index, 'endNum', e.target.value);
                                        }}
                                    />
                                    <span style={{marginLeft: 36}}>
                                        分段{index + 1}{chargeType === 1 ? '费率' : '每笔固定金额'}:
                                    </span>
                                    <Input
                                        placeholder='请输入内容'
                                        style={{width: 100, marginLeft: 18}}
                                        size='small'
                                        value={item.rate}
                                        onChange={(e)=>{
                                            this.handleRateArrChange(index, 'rate', e.target.value);
                                        }}
                                    />
                                    <span style={{marginLeft: 6}}>{chargeType === 1 ? '%' : '元'}</span>

                                    <MinusCircleOutlined
                                        style={{
                                            fontSize: 15,
                                            cursor: 'pointer',
                                            color: '#e6272d',
                                            marginLeft: 36,
                                            visibility: rateArr.length > 1 ? "visible" : "hidden"
                                        }}
                                        onClick={()=>{
                                            rateArr.splice(index, 1);
                                            this.setState({
                                                rateArr
                                            })
                                        }}
                                    />
                                </li>
                            )
                        })
                    }
                </ul>
                {/*添加*/}
                <div
                    onClick={()=>{
                        const {rateArr} = this.state;
                        this.setState({
                            rateArr: [...rateArr, {startNum: '', endNum: '', rate: ''}]
                        })
                    }}
                    style={{display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', border: '1px dashed #cccccc', width: '90%', height: 26, borderRadius: 6}}>
                    + 添加
                </div>
            </div>
        )
    };

    handleRateArrChange = (index, attr, value)=>{
        const {rateArr} = this.state;
        rateArr[index][attr] = value;
        this.setState({
            rateArr
        })
    };

    onFinish = (values)=>{
        // 计费项目不能为空
        if(values.chargingProjects.length === 0){
            return message.error('请勾选一项计费项目！');
        }

        let isRecharge, isTransferAccounts, isWithdrawal;
        for(let i=0; i<values.chargingProjects.length; i++){
            let item = values.chargingProjects[i];
            item === 'isRecharge' ? isRecharge = 1 : isRecharge = 0;
            item === 'isTransferAccounts' ? isTransferAccounts = 1 : isTransferAccounts = 0;
            item === 'isWithdrawal' ? isWithdrawal = 1 : isWithdrawal = 0;
        }

        let payRatePiecewiseIntervalDTOList = [];
        if(values.isPiecewise){
            const {rateArr} = this.state;
            for(let i=0; i<rateArr.length; i++){
                // 校验
                if(rateArr[i].startNum === '' || rateArr[i].endNum === '' || rateArr[i].rate === ''){
                    return message.error('请完整填写分段信息!');
                }else if(isNaN(rateArr[i].startNum) || isNaN(rateArr[i].endNum) || isNaN(rateArr[i].rate)){
                    return message.error('分段相关字段必须为数字！');
                }else if(Number(rateArr[i].startNum) < 0 || Number(rateArr[i].startNum) > 999999999.99){
                    return message.error('分段开始区间数字需要大于等于0, 小于999999999.99(保留小数点后两位)！');
                }else if(Number(rateArr[i].endNum) < 0 || Number(rateArr[i].endNum) > 999999999.99){
                    return message.error('分段结束区间数字需要大于等于0, 小于999999999.99(保留小数点后两位)！');
                }

                // 按费率计算
                if(values.chargeType === 1){
                    if(Number(rateArr[i].rate) < 0 || Number(rateArr[i].rate) > 100){
                        return message.error('费率的区间为0到100');
                    }
                }else {
                    if(Number(rateArr[i].rate) < 0 || Number(rateArr[i].rate) > Number(rateArr[i].endNum)){
                        return message.error('每笔固定金额的区间为0到分段区间最大值，可保留2位小数!');
                    }
                }

                if(Number(rateArr[i].startNum) >= Number(rateArr[i].endNum)){
                    return message.error('分段区间第一位数不能大于等于第二位数');
                }

                // 小数位数不能大于2
                if(TipDecimal(rateArr[i].startNum) || TipDecimal(rateArr[i].endNum) || TipDecimal(rateArr[i].rate)){
                    return
                }

                // 赋值
                payRatePiecewiseIntervalDTOList.push({
                    minInterval: rateArr[i].startNum * 1,
                    maxInterval: rateArr[i].endNum * 1,
                    chargeType: values.chargeType,
                    piecewiseRate: values.chargeType === 1 ? rateArr[i].rate * 1 : 0,
                    singleAmount: values.chargeType === 2 ? rateArr[i].rate * 1 : 0
                })
            }

            // 判断各区间是否包含了同样的范围
            for(let i=0; i<rateArr.length; i++){
                const startNum = Number(rateArr[i].startNum);
                const endNum = Number(rateArr[i].endNum);
                for(let k=0; k<rateArr.length; k++){
                    if(i !== k){
                        const otherStartNum = Number(rateArr[k].startNum);
                        const otherEndNum = Number(rateArr[k].endNum);
                        let flag1 = otherStartNum >= startNum && otherStartNum <= endNum;
                        let flag2 = otherEndNum >= startNum && otherEndNum <= endNum;
                        if(flag1 || flag2){
                            return message.error(`区间${i + 1}与区间${k + 1}范围冲突，请修改！`)
                        }
                    }

                }
            }

        }

        let params = {
            sn: this.sn,
            rateName: values.rateName,
            rateDescribe: values.rateDescribe,
            isRecharge,
            isTransferAccounts,
            isWithdrawal,
            chargeType: values.chargeType,
            isPiecewise: values.isPiecewise,
            payRatePiecewiseIntervalDTOList
        };

        Model.AddOrEditRate(params, res=>{
            if(this.sn){
                message.success('费率修改成功！');
            }else {
                message.success('费率添加成功!');
            }
            this.props.history.replace('/Pages/PAPayRateList')
        })
    }

}

export default PAPayRateAdd;
