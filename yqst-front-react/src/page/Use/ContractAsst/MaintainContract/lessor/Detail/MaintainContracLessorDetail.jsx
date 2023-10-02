import React from 'react';
import ViewCoat from "../../../../PublicModule/ViewCoat/ViewCoat";
import {LeftOutlined} from "@ant-design/icons";
import {Button, Divider} from "antd";
import Api from "../../Api/Api";
import request from "../../../../../../utils/request/request";
import MaintainContracLessorEditModal from "./MaintainContracLessorEditModal";
import MaintainModifyListModal from "./MaintainModifyListModal";
import MaintainContracLessorPreviewModal from "../Preview/MaintainContracLessorPreviewModal";

/**
 * 维保合同
 */
class MaintainContracLessorDetail extends React.PureComponent {
    constructor(props) {
        super(props);
        this.sn = (this.props.location.search && new URLSearchParams(this.props.location.search).get("sn")) || "";
        this.state = {
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
            }
        };
    }

    componentDidMount() {
        this.getDetail()
    }

    getDetail = () => {
        request(Api.MaintainDetail, {sn: this.sn}, (res) => {
            this.setData({
                ...res.data,
            })
        }, () => {
        })
        request(Api.MaintainMaintainDetail, {sn: this.sn}, (res) => {
            this.setData({
                ...res.data,
            })
        }, () => {
        }, false)
    }

    setData = (data) => {
        this.setState({
            data: {
                ...this.state.data,
                ...data
            }
        })
    }

    render() {
        const {data} = this.state;
        return (
            <ViewCoat
                breadCrumb={[{title: "维保合同"}, {title: "维保合同详情"}]}
            >
                <Button style={{marginBottom: 20}} onClick={() => {
                    window.history.go(-1);
                }}><LeftOutlined/>返回</Button>
                <Divider orientation="left">基础信息</Divider>
                <div>
                    {this.renderText('需求方', data.demanderName)}
                    {this.renderText('服务方', data.serviceProviderName)}
                    {this.renderText('项目', data.projectName)}
                    {this.renderText('提交人', data.submitterName)}
                    {this.renderText('提交时间', data.submitTime)}
                </div>
                <Divider orientation="left">服务项目</Divider>
                <div style={{padding: 5}}>
                    <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                        <span style={{flex: 1}}>服务项目</span>
                        <span style={{flex: 0.7}}>服务分类</span>
                        <span style={{flex: 0.7}}>单位</span>
                        <span style={{flex: 0.9}}>税率(%)</span>
                        <span style={{flex: 1}}>维修费(不含税)</span>
                        <span style={{flex: 1}}>维修费(含税)</span>
                    </div>
                    {data.maintenanceItemList && data.maintenanceItemList.map((itm, idx) => (
                        <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                            <span style={{flex: 1}}>{itm.serviceItemName}</span>
                            <span style={{flex: 0.7}}>{itm.categoryNamePath}</span>
                            <span style={{flex: 0.7}}>{itm.unit}</span>
                            <span style={{flex: 0.9}}>{itm.taxRate}</span>
                            <span style={{flex: 1}}>{itm.excludingTaxAmount}</span>
                            <span style={{flex: 1}}>{itm.includingTaxAmount}</span>
                        </div>))}
                    <Divider orientation="left"></Divider>
                    <div style={{display: 'flex'}}>
                        {data.isOperate ? <Button style={{marginLeft: 15}} type={'primary'} onClick={() => {
                            this.setState({isShow: true})
                        }}>新增协议</Button> : null}
                        <Button style={{marginLeft: 15}} onClick={() => {
                            this.setState({isShowRecList: true});
                        }}>合同补充协议</Button>
                    </div>
                </div>
                {this.state.isShow ? <MaintainContracLessorEditModal
                    data={this.state.data}
                    refresh={() => {
                        this.getDetail()
                    }}
                    onClose={() => {
                        this.setState({isShow: false})
                    }}
                /> : null}
                {this.state.isShowRecList ? <MaintainModifyListModal
                    sn={this.state.data.sn}
                    preview={(data) => {
                        this.previewData = data;
                        this.setState({
                            isShowPreview: true
                        })
                    }}
                    onClose={() => {
                        this.setState({isShowRecList: false})
                    }}
                /> : null}
                {this.state.isShowPreview ? <MaintainContracLessorPreviewModal
                    sn={this.previewData.sn}
                    onClose={() => {
                        this.setState({isShowPreview: false})
                    }}
                /> : null}
            </ViewCoat>
        );
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 80}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}

export default MaintainContracLessorDetail;
