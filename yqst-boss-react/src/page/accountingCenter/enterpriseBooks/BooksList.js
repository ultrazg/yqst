/**
 * Created by yb on 2019/03/08.
 */
import React, {Component} from 'react';
import {Form, Button, Table, Menu, Dropdown, Modal, Card, Tabs, Row, Col, Input} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import HeadBar from "../../../baseview/headbar/HeadBar";
import {Link} from "react-router-dom";
import accountingModel from '../model/accountingModel';
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const TabPane = Tabs.TabPane;
const Search = Input.Search;

class BooksLists extends Component {
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
                {name: "企业账套列表"}
            ]}>
                <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                    {this.makeEnterpriseView()}
                    {this.makeTable()}
                </div>

                <Modal
                    title={'新建企业账套'}
                    visible={this.state.ztVisible}
                    onOk={() => {

                    }}
                    onCancel={() => {
                        this.setState({ztVisible: false});
                    }}
                    width={800}
                    maskClosable={false}
                    footer={null}
                >
                    {this.mackZtMod()}
                </Modal>
            </ViewContent>
        );
    }

    makeEnterpriseView() {
        let noSetData = [
            {key: 'parentSn', type: 'Texts', label: '企业ID', span: 12, value: 123},
            {key: 'parentSna', type: 'Texts', label: '企业名称', span: 12, value: 456},
            {key: 'parentSnd', type: 'Texts', label: '账套数量', span: 12, value: 789},
        ];
        return <Card
            type="inner"
            title="企业信息"
            style={{marginBottom: '10px'}}
        >
            <AssemblySet key={'makeEnterpriseView'} data={noSetData} form={this.props.form}/>
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
                title: '企业账套编号',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '账套名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '企业账套创建时间',
                key: 'softName',
                dataIndex: 'softName',
                // render: (res) => {
                //     return <span>
                //         {numberFormat.thousandBit(res || 0, 2)}
                //     </span>;
                // }
            },
            {
                title: '最近记账时间',
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
        return <Tabs defaultActiveKey="1">
            <TabPane tab="账套列表" key="1">
                <Button
                    onClick={() => {
                        this.setState({ztVisible: true});
                    }}
                    style={{
                        position: 'absolute',
                        right: '0',
                        top: '7px',
                    }}
                    type='primary'>新建账套</Button>
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

    mackZtMod() {
        let noSetData = [
            {
                key: 'as', type: 'Texts', label: '企业账套编号', span: 24, value: 'xxoo',
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 3},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 21},
                    },
                }
            },
            {
                key: 'ztName', type: 'Input', span: 24, value: 456, placeholder: '请填写账套名称', label: '账套名称',
                options: {
                    rules: [{
                        required: true, message: '账套名称不能为空',
                    }],
                },
                attribute: {
                    maxLength: 30
                },
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 3},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 16},
                    },
                }
            },
        ];

        const columns = [
            {
                title: '选项',
                key: 'key',
                dataIndex: 'key',
            },
            {
                title: '模板ID',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '模板名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '备注',
                key: 'softName',
                dataIndex: 'softName',
                // render: (res) => {
                //     return <span>
                //         {numberFormat.thousandBit(res || 0, 2)}
                //     </span>;
                // }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return <div>
                        {res ? moment(res).format("YYYY-MM-DD") : ""}
                    </div>
                }
            },
        ];
        return <div>
            <AssemblySet key={'mackZtMod'} data={noSetData} form={this.props.form}/>

            <Tabs defaultActiveKey="1">
                <TabPane tab="选择科目模板" key="1">
                    <Search
                        placeholder="搜索：ID / 编号 / 科目名称"
                        onSearch={value => {
                            console.log('value: ', value);
                        }}
                        style={{
                            position: 'absolute',
                            top: '8px',
                            width: '80%',
                            right: '0',
                        }}
                    />

                    <Table
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={false}
                    />
                </TabPane>
            </Tabs>
        </div>
    }
}

const BooksList = BooksLists;

export default BooksList
