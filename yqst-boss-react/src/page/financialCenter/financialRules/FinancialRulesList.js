/**
 * Created by ljy on 2018/4/28
 */
import React, {Component} from 'react';
import {Button, Table, Menu, Dropdown, Input} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import ViewContent from "../../../baseview/viewContent/ViewContent";

const columns = [
    {title: '序号', dataIndex: 'id', width: '5%'},
    {title: '规则名称', dataIndex: 'ruleName', width: '15%'},
    {title: '金服SP企业', dataIndex: 'sp', width: '15%'},
    {title: '金服销售店铺名称', dataIndex: 'shopName', width: '15%'},
    {title: '金服方案名称', dataIndex: 'planName', width: '15%'},
    {title: '金服方案商品名称', dataIndex: 'planShopName', width: '15%'},
    {title: '创建时间', dataIndex: 'createTime', width: '15%'},
    {title: '操作', dataIndex: 'operation', width: '5%'}
];

class FinancialChannelList extends Component {
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
                ruleName: "两证一卡优贷计划（LCV）高利率16.88%",
                sp: "小马金服",
                shopName: "小马金服",
                planName: "两证一卡优贷计划（LCV）高利率16.88%",
                planShopName: "两证一卡优贷计划（LCV）高利率16.88%",
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
                {name: "交易规则管理"}, {name: "交易规则列表"}
            ]}>
                <div style={{
                    paddingBottom: 15,
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
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
                            规则名称：
                        </div>
                        <Input/>
                        <Button style={{
                            marginLeft: this.props.IndexReducers.contentWidth * 0.02,
                        }} type="primary" onClick={() => {
                        }}>搜索</Button>
                    </div>

                    <Button type="primary" onClick={() => {
                    }}>添加交易规则</Button>
                </div>
                <Table
                    // scroll={{x: 1060, y: 0}}
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
export default connect(mapStateToProps, mapDispatchToProps)(FinancialChannelList)
