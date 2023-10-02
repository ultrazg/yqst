/**
 * Created by yb on 2019/03/08.
 */
import React, {Component} from 'react';
import {Form, Button, Table, Menu, Dropdown, Modal, Card, Tabs, Row, Col, Input} from 'antd';
import {EllipsisOutlined, PlusOutlined, CheckOutlined, RedEnvelopeOutlined, CopyOutlined} from '@ant-design/icons';
import HeadBar from "../../../baseview/headbar/HeadBar";
import {Link} from "react-router-dom";
import accountingModel from '../model/accountingModel';
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const TabPane = Tabs.TabPane;
const Search = Input.Search;

class AccountBooksDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, // 当前页数
            size: 10, // 每页数目
            total: 0, // 总条数
            list: [],
            ztVisible: false,
        };
    }

    componentDidMount() {
    }

    // 视图层
    render() {
        return (
            <ViewContent crumb={[{name: "账务中心"},
                {name: "企业列表", link: "/Pages/EnterpriseList"},
                {name: "企业账套列表", link: "/Pages/BooksList"},
                {name: "企业账套详情", link: "/Pages/BooksDetail"},
                {name: "企业账簿详情"},
            ]}>
                <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                    {this.makeBasView()}
                    {this.makeTable()}
                </div>
            </ViewContent>
        );
    }

    makeBasView() {
        let noSetData = [
            {key: 'parentSn', type: 'Texts', label: '企业账簿编号', span: 12, value: 123},
            {key: 'parentSna', type: 'Texts', label: '记账期限', span: 12, value: 456},
            {key: 'parentSnd', type: 'Texts', label: '账簿状态', span: 12, value: 789},
        ];
        return <Card
            type="inner"
            title="企业账簿信息"
        >
            <AssemblySet key={'makeBasView'} data={noSetData} form={this.props.form}/>
        </Card>
    }

    makeTable() {
        const columns = [
            {
                title: '序号',
                key: 'key',
                dataIndex: 'key',
            },
            {
                title: '记账时间',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '凭证号',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '会计科目',
                key: 'softName',
                dataIndex: 'softName',
                // render: (res) => {
                //     return <span>
                //         {numberFormat.thousandBit(res || 0, 2)}
                //     </span>;
                // }
            },
            {
                title: '科目编号',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <div>
                        {res ? moment(res).format("YYYY-MM-DD") : ""}
                    </div>
                }
            },
            {
                title: '借方',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <div>
                        {res ? moment(res).format("YYYY-MM-DD") : ""}
                    </div>
                }
            },
            {
                title: '贷方',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <div>
                        {res ? moment(res).format("YYYY-MM-DD") : ""}
                    </div>
                }
            },
            {
                title: '余额',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <div>
                        {res ? moment(res).format("YYYY-MM-DD") : ""}
                    </div>
                }
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    const menu = (
                        <Menu style={{textAlign: 'center'}}>
                            <Menu.Item>
                                <Link to={`/Pages/AuthenticationEdit?id=${res.docParentId}`}>
                                    <Button
                                        size={'small'} type="primary">
                                        查看
                                    </Button>
                                </Link>
                            </Menu.Item>
                            <Menu.Item>
                                <Button
                                    size={'small'}
                                    type="primary"
                                    onClick={() => {
                                        // this.setState({delVisible: true, delId: res.docParentId})
                                    }}
                                >删除</Button>
                            </Menu.Item>
                        </Menu>
                    );

                    return <div>
                        <Dropdown overlay={menu} placement="bottomCenter">
                            <EllipsisOutlined style={{fontSize: '30px', cursor: 'pointer'}}/>
                        </Dropdown>
                    </div>
                }
            },
        ];
        // 搜索字段
        const searchDatas = [
            {key: 'name', type: 'Input', value: '', placeholder: '请输入', label: '科目编号/摘要', maxLength: 30},
            {key: 'createTimes', type: 'RangePicker', value: '', placeholder: ['开始时间', '结束时间'], label: '选择时间段'},
        ];
        return <Tabs defaultActiveKey="1">
            <TabPane tab="账簿详情" key="1">
                <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
                    this.setState({
                        name: obj.name,
                        serviceTag: obj.serviceTag,
                        current: 1,
                    }, () => {
                        this.getList()
                    })
                }}/>
                <div style={{marginBottom: '10px'}}>
                    <Button type='primary' icon={<PlusOutlined />}>新建</Button>
                    <span style={{width: '10px', display: 'inline-block'}}/>
                    <Button type='primary' icon={<CheckOutlined />}>保存</Button>
                    <span style={{width: '10px', display: 'inline-block'}}/>
                    <Button type='primary' icon={<RedEnvelopeOutlined />}>结账</Button>
                    <span style={{width: '10px', display: 'inline-block'}}/>
                    <Button type='primary' icon={<CopyOutlined />}>导出</Button>
                </div>

                <Table
                    columns={columns}
                    dataSource={this.state.list}
                    pagination={
                        {
                            total: this.state.total,
                            current: this.state.current,
                            pageSize: this.state.size,
                            onChange: (a, b) => {
                                this.setState({current: a}, () => {
                                    this.getList();
                                })
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
            </TabPane>
        </Tabs>
    }
}

const AccountBooksDetail = AccountBooksDetails;

export default AccountBooksDetail
