import React from 'react';
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined} from "@ant-design/icons";
import {Button, Divider, Input, InputNumber, message, Modal, Popconfirm} from "antd";
import SelectDemandModal from "../../Component/SelectDemandModal";
import SelectLesseeProjectModal from "../../../ContractMaintain/Components/SelectLesseeProjectModal";
import SelectServiceItemModal from "../../Component/SelectServiceItemModal";
import Api from "../../Api/Api";
import request from "../../../../../../utils/request/request";

/**
 *
 */
class MaintainContracLessorEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            currentStep: 0,
            data: {
                //step1
                lesseeName: '',
                lesseeSn: '',
                lessorName: '',
                lessorSn: '',
                // projectType: 0,//项目类型
                projectName: '',
                projectSn: '',

                maintenanceItemList: [],
                ...this.props.data,
            }
        };
    }

    componentDidMount() {
    }

    setData = (data) => {
        this.setState({
            data: {
                ...this.state.data,
                ...data
            }
        })
    }

    submit = () => {
        let list = [];
        let maintenanceItemList = this.state.data.maintenanceItemList;
        for (let i = 0; i < maintenanceItemList.length; i++) {
            list.push({
                serviceItemSn: maintenanceItemList[i].serviceItemSn,
                taxRate: maintenanceItemList[i].taxRate,
                excludingTaxAmount: maintenanceItemList[i].excludingTaxAmount,
                includingTaxAmount: maintenanceItemList[i].includingTaxAmount,
            });
        }
        request(Api.MaintainLessorSupplementAdd, {
            // 类型	是否必填	描述
            // demanderSn	string	是	需求方用户编号
            // projectSn	string	是	项目编号
            // maintenanceItemList	arr-object	是	维保合同维保项
            // serviceItemSn	string	是	维保项系统编码
            // taxRate	double	是	税率
            // excludingTaxAmount	double	是	不含税金额
            // includingTaxAmount	double	是	含税金额
            sn:this.state.data.sn,
            maintenanceItemList: list,
        }, () => {
            message.info("操作成功")
            this.props.refresh && this.props.refresh();
            this.props.onClose && this.props.onClose();
        }, () => {

        })
    }

    render() {
        return (
            <Modal
                title="合同价格"
                width={'70%'}
                visible={true}
                style={{top: 20}}
                footer={null}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}
                maskClosable={false}
            >
                <Divider orientation="left">服务项目</Divider>
                <Button type={'primary'} onClick={() => {
                    this.setState({isSelectServItemVisible: true});
                }}>添加项目</Button>
                <div style={{padding: 5}}>
                    <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                        <span style={{flex: 1}}>服务项目</span>
                        <span style={{flex: 0.7}}>服务分类</span>
                        <span style={{flex: 0.7}}>单位</span>
                        <span style={{flex: 0.9}}>税率(%)</span>
                        <span style={{flex: 1}}>维修费(不含税)</span>
                        <span style={{flex: 1}}>维修费(含税)</span>
                        <span style={{width: 30}}>操作</span>
                    </div>
                    {this.state.data.maintenanceItemList && this.state.data.maintenanceItemList.map((itm, idx) => (
                        <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                            <span style={{flex: 1}}>{itm.serviceItemName}</span>
                            <span style={{flex: 0.7}}>{itm.categoryNamePath}</span>
                            <span style={{flex: 0.7}}>{itm.unit}</span>
                            <span style={{flex: 0.9}}>
                                <InputNumber
                                    placeholder="请输入税率"
                                    title={itm.taxRate}
                                    value={itm.taxRate}
                                    onChange={(e) => {
                                        let maintenanceItemList = this.state.data.maintenanceItemList;
                                        maintenanceItemList[idx].taxRate = e
                                        this.setData({
                                            maintenanceItemList
                                        })
                                    }}
                                    min={0}
                                    max={100}
                                    precision={2}
                                />
                            </span>
                            <span style={{flex: 1}}>
                                <InputNumber
                                    title={itm.excludingTaxAmount}
                                    value={itm.excludingTaxAmount}
                                    step="1"
                                    onChange={e => {
                                        let maintenanceItemList = this.state.data.maintenanceItemList;
                                        maintenanceItemList[idx].excludingTaxAmount = e
                                        this.setData({
                                            maintenanceItemList
                                        })
                                    }}
                                    min={0}
                                    max={999999.9999}
                                    precision={4}
                                />
                            </span>
                            <span style={{flex: 1}}>
                                <InputNumber
                                    title={itm.includingTaxAmount}
                                    value={itm.includingTaxAmount}
                                    step="1"
                                    onChange={e => {
                                        let maintenanceItemList = this.state.data.maintenanceItemList;
                                        maintenanceItemList[idx].includingTaxAmount = e
                                        this.setData({
                                            maintenanceItemList
                                        })
                                    }}
                                    min={0}
                                    max={999999.9999}
                                    precision={4}
                                />
                            </span>
                            <span style={{width: 30}}>
                                          <Popconfirm
                                              placement="topRight"
                                              title="确定删除该项？"
                                              onConfirm={() => {
                                                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                  let maintenanceItemList = this.state.data.maintenanceItemList;
                                                  maintenanceItemList.splice(idx, 1);
                                                  this.setData({
                                                      maintenanceItemList
                                                  });
                                              }}
                                              okText="确定"
                                              cancelText="取消"
                                          >
                                              <a style={{color: '#ff4757'}}>删除</a>
                                          </Popconfirm>
                                    </span>
                        </div>))}
                    <Button type={'primary'} onClick={() => {
                        this.submit();
                    }}>提交</Button>
                </div>
                {/*选择承租方弹窗*/}
                {
                    this.state.isSelectLesseeModalVisible
                        ? <SelectDemandModal
                            onClose={() => {
                                this.setState({
                                    isSelectLesseeModalVisible: false
                                });
                            }}
                            onSelect={data => {
                                this.setData
                                && this.setData({
                                    lesseeSn: data.demanderSn,
                                    lesseeName: data.demanderName,
                                })
                                this.setState({
                                    isSelectLesseeModalVisible: false
                                })
                            }}
                        />
                        : null
                }
                {/*选择项目弹窗*/}
                {
                    this.state.isSelectLesseeProjectVisible
                        ? <SelectLesseeProjectModal
                            lesseeSn={this.state.data.lesseeSn}
                            onClose={() => {
                                this.setState({
                                    isSelectLesseeProjectVisible: false
                                });
                            }}
                            onSelect={data => {
                                this.setData
                                && this.setData({
                                    projectSn: data.projectSn,
                                    projectName: data.projectName,
                                })
                                this.setState({
                                    isSelectLesseeProjectVisible: false
                                })
                            }}
                        />
                        : null
                }
                {/*选择服务项目*/}
                {
                    this.state.isSelectServItemVisible
                        ? <SelectServiceItemModal
                            onClose={() => {
                                this.setState({
                                    isSelectServItemVisible: false
                                });
                            }}
                            onSelect={data => {
                                let maintenanceItemList = this.state.data.maintenanceItemList;
                                let snArr = maintenanceItemList.map((item) => item.serviceItemSn);
                                if (!snArr.includes(data.serviceItemSn)) {
                                    maintenanceItemList.push(data)
                                    this.setData && this.setData({
                                        maintenanceItemList
                                    })
                                }
                                this.setState({
                                    isSelectServItemVisible: false
                                })
                            }}
                        />
                        : null
                }
            </Modal>
        );
    }
}

export default MaintainContracLessorEditModal;
