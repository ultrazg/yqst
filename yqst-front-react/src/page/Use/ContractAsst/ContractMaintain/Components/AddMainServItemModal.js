import React from 'react';
import {Button, Input, InputNumber, Modal, message} from "antd";

export default class AddMainServItemModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceItemName: '',//	string	服务项目名称
            unit: '',//	string	单位
            taxRate: '',//	double	税率
            excludingTaxAmount: '',//	double	不含税金额
            includingTaxAmount: '',//	double	含税金额
        }
    }

    render() {
        return <Modal
            title="选择承租方"
            visible={true}
            width={'60%'}
            style={{top: 10}}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 100}}>服务项目：</label>
                <Input
                    style={{width: 300}}
                    placeholder="请输入服务项目"
                    title={this.state.serviceItemName}
                    value={this.state.serviceItemName}
                    onChange={(e) => {
                        this.setState({
                            serviceItemName: e.target.value
                        })
                    }}
                    maxLength={30}
                />
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 100}}>单位：</label>
                <Input
                    style={{width: 300}}
                    placeholder="请输入单位"
                    title={this.state.unit}
                    value={this.state.unit}
                    onChange={(e) => {
                        this.setState({
                            unit: e.target.value
                        })
                    }}
                    maxLength={10}
                />
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 100}}>税率：</label>
                <InputNumber
                    style={{width: 300, cursor: 'pointer'}}
                    placeholder="请输入税率"
                    title={this.state.taxRate}
                    value={this.state.taxRate}
                    onChange={(e) => {
                        this.setState({
                            taxRate: e
                        })
                    }}
                    min={0}
                    max={100}
                    precision={2}
                />
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 100}}>不含税金额：</label>
                <InputNumber
                    style={{width: 300, cursor: 'pointer'}}
                    placeholder="请输入不含税金额"
                    title={this.state.excludingTaxAmount}
                    value={this.state.excludingTaxAmount}
                    onChange={(e) => {
                        this.setState({
                            excludingTaxAmount: e
                        })
                    }}
                    min={0}
                    max={999999.9999}
                    precision={4}
                />
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 100}}>含税金额：</label>
                <InputNumber
                    style={{width: 300, cursor: 'pointer'}}
                    placeholder="请输入含税金额"
                    title={this.state.includingTaxAmount}
                    value={this.state.includingTaxAmount}
                    onChange={(e) => {
                        this.setState({
                            includingTaxAmount: e
                        })
                    }}
                    min={0}
                    max={999999.9999}
                    precision={4}
                />
            </div>
            <Button type={'primary'} onClick={() => {
                if (!this.state.serviceItemName) {
                    return message.info("请输入服务项目");
                }
                if (!this.state.unit) {
                    return message.info("请输入单位");
                }
                if (this.state.taxRate === '') {
                    return message.info("请输入税率");
                }
                if (this.state.excludingTaxAmount === '') {
                    return message.info("请输入不含税金额");
                }
                if (this.state.includingTaxAmount === '') {
                    return message.info("请输入含税金额");
                }
                this.props.callback && this.props.callback({...this.state})
            }}>添加</Button>
        </Modal>;
    }
}
