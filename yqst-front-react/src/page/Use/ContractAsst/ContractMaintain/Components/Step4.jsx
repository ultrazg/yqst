import React, {Component} from 'react';
import {Button, Divider, Collapse, Input, InputNumber, Popconfirm} from "antd";
import AddMainServItemModal from "./AddMainServItemModal";

/**
 * 维保价格
 */
class Step4 extends Component {
    constructor(props) {
        super(props);
        this.state = {isShowAddItemVisi: false};
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <Divider orientation="left">维保价格</Divider>
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
                    {this.props.data.maintenanceItemList && this.props.data.maintenanceItemList.map((itm, idx) => (
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
                                                  let maintenanceItemList = this.props.data.maintenanceItemList;
                                                  maintenanceItemList.splice(idx, 1);
                                                  this.props.setData({
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
                        let maintenanceItemList = this.props.data.maintenanceItemList;
                        maintenanceItemList.push({...data})
                        this.props.setData({
                            maintenanceItemList
                        })
                    }}/> : null}
                <div>
                    <Button
                        style={{marginRight: 20}}
                        onClick={() => {
                            this.props.onPrev && this.props.onPrev();
                        }}
                    >上一步</Button>
                    <Button onClick={() => {
                        this.props.onSubmit && this.props.onSubmit()
                    }}>提交</Button>
                </div>
            </>
        );
    }
}

export default Step4;
