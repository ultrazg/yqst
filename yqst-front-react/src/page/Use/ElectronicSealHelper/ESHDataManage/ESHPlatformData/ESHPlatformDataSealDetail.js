import React, {Component} from 'react';
import {
    Button,
    Input,
    DatePicker,
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

class ESHPlatformDataSealDetail extends Component {
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
        };
        this.praObj = analysisPar(this.props.location.search.substr(1));
    }

    componentDidMount() {
        this.openSealPlatformPage();
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
                <div style={{marginBottom: '24px'}}>
                    企业名称：
                    <Input placeholder="请输入"
                           value={listPar.keyWord}
                           style={{
                               width: '272px',
                               height: '40px',
                               lineHeight: '40px',
                               fontSize: '14px',
                               marginLeft: '4px',
                               borderRadius: '6px',
                           }}
                           onChange={(e) => {
                               this.setState({listPar: {...this.state.listPar, keyWord: e.target.value}});
                           }}
                    />
                    <label style={{marginLeft: '54px'}}>扣费时间：</label>
                    <RangePicker
                        className={'RangePicker'}
                        style={{
                            width: '240px',
                            height: '40px',
                            lineHeight: '40px',
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
                                    this.openSealPlatformPage();
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
                                this.openSealPlatformPage();
                            });
                        }}
                    >重置</Button>
                </div>
                <SWTable
                    columns={columns}
                    dataSource={list}
                    funBtn={<div style={{fontSize: '16px', fontWeight: 600}}>
                        服务名称：{'100003' === '' + this.praObj.tag ? '个人印章' : '企业印章'}
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
                                        this.openSealPlatformPage();
                                    }
                                )
                            },
                            showTotal: (total, range) => `共有${total}条`
                        }
                    }
                />
            </ViewCoat>
        );
    }

    openSealPlatformPage() {
        let {listPar} = this.state;
        Model.openSealPlatformPage({...listPar, serviceSn: this.praObj.sn}, (res) => {
            const list = res.data.records && res.data.records.map((item, idx) => {
                return {
                    ...item,
                    key: ++idx + ((listPar.current - 1) * 10)
                }
            });
            this.setState({list, total: res.data.total});
        });
    }

}

export default ESHPlatformDataSealDetail;
