import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import {
    Button,
    Input,
    Modal,
    Popconfirm,
    message,
    Select,
    Row,
    Col,
} from 'antd';
import Model from '../Model'
import SWTable from 'SWViews/table';
import '../../BusinessAssistantCss.less';
import Dropzone from 'react-dropzone';
import difference from 'lodash/difference';
import union from 'lodash/union';
import unionWith from 'lodash/unionWith';
import uniqBy from 'lodash/uniqBy';
import moment from 'moment'
import InteriorModal from './InteriorModal'
import ExternalModal from './ExternalModal'

const {Option} = Select;

class BAPersonalBusinessList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sourceList: [],
            list: [],
            total: 0,
            parameter: {
                current: 1,
                pageSize: 10,
                name: '',
                sourceSn: '0',
                cityRegion: '',
            },
            isBatch: false,
            isShare: false,
            interiorShare: false,
            externalShare: false,
            selectedRowKeys: [],
            saveSelectedRowKeys: [],
            changeList: [],
        };
    }

    componentDidMount() {
        this.businessAdminUserPage();
        this.businessAdminSourceList();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '商机助手'},
                    {title: '个人商机管理'},
                    {title: '个人商机列表'},
                ]}
            >
                {this.parameterView()}
                {this.btnView()}
                {this.totalNumView()}
                {this.SWTableView()}
                {this.state.interiorShare && <InteriorModal
                    onCancel={() => {
                        this.setState({interiorShare: false});
                    }}
                    onOk={(ids) => {
                        Model.businessClueShareAdd({
                            clueSnListStr: this.state.selectedRowKeys.join(','),
                            staffShareListStr: ids
                        }, (res) => {
                            message.success('分享成功！', 1);
                            this.setState({
                                interiorShare: false,
                                selectedRowKeys: [],
                            }, () => {
                                this.businessAdminUserPage();
                            })
                        });
                    }}
                />}
                {this.state.externalShare && <ExternalModal
                    onCancel={() => {
                        this.setState({externalShare: false});
                    }}
                    onOk={(ids) => {
                        Model.businessSharePartnerAdd({
                            clueSnListStr: this.state.selectedRowKeys.join(','),
                            shareCompanyIdListStr: ids
                        }, (res) => {
                            message.success('分享成功！', 1);
                            this.setState({
                                externalShare: false,
                                selectedRowKeys: [],
                            }, () => {
                                this.businessAdminUserPage();
                            })
                        });
                    }}
                />}
            </ViewCoat>
        );
    }

    businessAdminUserPage() {
        Model.businessAdminUserPage(this.state.parameter, (res) => {
            this.setState({
                list: res.data.records && res.data.records.map(item => {
                    return {
                        ...item,
                        key: item.sn
                    }
                }),
                total: res.data.total || 0
            });
        });
    }

    businessAdminSourceList() {
        Model.businessAdminSourceList({}, (res) => {
            this.setState({
                sourceList: res.data || []
            });
        });
    }

    businessClueAbandon(clueSnStr) {
        if (!clueSnStr)
            return message.error('请选择需要放弃的商机！', 1);

        Model.businessClueAbandon({
            clueSnStr
        }, (res) => {
            message.success('操作成功！', 1);
            this.setState({
                isBatch: false,
                isShare: false,
                selectedRowKeys: [],
                saveSelectedRowKeys: [],
                changeList: [],
            }, () => {
                this.businessAdminUserPage();
            });
        });
    }

    parameterView() {
        const {parameter, sourceList} = this.state;

        return <div>
            <h1
                style={{
                    fontSize: '14px',
                    fontWeight: 500,
                    color: '#2B3441',
                    marginBottom: '12px'
                }}
            >
                搜索
            </h1>
            <div style={{display: 'flex', marginBottom: '16px'}}>
                <div style={{display: 'flex', flex: 1, marginRight: '24px'}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        display: 'inline-block',
                        width: '70px',
                        lineHeight: '40px',
                        textAlign: 'right'
                    }}>线索来源：</label>
                    <Select className={'BASelect'}
                            value={parameter.sourceSn + ''}
                            onChange={(val) => {
                                this.setState({
                                    parameter: {
                                        ...parameter,
                                        sourceSn: val
                                    }
                                });
                            }}
                            style={{
                                flex: 1
                            }}
                    >
                        <Option value="0">全部</Option>
                        {
                            sourceList && sourceList.map(item => {
                                return <Option key={item.sn + ''} value={item.sn + ''}>{item.source}</Option>
                            })
                        }
                    </Select>
                </div>
                <div style={{display: 'flex', flex: 1, marginRight: '24px'}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        display: 'inline-block',
                        width: '70px',
                        lineHeight: '40px',
                        textAlign: 'right'
                    }}>客户名称：</label>
                    <Input placeholder='请输入'
                           style={{
                               flex: 1,
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                           }}
                           value={parameter.name}
                           onChange={(e) => {
                               this.setState({
                                   parameter: {
                                       ...parameter,
                                       name: e.target.value
                                   }
                               });
                           }}
                    />
                </div>
                <div style={{display: 'flex', flex: 1}}>
                    <label style={{
                        fontSize: '14px',
                        marginRight: '4px',
                        color: '#2B3441',
                        display: 'inline-block',
                        width: '70px',
                        lineHeight: '40px',
                        textAlign: 'right'
                    }}>所在城市：</label>
                    <Input placeholder='请输入'
                           style={{
                               flex: 1,
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                           }}
                           value={parameter.cityRegion}
                           onChange={(e) => {
                               this.setState({
                                   parameter: {
                                       ...parameter,
                                       cityRegion: e.target.value
                                   }
                               });
                           }}
                    />
                </div>
            </div>
        </div>
    }

    totalNumView() {
        const {selectedRowKeys} = this.state;

        return this.state.isBatch ? <div
            style={{
                height: '48px',
                padding: '14px 16px',
                border: '1px solid rgba(111,166,247,1)',
                background: 'rgba(237,246,255,1)',
                borderRadius: '2px',
                marginTop: '16px',
            }}
        >
            <label style={{color: '#2B3441', fontSize: '14px'}}>已选：</label>
            <span style={{color: '#4481EB', fontSize: '14px', marginRight: '8px'}}>
                {selectedRowKeys.length}
            </span>
        </div> : null
    }

    btnView() {
        return <Row style={{marginTop: '16px', marginBottom: '16px'}}>
            <Col span={16}>
                {
                    this.state.isBatch ? <div>
                        <Popconfirm
                            placement="topRight"
                            title="确定要放弃这些商机！"
                            onConfirm={() => {
                                this.businessClueAbandon(this.state.selectedRowKeys.join(','));
                            }}
                            onCancel={() => {
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Button
                                type="danger"
                                style={{
                                    width: '80px',
                                    height: '40px',
                                    fontSize: '16px',
                                    marginRight: '16px'
                                }}
                            >放弃</Button>
                        </Popconfirm>
                        <Button
                            style={{width: '80px', height: '40px', fontSize: '16px'}}
                            onClick={() => {
                                this.setState({
                                    isBatch: false,
                                    selectedRowKeys: [],
                                    saveSelectedRowKeys: [],
                                    changeList: [],
                                });
                            }}
                        >返回</Button>
                    </div> : this.state.isShare ? <div>
                        <Button
                            type="primary"
                            disabled={this.state.selectedRowKeys.length <= 0}
                            style={{
                                width: '120px',
                                height: '40px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                // message.info('工程师正在紧张的研发中...', 1);
                                this.setState({interiorShare: true});
                            }}
                        >内部共享</Button>
                        <Button
                            disabled={this.state.selectedRowKeys.length <= 0}
                            style={{
                                width: '120px',
                                height: '40px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                // message.info('工程师正在紧张的研发中...', 1);
                                this.setState({externalShare: true});
                            }}
                        >外部共享</Button>
                        <Button
                            style={{width: '120px', height: '40px', fontSize: '16px'}}
                            onClick={() => {
                                this.setState({
                                    isShare: false,
                                    selectedRowKeys: [],
                                    saveSelectedRowKeys: [],
                                    changeList: [],
                                });
                            }}
                        >返回</Button>
                    </div> : <div>
                        <Dropzone
                            style={{
                                display: 'inline-block',
                                border: '0px',
                                width: 'auto',
                                height: 'auto',
                            }}
                            accept="application/vnd.ms-excel,
                            application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                            accept=".xlsx,.xls"
                            onDrop={(accepted, rejected) => {
                                if (accepted.length == 0) {
                                    message.info("获取文件失败", 2);
                                    return;
                                }
                                Model.businessAdminBatchImport(accepted[0], (res) => {
                                    Modal.success({
                                        title: '导入成功',
                                        content: '本次一共导入' + res.data.amount
                                            + '条线索，重复的线索' + res.data.repeatAmount
                                            + '条，失败的线索' + res.data.failureAmount + '条',
                                        onOk: () => {
                                            this.businessAdminUserPage();
                                        }
                                    });
                                }, () => {
                                });
                            }}
                        >
                            <Button type="primary"
                                    style={{width: '120px', height: '40px', fontSize: '16px', marginRight: '16px'}}
                            >批量导入</Button>
                        </Dropzone>
                        <Button
                            style={{
                                width: '120px',
                                height: '40px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                window.open("https://sunawtest.oss-cn-shenzhen.aliyuncs.com/clue/%E7%BA%BF%E7%B4%A2%E5%AF%BC%E5%85%A5.xlsx");
                            }}
                        >下载模板</Button>
                        <Button
                            disabled={this.state.list <= 0}
                            style={{
                                width: '120px',
                                height: '40px',
                                fontSize: '16px',
                                marginRight: '16px'
                            }}
                            onClick={() => {
                                this.setState({
                                    isBatch: true
                                });
                            }}
                        >批量操作</Button>
                        <Button
                            disabled={this.state.list <= 0}
                            style={{width: '120px', height: '40px', fontSize: '16px'}}
                            onClick={() => {
                                this.setState({isShare: true});
                            }}
                        >商机共享</Button>
                    </div>
                }
            </Col>
            <Col span={8} style={{textAlign: 'right'}}>
                <Button type="primary"
                        style={{
                            width: '80px',
                            height: '40px',
                            fontSize: '16px',
                            marginRight: '16px'
                        }}
                        onClick={() => {
                            this.businessAdminUserPage();
                        }}
                >搜索</Button>
                <Button
                    style={{width: '80px', height: '40px', fontSize: '16px'}}
                    onClick={() => {
                        this.setState({
                            parameter: {
                                current: 1,
                                pageSize: 10,
                                name: '',
                                sourceSn: '0',
                                cityRegion: '',
                            }
                        });
                    }}
                >重置</Button>
            </Col>
        </Row>
    }

    SWTableView() {
        let {list, parameter, total, isBatch, isShare, selectedRowKeys, saveSelectedRowKeys, changeList} = this.state;
        let columns = [
            {
                title: '客户名称',
                key: 'name',
                dataIndex: 'name',
                width: 120,
                fixed: 'left',
            },
            {
                title: '联系人',
                key: 'contacts',
                dataIndex: 'contacts',
            },
            {
                title: '联系方式',
                key: 'phone',
                dataIndex: 'phone',
            },
            {
                title: '线索来源',
                key: 'clueSource',
                dataIndex: 'clueSource',
            },
            {
                title: '项目名称',
                key: 'projectName',
                dataIndex: 'projectName',
            },
            {
                title: '意向内容',
                key: 'intentionContent',
                dataIndex: 'intentionContent',
                width: 200
            },
            {
                title: '所在城市',
                key: 'cityRegion',
                dataIndex: 'cityRegion',
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 150,
                fixed: 'right',
                render: (res) => {
                    return <span>
                        {res ? moment(res).format("YYYY-MM-DD HH:mm") : ""}
                    </span>;
                }
            }
        ];
        if (!isBatch && !isShare) {
            columns.push({
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                fixed: 'right',
                render: (res) => {
                    return <div>
                        <Popconfirm
                            placement="topRight"
                            title="确定要放弃该商机！"
                            onConfirm={() => {
                                this.businessClueAbandon(res.sn);
                            }}
                            onCancel={() => {
                            }}
                            okText="确定"
                            cancelText="取消"
                        >
                            <a>
                                放弃线索
                            </a>
                        </Popconfirm>
                    </div>
                }
            });
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: (rowKeys) => {
                let preChangeRowData = [];
                // 收集当前分页下的所有key
                const preKey = list.map(item => {
                    // 保存当前页面的选中的数据
                    rowKeys.forEach(cKey => {
                        if ('' + item.key === '' + cKey) {
                            preChangeRowData.push(item);
                            return false;
                        }
                    });
                    return item.key
                });

                // 去除当前页面选中的key，剩下当前页面未选中的key
                const noChangeRowKey = difference(preKey, rowKeys);

                // 合并所有选中的key，并去重
                selectedRowKeys = union(selectedRowKeys, rowKeys);

                // 去除之前选中过的值
                selectedRowKeys = difference(selectedRowKeys, noChangeRowKey);

                // 合并所有的选中的数据
                changeList = unionWith(changeList, preChangeRowData);

                // 去掉重复的数据
                changeList = uniqBy(changeList, 'key');

                // 去除当前页面下没有的数据
                let newChangeList = [];
                changeList.forEach(item => {
                    let isChange = true;
                    noChangeRowKey.forEach(cKey => {
                        if ('' + item.key === '' + cKey) {
                            isChange = false;
                        }
                    });
                    if (isChange) {
                        newChangeList.push(item);
                    }
                });

                this.setState({selectedRowKeys, changeList: newChangeList});
            },
        };

        return <SWTable
            scroll={{x: 1300}}
            columns={columns}
            dataSource={list}
            rowSelection={isBatch || isShare ? rowSelection : null}
            pagination={
                {
                    total: total,
                    current: parameter.current,
                    pageSize: parameter.pageSize,
                    onChange: (a, b) => {
                        this.setState({
                                parameter: {
                                    ...parameter,
                                    current: a,
                                }
                            },
                            () => {
                                this.businessAdminUserPage();
                            }
                        )
                    },
                    showTotal: (total, range) => `共有${total}条`
                }
            }
        />
    }

}

export default BAPersonalBusinessList;
