import React, {Component} from 'react';
import {Button, Input, Modal, message, Tabs} from "antd";
import CostAssistantModel from "../../CostAssistantModel";
import {getPageQuery} from "../../../../../utils";
import SWTable from "SWViews/table";
import moment from "moment";
import {CloudDownloadOutlined, LeftOutlined} from '@ant-design/icons';
import ViewCoat from "../../../PublicModule/ViewCoat/ViewCoat";

const {TabPane} = Tabs;

/**
 * 本期业务单据
 */
class CostAsstInitiateOriginalIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            data: [],
            isDownloadModalVisi: false,
            requestPar: {
                current: 1,
                pageSize: 10,
                sn: '',
                type: 1,
                keyWord: ''
            }
        };
        this.EnterColumns = [
            {
                title: "进场单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '进场日期',
                key: "entryTime",
                dataIndex: "entryTime",
                render: text => {
                    return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ];
        this.ExitColumns = [
            {
                title: "退场单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '退场日期',
                key: "exitTime",
                dataIndex: "exitTime",
                render: text => {
                    return <span>{text ? moment(text).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ];
        this.StopColumns = [
            {
                title: "停租单号",
                key: "businessSn",
                dataIndex: "businessSn"
            },
            {
                title: "项目名称",
                key: "projectName",
                dataIndex: "projectName",
            },
            {
                title: "承租方",
                key: "lesseeName",
                dataIndex: "lesseeName"
            },
            {
                title: "出租方",
                key: "lessorName",
                dataIndex: "lessorName",
            },
            {
                title: '停租周期',
                render: record => {
                    return <span>{record.startTime ? moment(record.startTime).format('YYYY-MM-DD') : ''} — {record.endTime ? moment(record.endTime).format('YYYY-MM-DD') : ''}</span>
                }
            }
        ]
    }

    componentDidMount() {
        const {sn} = getPageQuery();

        this.setState({
            requestPar: {
                ...this.state.requestPar,
                sn
            }
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <>
                <ViewCoat
                    breadCrumb={[
                        {title: "结算中心"},
                        {title: "结算单"},
                        {title: "结算单详情"},
                        {title: "本期业务单据"},
                    ]}
                >
                    <p>
                        <Button onClick={() => {
                            window.history.go(-1);
                        }}><LeftOutlined/>返回</Button>
                    </p>
                    <Tabs
                        onTabClick={key => this.setState({
                            requestPar: {
                                ...this.state.requestPar,
                                type: key
                            }
                        }, () => {
                            this.getList();
                        })}
                    >
                        <TabPane tab='进场单' key='1'>
                            {this.renderSearchHeaderView()}
                            {this.renderTableView()}
                        </TabPane>
                        <TabPane tab='退场单' key='2'>
                            {this.renderSearchHeaderView()}
                            {this.renderTableView()}
                        </TabPane>
                        <TabPane tab='停租单' key='3'>
                            {this.renderSearchHeaderView()}
                            {this.renderTableView()}
                        </TabPane>
                    </Tabs>
                    {this.renderDownloadModal()}
                </ViewCoat>
            </>
        );
    }

    getList = () => {
        CostAssistantModel.CostAsstSettlementOriginalBillList(this.state.requestPar, res => {
            this.setState({
                data: res.data || [],
                total: res.total || 0
            });
        });
    }

    /**
     * 下载文件
     * @param type
     */
    downloadHandle = type => {
        const {sn} = this.state.requestPar;

        CostAssistantModel[type === 0 ? 'CostAsstSettlementOriginalBillUrl' : 'CostAsstSettlementOriginalBillExcelUrl'](
            {sn},
            res => {
                const url = res.data[type === 0 ? 'businessBillEnclosureUrl' : 'url'];
                if (url) {
                    window.location.href = url;
                    message.success('开始下载');
                    this.setState({
                        isDownloadModalVisi: false
                    });
                } else {
                    message.info('没有可下载的文件');
                }
            }
        );
    }

    renderSearchHeaderView = () => {
        return (
            <>
                {/*<label>关键词：</label>*/}
                {/*<Input*/}
                {/*    style={{width: 300, marginRight: 20}}*/}
                {/*    placeholder='请输入关键词'*/}
                {/*    value={this.state.requestPar.keyWord}*/}
                {/*    maxLength={10}*/}
                {/*    onChange={e => {*/}
                {/*        this.setState({requestPar: {...this.state.requestPar, keyWord: e.target.value}});*/}
                {/*    }}*/}
                {/*/>*/}
                {/*<Button*/}
                {/*    type='primary'*/}
                {/*    style={{marginRight: 20}}*/}
                {/*    onClick={() => {*/}
                {/*        this.setState({*/}
                {/*            requestPar: {*/}
                {/*                ...this.state.requestPar,*/}
                {/*                current: 1*/}
                {/*            }*/}
                {/*        }, () => {*/}
                {/*            this.getList();*/}
                {/*        });*/}
                {/*    }}*/}
                {/*>*/}
                {/*    搜索*/}
                {/*</Button>*/}
                {/*<Button style={{marginRight: 20}} onClick={() => {*/}
                {/*    this.setState({*/}
                {/*        requestPar: {*/}
                {/*            ...this.state.requestPar,*/}
                {/*            current: 1,*/}
                {/*            pageSize: 10,*/}
                {/*            keyWord: ''*/}
                {/*        }*/}
                {/*    }, () => {*/}
                {/*        this.getList();*/}
                {/*    });*/}
                {/*}}>重置</Button>*/}
                <Button onClick={() => {
                    this.setState({isDownloadModalVisi: true})
                }}><CloudDownloadOutlined/>下载全部业务单据</Button>
            </>
        )
    }

    renderDownloadModal = () => {
        return (
            <>
                <Modal
                    title="选择要下载的文件类型"
                    visible={this.state.isDownloadModalVisi}
                    onCancel={() => {
                        this.setState({
                            isDownloadModalVisi: false
                        });
                    }}
                    footer={null}
                >
                    <Button style={{marginRight: 20}} onClick={() => {
                        this.downloadHandle(0);
                    }}>PDF 文件</Button>
                    <Button onClick={() => {
                        this.downloadHandle(1);
                    }}>EXCEL 文件</Button>
                </Modal>
            </>
        )
    }

    renderTableView = () => {
        return (
            <SWTable
                columns={
                    this.state.requestPar.type == 1
                        ? this.EnterColumns
                        : this.state.requestPar.type == 2
                            ? this.ExitColumns
                            : this.state.requestPar.type == 3
                                ? this.StopColumns
                                : null
                }
                dataSource={this.state.data}
                style={{marginTop: 20}}
                pagination={
                    {
                        total: this.state.total,
                        current: this.state.requestPar.current,
                        pageSize: this.state.requestPar.pageSize,
                        onChange: (current, b) => {
                            let obj = this.state.requestPar;
                            obj.current = current;

                            this.setState({
                                requestPar: obj
                            }, () => {
                                this.getList();
                            });
                        },
                        showTotal: (total, range) => `共有${total}条数据`
                    }
                }
            />
        )
    }

}

export default CostAsstInitiateOriginalIndex;