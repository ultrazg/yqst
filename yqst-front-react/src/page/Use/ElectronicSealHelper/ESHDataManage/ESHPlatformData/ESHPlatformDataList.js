import React, {Component} from 'react';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import Model from '../Model';

class ESHPlatformDataList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        };
    }

    componentDidMount() {
        this.openServicePaymentList();
    }

    componentWillUnmount() {

    }

    render() {
        let {list} = this.state;
        const columns = [
            {
                title: '服务编号',
                key: 'serviceSn',
                dataIndex: 'serviceSn',
            },
            {
                title: '服务名称',
                key: 'serviceName',
                dataIndex: 'serviceName',
            },
            {
                title: '今日使用次数',
                key: 'todayUseCount',
                dataIndex: 'todayUseCount',
            },
            {
                title: '今日使用客户',
                key: 'todayUseCompanyCount',
                dataIndex: 'todayUseCompanyCount',
            },
            {
                title: '累计使用次数',
                key: 'totalUseCount',
                dataIndex: 'totalUseCount',
            },
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 100,
                render: (res) => {
                    const switchUrl = (serviceTag) => {
                        switch (serviceTag + '') {
                            case '100001': // 个人实名认证
                                return <a
                                    onClick={() => {
                                        this.props.history.push(`/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataDetail?sn=${res.serviceSn}&tag=${res.serviceTag}`);
                                    }}
                                >
                                    查看
                                </a>;

                            case '100002': // 企业实名
                                return <a
                                    onClick={() => {
                                        this.props.history.push(`/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataDetail?sn=${res.serviceSn}&tag=${res.serviceTag}`);
                                    }}
                                >
                                    查看
                                </a>;

                            case '100003': // 个人印章
                                return <a
                                    onClick={() => {
                                        this.props.history.push(`/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataSealDetail?sn=${res.serviceSn}&tag=${res.serviceTag}`);
                                    }}
                                >
                                    查看
                                </a>;

                            case '100004': // 企业印章
                                return <a
                                    onClick={() => {
                                        this.props.history.push(`/pages/appCenter/electronicSealHelper/eshPlatformData/eshPlatformDataSealDetail?sn=${res.serviceSn}&tag=${res.serviceTag}`);
                                    }}
                                >
                                    查看
                                </a>;

                            default:
                                return null;
                        }
                    };

                    return <div>
                        {switchUrl(res.serviceTag)}
                        {/*<Divider type="vertical" />
                        <a style={{color: '#F12C20'}}
                           onClick={() => {
                               this.setState({delVisible: true, delSn: res.sn});
                           }}
                        >删除</a>*/}
                    </div>
                }
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '数据管理'},
                    {title: '平台数据'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                {/*<h3
                    style={{
                        marginBottom: '12px',
                        fontSize: '14px',
                    }}
                >搜索</h3>
                <div style={{marginBottom: '24px'}}>
                    关键词：
                    <Input placeholder="请输入关键词"
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
                               // this.setState({listPar: {...listPar, keyWord: e.target.value}});
                           }}
                    />
                    <Button type="primary"
                            style={{
                                width: '80px',
                                height: '40px',
                                lineHeight: '40px',
                                fontSize: '16px',
                                margin: '0px 16px',
                                borderRadius: '6px',
                            }}
                            // onClick={() => {this.getContractTPage(1);}}
                    >搜索</Button>
                    <Button
                        style={{
                            width: '80px',
                            height: '40px',
                            lineHeight: '40px',
                            fontSize: '16px',
                            borderRadius: '6px',
                        }}
                        onClick={() => {
                            // this.setState({
                            //     listPar: {
                            //         total: 0,
                            //         current: 1,
                            //         pageSize: 10,
                            //         keyWord: '',
                            //         sortType: 2,
                            //     },
                            // }, () => {this.getContractTPage();});
                        }}
                    >重置</Button>
                </div>*/}
                <SWTable
                    columns={columns}
                    dataSource={list}
                    pagination={false}
                />
            </ViewCoat>
        );
    }

    openServicePaymentList(current){
        Model.openServicePaymentList({}, (res) => {
            this.setState({list: res.data || []});
        });
    }

}

export default ESHPlatformDataList;
