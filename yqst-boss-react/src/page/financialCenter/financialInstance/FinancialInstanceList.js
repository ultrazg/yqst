/**
 * Created by ljy on 2018/4/28
 */
import React, {Component} from 'react';
import {Button, Table, Menu, Dropdown, Input} from 'antd';
import {EllipsisOutlined, DownOutlined, } from '@ant-design/icons';
import {connect} from 'react-redux';
import ViewContent from "../../../baseview/viewContent/ViewContent";

const columns = [
    {title: '序号', dataIndex: 'id', width: 70, fixed: 'left'},
    {title: '实例ID', dataIndex: 'instanceId', width: 170},
    {title: '所属SP', dataIndex: 'sp', width: 150},
    {title: '金融方案渠道', dataIndex: 'channel', width: 140},
    {title: '经销商团队(FA)', dataIndex: 'fa', width: 200},
    {title: '客户名称', dataIndex: 'clientName', width: 120},
    {title: '实例状态', dataIndex: 'status', width: 200},
    {title: '贷款总额', dataIndex: 'loadTotal', width: 120},
    {title: '创建时间', dataIndex: 'createTime', width: 150},
    {title: '操作', dataIndex: 'operation', fixed: 'right', width: 60}
];
const menu = (
    <Menu onClick={() => {
    }}>
        <Menu.Item key="1">1st menu item</Menu.Item>
        <Menu.Item key="2">2nd menu item</Menu.Item>
        <Menu.Item key="3">3rd item</Menu.Item>
    </Menu>
);

class FinancialInstanceList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [],
            pagination: {pageSize: this.limit, total: 0},
        }
    }

    dropDownClick = (e, record) => {
        switch (e.key) {
            case 'detial':
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
                <Menu.Item key="detial">详情</Menu.Item>
            </Menu>
        )
    };

    componentDidMount() {
        this.setState({
            dataSource: this.setListData([1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 33])
        });
    }

    setListData(list) {
        let data = [];
        for (let i = 0; i < list.length; i++) {
            data.push({
                key: i,
                id: i,
                instanceId: "SX2017042600000001" + i,
                sp: "小马金服",
                channel: "平安",
                fa: "深圳中汇金融服务有限公司",
                clientName: "wallace",
                status: "合同已签署,GSP待确认安装",
                loadTotal: "￥" + 240000.00,
                createTime: '2018-04-28 15:10:00',
                operation: <div style={{display: 'flex', flexDirection: 'column'}}>
                    <Dropdown placement="bottomRight" overlay={this.dropDownMenu({})}>
                        <EllipsisOutlined />
                    </Dropdown>
                </div>
            });
        }
        return data;
    }

    render() {

        return (
            <ViewContent crumb={[
                {name: "金融实例管理"}, {name: "金融实例列表"}
            ]}>
                <div style={{
                    paddingBottom: 15,
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
                            width: this.props.IndexReducers.contentWidth * 0.01 * 9,
                            color: '#666',
                            fontSize: this.props.IndexReducers.contentWidth * 0.01
                        }}>
                            服务名称：
                        </div>
                        <Input/>
                    </div>
                    <div style={{
                        marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: this.props.IndexReducers.contentWidth * 0.01 * 4,
                            color: '#666',
                            fontSize: this.props.IndexReducers.contentWidth * 0.01
                        }}>
                            状态：
                        </div>
                        <Dropdown overlay={menu}>
                            <Button style={{
                                width: this.props.IndexReducers.contentWidth * 0.15,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <div style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    全部
                                </div>
                                <DownOutlined style={{fontSize:12}}/>
                            </Button>
                        </Dropdown>
                    </div>
                    <div style={{
                        marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center'
                    }}>
                        <div style={{
                            width: this.props.IndexReducers.contentWidth * 0.01 * 6.5,
                            color: '#666',
                            fontSize: this.props.IndexReducers.contentWidth * 0.01
                        }}>
                            所属渠道：
                        </div>
                        <Dropdown overlay={menu}>
                            <Button style={{
                                width: this.props.IndexReducers.contentWidth * 0.15,
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center'
                            }}>
                                <div style={{
                                    flex: 1,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    全部
                                </div>
                                <DownOutlined style={{fontSize:12}}/>
                            </Button>
                        </Dropdown>
                    </div>
                    <Button style={{
                        marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                    }} type="primary" onClick={() => {
                    }}>搜索</Button>
                </div>
                <Table
                    scroll={{x: 1380, y: 0}}
                    columns={columns}
                    onChange={this.handleTableChange}
                    dataSource={this.state.dataSource}
                    pagination={this.state.pagination}/>
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
export default connect(mapStateToProps, mapDispatchToProps)(FinancialInstanceList)
