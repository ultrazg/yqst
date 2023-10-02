//结算信息
import React from "react";
import request from "../../../../../../utils/request/request";
import {Button, message, Modal, Popconfirm, Radio, Select} from "antd";

const {Option} = Select;

export default class SettleInfoEditModal extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                settlementDate: '',
                entryFeePayer: '',
                returnFeePayer: '',
                settleSubmitterName: '',
                settleSubmitTime: '',
                ...this.props.data,
            }
        }
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
        request('/api/v1/contract/lease/contract/settlement/info/update',
            {
                sn: this.state.data.sn,
                settlementDate: this.state.data.settlementDate,
                entryFeePayer: this.state.data.entryFeePayer,
                returnFeePayer: this.state.data.returnFeePayer,
            }, (res) => {
                message.info('修改成功')
                this.props.onClose && this.props.onClose()
                this.props.refresh && this.props.refresh()
            }, () => {

            })
    }

    render() {
        return <Modal
            title="结算信息"
            width={'70%'}
            visible={true}
            footer={null}
            onCancel={() => {
                this.props.onClose && this.props.onClose()
            }}
            maskClosable={false}
        >
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 150}}>结算周期：</label>
                <Select
                    value={this.state.data.settlementDate}
                    style={{width: 200}}
                    onChange={value => {
                        this.setData({
                            settlementDate: value
                        })
                    }}
                >
                    <Option value={1}>自然月</Option>
                    {
                        [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28].map(item => {
                            return <Option value={item}>{`当月 ${item} 号至次月 ${item - 1} 号`}</Option>
                        })
                    }
                </Select>
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 150}}>进场物流费用结算方：</label>
                <Radio.Group
                    onChange={e => {
                        this.setData({entryFeePayer: e.target.value})
                    }}
                    value={this.state.data.entryFeePayer}
                >
                    <Radio value={1}>我方</Radio>
                    <Radio value={2}>客户</Radio>
                </Radio.Group>
            </div>
            <div style={{
                display: 'flex',
                marginBottom: 20
            }}>
                <label style={{width: 150}}>退场物流费用结算方：</label>
                <Radio.Group
                    onChange={e => {
                        this.setData({returnFeePayer: e.target.value})
                    }}
                    value={this.state.data.returnFeePayer}
                >
                    <Radio value={1}>我方</Radio>
                    <Radio value={2}>客户</Radio>
                </Radio.Group>
            </div>
            <Popconfirm
                title="确定提交？"
                onConfirm={this.submit}
                okText="确定"
                cancelText="取消"
            >
                <Button type={'primary'}>提交</Button>
            </Popconfirm>
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
