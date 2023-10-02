import React, {Component} from 'react';
import Searcher from '../../../../../baseview/Searcher';
import {Button, Table} from 'antd';
import request from "../../../../../utils/request/request";
import Api from "../Api/Api";

/**
 * 出租方合同列表
 */
class LessorContractList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            total: 0,
            requestPar: {
                current: 1,
                keyWord: '',
                pageSize: 10,
            }
        };
        this.searcher_form = [
            {
                key: 'Input',
                type: 'Input',
                label: '关键词',
                placeholder: '搜索项目/企业名称',
                attrs: {
                    maxLength: 10,
                    allowClear: true,
                }
            }
        ];
        this.columns = [
            {
                title: '合同编号',
                key: 'businessSn',
                dataIndex: 'businessSn',
                width: '20%'
            },
            {
                title: '服务方',
                dataIndex: 'serviceProviderName',
                key: 'serviceProviderName',
                width: '30%'
            },
            {
                title: '需求方',
                dataIndex: 'demanderName',
                key: 'demanderName',
                width: '30%'
            },
            {
                title: '项目',
                dataIndex: 'projectName',
                key: 'projectName',
                width: '20%'
            },
            {
                title: '',
                dataIndex: 'opera',
                width: 70,
                // todo
                render: (text, record) => {
                    return <a style={{fontSize: 14}}
                              onClick={() => this.props.history.push('/pages/appCenter/contractAsst/contractAsstHome/maintainContractInfo/detail?sn=' + record.sn)}>查看</a>
                }
            },
        ];
    }

    componentDidMount() {
        this.getList();
    }

    render() {
        return (
            <div>
                <Searcher
                    form={this.searcher_form}
                    onSearch={data => {
                        const {keyWord} = data;

                        this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                keyWord,
                            }
                        }, () => {
                            this.getList();
                        });
                    }}
                    onReset={() => {
                        this.setState({
                            requestPar: {
                                current: 1,
                                keyWord: '',
                                pageSize: 10,
                            }
                        }, () => {
                            this.getList();
                        });
                    }}
                />
                <Table
                    columns={this.columns}
                    dataSource={this.state.data}
                    pagination={
                        {
                            total: this.state.total,
                            current: this.state.requestPar.current,
                            pageSize: this.state.requestPar.pageSize,
                            onChange: (current, b) => {
                                let obj = this.state.requestPar;
                                obj.current = current;

                                this.setState({
                                    requestPar: obj
                                }, () => {
                                    this.getList();
                                });
                            },
                            showTotal: (total, range) => `共有 ${total} 条数据`
                        }
                    }
                />
            </div>
        );
    }

    getList = () => {
        request(Api.MaintainLessorList, this.state.requestPar, res => {
            this.setState({
                data: res.data.records || [],
                total: res.data.total || 0
            });
        });
    }

}

export default LessorContractList;
