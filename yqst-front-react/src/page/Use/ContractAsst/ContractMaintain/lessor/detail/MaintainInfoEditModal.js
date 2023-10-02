import React from "react";
import request from "../../../../../../utils/request/request";
import {Button, Collapse, Divider, InputNumber, message, Modal, Popconfirm} from "antd";
import AddMainServItemModal from "../../Components/AddMainServItemModal";

export default class MaintainInfoEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            sn: this.props.data.sn || '',
            maintenanceItemList: this.props.data.maintenanceItemList || [],
        };
    }

    componentDidMount() {
    }

    setData = (data) => {
        this.setState({
            ...data
        })
    }

    submit = () => {
        request('/api/v1/contract/lease/contract/maintenance/item/update',
            {
                sn: this.state.sn,
                maintenanceItemList: this.state.maintenanceItemList,
            }, (res) => {
                message.info('修改成功')
                this.props.onClose && this.props.onClose()
                this.props.refresh && this.props.refresh()
            }, () => {

            })
    }

    render() {
        return <Modal
            title="维保价格"
            width={'70%'}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
            <>
                <Button type={'primary'} onClick={() => {
                    this.setState({isShowAddItemVisi: true});
                }}>添加项目</Button>
                <div style={{padding: 5}}>
                    <div style={{display: 'flex', padding: 5, fontSize: 12}}>
                        <span style={{flex: 1}}>服务项目</span>
                        <span style={{flex: 1}}>单位</span>
                        <span style={{flex: 0.7}}>税率(%)</span>
                        <span style={{flex: 1}}>不含税金额</span>
                        <span style={{flex: 1}}>含税金额</span>
                        <span style={{width: 30}}>操作</span>
                    </div>
                    {this.state.maintenanceItemList && this.state.maintenanceItemList.map((itm, idx) => (
                        <div style={{display: 'flex', padding: 5, background: 'none'}} key={idx}>
                            <span style={{flex: 1}}>{itm.serviceItemName}</span>
                            <span style={{flex: 1}}>{itm.unit}</span>
                            <span style={{flex: 0.7}}>{itm.taxRate}</span>
                            <span style={{flex: 1}}>{itm.excludingTaxAmount}</span>
                            <span style={{flex: 1}}>{itm.includingTaxAmount}</span>
                            <span style={{width: 30}}>
                                          <Popconfirm
                                              placement="topRight"
                                              title="确定删除该项？"
                                              onConfirm={() => {
                                                  // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                  let maintenanceItemList = this.state.maintenanceItemList;
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
                </div>
                <Divider orientation="left"/>
                {this.state.isShowAddItemVisi ? <AddMainServItemModal
                    onClose={() => {
                        this.setState({isShowAddItemVisi: false})
                    }}
                    callback={(data) => {
                        let maintenanceItemList = this.state.maintenanceItemList;
                        maintenanceItemList.push({...data})
                        this.setData({
                            maintenanceItemList,
                            isShowAddItemVisi: false
                        })
                    }}/> : null}
                <Popconfirm
                    title="确定提交？"
                    onConfirm={this.submit}
                    okText="确定"
                    cancelText="取消"
                >
                    <Button type={'primary'}>提交</Button>
                </Popconfirm>
            </>
        </Modal>
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 130}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}
