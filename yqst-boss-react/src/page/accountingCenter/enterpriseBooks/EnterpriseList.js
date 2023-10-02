/**
 * Created by yb on 2019/03/08.
 */
import React, {Component} from 'react';
import {Form, Button, Table, Menu, Dropdown, Modal} from 'antd';
import HeadBar from "../../../baseview/headbar/HeadBar";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";
import accountingModel from '../model/accountingModel';
import moment from 'moment'
import ViewContent from "../../../baseview/viewContent/ViewContent";

class EnterpriseLists extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1, // 当前页数
            size: 10, // 每页数目
            total: 0, // 总条数
            list: [],
        };
    }

    componentDidMount() {
    }

    getList(){

    }

    // 视图层
    render() {
        return (
            <ViewContent crumb={[{name: "账务中心"}, {name: "企业列表"}]}>
                <div style={{background: '#fff', padding: '5px', margin: '5px', borderRadius: '6px'}}>
                    {this.makeHeadSearch()}
                    {this.makeTable()}
                </div>
            </ViewContent>
        );
    }

    // 生成搜索内容
    makeHeadSearch() {
        // 搜索字段
        const searchDatas = [
            {key: 'name', type: 'Input', value: '', placeholder: '请输入企业ID/名称', label: '企业ID/名称', maxLength: 30},
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {
            console.log(obj);
            this.setState({
                name: obj.name,
                serviceTag: obj.serviceTag,
                current: 1,
            }, () => {
                this.getList()
            })
        }}/>
    }

    // 生成列表
    makeTable() {
        const columns = [
            {
                title: '序号',
                key: 'key',
                dataIndex: 'key',
            },
            {
                title: '企业ID',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '企业名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '账套数量',
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
                    // const menu = (
                    //     <Menu style={{textAlign: 'center'}}>
                    //         <Menu.Item>
                    //             <Link to={`/Pages/AuthenticationEdit?id=${res.docParentId}`}>
                    //                 <Button
                    //                     size={'small'} type="primary">
                    //                     编辑
                    //                 </Button>
                    //             </Link>
                    //         </Menu.Item>
                    //         <Menu.Item>
                    //             <Button
                    //                 size={'small'}
                    //                 type="primary"
                    //                 onClick={()=>{
                    //                     this.setState({delVisible: true, delId: res.docParentId})
                    //                 }}
                    //             >删除</Button>
                    //         </Menu.Item>
                    //     </Menu>
                    // );
                    //
                    // return <div>
                    //     <Dropdown overlay={menu} placement="bottomCenter">
                    //         <Icon
                    //             style={{fontSize: '30px', cursor: 'pointer'}}
                    //             type="ellipsis"/>
                    //     </Dropdown>
                    // </div>
                    return <Link to={'/Index'}>
                        <Button type='primary'>查看</Button>
                    </Link>
                }
            },
        ];
        return <Table
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
    }
}

const EnterpriseList = EnterpriseLists;

export default EnterpriseList
