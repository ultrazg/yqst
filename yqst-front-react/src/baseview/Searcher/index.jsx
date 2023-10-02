import React from 'react';
import {Input, Button, Select, DatePicker} from 'antd';
import moment from "moment";

const {Option} = Select;
const {RangePicker} = DatePicker;

/**
 * 通用搜索组件
 */
export default class Index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            object: {
                keyWord: '',
                type: 0,
                status: 0,
                startTime: '',
                endTime: '',
                time: ''
            }
        };
    }

    render() {
        return (
            <div>
                {this.makeHtml()}
            </div>
        );
    }

    makeHtml = () => {
        const {form} = this.props;
        const vDOM = [];

        form.forEach((item, index) => {
            switch (item.type) {
                case 'Input':
                    vDOM.push(
                        <span
                            key={item.key + index}
                            style={{marginRight: 20, marginBottom: 20, display: 'inline-block'}}
                        >
                            <label>{item.label ? item.label + '：' : ''}</label>
                            <Input
                                style={item.width ? {width: item.width} : {width: 200}}
                                maxLength={item.maxLength ? item.maxLength : 20}
                                placeholder={item.placeholder ? item.placeholder : ''}
                                value={this.state.object.keyWord}
                                title={this.state.object.keyWord}
                                onChange={e => {
                                    this.setState({
                                        object: {
                                            ...this.state.object,
                                            keyWord: e.target.value
                                        }
                                    });
                                }}
                                {...item.attrs}
                            />
                        </span>
                    );
                    break;
                case 'Select':
                    vDOM.push(
                        <span
                            style={{marginRight: 20, marginBottom: 20, display: 'inline-block'}}
                            key={item.key + index}
                        >
                            <label>{item.label ? item.label + '：' : ''}</label>
                            <Select
                                defaultValue={item.value === 'status' ? this.state.object.status : this.state.object.type}
                                value={item.value === 'status' ? this.state.object.status : this.state.object.type}
                                style={item.width ? {width: item.width} : {width: 120}}
                                {...item.attrs}
                                onChange={value => {
                                    if (item.value === 'status') {
                                        this.setState({
                                            object: {
                                                ...this.state.object,
                                                status: value
                                            }
                                        });
                                    } else {
                                        this.setState({
                                            object: {
                                                ...this.state.object,
                                                type: value
                                            }
                                        });
                                    }
                                }}>
                                {
                                    item.options && item.options.map((itm, idx) => (
                                        <Option value={itm.value} key={idx}>{itm.name}</Option>
                                    ))
                                }
                            </Select>
                        </span>
                    );
                    break;
                case 'DatePicker':
                    vDOM.push(
                        <span
                            style={{marginRight: 20, marginBottom: 20, display: 'inline-block'}}
                            key={item.key + index}
                        >
                            <label>{item.label ? item.label + '：' : ''}</label>
                            <DatePicker
                                placeholder={item.placeholder ? item.placeholder : ''}
                                style={item.width ? {width: item.width} : {width: 120}}
                                value={this.state.object.time ? moment(this.state.object.time) : ''}
                                {...item.attrs}
                                onChange={(date, dateString) => {
                                    this.setState({
                                        object: {
                                            ...this.state.object,
                                            time: dateString
                                        }
                                    });
                                }}
                            />
                        </span>
                    );
                    break;
                case 'RangePicker':
                    vDOM.push(
                        <span
                            style={{marginRight: 20, marginBottom: 20, display: 'inline-block'}}
                            key={item.key + index}
                        >
                        <label> {item.label ? item.label + '：' : ''}</label>
                            <RangePicker
                                placeholder={item.placeholder ? item.placeholder : ['开始时间', '结束时间']}
                                style={item.width ? {width: item.width} : {width: 120}}
                                {...item.attrs}
                                value={[this.state.object.startTime ? moment(this.state.object.startTime) : '', this.state.object.endTime ? moment(this.state.object.endTime) : '']}
                                onChange={(date, dateString) => {
                                    this.setState({
                                        object: {
                                            ...this.state.object,
                                            startTime: dateString[0],
                                            endTime: dateString[1]
                                        }
                                    });
                                }}
                            />
                        </span>
                    );
                    break;
                case 'br':
                    vDOM.push(<br key={item.key + index}/>);
                    break;
                default:
                    return '';
            }
        });

        vDOM.push(
            <span
                key={'buttons'}
                style={{marginRight: 20, marginBottom: 20, display: 'inline-block'}}
            >
                <Button
                    style={{marginRight: 20}}
                    type='primary'
                    onClick={() => {
                        this.props.onSearch && this.props.onSearch(this.state.object);
                    }}
                >
                    搜索
                </Button>
                <Button
                    onClick={() => {
                        this.setState({
                            object: {
                                keyWord: '',
                                type: 0,
                                status: 0,
                                startTime: '',
                                endTime: '',
                                time: ''
                            }
                        }, () => {
                            this.props.onReset && this.props.onReset(this.state.object);
                        });
                    }}
                >
                    重置
                </Button>
            </span>
        );

        return vDOM;
    }

}

// 示例
// <Searcher form={form} onSearch={data=>{...}} onReset={()=>{}} />
// let form = [
//     {
//         key: 'Input',
//         type: 'Input',
//         label: '关键词',
//         width: 120,
//         placeholder: '请输入关键词',
//         attrs: {
//             maxLength: 10
//         }
//     },
//     {
//         key: 'RangePicker',
//         type: 'RangePicker',
//         label: '时间段',
//         width: 250,
//         placeholder: ['开始时间', '结束时间']
//     },
//     {
//         key: 'Select',
//         type: 'Select',
//         value: 'status',
//         label: '状态',
//         width: 100,
//         options: [
//             {value: 0, name: '全部'},
//             {value: 1, name: '通过'},
//             {value: 2, name: '未通过'}
//         ]
//     },
//     {
//         key: 'br',
//         type: 'br'
//     },
//     {
//         key: 'Select',
//         type: 'Select',
//         value: 'type',
//         label: '服务类型',
//         width: 100,
//         options: [
//             {value: 0, name: '已结算'},
//             {value: 1, name: '未结算'},
//         ]
//     },
//     {
//         key: 'DatePicker',
//         type: 'DatePicker',
//         label: '日期',
//         placeholder: '请选择日期'
//     },
// ]