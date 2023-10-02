/**
 * Created by yb on 2018/10/17
 */

import React, {Component} from 'react';
import { UploadOutlined } from '@ant-design/icons';
import { Upload, message, Button } from 'antd';
import './UploadCss.less';
import FetchUtil from "../../base/network/FetchUtil";

class UploadFileMethod extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileTypeList: false,// 文件格式，在图片上传前校验 ['xlsx', .....]
            uploadText: '上传', // 组件提示文案
            fileSize: false,// 限制上传图片大小
            fileUrl: '',//  图片路径
        };
        this.callBack = (urls, file) => {
            if (this.props.callBack) {
                this.props.callBack(urls, file);
            }
        }; // 上传后地址回调
    }

    render() {
        let {uploadText, fileTypeList, fileSize, accept = 'image/*'} = Object.assign(this.state, this.props.data);
        let uploadParameters = {
            accept,
            // listType: "picture-card",
            className: "avatar-uploader",
            name: "avatar",
            showUploadList: false,
            multiple: true,
            beforeUpload: (file) => {
                // let fileType = this.state.fileType;
                if (fileTypeList) {
                    let res = false;
                    fileTypeList.forEach((types, idx) => {
                        if (file.name.indexOf(types) >= 0) {
                            res = true;
                            return false;
                        }
                    });
                    if (!res) {
                        message.error(`请上传以下格式文件：${fileTypeList.join('、')}`);
                        return false;
                    }
                }
                if (fileSize) {
                    const isLt2M = file.size / 1024 / 1024 < parseInt(fileSize);
                    if (!isLt2M) {
                        message.error(`上传的文件大小不能大于：${fileSize}MB`);
                        return false;
                    }
                }
            },
            customRequest: (e) => {
                // this.multImportFinancePlans({file: e.file})

                FetchUtil.uploadFile({
                    file: e.file
                }, (data) => {
                    setTimeout(() => {
                        this.setState({
                            fileUrl: data.data.url,
                        }, () => {
                            this.callBack(data.data.url, e.file);
                        });
                    });
                }, () => {
                });
            }
        };

        return (
            <Upload {...uploadParameters}>
                {
                    this.props.children ? this.props.children : <Button>
                        <UploadOutlined /> {uploadText}
                    </Button>
                }
            </Upload>
        );
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.data.fileUrl) {
    //         this.setState(nextProps.data)
    //     }
    // }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.data.fileUrl) {
    //         return nextProps.data
    //     }
    //     return null;
    // }
}
export default UploadFileMethod
