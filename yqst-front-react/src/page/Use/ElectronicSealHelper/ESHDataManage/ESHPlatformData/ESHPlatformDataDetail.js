import React, {Component} from 'react';
import {
    Button,
    Empty,
    Input,
    Modal,
    DatePicker,
    Row,
    Col,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from '../Model';
import moment from 'moment'

const {RangePicker} = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const analysisPar = (str = '') => {
    let resObj = {};
    if (str) {
        let arr = [];
        if (str.indexOf('&')) {
            arr = str.split('&');
            arr.forEach(item => {
                resObj[item.split('=')[0]] = item.split('=')[1];
            });

        } else {
            arr = str.split('=');
            resObj[arr[0]] = arr[1];
        }
    }
    return resObj;
};

class ESHPlatformDataDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            listPar: {
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
            },

            delVisible: false,
            delSn: null,
            selectedRowKeys: [],
            modVisible: false,
            listIdx: '',
        };
        this.praObj = analysisPar(this.props.location.search.substr(1));
    }

    componentDidMount() {
        this.openAuthPlatformPage();
    }

    componentWillUnmount() {

    }

    render() {
        let {list, listPar, total} = this.state;
        const columns = [
            {
                title: '列表编号',
                key: 'key',
                dataIndex: 'key',
            },
            {
                title: '使用编号',
                key: 'logSn',
                dataIndex: 'logSn',
            },
            {
                title: '公司名称',
                key: 'companyName',
                dataIndex: 'companyName',
            },
            {
                title: '扣费时间',
                key: 'deductionTime',
                dataIndex: 'deductionTime',
                // render: (res) => {
                //     return res ? moment(res).format("YYYY-MM-DD HH:mm") : ''
                // }
            },
            {
                title: '剩余可用次数',
                key: 'surplusCount',
                dataIndex: 'surplusCount',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 90,
                render: (res, data, idx) => {
                    return <div>
                        <a
                            onClick={() => {
                                this.setState({modVisible: true, listIdx: idx});
                            }}
                        >查看</a>
                    </div>
                }
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '数据管理'},
                    {title: '平台数据', link: '/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataList'},
                    {title: '数据明细'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}
                >搜索</h3>
                <div style={{display: 'flex', marginBottom: '24px'}}>
                    <div style={{display: 'flex', flex: 1,}}>
                        <label style={{width: '70px', textAlign: 'left', lineHeight: '40px'}}>企业名称：</label>
                        <Input placeholder="请输入"
                               value={listPar.keyWord}
                               style={{
                                   flex: 1,
                                   lineHeight: '40px',
                                   height: '40px',
                                   fontSize: '14px',
                                   marginLeft: '4px',
                                   borderRadius: '6px',
                               }}
                               onChange={(e) => {
                                   this.setState({listPar: {...this.state.listPar, keyWord: e.target.value}});
                               }}
                        />
                    </div>
                    <div style={{display: 'flex', flex: 1, marginLeft: '24px'}}>
                        <label style={{width: '70px', textAlign: 'left', lineHeight: '40px'}}>扣费时间：</label>
                        <RangePicker
                            className={'RangePicker'}
                            style={{
                                flex: 1,
                                lineHeight: '40px',
                                height: '40px',
                                fontSize: '14px',
                                marginLeft: '4px',
                                borderRadius: '6px',
                            }}
                            value={[listPar.startTime ? moment(listPar.startTime, dateFormat) : null, listPar.endTime ? moment(listPar.endTime, dateFormat) : null]}
                            onChange={(date, dateString) => {
                                this.setState({
                                    listPar: {
                                        ...this.state.listPar,
                                        startTime: dateString[0] || null,
                                        endTime: dateString[1] || null,
                                    }
                                })
                            }}
                        />
                    </div>
                    <div style={{flex: 1}}>
                        <Button type="primary"
                                style={{
                                    width: '80px',
                                    height: '40px',
                                    // lineHeight: '40px',
                                    fontSize: '16px',
                                    margin: '0px 16px',
                                    borderRadius: '6px',
                                }}
                                onClick={() => {
                                    this.setState({
                                        listPar: {
                                            ...this.state.listPar,
                                            current: 1,
                                        }
                                    }, () => {
                                        this.openAuthPlatformPage();
                                    });
                                }}
                        >搜索</Button>
                        <Button
                            style={{
                                width: '80px',
                                height: '40px',
                                // lineHeight: '40px',
                                fontSize: '16px',
                                borderRadius: '6px',
                            }}
                            onClick={() => {
                                this.setState({
                                    listPar: {
                                        current: 1,
                                        pageSize: 10,
                                        keyWord: '',
                                        startTime: '',
                                        endTime: '',
                                    },
                                }, () => {
                                    this.openAuthPlatformPage();
                                });
                            }}
                        >重置</Button>
                    </div>
                </div>
                <SWTable
                    columns={columns}
                    dataSource={list}
                    funBtn={<div style={{fontSize: '16px'}}>
                        服务名称：
                        <span style={{fontWeight: 600}}>{'100001' === '' + this.praObj.tag ? '个人实名认证' : '企业实名认证'}</span>
                    </div>}
                    pagination={
                        {
                            total,
                            current: listPar.current,
                            pageSize: listPar.pageSize,
                            onChange: (a, b) => {
                                this.setState({
                                        listPar: {
                                            ...listPar,
                                            current: a,
                                        }
                                    },
                                    () => {
                                        this.openAuthPlatformPage();
                                    }
                                )
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
                {this.makeLookModal()}
            </ViewCoat>
        );
    }

    openAuthPlatformPage() {
        let {listPar} = this.state;
        Model.openAuthPlatformPage({...listPar, serviceSn: this.praObj.sn}, (res) => {
            const list = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: ++idx + ((listPar.current - 1) * 10)
                }
            });
            this.setState({list, total: res.data.total});
        });
    }

    makeLookModal() {
        const {modVisible, list, listIdx} = this.state;
        const typeFun = (type) => {
            switch (type + '') {
                case '1':
                    return '三要素比对';

                case '2':
                    return '四要素比对';

                case '3':
                    return '打款认证';

                case '4':
                    return '支付宝认证';

                case '5':
                    return '法人授权书';

                case '6':
                    return '短信认证';

                case '7':
                    return '银行卡认证';

                case '8':
                    return '手机认证';

                case '9':
                    return '人脸识别';

                default:
                    return null;
            }
        };

        return <Modal
            className={'Modal'}
            title="使用详情"
            closable={false}
            visible={modVisible}
            onOk={() => {
                this.setState({modVisible: false, listIdx: ''});
            }}
            onCancel={() => {
                this.setState({modVisible: false, listIdx: ''});
            }}
            footer={<div style={{margin: '6px 0'}}>
                <Button type="primary"
                        style={{width: '64px', height: '32px', fontSize: '16px', marginRight: '16px'}}
                        onClick={() => {
                            this.setState({modVisible: false, listIdx: ''});
                        }}
                >确认</Button>
                <Button
                    style={{width: '64px', height: '32px', fontSize: '16px'}}
                    onClick={() => {
                        this.setState({modVisible: false, listIdx: ''});
                    }}
                >取消</Button>
            </div>}
        >
            {list[listIdx] && list[listIdx].subFlowList && list[listIdx].subFlowList.map(item => {
                return <Row style={{lineHeight: '32px'}}>
                    <Col span={12}
                         style={{
                             textAlign: 'center',
                             fontSize: '16px',
                             // borderBottom: '1px solid #e8e8e8',
                             padding: '0px 12px'
                         }}
                    >
                        {typeFun(item.subFlowType)}
                        <div style={{height: '1px', background: '#e8e8e8'}}/>
                    </Col>
                    <Col span={12} style={{
                        textAlign: 'center',
                        fontSize: '16px',
                        // borderBottom: '1px solid #e8e8e8',
                        padding: '0px 12px'
                    }}>
                        {item.deductionTime ? moment(item.deductionTime).format("YYYY-MM-DD HH:mm") : ""}
                        <div style={{height: '1px', background: '#e8e8e8'}}/>
                    </Col>
                </Row>
            })}
            {
                !list[listIdx] || !list[listIdx].subFlowList || list[listIdx].subFlowList.length <= 0 ?
                    <Empty description={'暂无信息'}/> : null
            }
        </Modal>
    }

}

export default ESHPlatformDataDetail;
