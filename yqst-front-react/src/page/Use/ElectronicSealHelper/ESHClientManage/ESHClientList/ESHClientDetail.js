import React, {Component} from 'react';
import {
    Row,
    Col,
    Table,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import Model from '../Model';
import moment from 'moment'
import SwitchStatus from './SwitchStatus';

class ESHClientDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {},
            list: [],
        };
        this.sn = '';
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split("=")[1];
        this.openPlatformCustomerGet();
        this.openCustomerPurchaseList();
    }

    componentWillUnmount() {

    }

    render() {
        let {list, info} = this.state;
        const columns = [
            {
                title: '购买编号',
                key: 'orderSn',
                dataIndex: 'orderSn',
            },
            {
                title: '购买人',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '购买商品',
                key: 'goodsName',
                dataIndex: 'goodsName',
            },
            {
                title: '商品规格',
                key: '',
                dataIndex: '',
                render: (res) => {
                    return <div>
                        {
                            res.specList && res.specList.map(item => {
                                return <div style={{lineHeight: '30px'}}>
                                    {item.specName}
                                    {item.specValue}
                                </div>
                            })
                        }
                    </div>
                }
            },
            {
                title: '购买时间',
                key: 'createTime',
                dataIndex: 'createTime',
                render: (res) => {
                    return res ? moment(res).format("YYYY-MM-DD HH:mm") : ''
                }
            },
            {
                title: '购买金额',
                key: 'totalAmount',
                dataIndex: 'totalAmount',
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '客户管理'},
                    {title: '客户列表', link: '/pages/appCenter/electronicSealHelper/eshClientManage/eshClientList'},
                    {title: '客户详情'},
                ]}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
            >
                <h1
                    style={{
                        fontSize: '16px',
                        color: '#2B3441',
                        fontWeight: 500,
                        marginBottom: '16px'
                    }}
                >基本信息</h1>
                <Row style={{marginBottom: '16px'}}>
                    {this.makeTxtView('客户编号', info.companySn || '')}
                    {this.makeTxtView('客户名称', info.companyName || '')}
                    {this.makeTxtView('客户法人', info.legalName || '')}
                </Row>
                <Row style={{marginBottom: '16px'}}>
                    {this.makeTxtView('客户经办人', info.creatorName || '')}
                    {this.makeTxtView('经办人电话', info.creatorMobile || '')}
                    {this.makeTxtView('客户累计付费金额', info.totalPaymentAmount || '')}
                </Row>
                <Row style={{marginBottom: '24px'}}>
                    {this.makeTxtView('客户状态', SwitchStatus(info.status))}
                </Row>
                <h1
                    style={{
                        fontSize: '16px',
                        color: '#2B3441',
                        fontWeight: 500,
                        marginBottom: '16px'
                    }}
                >企业购买记录</h1>
                <Table bordered dataSource={list} columns={columns}/>
            </ViewCoat>
        );
    }

    openPlatformCustomerGet(){
        Model.openPlatformCustomerGet({companySn: this.sn}, (res) => {
            this.setState({info: res.data});
        });
    }

    openCustomerPurchaseList(){
        Model.openCustomerPurchaseList({companySn: this.sn}, (res) => {
            this.setState({list: res.data || []});
        });
    }

    makeTxtView(label = '', val = ''){
        return <Col span={8} style={{
            fontSize: '14px',
            color: '#2B3441'
        }}>
            <label>{label ? `${label}：` : label}</label>
            {val}
        </Col>
    }

}

export default ESHClientDetail;
