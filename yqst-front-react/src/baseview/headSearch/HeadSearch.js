/**
 * Created by yb on 2018/10/22
 * 头部搜索组件
 */
/*
* 使用样例  **___按搜索按钮只会返回搜索字段和对应值的键值对对象
*   import HeadSearch from '../../../../../utils/publicComponents/headSearch/HeadSearch'
*   const lList = CanalList.map((item)=>{
        item.value = item.canalId;
        item.name = item.loansCanalName;
        return item;
    })
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
* <HeadSearch data={searchDatas} form={this.props.form} callBack={this.search.bind(THIS)}/>
* 实例 商机助手=>个人商机=>商机共享页面
* */

import React, {Component} from 'react';
import {Button, Form, Input, Row, Col, Select, DatePicker, Card} from 'antd';
import {UpOutlined, DownOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import './HeadSearchCss.less';
import moment from 'moment'
import cloneDeep from 'lodash/cloneDeep'

const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 9},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 15},
    },
};

class HeadSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expand: true, // 是否展示全部搜索内容
        };

        this.formRef = React.createRef();
    }

    // 收集数据的key
    collectKey() {
        let arrKey = [], data = this.props.data || [];
        data.forEach(item => {
            arrKey.push(item.key);
        })
        return arrKey;
    }

    // 生成表单
    makeHtml() {
        let htmls = [];
        const data = this.props.data || [];
        /*
        * 计算搜索条件的数量 默认显示3条数据
        * 如：当内容栏小于1000px时，只显示两条搜索数据；大于等于1600px时显示4条
        * */
        let defaultSpan = 8, shownCount = 3, contentWidths = this.props.IndexReducers.contentWidth - 17;
        if (contentWidths <= 1100) {
            defaultSpan = 12;
        } else if (contentWidths >= 1600 && data.length >= 4) {
            defaultSpan = 6;
        }
        if (this.props.colSpan) {
            defaultSpan = this.props.colSpan;
        }
        shownCount = parseInt(24 / defaultSpan);

        // 判断生成的html
        data.forEach((item, idx) => {
            // if(idx > 2) return false;
            switch (item.type) {
                // 文本输入组件
                case 'Input':
                    htmls.push(
                        <Col key={'Input_' + idx} span={defaultSpan}>
                            {/*<FormItem*/}
                            {/*    {...formItemLayout} label={item.label}>*/}
                            {/*    {getFieldDecorator(item.key, Object.assign({initialValue: item.value}, item.options || {}))(*/}
                            {/*        <Input maxLength={parseInt(item.maxLength, 0) || 50}*/}
                            {/*               placeholder={item.placeholder} {...item.attribute}/>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label={item.label}
                                name={item.key}
                                initialValue={item.value}
                                {...item.options}
                            >
                                <Input
                                    maxLength={parseInt(item.maxLength, 0) || 50}
                                    placeholder={item.placeholder}
                                    {...item.attribute}
                                />
                            </FormItem>
                        </Col>
                    );
                    break;

                // 下拉组件
                case 'Select':
                    htmls.push(
                        <Col key={'Select_' + idx} span={defaultSpan}>
                            {/*<FormItem*/}
                            {/*    {...formItemLayout} label={item.label}>*/}
                            {/*    {getFieldDecorator(item.key, Object.assign({initialValue: item.value + ''}, item.options || {}))(*/}
                            {/*        <Select*/}
                            {/*            placeholder={item.placeholder}*/}
                            {/*            {...item.attribute}*/}
                            {/*        >*/}
                            {/*            {*/}
                            {/*                item.list && item.list.map((list, lIdx) => {*/}
                            {/*                    return <Option key={lIdx} value={'' + list.value}>{list.name}</Option>*/}
                            {/*                })*/}
                            {/*            }*/}
                            {/*        </Select>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label={item.label}
                                name={item.key}
                                initialValue={item.value}
                                {...item.options}
                            >
                                <Select placeholder={item.placeholder}{...item.attribute}>
                                    {
                                        item.list && item.list.map((list, lIdx) => {
                                            return <Option key={lIdx} value={'' + list.value}>{list.name}</Option>
                                        })
                                    }
                                </Select>
                            </FormItem>
                        </Col>
                    );
                    break;

                // 单选时间组件
                case 'DatePicker':
                    htmls.push(
                        <Col key={'DatePicker_' + idx} span={defaultSpan}>
                            {/*<FormItem*/}
                            {/*    {...formItemLayout} label={item.label}>*/}
                            {/*    {getFieldDecorator(item.key, Object.assign({initialValue: item.value}, item.options || {}))(*/}
                            {/*        <DatePicker*/}
                            {/*            allowClear={false}*/}
                            {/*            style={{width: '100%'}}*/}
                            {/*            placeholder={item.placeholder}*/}
                            {/*            {...item.attribute}*/}
                            {/*        />*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label={item.label}
                                name={item.key}
                                initialValue={item.value}
                                {...item.options}
                            >
                                <DatePicker
                                    allowClear={false}
                                    style={{width: '100%'}}
                                    placeholder={item.placeholder}
                                    {...item.attribute}
                                />
                            </FormItem>
                        </Col>
                    );
                    break;

                // 时间段时间控件
                case 'RangePicker':
                    htmls.push(
                        <Col key={'RangePicker_' + idx} span={defaultSpan}>
                            {/*<FormItem*/}
                            {/*    {...formItemLayout}*/}
                            {/*    label={item.label}*/}
                            {/*>*/}
                            {/*    {getFieldDecorator(item.key, Object.assign({initialValue: item.value}, item.options || {}))(*/}
                            {/*        <RangePicker allowClear={false} style={{width: '100%'}}*/}
                            {/*                     placeholder={item.placeholder} {...item.attribute}/>*/}
                            {/*    )}*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label={item.label}
                                name={item.key}
                                initialValue={item.value}
                                {...item.options}
                            >
                                <RangePicker
                                    allowClear={false}
                                    style={{width: '100%'}}
                                    placeholder={item.placeholder}
                                    {...item.attribute}
                                />
                            </FormItem>
                        </Col>
                    );
                    break;
            }
        });

        // 高级搜索的
        if(!this.state.expand){
            htmls = htmls.slice(0, shownCount);
        }
        return {htmls, shownCount};
    }

    // 重置状态
    resetValue() {
        const {resetFields} = this.formRef.current;
        resetFields(this.collectKey());
        if (this.props.resetCallBack) {
            this.props.resetCallBack();
        }
    }

    // 搜索
    searchSubmit() {
        const {data = []} = this.props, THIS = this;
        const {validateFields, setFieldsValue} = this.formRef.current;
        validateFields(this.collectKey()).then((fieldsValue, err)=>{
            if (!err) {
                let cloneDeepVal = cloneDeep(fieldsValue);
                if (THIS.props.callBack) {
                    for (let i in fieldsValue) {
                        // 时间格式的转换
                        data.forEach(item => {
                            if (i === item.key && fieldsValue[i]) {
                                if ('DatePicker' === item.type) {
                                    let tiemsObj = {};
                                    tiemsObj[item.key] = fieldsValue[i];
                                    cloneDeepVal[i] = moment(fieldsValue[i]).format("YYYY-MM-DD");
                                    setFieldsValue(tiemsObj);
                                }
                                if ('RangePicker' === item.type && Array.isArray(fieldsValue[i])) {
                                    let tiemsObj = {};
                                    tiemsObj[item.key] = [fieldsValue[i][0], fieldsValue[i][1]];
                                    cloneDeepVal[i][0] = moment(fieldsValue[i][0]).format("YYYY-MM-DD");
                                    cloneDeepVal[i][1] = moment(fieldsValue[i][1]).format("YYYY-MM-DD");
                                    setFieldsValue(tiemsObj);
                                }
                            }
                        });
                        // 确保返回的键值对值不为 undefined 或 null
                        if ('undefined' === '' + fieldsValue[i] || 'null' === '' + fieldsValue[i]) {
                            cloneDeepVal[i] = '';
                        }
                    }
                    // 返回键值对；
                    THIS.props.callBack(cloneDeepVal);
                }
            }
        })
    }

    render() {
        const THIS = this;

        //视图 style={{width: this.props.IndexReducers.contentWidth - 200}}
        return (
            <div
                className={this.props.children ? '' : this.state.expand ? 'searchHea searchShow' : 'searchHea'}>
                {
                    this.props.children ? this.props.children :
                        <Form ref={this.formRef} className={'searchHeaForm'} autoComplete="off" onFinish={(e) => {
                            this.searchSubmit(e)
                        }}>
                            <Row className={'searchInput'}>
                                {this.makeHtml().htmls}
                            </Row>

                            <Row className={'searchBtn'}>
                                <Col span={12}>
                                    <Button onClick={() => this.resetValue()}>重置</Button>
                                </Col>
                                <Col span={12}>
                                    <Button type="primary" htmlType="submit">搜索</Button>
                                </Col>
                                {
                                    this.props.data.length > this.makeHtml().shownCount && <Col span={24}>
                                        <div className={'gj'}>
                                            <a onClick={()=>{THIS.setState({expand: !THIS.state.expand})}}>
                                                {this.state.expand ? '收起' : '高级搜索'}
                                                {
                                                    this.state.expand ? <UpOutlined /> : <DownOutlined />
                                                }
                                            </a>
                                        </div>
                                    </Col>
                                }
                            </Row>
                        </Form>
                }
            </div>
        );
    }
}

const HeadSearchs = HeadSearch;

function mapStateToProps(state) {
    const {IndexReducers} = state;
    return {IndexReducers}
}

export default connect(mapStateToProps)(HeadSearchs)
