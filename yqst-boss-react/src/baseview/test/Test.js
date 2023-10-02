/**
 * Created by yb on 2018/10/23
 */
import React, {Component} from 'react';
import {Form,Button,message} from 'antd';
import {connect} from 'react-redux';
import AssemblySet from '../assemblySet/AssemblySet';
import HeadSearch from '../headSearch/HeadSearch';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

class TestHtml extends Component {

    constructor(props) {
        super(props);
        this.state = {
            xiaYiBu: false,
            //
            url: ['http://pic1.win4000.com/pic/8/5c/e5a13e995c_250_350.jpg', 'http://img3.imgtn.bdimg.com/it/u=2108642850,2102377335&fm=200&gp=0.jpg'],
        };
    }

    componentDidMount() { }

    // 提交数据
    handleSubmit(e){
        const {form} = this.props;
        e.preventDefault();
        // console.log('提交数据：', form.getFieldsValue());
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('提交数据: ', values);
            }else{
                console.log('err: ', err)
            }
        });
    }

    // 自定义校验函数
    checkConfirm(rule, value, callback){
        if(!value){
            callback('内容不能为空!');
            return false;
        }
        callback();
    }

    // 自定义校验函数
    checkConfirmUrl(rule, value, callback){
        if(this.state.url.length <= 0){
            callback('请上传图片');
            return false;
        }
        callback();
    }

    // 自定义校验函数
    checkConfirmNum(rule, value, callback){
        console.log('数字: ', value);
        if(!value){
            callback('请填写数字');
            return false;
        }
        callback();
    }

    xiYi(e){
        console.log('获取数据: ', this.props.form.getFieldsValue());
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('提交数据: ', values);
                this.setState({
                    xiaYiBu: true,
                });
            }
        });
    }

    // 搜索
    search(obj){
        console.log('搜索字段的键值对: ', obj);
    }

    render() {
        const THIS = this, {setFieldsValue} = this.props.form;
        // 搜索字段
        const searchDatas = [
            {key: 'searchValue', type:'Input', value:'', placeholder: '请输入输值', label: '输入框', maxLength: 10},
            {key: 'createTime', type:'DatePicker', value:'', placeholder: '选择时间', label: '选择时间',},
            {key: 'source', type:'Select', value:'', list: [{value: '', name: 'Mm'}, {value: 1, name: 'Aa'}, {value: 2, name: 'Bb'}], placeholder: '请选择线索来源', label: '线索来源',
                attribute:{
                    showSearch: true,
                    filterOption: (input, option)=>{
                        return option.props.children.indexOf(input) >= 0
                    }
                }
            },
            {key: 'createTimes', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',},
        ];
        const datas = [
            // 单行文本框
            {key: 'Inputs', type: 'Input', value: '', label: '企业名称',
                placeholder: '请输入名称',
                options:{
                    rules: [{
                        required: true, message: '该字段不能为空',
                    }, {
                        validator: this.checkConfirm.bind(THIS),
                    }],
                },
                attribute: {
                    onClick: ()=>{
                        message.success('点击事件!!');
                        setFieldsValue({'Input': 456})
                    }
                }
            },

            // 数字文本框
            {key: 'InputNumbers', type: 'InputNumber', value: 8, label: '启动资金', placeholder: '数字输入框',
                attribute:{
                    style:{
                        width: '100%',
                    },
                    min: 1,
                    max: 10,
                    disabled: true,
                },
                options:{
                    rules: [{
                        required: false, message: '该字段不能为空',
                    }, {
                        validator: this.checkConfirmNum.bind(THIS),
                    }],
                },
            },

            // 单选框
            {key: 'Radios', type: 'Radio', value: '21', label: '是否国企',
                data: {
                    list: [
                        {radioValue: '11',radioName: '一1号'},
                        {radioValue: '21',radioName: '二1号'},
                        {radioValue: '31',radioName: '三1号'},
                    ],
                    valueName: 'radioValue',
                    labelName: 'radioName',
                },
            },

            // 时间
            {key: 'DatePickers', type: 'DatePicker', value: '2015-01-01', label: '企业成立时间', placeholder: '请选择创建时间',
                attribute: {
                    style: {
                        width: '100%',
                    },
                    onChange: (date, dateString)=>{
                        console.log('时间字符串: ', dateString);
                        // setFieldsValue({DatePicker: dateString})
                    }
                },
            },

            // 时间段
            {key: 'RangePickers', type: 'RangePicker', value: ['2015-01-01', '2015-09-01'], label: '文化时间', span: 8, placeholder: ['开始时间', '结束时间'],
                attribute: {
                    style: {
                        width: '100%',
                    },
                    onChange: (date, dateString)=>{
                        console.log('时间段字符串: ', dateString);
                        // setFieldsValue({DatePicker: dateString})
                    }
                },
            },

            // 下拉框
            {key: 'Selects', type: 'Select', value: '2', label: '企业类型',
                data: {
                    list: [
                        {xx: '1',xxName: '一号'},
                        {xx: '2',xxName: '二号'},
                        {xx: '3',xxName: '三号'},
                    ],
                    valueName: 'xx',
                    labelName: 'xxName',
                },
                attribute:{
                    showSearch: true,
                    filterOption: (input, option)=>{
                        return option.props.children.indexOf(input) >= 0
                    }
                }
            },

            // 多级联动 [3, 7, 140]
            {key: 'Cascaders', type: 'Cascader', value: '',  label: '企业类别', placeholder: '请选择', span: 8,
                attribute: {
                    onChange: (value, data)=>{
                        console.log('-----------: ', value);
                        console.log('datadatadatadata: ', data);
                    }
                },
                data: {
                    list: [{
                        value: 'zhejiang',
                        label: 'Zhejiang',
                        children: [{
                            value: 'hangzhou',
                            label: 'Hangzhou',
                            children: [{
                                value: 'xihu',
                                label: 'West Lake',
                            }],
                        }],
                    }, {
                        value: 'jiangsu',
                        label: 'Jiangsu',
                        children: [{
                            value: 'nanjing',
                            label: 'Nanjing',
                            children: [{
                                value: 'zhonghuamen',
                                label: 'Zhong Hua Men',
                            }],
                        }],
                    }]
                },
            },

            // 多行文本框
            {key: 'textareas', type: 'Input', value: 'Hello World!', label: '企业描述', placeholder: '请输入简述',
                attribute:{
                    maxLength: '200',
                    style: {
                        width: '100%',
                        height: '100px',
                    },
                    type: "textarea",
                },
            },

            // 上传组件
            {key: 'UploadFiles', type: 'UploadFile', label: '企业LOGO', value: this.state.url,
                data: {
                    maxNum:1,
                    uploadText:'上传LOGO',
                    fileUrlList: THIS.state.url,
                    // isDowload: true,
                    // isReadOnly: true,
                },
                callBackFiles: (url)=>{
                    this.setState({url: url},()=>{setFieldsValue({UploadFiles: url})});
                    console.log('urlurlurlurlurlurlurl: ', url);
                },
                options:{
                    rules: [{
                        validator: this.checkConfirmUrl.bind(THIS),
                    }],
                },
            },

        ];
        const datas2 = [
            // 单行文本框
            {key: 'Input2', type: 'Input', value: '2222',
                placeholder: '请输入名称22',
                options:{
                    rules: [{
                        required: false, message: '该字段不能为空22222',
                    }],
                },
            },

            // 数字文本框
            {key: 'InputNumber2', type: 'InputNumber', value: 2, placeholder: '数字输入框22',
                attribute:{
                    style:{
                        width: '100%',
                    },
                    min: 1,
                    max: 10,
                },
            },
        ];
        const datasText = [

            {key: 'Text0', type: 'Text', label: '公司名称', span: 8, value: '商沃科技', required: true,},

            {key: 'Text1', type: 'Text', label: '公司编号', span: 8, value: '123654789', required: false,},

            {key: 'Text2', type: 'Text', label: '公司简述', span: 8, value: '勇往直前，逆风破浪！', required: false,},

            {key: 'Text3', type: 'Text', label: '公司地址', span: 24, value: '神州路中央绿地广场', required: true,
                formItemLayout: {
                    labelCol: {
                        xs: { span: 24 },
                        sm: { span: 2 },
                    },
                    wrapperCol: {
                        xs: { span: 24 },
                        sm: { span: 22 },
                    },
                },
            },

            // 上传组件
            {key: 'UploadFiles', type: 'UploadFile', label: '企业LOGO', value: this.state.url,
                data: {
                    maxNum:1,
                    uploadText:'上传LOGO',
                    fileUrlList: THIS.state.url,
                    isDowload: false,
                    isReadOnly: true,
                },
            },
        ];

        // 视图层
        return (
            <div style={{width: this.props.IndexReducers.contentWidth}}>
                <div style={{background:'#fff', padding:'20px'}}>
                    <div style={{textAlign:'center', marginBottom:'20px', fontSize: '20px', borderTop: '1px solid #ccc', padding: '20px'}}>列表搜索模块</div>
                    <HeadSearch data={searchDatas} form={this.props.form} callBack={this.search.bind(THIS)}/>

                    <div style={{textAlign:'center', marginBottom:'20px', fontSize: '20px', borderTop: '1px solid #ccc', padding: '20px'}}>新增、编辑模块</div>
                    <Form autoComplete="off" onSubmit={this.handleSubmit.bind(THIS)}>
                        <AssemblySet data={datas} form={this.props.form}/>

                        {/*{
                            !this.state.xiaYiBu?<AssemblySet key={'a1'} data={datas} form={this.props.form}/>:<AssemblySet key={'a2'} data={datas2} form={this.props.form}/>
                        }*/}
                        <div style={{padding:'10px', textAlign: 'center'}}>
                            <Button
                                type="primary"
                                htmlType="submit"
                            >提交</Button>

                            {/*{
                                !this.state.xiaYiBu?<Button onClick={this.xiYi.bind(THIS)}>下一步</Button>: <Button onClick={()=>{this.setState({xiaYiBu: false})}}>上一步</Button>
                            }*/}
                        </div>
                    </Form>

                    <div style={{textAlign:'center', marginBottom:'20px', fontSize: '20px', borderTop: '1px solid #ccc', padding: '20px'}}>详情模块</div>
                    <div>
                        <AssemblySet key={'text'} data={datasText} form={this.props.form}/>
                    </div>
                </div>
            </div>
        );
    }
}

const TestHtmls = Form.create()(TestHtml);

function mapStateToProps(state) {
    const {IndexReducers} = state;
    return {IndexReducers}
}

export default connect(mapStateToProps)(TestHtmls)