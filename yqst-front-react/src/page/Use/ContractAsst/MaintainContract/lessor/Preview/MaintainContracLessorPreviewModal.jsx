import React from 'react';
import {Button, Divider, Modal} from "antd";
import request from "../../../../../../utils/request/request";

/**
 * 维保合同
 */
class MaintainContracLessorPreviewModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.sn = this.props.sn || "";
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
        request('/api/v1/contract/maintenance/contract/maintenance/item/update/log', {sn: this.sn}, (res) => {
            this.setData({...res.data})
        }, () => {
        });
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
            <Modal
                title={'维保合同修改记录'}
                visible={true}
                width={'70%'}
                style={{top: 10}}
                footer={null}
                onCancel={() => {
                    this.props.onClose && this.props.onClose()
                }}>
                <Divider orientation="left">基础信息</Divider>
                <div>
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
                </div>
            </Modal>
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

export default MaintainContracLessorPreviewModal;
