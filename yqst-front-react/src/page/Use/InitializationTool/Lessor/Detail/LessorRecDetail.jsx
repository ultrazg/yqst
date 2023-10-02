import React, {Component} from 'react';
import {Button, Card, Collapse, Descriptions, Image, Input, message, Modal, Switch, Tooltip} from "antd";
import {InfoCircleOutlined, LeftOutlined, QuestionCircleOutlined} from "@ant-design/icons";
import {getPageQuery} from "../../../../../utils";
import SelectLesseeProjectModal from "../../Components/SelectLesseeProjectMoal";
import Model from "../../Model";

const {Panel} = Collapse;

class LessorInitDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            // 测试状态 1.待提交 2.待确认 3.已确认 4.已驳回
            status: 0,
            data: {},
            isRejectModalVisible: false,
            isConfirmModalVisible: false,
            rejectReason: '',
            // 起租物资列表
            LeaseList: [],
            // 在租物资列表
            RentList: [],
            RentListVisi: false,
            // 备注
            remark: '',
            imgUrl: '',
            projectNameRemark: '', // 项目名称备注
            projectType: 0, // 项目类型 1.特供项目 2.非特供项目 3.其他
            isSelectProjectModalVisible: false,
            projectName: '',
            projectSn: '',
            onSendButtonDisabled: true,
            count: 10
        };
    }

    componentDidMount() {
        const {sn} = getPageQuery();
        this.setState({
            sn
        }, () => {
            this.getList();
        });
    }

    render() {
        return (
            <>
                <Card bodyStyle={{padding: 0}} style={{padding: "36px 24px", borderRadius: "6px"}}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "#2B3441"
                        }}
                    >
                        我是出租方 / 我收到的 / 期初物资对账详情
                    </h1>
                </Card>
                <div style={{padding: "24px", borderRadius: "6px", marginTop: "24px", background: "#fff"}}>
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    {this.renderAuditButton()}
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>状态：</span>
                        {this.selectStatus(this.state.status)}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>初始化编号：</span>
                        {this.state.data.initBusinessSn}
                    </p>
                    {
                        this.state.status === 3
                            ? <>
                                <p style={{
                                    display: 'flex'
                                }}>
                                    <span style={{width: 150}}>确认人：</span>
                                    {this.state.data.auditorName}
                                </p>
                                <p style={{
                                    display: 'flex'
                                }}>
                                    <span style={{width: 150}}>确认时间：</span>
                                    {this.state.data.auditTime}
                                </p>
                            </>
                            : null
                    }
                    {
                        this.state.status === 4
                            ? <>
                                <p style={{
                                    display: 'flex'
                                }}>
                                    <span style={{width: 150}}>驳回理由：</span>
                                    {this.state.data.rejectReason}
                                </p>
                                <p style={{
                                    display: 'flex'
                                }}>
                                    <span style={{width: 150}}>驳回人：</span>
                                    {this.state.data.auditorName}
                                </p>
                                <p style={{
                                    display: 'flex'
                                }}>
                                    <span style={{width: 150}}>驳回时间：</span>
                                    {this.state.data.auditTime}
                                </p>
                            </>
                            : null
                    }
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>对账客户：</span>
                        {this.state.data.lesseeName}
                    </p>
                    {
                        this.state.projectType === 1
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目类型：</span>
                                特供项目
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 2
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目类型：</span>
                                非特供项目
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 3
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目类型：</span>
                                其他
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 1
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目：</span>
                                {this.state.data.projectName}
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 2
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目：</span>
                                非特供项目
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 3
                            ? this.state.status === 2
                                ? <>
                                    <p style={{
                                        display: 'flex'
                                    }}>
                                        <span style={{width: 150}}>项目名称备注：</span>
                                        {this.state.projectNameRemark}
                                    </p>
                                    <p style={{
                                        display: 'flex'
                                    }}>
                                        <span style={{width: 150}}>对账项目：</span>
                                        <Input
                                            readOnly
                                            style={{
                                                cursor: 'pointer',
                                                width: 300
                                            }}
                                            value={this.state.projectName}
                                            placeholder='请选择对账项目'
                                            onClick={() => {
                                                this.setState({
                                                    isSelectProjectModalVisible: true
                                                });
                                            }}/>
                                    </p>
                                    <p style={{
                                        display: 'flex'
                                    }}>
                                        <span style={{width: 150}}></span>
                                        <Tooltip title={`未创建项目信息，请在${window.globalConfig.title} APP 的租赁服务中添加`}>
                                        <span style={{
                                            fontSize: 'smaller',
                                            color: '#3d3c3c',
                                            userSelect: 'none',
                                            cursor: 'pointer'
                                        }}>
                                        <QuestionCircleOutlined style={{marginRight: 5}}/>找不到对账项目？
                                    </span>
                                        </Tooltip>
                                    </p>
                                </>
                                : <>
                                    <p style={{
                                        display: 'flex'
                                    }}>
                                        <span style={{width: 150}}>项目名称备注：</span>
                                        {this.state.projectNameRemark}
                                    </p>
                                    <p style={{
                                        display: 'flex'
                                    }}>
                                        <span style={{width: 150}}>对账项目：</span>
                                        {this.state.data.projectName}
                                    </p>
                                </>
                            : null
                    }
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>初始化日：</span>
                        {this.state.data.settlementStartTime}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>备注：</span>
                        {this.state.data.remark}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>结算单：</span>
                        {
                            this.state.imgUrl
                                ? <Image
                                    style={{
                                        border: '1px solid #f1f2f6',
                                        padding: 5,
                                        borderRadius: 3
                                    }}
                                    width={50}
                                    src={this.state.imgUrl}
                                />
                                : '-'
                        }
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>提交人：</span>
                        {this.state.data.submitterName}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>提交时间：</span>
                        {this.state.data.submitTime}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150, fontWeight: 600}}>起租物资：</span>
                    </p>
                    <Collapse defaultActiveKey={0}>
                        {
                            this.state.LeaseList.map((item, index) => (
                                <Panel header={item.goodsParentName} key={index}>
                                    {
                                        item.skuList && item.skuList.map((itm, idx) => (
                                            <Descriptions
                                                title={itm.goodsName}
                                                style={{marginBottom: 10}}
                                                bordered
                                                key={idx}
                                            >
                                                <Descriptions.Item label="SKU 规格">
                                                    {
                                                        itm.specList && itm.specList.map((it, i) => (
                                                            <>
                                                                {it.specName}：{it.specValue}
                                                                <br/>
                                                            </>
                                                        ))
                                                    }
                                                </Descriptions.Item>
                                                <Descriptions.Item label="单位">
                                                    {itm.goodsUnit}
                                                </Descriptions.Item>
                                                <Descriptions.Item label="数量">
                                                    {itm.goodsQuantity}
                                                </Descriptions.Item>
                                            </Descriptions>
                                        ))
                                    }
                                </Panel>
                            ))
                        }
                    </Collapse>
                    <p style={{
                        display: 'flex',
                        marginTop: 10
                    }}>
                        <span style={{width: 150, fontWeight: 600}}>在租物资：</span>
                        <Switch
                            checkedChildren="展开"
                            unCheckedChildren="收起"
                            defaultChecked={this.state.RentListVisi}
                            onChange={checked => this.setState({RentListVisi: checked})}
                        />
                    </p>
                    {
                        this.state.RentListVisi
                            ? <Collapse defaultActiveKey={0}>
                                {
                                    this.state.RentList.map((item, index) => (
                                        <Panel header={item.goodsParentName} key={index}>
                                            {
                                                item.skuList && item.skuList.map((itm, idx) => (
                                                    <Descriptions
                                                        title={itm.goodsName}
                                                        style={{marginBottom: 10}}
                                                        bordered
                                                        key={idx}
                                                    >
                                                        <Descriptions.Item label="SKU 规格">
                                                            {
                                                                itm.specList && itm.specList.map((it, i) => (
                                                                    <>
                                                                        {it.specName}：{it.specValue}
                                                                        <br/>
                                                                    </>
                                                                ))
                                                            }
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="单位">
                                                            {itm.goodsUnit}
                                                        </Descriptions.Item>
                                                        <Descriptions.Item label="数量">
                                                            {itm.goodsQuantity}
                                                        </Descriptions.Item>
                                                    </Descriptions>
                                                ))
                                            }
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                            : null
                    }
                </div>
                {/*驳回弹窗start*/}
                <Modal title="驳回" visible={this.state.isRejectModalVisible} onOk={this.onReject}
                       onCancel={() => {
                           this.setState({isRejectModalVisible: false})
                       }}>
                    <p>驳回原因：</p>
                    <Input
                        onChange={this.onRejectChangeHandle}
                        value={this.state.rejectReason}
                        maxLength={50}
                    />
                </Modal>
                {/*驳回弹窗end*/}

                {/*进一步确认弹窗start*/}
                <Modal
                    title="确认提示"
                    visible={this.state.isConfirmModalVisible}
                    footer={null}
                    onCancel={() => {
                        this.setState({isConfirmModalVisible: false})
                    }}
                >
                    <p style={{fontSize: 18, color: '#262626'}}>
                        <InfoCircleOutlined style={{marginRight: 5, color: '#d46b08'}}/>
                        是否确认初始化期初数据？
                    </p>
                    <p style={{color: '#f5222d'}}>提示：期初数据初始化日后初始化日之前产生的进退场单等业务单据将变成历史，不参与结算</p>
                    <Button style={{marginRight: 15}} onClick={() => {
                        this.setState({isConfirmModalVisible: false});
                    }}>取消</Button>
                    <Button
                        type='primary'
                        disabled={this.state.onSendButtonDisabled}
                        onClick={() => {
                            this.onConfirm();
                        }}
                    >
                        确定{this.state.onSendButtonDisabled ? `(${this.state.count}s)` : null}
                    </Button>
                </Modal>
                {/*进一步确认弹窗end*/}
                {/*选择项目弹窗start*/}
                {
                    this.state.isSelectProjectModalVisible
                        ? <SelectLesseeProjectModal
                            onClose={() => {
                                this.setState({isSelectProjectModalVisible: false});
                            }}
                            onSelect={data => {
                                this.setState({
                                    projectSn: data.projectSn,
                                    projectName: data.projectName,
                                    isSelectProjectModalVisible: false
                                })
                            }}
                        />
                        : null
                }
                {/*选择项目弹窗end*/}
            </>
        );
    }

    renderAuditButton = () => {
        const {showAuditButton} = this.state.data;

        if (showAuditButton === 0) {
            return null;
        } else if (showAuditButton === 2) {
            return (
                <>
                    <Button
                        style={{marginLeft: 20}}
                        type='primary'
                        onClick={() => {
                            const {projectSn, projectType} = this.state;
                            if (projectType === 3) {
                                if (!projectSn) {
                                    message.warning('请选择对账项目', 1);

                                    return false;
                                }
                            }
                            this.setState({
                                isConfirmModalVisible: true
                            }, () => {
                                this.countDown();
                            });
                        }}
                    >确认</Button>
                    <Button
                        style={{marginLeft: 20}}
                        onClick={() => {
                            this.setState({isRejectModalVisible: true});
                        }}
                    >驳回</Button>
                </>
            )
        }
    }

    getList = () => {
        Model.InitDetailGet({
            sn: this.state.sn
        }, res => {
            this.setState({
                data: res.data,
                status: res.data.status,
                LeaseList: res.data.startingGoodsList,
                // startingGoodsList: res.data.startingGoodsList,
                RentList: res.data.leasingGoodsList,
                remark: res.data.remark,
                projectType: res.data.projectType,
                projectNameRemark: res.data.projectNameRemark,
                imgUrl: res.data.enclosureUrlList && res.data.enclosureUrlList.length > 0 ?
                    res.data.enclosureUrlList[0] : '',
            });
        });
    }

    countDown = () => {
        let timer = setInterval(() => {
            const {count} = this.state;

            this.setState({
                count: count - 1
            }, () => {
                if (count <= 1) {
                    clearInterval(timer);
                    this.setState({
                        onSendButtonDisabled: false
                    });
                }
            });
        }, 1000);
    }

    selectStatus = status => {
        // 状态 1.待提交 2.待确认 3.已确认 4.已驳回
        switch (status) {
            case 1:
                return <span style={{color: '#ffa502'}}>待提交</span>;
            case 2:
                return <span style={{color: '#1e90ff'}}>待确认</span>;
            case 3:
                return <span style={{color: '#2ed573'}}>已确认</span>;
            case 4:
                return <span style={{color: '#ff4757'}}>已驳回</span>;
            default:
                return "";
        }
    }

    onRejectChangeHandle = e => {
        this.setState({
            rejectReason: e.target.value
        });
    }

    // 确认
    onConfirm = () => {
        const {sn, projectSn, projectType} = this.state;

        // 类型为其他
        if (projectType === 3) {
            if (!projectSn) {
                message.warning('请选择对账项目', 1);

                return false;
            }
            Model.LessorInitConfirm({sn, projectSn}, res => {
                message.success(res.msg, 1, () => {
                    this.props.history.go(-1);
                });
            });
        } else {
            Model.LessorInitConfirm({sn}, res => {
                message.success(res.msg, 1, () => {
                    this.props.history.go(-1);
                });
            });
        }
    }

    // 驳回
    onReject = () => {
        const {sn, rejectReason} = this.state;

        if (!rejectReason) {
            message.warning('请填写驳回原因', 1);

            return false;
        }

        Model.LessorInitReject({
            sn,
            rejectReason
        }, res => {
            message.success(res.msg, 1, () => {
                this.props.history.go(-1);
            });
        })
    }
}

export default LessorInitDetail;