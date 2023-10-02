/**
 * Created by yb on 2019/09/25
 */

import React, {Component} from 'react';
import {Form, Button, Card, Tabs, Timeline} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchStatus from "./SwitchStatus";
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFiles from "../../../../baseview/uploadFile/UploadFile";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";

const { TabPane } = Tabs;


class ContractManageDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            applyData: {
                userVOList: [],
                goodInfoVO: {}
            },
            logList: [],
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '合同中心'},
                        {name: "合同、协议管理"},
                        {name: "合同列表", link: '/Pages/ContractManageList'},
                        {name: "合同详情"}
                    ]}
                    topBtn = {
                        <div>
                            {/*<Button type="primary" icon={'edit'}>编辑</Button>*/}
                            <Link to={'/Pages/ContractManageList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.ContractGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    getLogList() {
        Model.ContractLList({id: this.id}, (res) => {
            this.setState({logList: res.data || []});
        }, (err) => {
        });
    }

    getApplyData() {
        Model.ContractAPage({id: this.id}, (res) => {
            this.setState({applyData: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let baseData = [
            {key: 'contractSn', type: 'Texts', label: '合同编号', span: 12, value: data.contractSn},
            {key: 'id', type: 'Texts', label: '合同ID', span: 12, value: data.id},
            {key: 'contractName', type: 'Texts', label: '合同名称', span: 12, value: data.contractName},
            {key: 'contractType', type: 'Texts', label: '合同类型', span: 12,
                value: SwitchStatus.contractType(data.contractType)},
            {key: 'startName', type: 'Texts', label: '合同发起方', span: 12, value: data.startName},
            {key: 'startType', type: 'Texts', label: '合同发起方类型', span: 12,
                value: SwitchStatus.startType(data.startType)},
            {key: 'signName', type: 'Texts', label: '合同签署方', span: 12, value: data.signName},
            {key: 'signType', type: 'Texts', label: '合同签署方类型', span: 12,
                value: SwitchStatus.signType(data.signType)},
            {key: 'status', type: 'Texts', label: '合同状态', span: 12,
                value: SwitchStatus.status(data.status)},
        ];

        return <div>
            <div style={{
                boxShadow: '6px 6px 5px #ccc',
                borderRadius: '6px',
                border: '1px solid #ccc',
                marginBottom: 15
            }}>
                <AssemblySet key={'baseAss'} data={baseData} form={this.formRef.current}/>
            </div>

            <Tabs defaultActiveKey="1" onChange={(key) => {
                if('3' === '' + key){
                    this.getApplyData();

                }else if('5' === '' + key && this.state.logList.length <= 0){
                    this.getLogList();

                }
            }}>
                <TabPane tab="合同内容" key="1">
                    {
                        !data.content && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无内容...
                        </div>
                    }
                    {
                        data.content && <iframe
                            src = {`https://view.officeapps.live.com/op/view.aspx?src=${data.content}`}
                            width='100%' height='600px' frameBorder='1'>
                        </iframe>
                    }
                </TabPane>
                <TabPane tab="合同附件" key="2">
                    {
                        !data.contractFile && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                            暂无内容...
                        </div>
                    }
                    {
                        data.contractFile && <iframe
                            src = {`https://view.officeapps.live.com/op/view.aspx?src=${data.contractFile}`}
                            width='100%' height='600px' frameBorder='1'>
                        </iframe>
                    }
                    {/*{this.makeFJView()}*/}
                </TabPane>
                <TabPane tab="合同申请" key="3">
                    {this.makeSQView()}
                </TabPane>
                <TabPane tab="合同模板" key="4">
                    {this.makeMBView()}
                </TabPane>
                <TabPane tab="审批记录" key="5">
                    {this.makeJLView()}
                </TabPane>
            </Tabs>
        </div>
    }

    makeFJView(){
        let {data} = this.state;
        let allData = [
            {
                title: '合同文件',
                key: 'WJKey',
                data: [
                    'http://pic1.win4000.com/pic/8/5c/e5a13e995c_250_350.jpg'
                ],
                style: {},
            },
            {
                title: '合同图片',
                key: 'TPKey',
                data: [
                    'http://pic1.win4000.com/pic/8/5c/e5a13e995c_250_350.jpg'
                ],
                style: {
                    marginTop: 15
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
                        <UploadFiles
                            key={item.key}
                            data={{
                                maxNum: item.data.length,
                                uploadText:'',
                                fileUrlList: item.data,
                                isReadOnly: true
                            }}
                            // callBackFiles={callBackFiles}
                        />
                    </Card>
                })
            }
        </div>
    }

    makeSQView(){
        let {data, applyData} = this.state;
        let {userVOList, goodInfoVO} = applyData;
        const retData = (list = []) => {
            const nesArr = list.map((item, idx) => {
                const labelName = '1' === '' + item.type ? '采购方(甲方)' :
                    '2' === '' + item.type ? '委托方(乙方)' : '销售方(丙方)';
                return [
                    {key: `userName${idx}`, type: 'Texts', label: labelName, span: 8, value: item.userName},
                    {key: `jiuerliuNumber${idx}`, type: 'Texts', label: '926链号', span: 8, value: item.jiuerliuNumber},
                    {key: `mail${idx}`, type: 'Texts', label: '指定邮箱', span: 8, value: item.mail},
                    {key: `contactName${idx}`, type: 'Texts', label: '联系人', span: 8, value: item.contactName},
                    {key: `contactPhone${idx}`, type: 'Texts', label: '联系方式', span: 8, value: item.contactPhone},
                ];
            });
            if(nesArr.length <= 0){
                return [
                    {key: 'q1', type: 'Texts', label: '采购方(甲方)', span: 8, value: ''},
                    {key: 'q2', type: 'Texts', label: '委托方(乙方)', span: 8, value: ''},
                    {key: 'q3', type: 'Texts', label: '销售方(丙方)', span: 8, value: ''},
                    {key: 'q4', type: 'Texts', label: '926链号', span: 8, value: ''},
                    {key: 'q5', type: 'Texts', label: '926链号', span: 8, value: ''},
                    {key: 'q6', type: 'Texts', label: '926链号', span: 8, value: ''},
                    {key: 'q7', type: 'Texts', label: '指定邮箱', span: 8, value: ''},
                    {key: 'q8', type: 'Texts', label: '指定邮箱', span: 8, value: ''},
                    {key: 'q9', type: 'Texts', label: '指定邮箱', span: 8, value: ''},
                    {key: 'q91', type: 'Texts', label: '联系人', span: 8, value: ''},
                    {key: 'q92', type: 'Texts', label: '联系人', span: 8, value: ''},
                    {key: 'q93', type: 'Texts', label: '联系人', span: 8, value: ''},
                    {key: 'q94', type: 'Texts', label: '联系方式', span: 8, value: ''},
                    {key: 'q95', type: 'Texts', label: '联系方式', span: 8, value: ''},
                    {key: 'q94', type: 'Texts', label: '联系方式', span: 8, value: ''},
                ]
            }
            return [
                nesArr[0][0],
                nesArr[1][0],
                nesArr[2][0],

                nesArr[0][1],
                nesArr[1][1],
                nesArr[2][1],

                nesArr[0][2],
                nesArr[1][2],
                nesArr[2][2],

                nesArr[0][3],
                nesArr[1][3],
                nesArr[2][3],

                nesArr[0][4],
                nesArr[1][4],
                nesArr[2][4],
            ];
        };
        let allData = [
            {
                title: '企业信息',
                key: 'QYKey',
                data: retData(userVOList),
                style: {},
            },
            {
                title: '原始合同',
                key: 'YSKey',
                data: [
                    {key: 'oldContractSn', type: 'Texts', label: '原始合同编号', span: 12, value: applyData.oldContractSn},
                    {key: 'settleType', type: 'Texts', label: '结算方式', span: 12,
                        value: SwitchStatus.settleType(applyData.settleType)},
                    {
                        key: 'contractPic', type: 'UploadFile', label: '原始合同', span: 24,
                        value: applyData.contractPic ? applyData.contractPic.split(',') : [],
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                                sm: { span: 0 },
                            },
                            wrapperCol: {
                                xs: { span: 24 },
                                sm: { span: 24 },
                            },
                        },
                        data: {
                            maxNum: 1,
                            fileUrlList: applyData.contractPic ? applyData.contractPic.split(',') : [],
                            isDowload: false,
                            isReadOnly: true,
                        }
                    },
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '其他信息',
                key: 'QTKey',
                data: [
                    {key: 'protocolTime', type: 'Texts', label: '协议签订日期', span: 12,
                        value: applyData.protocolTime ? moment(applyData.protocolTime).format('YYYY-MM-DD') : ''},
                    {key: 'protocolSn', type: 'Texts', label: '协议编号', span: 12, value: applyData.protocolSn},
                    {key: 'deliveryType', type: 'Texts', label: '交货方式', span: 12,
                        value: SwitchStatus.deliveryType(applyData.deliveryType)},
                    {key: 'bPayType', type: 'Texts', label: '乙方付款方式', span: 12,
                        value: SwitchStatus.bPayType(applyData.bPayType)},
                    {key: 'remitTerm', type: 'Texts', label: '汇票期限', span: 12,
                        value: applyData.remitTerm},
                    {key: 'bAcceptanceTime', type: 'Texts', label: '乙方开承兑汇票时间', span: 12,
                        value: applyData.bAcceptanceTime ? moment(applyData.bAcceptanceTime).format('YYYY-MM-DD') : ''},
                    {key: 'cInvoiceTime', type: 'Texts', label: '丙方开发票时间', span: 12,
                        value: applyData.cInvoiceTime ? moment(applyData.cInvoiceTime).format('YYYY-MM-DD') : ''},
                ],
                style: {
                    marginTop: 15
                },
            },
            {
                title: '委托申请单信息',
                key: 'QTKey',
                data: [
                    {key: 'entrustSn', type: 'Texts', label: '委托申请单号', span: 12, value: applyData.entrustSn},
                    {key: 'contractSn', type: 'Texts', label: '合同编号', span: 12, value: applyData.contractSn},
                ],
                style: {
                    marginTop: 15
                },
            },
        ];
        const columns = [
            {
                title: '货品名称',
                key: 'name',
                dataIndex: 'name'
            },
            {
                title: '规格型号',
                key: 'spec',
                dataIndex: 'spec'
            },
            {
                title: '数量',
                key: 'number',
                dataIndex: 'number',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
            },
            {
                title: '单位',
                key: 'unit',
                dataIndex: 'unit'
            },
            {
                title: '单价(RMB)',
                key: 'price',
                dataIndex: 'price',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '总价(RMB)',
                key: 'totalPrice',
                dataIndex: 'totalPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            <Card
                type="inner"
                title="货品信息"
                style={{marginTop: 15}}
            >
                <SWTable
                    columns={columns}
                    dataSource={goodInfoVO.goodVOS || []}
                    pagination={false}
                />
                <div style={{
                    textAlign: 'right',
                    padding: '20px',
                    background: '#e8e8e8',
                    color: 'blue'
                }}>总计：{NumberFormat.thousandBit(goodInfoVO.total || 0, 2, true)}</div>
            </Card>
        </div>
    }

    makeMBView(){
        let {data} = this.state;
        let allData = [
            {
                title: '使用合同模版',
                key: 'QYKey',
                data: [
                    {key: 'templateId', type: 'Texts', label: '合同模版ID', span: 8, value: data.templateId},
                    {key: 'templateName', type: 'Texts', label: '合同模版名称', span: 8, value: data.templateName},
                ],
                style: {},
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
        </div>
    }

    makeJLView(){
        return <Timeline style={{
            padding: 15
        }}>
            {
                this.state.logList.map((item, idx) => {
                    return <Timeline.Item key={'log_' + idx}>
                        <h3>{item.title}</h3>
                        <div>
                            <span>操作人：{item.createByName}</span>
                            <span style={{marginLeft: 25}}>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                        </div>
                    </Timeline.Item>
                })
            }
            {
                this.state.logList && this.state.logList.length <= 0 && <div style={{textAlign: 'center', color: '#ccc', fontSize: 20}}>
                    暂无记录...
                </div>
            }
        </Timeline>
    }
}

export default ContractManageDetail
