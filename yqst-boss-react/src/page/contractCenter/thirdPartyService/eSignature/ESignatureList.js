/**
 * Created by yb on 2019/09/26
 */

import React from 'react';
import {Card} from 'antd';
import Model from "../../Model";
import SWTable from 'SWViews/table';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import {picc_default} from "../../../../resource/resourceRef";


class ESignatureList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                accountStatus: '',
                bindStatus: '',
                startTime: '',
                endTime: '',
                sortType: 2,
            },
        }
    }

    componentDidMount() {
        // this.getList();
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '合同中心'}, {name: "第三方服务"}, {name: "E签宝"}]}
                // tabs={this.tabsConfig()}
                // topBtn={
                //     <Button type='primary' icon={'plus'}>添加</Button>
                // }
            >
                {this.makeBaseView()}
            </TabsViewContent>
        );
    }

    getList() {
        Model.walletPAPage(this.state.requestPar, (res) => {
            this.state.total = res.data.total || 0;
            // const newList = res.data.records && res.data.records.map((item, idx) => {
            //     return {
            //         ...item,
            //         sNum: (++idx) + (this.state.requestPar.current * 10) // 添加序号字段
            //     }
            // });

            this.setState({
                list: res.data.records || [],
                total: this.state.total || 0,
            })
        }, (err) => {
        })
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                // this.setState({status: 0}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '待签署', callback: () => {
                // this.setState({status: 1}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已完成', callback: () => {
                // this.setState({status: 2}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已拒绝', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '履行中', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已取消', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }, {
            tabName: '已到期', callback: () => {
                // this.setState({status: 3}, () => {
                //     this.getList()
                // })
            }
        }]
    }

    makeBaseView(){
        return <div>
            <div style={{
                height: 120,
                borderRadius: 6,
                border: '1px solid #e8e8e8',
                marginBottom: 15,
                padding: 15,
                display: 'flex'
            }}>
                <div style={{textAlign: 'center', width: 150}}>
                    <img src={picc_default} alt="" style={{
                        width: 60,
                        height: 60,
                        marginTop: 10,
                    }}/>
                    <div>E签宝配置</div>
                </div>
                <div style={{textAlign: 'center',flexGrow: 1, borderRight: '1px solid #e8e8e8'}}>
                    今日签核总份数
                    <div style={{fontSize: 40}}>45</div>
                </div>
                <div style={{textAlign: 'center',flexGrow: 1}}>
                    E签宝开通用户
                    <div style={{fontSize: 40}}>120</div>
                </div>
                <div style={{textAlign: 'center',flexGrow: 1}}>
                    已认证用户
                    <div style={{fontSize: 40}}>68</div>
                </div>
                <div style={{textAlign: 'center',flexGrow: 1}}>
                    累计签核总份数
                    <div style={{fontSize: 40}}>163</div>
                </div>
            </div>

            {this.makeJLView()}
            {this.makeBottomView()}
        </div>
    }

    makeJLView(){
        const columns = [
            {
                title: '签署时间',
                key: '',
                dataIndex: ''
            },
            {
                title: '应用名',
                key: '',
                dataIndex: ''
            },
            {
                title: '合同编号',
                key: '',
                dataIndex: ''
            },
            {
                title: '单据编号',
                key: '',
                dataIndex: ''
            },
            {
                title: '合同份数',
                key: '',
                dataIndex: ''
            },
            {
                title: '签署企业',
                key: '',
                dataIndex: ''
            }
        ];
        return <Card
            type="inner"
            title="合同签署记录"
        >
            <SWTable
                columns={columns}
                dataSource={[]}
                // pagination={false}
            />
        </Card>
    }

    makeBottomView(){
        const columns01 = [
            {
                title: '用户名',
                key: 'a',
                dataIndex: 'a'
            },
            {
                title: '用户类型',
                key: 'b',
                dataIndex: 'b'
            },
            {
                title: '是否认证',
                key: 'c',
                dataIndex: 'c'
            },
            {
                title: '注册日期',
                key: 'd',
                dataIndex: 'd'
            }
        ];
        const columns02 = [
            {
                title: '名称',
                key: 'a',
                dataIndex: 'a'
            },
            {
                title: '申请编号',
                key: 'b',
                dataIndex: 'b'
            },
            {
                title: '应用名',
                key: 'c',
                dataIndex: 'c'
            },
            {
                title: '申请存在时间',
                key: 'd',
                dataIndex: 'd'
            }
        ];
        const columns03 = [
            {
                title: '操作企业',
                key: 'a',
                dataIndex: 'a'
            },
            {
                title: '收费类型',
                key: 'b',
                dataIndex: 'b'
            },
            {
                title: '收费金额',
                key: 'c',
                dataIndex: 'c'
            },
            {
                title: '业务单号',
                key: 'd',
                dataIndex: 'd'
            },
            {
                title: '收费时间',
                key: 'e',
                dataIndex: 'e'
            }
        ];
        return <div style={{display: 'flex', marginTop: 15}}>
            <div style={{width: 500, marginRight: 10}}>
                <Card
                    type="inner"
                    title="用户列表"
                    style={{
                        minHeight: 590
                    }}
                >
                    <SWTable
                        columns={columns01}
                        dataSource={[]}
                        pagination={{
                            pageSize: 20
                        }}
                    />
                </Card>
            </div>
            <div style={{flexGrow: 1}}>
                <Card
                    type="inner"
                    title="证据申请"
                >
                    <SWTable
                        columns={columns02}
                        dataSource={[]}
                        // pagination={false}
                    />
                </Card>
                <Card
                    type="inner"
                    title="收费记录"
                    style={{marginTop: 15}}
                >
                    <SWTable
                        columns={columns03}
                        dataSource={[]}
                        // pagination={false}
                    />
                </Card>
            </div>
        </div>
    }

}

export default ESignatureList
