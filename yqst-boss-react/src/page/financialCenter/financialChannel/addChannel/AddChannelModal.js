/**
 * Created by ljy on 2018/5/30
 */
import React, {Component} from 'react';
import {Modal, Button} from 'antd';
import InputItem from '../component/InputItem';
import ItemLineView from '../component/ItemLineView';

export default class AddChannelModal extends Component {
    constructor(props) {
        super(props);
        this.isEdit = this.props.isEdit;
        this.state = {
            sid: '',
            channelName: '',
            contact: '',
            phone: '',
            remark: '',
        }
    }

    close() {
        this.props.setVisible(false);
    }

    render() {
        return <Modal
            title={(this.props.data.isEdit ? "添加" : "编辑") + '金融渠道'}
            width={this.props.contentWidth * 0.6}
            visible={true}
            closable={true}
            footer={null}
            onCancel={() => {
                this.close();
            }}>
            <div style={{
                paddingTop: 10,
                paddingBottom: 10,
                paddingLeft: this.props.contentWidth * 0.01,
                paddingRight: this.props.contentWidth * 0.01,
                marginLeft: 8, marginRight: 8,
                display: 'flex',
                flexDirection: 'column',
            }}>
                <ItemLineView contentWidth={this.props.contentWidth / 2}>
                    <InputItem
                        contentWidth={this.props.contentWidth * 1.5}
                        title={"*渠道名称"}
                        text={this.state.channelName}
                        pla={"请输入"}
                        onChange={(e) => {
                            this.setState({
                                channelName: e.target.value
                            });
                        }}
                    />
                </ItemLineView>
                <ItemLineView contentWidth={this.props.contentWidth / 2}>
                    <InputItem
                        contentWidth={this.props.contentWidth * 1.5}
                        title={"*联系人"}
                        text={this.state.contact}
                        pla={"请输入"}
                        onChange={(e) => {
                            this.setState({
                                contact: e.target.value
                            });
                        }}
                    />
                </ItemLineView>
                <ItemLineView contentWidth={this.props.contentWidth / 2}>
                    <InputItem
                        contentWidth={this.props.contentWidth * 1.5}
                        title={"*联系电话"}
                        text={this.state.phone}
                        pla={"请输入"}
                        onChange={(e) => {
                            this.setState({
                                phone: e.target.value
                            });
                        }}
                    />
                </ItemLineView>
                <ItemLineView contentWidth={this.props.contentWidth / 2}>
                    <InputItem
                        contentWidth={this.props.contentWidth * 1.5}
                        title={"*备注"}
                        text={this.state.remark}
                        pla={"请输入"}
                        onChange={(e) => {
                            this.setState({
                                remark: e.target.value
                            });
                        }}
                    />
                </ItemLineView>
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'row'}}>
                <Button
                    type="primary"
                    style={{
                        width: this.props.contentWidth * 0.02 * 6,
                    }}
                    onClick={() => {
                        this.close();
                    }}>
                    {this.props.data.isEdit ? "保存" : "添加"}
                </Button>
            </div>
        </Modal>
    }

}

