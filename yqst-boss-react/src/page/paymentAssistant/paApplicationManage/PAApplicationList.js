import React, {Component} from 'react';
import {Link} from "react-router-dom";
import {Button, Form, Table} from "antd";
import {PlusOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../../baseview/headSearch/HeadSearch";


class PAApplicationList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '收支付助手'}, {name: '应用列表'}]}
                topBtn={
                    <Link to={`/Pages/PAApplicationAdd`}>
                        <Button type='primary' icon={<PlusOutlined />}>新增应用</Button>
                    </Link>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTableView()}
            </TabsViewContent>
        )
    }


    makeHeadSearch = () => {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '名称/编号/企业', maxLength: 30},
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '提交时间'},
            {key: 'status', type: 'Select', value: '1', placeholder: '状态', label: '状态',
                list: [
                    {value: 1, name: '---不限---'},
                    {value: 2, name: '交易类型1'},
                ],
            },

        ];
        return (
            <HeadSearch data={searchDatas} form={this.props.form} callBack={(obj) => {

            }}/>
        )
    }

    makeTableView = ()=>{

        const columns = [
            {
                title: '应用名称',
                dataIndex: '',
                // width: 100,
                // fixed: 'left',
            },
            {
                title: '应用编号',
                dataIndex: '',
            },
            {
                title: 'API key',
                dataIndex: '',
            },
            {
                title: 'Secret Key',
                dataIndex: ''
            },
            {
                title: '申请企业',
                dataIndex: ''
            },
            {
                title: '调用次数',
                dataIndex: ''
            },
            {
                title: '创建时间',
                dataIndex: ''
            },
            {
                title: '应用状态',
                dataIndex: ''
            },
            {
                title: '操作',
                dataIndex: 'handle',
                // width: 100,
                // fixed: 'right',
                render: (text, record, index)=> {
                    return <Link to={`/Pages/PAApplicationDetail`}>查看</Link>
                }
            }
        ];
        const data = [{}];

        return (
            <div>
                {/*<p style={{fontSize: 10, paddingLeft: 15}}>共搜索到 922 条数据</p>*/}

                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    // scroll={{ x: 1500 }}
                    style={{marginTop: 18}}
                />
            </div>

        )
    }

}

export default PAApplicationList;