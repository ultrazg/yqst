import React, {Component} from 'react';
import {Button, Card, Table, Tabs} from 'antd';
import {Link} from "react-router-dom";
import Model from "../../Model";
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import SettlementEditorModal from "../SettlementEditorModal/SettlementEditorModal.js";
import UploadFile from "../../../../baseview/uploadFile/UploadFile";
import {RollbackOutlined} from "@ant-design/icons";

const {TabPane} = Tabs;


class PAPersonalBusinessDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // 是否显示结算编辑弹窗
            isShow: false,
            // 1为账户明细 2为基本信息
            tabKey: '1',
            list: [],
            total: 0,
            current: 1,
            pageSize: 10,
            startTime: '',
            endTime: '',
            keyWord: '',
            fileList: [
                'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
                'https://cdnmusic.migu.cn/picture/2019/1125/1028/AS001cc6d843be4301b73ae817ed07b8a4.jpg'
            ],
            info: {
                bossMerchantsCompanyApplyInfoVO: {},
                bossMerchantsAuditLogListVOList: []
            },
        };
    }

    getList = () => {

    };

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split("=")[1];
        if (this.sn) {
            Model.GetPersonalInfo({sn: this.sn}, res => {
                this.setState({
                    info: res.data,
                })
            })
        }
    }

    // 视图层
    render() {
        let {isShow, tabKey} = this.state;
        let topBtn = tabKey === '1' ?
            (<Link to={'/Pages/PAPersonalBusiness'}><Button icon={<RollbackOutlined/>}>返回</Button></Link>) :
            (<Button type='primary' onClick={() => {
                this.setState({isShow: true})
            }}>结算编辑</Button>);

        return (
            <ViewContent
                crumb={[
                    {name: '收支付助手'},
                    {name: '商户管理'},
                    {name: "个人商户", link: '/Pages/PAPersonalBusiness'},
                    {name: "个人商户详情"}
                ]}
                topBtn={
                    <div>
                        {topBtn}
                    </div>
                }
            >
                <Tabs defaultActiveKey="1" onChange={(key) => {
                    this.setState({tabKey: key})
                }}>
                    <TabPane tab="账户明细" key="1">
                        {this.makeHeadSearch()}
                        {this.makeTable()}
                    </TabPane>
                    <TabPane tab="基本信息" key="2">
                        {this.makeBaseView()}
                        {this.makeLogTable()}
                    </TabPane>
                </Tabs>

                <SettlementEditorModal isShow={isShow} getModalData={this.getModalData}/>
            </ViewContent>
        );
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '请输入', label: '关键词', maxLength: 30},
            {key: 'times', type: 'RangePicker', value: '', placeholder: ['开始时间', '结束时间'], label: '操作时间',},
        ];
        return <HeadSearch data={searchDatas} form={this.props.form} callBack={({keyWord, times}) => {
            let startTime = times[0] || '';
            let endTime = times[1] || '';

            this.setState({
                current: 1,
                keyWord,
                startTime,
                endTime
            }, () => {
                this.getList();
            });
        }}/>
    }

    makeTable() {
        let {list, current, pageSize, total} = this.state;
        const columns = [
            {
                title: '编号',
                key: '',
                dataIndex: '',
            },
            {
                title: '操作金额',
                key: '',
                dataIndex: '',
            },
            {
                title: '结余',
                key: '',
                dataIndex: '',
            },
            {
                title: '操作备注',
                key: '',
                dataIndex: '',
            },
            {
                title: '操作时间',
                key: '',
                dataIndex: '',
            },
        ];
        return (
            <Table
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total,
                        current,
                        pageSize,
                        onChange: (current, b) => {
                            this.setState({
                                current
                            }, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        )
    }

    makeLogTable() {
        let {bossMerchantsAuditLogListVOList} = this.state.info;
        const columns = [
            {
                title: '审核类型',
                dataIndex: 'merchantsType',
                render: (type) => {
                    switch (type) {
                        case 1:
                            return '企业审核'
                        case 2:
                            return '个人审核'
                    }
                }
            },
            {
                title: '审核结果',
                dataIndex: 'auditStatus',
                render: (status) => {
                    switch (status) {
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
        return <div>
            <Table
                columns={columns}
                rowKey={'merchantsApplySn'}
                dataSource={bossMerchantsAuditLogListVOList}
            />
        </div>
    }

    makeBaseView() {
        const {fileList} = this.state;
        const {payPlan, settlementBill, settlementDeduct} = this.state.info;
        const {userName, mobile, idCard, backAccountNo, authType} = this.state.info.bossMerchantsCompanyApplyInfoVO;
        let allData = [
            {
                title: '',
                key: 'JBKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '支付方案', span: 12, value: payPlan || ''},
                    {key: 'qw2', type: 'Texts', label: '结算账单', span: 12, value: settlementBill || ''},
                    {key: 'qw3', type: 'Texts', label: '结算扣费', span: 12, value: settlementDeduct || ''},
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '基本信息',
                key: 'QYKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '用户姓名', span: 12, value: userName || ''},
                    {key: 'qw2', type: 'Texts', label: '手机号码', span: 12, value: mobile || ''},
                    {key: 'qw3', type: 'Texts', label: '身份证', span: 12, value: idCard || ''},
                    {key: 'qw4', type: 'Texts', label: '银行卡账号', span: 12, value: backAccountNo || ''},
                    {
                        key: 'qw5', type: 'Texts', label: '认证类型', span: 12,
                        value: authType === 1 ? '银行卡' : '运营商'
                    }
                ],
                style: {
                    marginBottom: '15px'
                },
            },
            {
                title: '银行卡信息',
                key: 'YHKey',
                data: [
                    {key: 'qw1', type: 'Texts', label: '银行卡账户编号', span: 12, value: ''},
                    {key: 'qw2', type: 'Texts', label: '银行卡账户名称', span: 12, value: ''},
                    {key: 'qw3', type: 'Texts', label: '银行账户类型', span: 12, value: ''},
                    {key: 'qw4', type: 'Texts', label: '开户证件类型', span: 12, value: ''},
                    {key: 'qw5', type: 'Texts', label: '证件号', span: 12, value: ''},
                    {key: 'qw6', type: 'Texts', label: '手机号', span: 12, value: ''},
                    {
                        key: 'qw7', type: 'Texts', label: '附件：', span: 12,
                        value: fileList.length ? <UploadFile
                            data={{
                                maxNum: 1,
                                uploadText: '',
                                fileUrlList: fileList,
                                isReadOnly: true
                            }}
                        /> : ''
                    },
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

    getModalData = (isShow, obj) => {
        this.setState({
            isShow
        });

        if (obj) {
            console.log(obj);
        }
    }
}

export default PAPersonalBusinessDetail
