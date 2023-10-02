import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Input,
    Tabs,
} from 'antd';
import CompanyProductModel from '../CompanyProductModel';
import SWTable from 'SWViews/table';
import moment from "moment";

const { TabPane } = Tabs;

class ApplyForList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            keyWord: '',
            shopData: [],
            listType: 0,
        };
    }

    search = () => {
        this.setState({current: 1}, () => {
            this.getPage()
        });
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord, listType = this.state.listType) => {
        CompanyProductModel.ApplyList({
            current,
            pageSize,
            keyWord,
            listType,
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }


    componentDidMount() {
        this.getPage()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '企业产品库'},
                    {title: '申请列表'},
                ]}
            >
                <Tabs activeKey={this.state.listType + ''} onChange={(key) => {
                    this.setState({listType: key, current: 1}, () => {
                        this.getPage()
                    });
                }}>
                    <TabPane tab="全部" key="0"/>
                    <TabPane tab="待审核" key="1"/>
                    <TabPane tab="已添加" key="2"/>
                    <TabPane tab="已驳回" key="3"/>
                </Tabs>
                {/*<h4 style={{marginBottom: 12}}>搜索</h4>*/}
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {this.renderOperationButton()}
                {/* 表格区域 */}
                {this.renderTable()}
            </ViewCoat>
        );
    }

    renderSearch = () => {
        return (
            <div>
                <label
                    style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', marginRight: 8}}
                >
                    关键词 :
                </label>
                <Input
                    style={{width: 272, height: 40, fontSize: '14px'}}
                    value={this.state.keyWord}
                    placeholder={'请输入关键字'}
                    onChange={e => {
                        this.setState({keyWord: e.target.value})
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) this.search()
                    }}
                    maxLength={30}
                />
                <Button
                    type="primary"
                    onClick={this.search}
                    style={{
                        marginLeft: 16,
                        width: 96,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                >
                    搜索
                </Button>
                <Button
                    style={{
                        marginLeft: 16,
                        width: 96,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                    onClick={() => this.setState({keyWord: ''})}
                >
                    重置
                </Button>
            </div>
        )
    }

    renderOperationButton = () => {
        return (
            <div style={{marginTop: 24}}>
                <Button
                    // className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForEdit');
                        // this.setState({visible: true})
                    }}
                    icon={<PlusOutlined/>}
                    style={{height: 40, fontSize: '16px', borderRadius: '6px'}}
                >
                    发起申请
                </Button>
            </div>
        );
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {
                title: '申请单号', width: '15%', dataIndex: 'applySn', key: 'applySn',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '申请类型', width: 100, dataIndex: 'applyType', key: 'applyType', render: (text) => {
                    switch (parseInt(text)) {
                        case 1:
                            return "新增产品";
                        default:
                            return "";
                    }
                }
            },
            {
                title: '企业产品编号', width: '15%', dataIndex: 'goodsParentSn', key: 'goodsParentSn',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '企业产品名称', width: '20%', dataIndex: 'goodsName', key: 'goodsName',
                render: (text) => {
                    return <span title={text} className={'text-elli2'}>{text}</span>
                }
            },
            {
                title: '状态', dataIndex: 'applyStatus', key: 'applyStatus', width: 90, render: (text) => {
                    //申请状态 1:待审核 2:已添加 3:已驳回
                    switch (parseInt(text)) {
                        case 1:
                            return "待审核";
                        case 2:
                            return "已添加";
                        case 3:
                            return "已驳回";
                        default:
                            return "";
                    }
                }
            },
            {
                title: '提交日期',
                dataIndex: 'createTime',
                key: 'createTime',
                width: 110,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {title: '操作', width: 60, dataIndex: 'operation', render: (text, record) => operationBtn(record)},
        ]
        const operationBtn = (record) => (
            <>
                <a
                    onClick={() => {
                        this.props.history.push(`/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/ApplyForDetail?id=${record.applySn}`)
                    }}
                >
                    查看
                </a>
            </>
        )
        return (
            <div className={'sw-table'} style={{marginTop: 26}}>
                <SWTable
                    columns={columns}
                    dataSource={tableData}
                    // rowKey={'sn'}
                    pagination={{
                        current: this.state.current,
                        total: this.state.total,
                        onChange: (page, pageSize) => {
                            this.setState({current: page}, () => {
                                this.getPage(page)
                            })
                        }
                    }}
                />
            </div>
        )
    }

}

export default ApplyForList;
