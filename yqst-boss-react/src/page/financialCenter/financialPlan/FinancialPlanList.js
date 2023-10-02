/**
 * Created by ljy on 2018/4/28
 */
import React, {Component} from 'react';
import {Button, Table, Menu, Dropdown} from 'antd';
import {EllipsisOutlined} from '@ant-design/icons';
import {connect} from 'react-redux';
import ViewContent from "../../../baseview/viewContent/ViewContent";

const columns = [
    {title: '序号', dataIndex: 'id', width: 70, fixed: 'left'},
    {title: '方案所属SP(企业)', dataIndex: 'sp', width: 150, fixed: 'left'},
    {title: '渠道', dataIndex: 'channel', width: 150},
    {title: '方案名称', dataIndex: 'planName', width: 200},
    {title: '方案类型', dataIndex: 'planType', width: 120},
    {title: '最低首付%', dataIndex: 'minFirstPer', width: 90},
    {title: '可融%', dataIndex: 'canPer', width: 90},
    {title: '方案利率%', dataIndex: 'ratePer', width: 90},
    {title: '月还款系数', dataIndex: 'repayRatio', width: 150},
    {title: '付息方式', dataIndex: 'repayWay', width: 100},
    {title: '起贷限额', dataIndex: 'startLimit', width: 120},
    {title: '贷款限额', dataIndex: 'loanLimit', width: 120},
    {title: '尾款利率%', dataIndex: 'endRatePer', width: 100},
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

class FinancialPlanList extends Component {
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
            case 'edit':
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
                sp: "小马金服",
                channel: "平安",
                planName: "一证通（新车2-12万）（高利率14.88%）",
                planType: "二手车",
                minFirstPer: "20",
                canPer: "80",
                ratePer: "13.88",
                repayRatio: <div>12期 : [0.08974]<br/>24期 : [0.04796]<br/>36期 : [0.03412]</div>,
                repayWay: "等额本息",
                startLimit: "120000",
                loanLimit: "200000",
                endRatePer: "0.00",
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
            <ViewContent crumb={
                [{name: "金融方案管理"}, {name: "金融方案列表"}]
            }>
                <div style={{textAlign: 'right', marginBottom: 15}}>
                    <Button type="primary" onClick={() => {
                    }}>创建金融方案</Button>
                </div>

                <Table
                    scroll={{x: 1760, y: 0}}
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
export default connect(mapStateToProps, mapDispatchToProps)(FinancialPlanList)
