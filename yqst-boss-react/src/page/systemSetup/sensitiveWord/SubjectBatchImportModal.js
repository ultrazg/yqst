import React, {Component} from 'react';
import {Modal, Upload, message} from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import ApiConst from '../../../base/urls/ApiConst';
import ApiInterface from '../../../base/urls/ApiInterface';
import FetchUtil from '../../../base/network/FetchUtil';
import './index.less';

class SubjectBatchImportModal extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {

    }


    render() {
        const {visible, handleOk, handleCancel} = this.props;
        const url = `${ApiConst.Versions().sunaw + ApiInterface.SystemSetupASWUpload}`;
        const props = {
            className: 'uploadStyle',
            name: 'file',
            accept: '.xls,.xlsx',
            multiple: false,
            action: url,
            customRequest: (e) => {
                console.log('e: ', e);
                FetchUtil.uploadFileCustomUrl({file: e.file}, url, (res) => {
                    if (res && res.ret === 0) {
                        message.success('导入成功');
                        this.props.refresh();
                        this.props.handleCancel();
                    }
                });
            },
            onChange(info) {
                const status = info.file.status;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    console.log(info);
                } else if (status === 'error') {
                    console.log(info);
                }
            }
        };
        return (
            <Modal
                title="批量添加"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Upload.Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                        <InboxOutlined />
                    </p>
                    <p className="ant-upload-text">点击或将文件拖拽到这里上传</p>
                    <p className="ant-upload-hint">
                        支持扩展名：.xls .xlsx ...
                    </p>
                </Upload.Dragger>
            </Modal>
        );
    }
}

export default SubjectBatchImportModal;
