/**
 * Created by ljy on 2018/4/28
 */
import React, {Component} from 'react';
import { Button,  Table, Menu, Dropdown, Input} from 'antd';
import {EllipsisOutlined, } from '@ant-design/icons';
import {connect} from 'react-redux';
import FinancialChannelModel from './model/FinancialChannelModel';
import AddChannelModal from './addChannel/AddChannelModal';
import ViewContent from "../../../baseview/viewContent/ViewContent";

const columns = [
    {title: '序号', dataIndex: 'id', width: 70, fixed: 'left'},
    {title: '渠道编码', dataIndex: 'channelCode'},
    {title: '渠道名称', dataIndex: 'channelName'},
    {title: '联系人', dataIndex: 'contact'},
    {title: '联系电话', dataIndex: 'phone'},
    {title: '操作', dataIndex: 'operation', width: 50}
];

class FinancialChannelList extends Component {
    pageSize = 10;

    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {pageSize: this.limit, total: 0},
            canalName: '',
            canalPhone: '',
            channelVisible: false
        }
    }

    dropDownClick = (e, record) => {
        switch (e.key) {
            case 'detial':
                break;
            case 'edit':
                break;
            case 'del':
                break;
        }
    };

    /**
     * 表格操作下拉菜单
     * @param record 当行表格数据
     */
    dropDownMenu = (record) => {
        return (
            <Menu onClick={(e) => this.dropDownClick(e, record)}>
                <Menu.Item key="detial">查看</Menu.Item>
                <Menu.Item key="edit">编辑</Menu.Item>
                <Menu.Item key="del">删除</Menu.Item>
            </Menu>
        )
    };

    componentDidMount() {
        // this.refresh()
    }

    refresh() {
        FinancialChannelModel.getFinancialChannelList({
            current: 1,
            size: this.pageSize,
            canalName: this.state.canalName,
            canalPhone: this.state.canalPhone
        }, (res) => {
            this.setState({pagination: {current: 1, pageSize: this.limit, total: res.data.total}});
            this.setListData(res.data.records)
        }, () => {
        });
    }

    refreshNext(page) {
        FinancialChannelModel.financialChannelList({
            current: page,
            size: this.pageSize,
            canalName: this.state.canalName,
            canalPhone: this.state.canalPhone
        }, (res) => {
            this.setState({pagination: {current: page, pageSize: this.limit, total: res.data.total}});
            this.setListData(res.data.records)
        }, () => {
        });
    }

    handleTableChange = (pagination, filters, sorter) => {
        const pager = {...this.state.pagination};
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });
        this.refreshNext(pager.current);
    }

    setListData(list) {
        let data = [];
        for (let i = 0; i < list.length; i++) {
            data.push({
                key: i,
                id: i,
                channelCode: "SUNAW_YQST",
                channelName: "云企商通",
                contact: "wallace",
                phone: "17051200141",
                operation: <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Dropdown placement="bottomRight" overlay={this.dropDownMenu({})}>
                        <EllipsisOutlined />
                    </Dropdown>
                </div>
            });
        }
        this.setState({
            dataSource: data
        });
    }

    render() {
        return (
            <ViewContent crumb={[
                {name: "金融渠道管理"}, {name: "金融渠道列表"}
            ]}>
                <div style={{
                    paddingTop: 20,
                    paddingBottom: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: this.props.IndexReducers.contentWidth * 0.01 * 10,
                                color: '#666',
                                fontSize: this.props.IndexReducers.contentWidth * 0.01
                            }}>
                                渠道名称：
                            </div>
                            <Input
                                value={this.state.canalName}
                                onChange={(e) => {
                                    this.setState({
                                        canalName: e.target.value
                                    });
                                }}/>
                        </div>
                        <div style={{
                            marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center'
                        }}>
                            <div style={{
                                width: this.props.IndexReducers.contentWidth * 0.01 * 12,
                                color: '#666',
                                fontSize: this.props.IndexReducers.contentWidth * 0.01
                            }}>
                                联系人名称：
                            </div>
                            <Input
                                value={this.state.canalPhone}
                                onChange={(e) => {
                                    this.setState({
                                        canalPhone: e.target.value
                                    });
                                }}/>
                        </div>
                        <Button style={{
                            marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                        }} type="primary" onClick={() => {
                        }}>搜索</Button>
                    </div>
                    <Button style={{
                        marginRight: this.props.IndexReducers.contentWidth * 0.02,
                    }} type="primary" onClick={() => {
                        this.channelTemp = {
                            isEdit: false
                        };
                        this.setState({
                            channelVisible: true
                        });
                    }}>添加渠道</Button>
                </div>
                <Table
                    columns={columns}
                    onChange={this.handleTableChange}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}/>
                {this.state.channelVisible ?
                    <AddChannelModal
                        contentWidth={this.props.IndexReducers.contentWidth}
                        data={this.channelTemp}
                        setVisible={(bool) => {
                            this.setState({
                                channelVisible: bool
                            });
                        }}
                    /> : null}
            </ViewContent>
        );
    }
}

function mapStateToProps(state) {
    const {IndexReducers} = state;
    return {IndexReducers}
}

const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(FinancialChannelList)
