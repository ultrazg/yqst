import React, {Component} from 'react'
import {Row, Col, Table, Form, Input, Button} from 'antd'
import OpportunityModel from "./model";
import TabsViewContent from "../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';

const FormItem = Form.Item
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class OpportunityAssistantUserLists extends Component {
    constructor(props){
        super(props)
        this.state={
            data:{},
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 15,
                keyWord: '',
                userName: '',
                companyName: '',
            },
        }
    }
    componentDidMount() {
        this.getOpportunityUser();

    }

    getOpportunityUser(){
        OpportunityModel.getOpportunityUserList(this.state.requestPar, success => {
            this.setState({
                data: success.data.records || [],
                total: success.data.total || 0,
            })
        })
    }

    render() {

        return (
            <TabsViewContent
                crumb={[{name: '商机助手中心'}, {name: "用户列表"}]}
                // tabs={this.tabsConfig()}
                // topBtn={
                //     <Link to={'/Pages/CloudServeEdit'}>
                //         <Button type='primary' icon={'plus'}>添加</Button>
                //     </Link>
                // }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
            </TabsViewContent>

        )
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'userName', type: 'Input', value: '', placeholder: '请输入', label: '用户账号', maxLength: 30},
            {key: 'companyName', type: 'Input', value: '', placeholder: '请输入', label: '企业名', maxLength: 30},
            /*{
                key: 'isHide', type: 'Select', value: '', placeholder: '请选择可见性', label: '可见性',
                list: [
                    {value: '', name: '全部'},
                    {value: '0', name: '全部可见'},
                    {value: '2', name: '白名单可见'},
                    {value: '3', name: '黑名单隐藏'},
                    {value: '1', name: '全部隐藏'},
                ],
            },
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}*/
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            obj.current = 1;

            delete obj.times;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getOpportunityUser();
            });
        }}/>
    }

    makeTable() {
        let {data, requestPar} = this.state;
        const columns = [{
            title: '用户账户',
            dataIndex: 'userName',
            key: 'userName',
        }, {
            title: '所属企业',
            dataIndex: 'companyName',
            key: 'companyName',
        }, {
            title: '商机数量',
            dataIndex: 'clueNum',
            key: 'clueNum',
        }, {
            title: '操作',
            dataIndex: 'operation',
            key: 'operation',
            width: 90,
            render:(a,b,c)=>{
                return <Button
                    type='primary'
                    size='small'
                    onClick={()=>{
                        this.props.history.push(`/Pages/BusinessOpportunityList?companySn=${b.companySn}&userSn=${b.userSn}`)
                    }}
                >查看</Button>
            }
        }];

        return <div>
            <SWTable
                columns={columns}
                dataSource={data}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getOpportunityUser();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

}

const OpportunityAssistantUserList = OpportunityAssistantUserLists

export default OpportunityAssistantUserList