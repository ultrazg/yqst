import React, {Component} from 'react';
import {Modal, Select, Button, Popconfirm} from "antd";
import CostAssistantModel from "../../CostAssistantModel";
import {getPageQuery} from "../../../../../utils";
import PDFView from "SWViews/renderPDF";
import moment from 'moment'

const {Option} = Select;

class CostAsstSignFilePreviewModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '',
            type: 0, // 0.sku 1.spu
            url: '',
            PdfModalViewerVisi: false,
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
                <Modal
                    title="查看签署文件"
                    visible={true}
                    footer={null}
                    onCancel={() => {
                        this.props.onClose && this.props.onClose()
                    }}
                    style={{top: 20}}
                    width={'70%'}
                >
                    <label>类型：</label>
                    <Select
                        defaultValue={this.state.type}
                        value={this.state.type}
                        style={{width: 100, marginRight: 20}}
                        onChange={value => {
                            this.setState({
                                type: value
                            }, () => {
                                this.getList();
                            });
                        }}>
                        >
                        <Option value={0}>SKU 统计</Option>
                        <Option value={1}>SPU 统计</Option>
                    </Select>
                    <Popconfirm
                        title="确认无误并提交?"
                        onConfirm={() => {
                            this.props.callback && this.props.callback();
                        }}
                        okText="确认"
                        cancelText="取消"
                    >
                        <Button type={'primary'}>提交</Button>
                    </Popconfirm>
                    {this.state.url ? <PDFView
                        url={window.getOrginUrl(this.state.url)}
                        height={document.documentElement.clientHeight * 0.65}
                    /> : null}
                </Modal>
            </>
        );
    }

    getList = () => {
        const {type} = this.state;
        const {data} = this.props;
        if (type === 0) {
            CostAssistantModel.CostAsstGetSettlementPdfPreview({
                ...data,
                settlementStartTimeStr: data.settlementStartTime ?
                    moment(data.settlementStartTime).format("YYYY-MM-DD") : '',
                settlementEndTimeStr: data.settlementEndTime ?
                    moment(data.settlementEndTime).format("YYYY-MM-DD") : ''
            }, res => {
                this.setState({
                    url: res.data || ''
                });
            });
        } else {
            CostAssistantModel.CostAsstGetSettlementSpuPdfPreview({
                ...data,
                settlementStartTimeStr: data.settlementStartTime ?
                    moment(data.settlementStartTime).format("YYYY-MM-DD") : '',
                settlementEndTimeStr: data.settlementEndTime ?
                    moment(data.settlementEndTime).format("YYYY-MM-DD") : ''
            }, res => {
                this.setState({
                    url: res.data || ''
                });
            });
        }
    }
}

export default CostAsstSignFilePreviewModal;
