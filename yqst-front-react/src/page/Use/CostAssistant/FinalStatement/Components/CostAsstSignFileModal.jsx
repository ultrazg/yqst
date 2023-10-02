import React, {Component} from 'react';
import {Modal, Select} from "antd";
import CostAssistantModel from "../../CostAssistantModel";
import {getPageQuery} from "../../../../../utils";
import PDFView from "SWViews/renderPDF";

const {Option} = Select;

class CostAsstSignFileModal extends Component {
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
                    <PDFView
                        url={window.getOrginUrl(this.state.url)}
                        height={document.documentElement.clientHeight * 0.65}
                    />
                </Modal>
            </>
        );
    }

    getList = () => {
        const {sn, type} = this.state;

        if (type === 0) {
            CostAssistantModel.CostAsstGetSettlementPdf({sn}, res => {
                this.setState({
                    url: res.data.url || ''
                });
            });
        } else {
            CostAssistantModel.CostAsstGetSettlementSpuPdf({sn}, res => {
                this.setState({
                    url: res.data.url || ''
                });
            });
        }
    }
}

export default CostAsstSignFileModal;
