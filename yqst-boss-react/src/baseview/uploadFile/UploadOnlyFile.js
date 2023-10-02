/**
 * Created by yb on 2019/05/08
 * 上传文件
 */

import React, {Component} from 'react';
import {Form, Upload, Modal, message, Button, Popconfirm} from 'antd';
import {DownloadOutlined, CloseOutlined, UploadOutlined} from '@ant-design/icons';
import './UploadCss.less';
import FetchUtil from "../../base/network/FetchUtil";
import * as Res from '../../resource/resourceRef';

class UploadOnlyFiles extends Component {

    constructor(props) {
        super(props);
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.state = {
            uploadExpText: '上传文件', // 文案
            uploadIcon: <UploadOutlined />, // 图标
            fileList: [], // 数据列表
            attributeName: {
                key: 'key',
                msg: 'msg',
                originalName: 'originalName',
                type: 'type',
                url: 'url',
            }, // 列表内容对应的属性名称
            fileTypeList: false,// 文件格式，在图片上传前校验 ['.xlsx', .....]
            fileSize: false,// 限制上传图片大小
            maxNum: 9,// 默认最多上传9个文件
            isReadOnly: false, // 是否只读，只能查看
            isDowload: false, // 是否可以下载  只有只读图片的时候才有下载功能
        };
        this.callBackFiles = (obj) => {
            if (this.props.callBackFiles) {
                // if(this.props.data.attributeName){
                //     let newObj = {};
                //     for(let i in this.props.data.attributeName){
                //         newObj[this.props.data.attributeName[i]] = obj[i];
                //     }
                //     this.props.callBackFiles(newObj);
                // }else{
                //     this.props.callBackFiles(obj);
                // }

                this.props.callBackFiles(obj);
            }
        }; // 上传、删除后地址回调
    }

    // componentWillReceiveProps(nextProps) {
    // }

    static getDerivedStateFromProps(nextProps) {
        // if (nextProps.data.fileUrlList) {
        //     return nextProps.data
        // }
        return null
    }

    render() {
        const THIS = this;
        let {uploadExpText, uploadIcon, fileList, fileTypeList, fileSize, attributeName, maxNum, isReadOnly, isDowload} = Object.assign(this.state, this.props.data);

        const props = {
            accept: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar",
            listType: "picture-card",
            className: "avatar-uploader",
            multiple: true,
            showUploadList: false,
            name: 'file',
            headers: {
                authorization: 'authorization-text',
            },
            beforeUpload: (file) => {
                // let fileType = this.state.fileType;
                if (fileTypeList) {
                    let res = false;
                    fileTypeList.forEach((types, idx) => {
                        if (file.type.indexOf(types) >= 0) {
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
                }, (res) => {
                    setTimeout(() => {
                        // 格式替换
                        let newObj = {};
                        if (this.props.data.attributeName) {
                            for (let i in this.props.data.attributeName) {
                                newObj[this.props.data.attributeName[i]] = res.data[i];
                            }

                        } else {
                            newObj = res.data

                        }
                        if (fileList.length >= maxNum) return false; // 防止添加超过限制的数据
                        this.state.fileList.push({...newObj});
                        this.setState({fileList: this.state.fileList}, () => {
                            this.callBackFiles(this.state.fileList)
                        });
                    });
                }, () => {
                });
            }
        };

        return (
            <div className={'UploadOnlyFileCss'}>
                {
                    (fileList.length >= maxNum || isReadOnly) ? '' : <Upload {...props}>
                        <Button>
                            {uploadIcon}
                            {uploadExpText}
                        </Button>
                    </Upload>
                }

                <div>
                    {
                        fileList.map((item, idx) => {
                            return <div
                                key={idx}
                                style={{
                                    height: '66px',
                                    lineHeight: '66px',
                                    padding: '0px 35px 0 5px',
                                    border: '1px solid #d9d9d9',
                                    borderRadius: '4px',
                                    overflow: 'hidden',
                                    whiteSpace: 'nowrap',
                                    textOverflow: 'ellipsis',
                                    position: 'relative',
                                    marginBottom: '10px',
                                }}
                            >
                                <img src={this.fileIcon(item[attributeName.originalName] ?
                                    item[attributeName.originalName].substring(item[attributeName.originalName].lastIndexOf(".") + 1) : '')}
                                     style={{
                                         width: '50px',
                                         height: '50px',
                                         marginRight: '10px',
                                     }}/>
                                {item[attributeName.originalName]}
                                {
                                    !isReadOnly && <Popconfirm
                                        title="是否移除该文件？"
                                        onConfirm={() => {
                                            THIS.delFile(idx);
                                        }} onCancel={() => {
                                    }} okText="是" cancelText="否">
                                        <CloseOutlined
                                            title='删除'
                                            style={{
                                                position: 'absolute',
                                                right: '5px',
                                                top: '5px',
                                                fontSize: '12px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Popconfirm>
                                }
                                {
                                    isDowload && <Popconfirm
                                        title="确认下载该文件？"
                                        onConfirm={() => {
                                            window.download(item[attributeName.url])
                                        }} onCancel={() => {
                                    }} okText="是" cancelText="否">
                                        <DownloadOutlined
                                            title='下载'
                                            style={{
                                                position: 'absolute',
                                                right: '10px',
                                                top: '23px',
                                                fontSize: '20px',
                                                cursor: 'pointer',
                                            }}
                                        />
                                    </Popconfirm>
                                }
                            </div>
                        })
                    }
                </div>
            </div>
        );
    }

    // 上传图片
    multImportFinancePlans(params) {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', this.state.uploadUrl);
        const data = new FormData();
        data.append('file', params.file);
        xhr.send(data);
        xhr.addEventListener('load', () => {
            let THIS = this;
            var header = "<h1>MD5: ";
            let start = xhr.responseText.indexOf(header);
            const getUrl = "http://163.177.128.179:39241/" + xhr.responseText.substring(start + header.length, start + 32 + header.length);
            let fileUrlList = this.state.fileUrlList, newArr = [];
            newArr.push(getUrl);
            if (this.state.maxNum <= 1) {
                fileUrlList = newArr;
            } else {
                fileUrlList = fileUrlList.concat(newArr)
            }
            message.success(this.state.sucText, 2);
            this.setState({
                fileUrlList
            }, () => {
                THIS.callBackFiles(fileUrlList)
            });
        });
        xhr.addEventListener('error', () => {
            message.error(this.state.resText, 2);
        });
    }

    // 删除文件
    delFile(idx) {
        this.state.fileList.splice(idx, 1);
        this.setState({fileList: this.state.fileList}, () => {
            this.callBackFiles(this.state.fileList)
        });
    }

    // 图标配置
    fileIcon(type) {
        switch (type) {
            case 'doc':
            case 'docx':
                return Res.file_picker_word
            case 'xls':
            case 'xlsx':
                return Res.file_picker_excle
            case 'ppt':
            case 'pptx':
                return Res.file_picker_ppt
            case 'zip':
            case 'rar':
                return Res.file_picker_zip
            case 'pdf':
                return Res.file_picker_pdf
            default:
                return Res.file_picker_def
        }
    }
}

const UploadOnlyFile = UploadOnlyFiles;

export default UploadOnlyFile
