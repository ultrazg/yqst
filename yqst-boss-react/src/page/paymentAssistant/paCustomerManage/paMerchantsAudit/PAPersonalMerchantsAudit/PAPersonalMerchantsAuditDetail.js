import React, {Component} from 'react';
import ViewContent from "../../../../../baseview/viewContent/ViewContent";
import {Card, Button, Table, Modal, Input, message} from "antd";
import AssemblySet from "../../../../../baseview/assemblySet/AssemblySet";
import {Link} from "react-router-dom";
import Model from "../../../Model";
import SettlementEditorModal from "../../SettlementEditorModal/SettlementEditorModal";
import {RollbackOutlined} from "@ant-design/icons";


const {TextArea} = Input;


class PAPersonalMerchantsAuditDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileList: [
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://cdnmusic.migu.cn/picture/2019/1125/1028/AS001cc6d843be4301b73ae817ed07b8a4.jpg'
            ],
            visible: false,
            isLoading: false,
            refuseReason: '',
            info: {
                bossMerchantsAuditLogListVOList: [],
            },
            isShow: false
        };
        this.sn = '';
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split('=')[1];
        if (this.sn) {
            Model.GetApplyPersonalInfo({sn: this.sn}, res => {
                this.setState({
                    info: res.data
                })
            })
        }
    }

    render() {
        const {auditStatus} = this.state.info;
        const {isShow} = this.state;
        return (
            <ViewContent
                crumb={[
                    {name: '收支付助手'},
                    {name: '商户管理'},
                    {name: "商户审核", link: '/Pages/PAMerchantsAudit'},
                    {name: "商户审核详情"}
                ]}
                topBtn={
                    <div>
                        <Link to={'/Pages/PAMerchantsAudit'}>
                            <Button icon={<RollbackOutlined/>}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
                {this.makeTableView()}

                {
                    // auditStatus === 0 ? (
                    1 ? (
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            height: 100,
                            width: '60%',
                            margin: '0 auto'
                        }}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        isShow: true
                                    })
                                }}
                                style={{
                                    width: 138,
                                    height: 38,
                                    backgroundColor: 'rgba(20, 118, 255, .9)',
                                    color: '#fff'
                                }}>
                                通过
                            </Button>
                            <Button
                                onClick={() => {
                                    this.setState({visible: true})
                                }}
                                style={{
                                    width: 138,
                                    height: 38,
                                    backgroundColor: 'rgba(193, 193, 193, .9)',
                                    color: '#fff'
                                }}>
                                拒绝
                            </Button>
                        </div>
                    ) : false

                }

                {this.makeRefuseModal()}

                <SettlementEditorModal isShow={isShow} getModalData={this.getModalData}/>
            </ViewContent>
        );
    }

    makeBaseView() {
        const {
            auditStatus,
            createTime,
        } = this.state.info;

        let statusText = '';
        switch (auditStatus) {
            case 0:
                statusText = '审核中';
                break;
            case 1:
                statusText = '通过';
                break;
            case 2:
                statusText = '拒绝';
                break
        }

        const allData = [
            {
                title: '审核信息',
                key: 'SHKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '申请状态', span: 12, value: statusText},
                    {key: 'qw2', type: 'Texts', label: '商户编号', span: 12, value: this.sn},
                    {key: 'qw3', type: 'Texts', label: '申请时间', span: 12, value: createTime}
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '商户名称', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '商户简称', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '用户姓名', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '手机号码', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '身份证', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '银行卡账号', span: 12, value: ''},
                    {key: 'qw7', type: 'Texts', label: '认证类型', span: 12, value: ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
        ];

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.props.form}/>
                    </Card>
                })
            }
        </div>
    }

    makeTableView = () => {
        const list = this.state.info.bossMerchantsAuditLogListVOList;
        const columns = [
            {
                title: '审核类型',
                render() {
                    return '个人'
                }
            },
            {
                title: '审核结果',
                dataIndex: 'auditStatus',
                render: (auditStatus) => {
                    switch (auditStatus) {
                        case 1:
                            return '通过';
                        case 2:
                            return '拒绝';
                    }
                }
            },
            {
                title: '管理员',
                dataIndex: 'adminName',
            },
            {
                title: '审核时间',
                dataIndex: 'createTime',
            }
        ];
        return (
            <div>
                <h3 style={{marginTop: 15}}>审核日志</h3>
                <Table
                    columns={columns}
                    dataSource={list}
                    rowKey={'merchantsApplySn'}
                    bordered
                    style={{marginTop: 15}}
                />
            </div>
        )
    };

    makeRefuseModal = () => {
        const {visible, isLoading} = this.state;
        return (
            <Modal
                title="请说明拒绝理由"
                visible={visible}
                confirmLoading={isLoading}
                onOk={() => {
                    this.setState({
                        isLoading: true
                    });
                    this.refuseApply();
                }}
                onCancel={() => {
                    this.setState({
                        isLoading: false,
                        visible: false
                    })
                }}
            >
                <TextArea
                    placeholder="请输入"
                    rows={6}
                    onChange={(e) => {
                        this.setState({
                            refuseReason: e.target.value
                        })
                    }}
                    style={{border: 'none', resize: 'none'}}
                />
            </Modal>
        )
    };

    agreeApply = (obj) => {
        Model.ApprovedPersonalApply({
            sn: this.sn,
            payPlanSn: obj.payPlanSn,
            channelBillSettlementType: 2,
            channelBillCycleType: obj.channelBillCycleType,
            channelBillDay: obj.channelBillDay,
            channelBillDate: obj.channelBillDate,
            channelDeductCycleType: obj.channelDeductCycleType,
            channelDeductDay: obj.channelDeductDay,
            channelDeductDate: obj.channelDeductDate
        }, res => {
            message.success('审核通过！');
            this.props.history.replace('/Pages/PAPersonalMerchantsAudit');
        })
    };

    refuseApply = () => {
        Model.RefusePersonalApply({
            sn: this.sn,
            refuseReason: this.state.refuseReason
        }, res => {
            message.info('已拒绝！');
            this.props.history.replace('/Pages/PAPersonalMerchantsAudit');
        })
    };

    getModalData = (isShow, obj) => {
        this.setState({
            isShow
        });

        if (obj) {
            this.agreeApply(obj)
        }

    };
}

export default PAPersonalMerchantsAuditDetail
