/**
 * Created by yb on 2019/12/26
 *
 */
/*
*  组件的使用例子
    const changeType = (pra) => {
        pra = pra ? JSON.parse(pra) : [];
        pra = pra.map(item => {
            return {
                key: '',
                msg: '',
                originalName: item.fileName,
                type: item.type,
                url: item.url,
                file: '',
                uid: '',
                progressRate: 0, // 上传进度
                uploadRes: null, // 上传结果 '成功' or '失败'
            }
        });
        return pra;
    };
    <UploadDocument
        data={{
            fileUrl: changeType('[{"fileName":"耗材库存管理.doc","type":"doc","url":"https://sunawtest.oss-cn-shenzhen.aliyuncs.com/jiuerliu/test/5579f105a875ae02896dce3232faae1.doc"}]'),
        }}
        callBack={(obj) => {
            console.log('返回结果：', obj);
        }}
    />
* */

import React, {Component} from 'react';

import {Upload, message, Progress} from 'antd';
import './UploadCss.less';
import FetchUtil from "../../base/network/FetchUtil";
import {war, uploadImg, document, mp4} from "../../resource/index";

class UploadDocument extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileTypeList: false,// 文件格式，在图片上传前校验 ['.xlsx', .....]
            uploadText: '上传', // 组件提示文案
            fileSize: 15,// 限制上传图片大小，默认15M
            fileUrl: [],//  图片路径
            maxNum: 9, // 最多上传张数，当只上传一张时候，可以修改已上传的图片
            ...(props.data ? props.data : {}),
        };
        this.callBack = (urls) => {
            // // 整理返回的结果；
            // let resArr = [];
            // urls.forEach(item => {
            //     if(item.url)
            //         resArr.push(item.url);
            // });
            this.props.callBack && this.props.callBack(urls);
        }; // 上传后地址回调
    }

    componentDidMount() {
    }

    // static getDerivedStateFromProps(nextProps, prevState) {
    //     if (nextProps.data && nextProps.data.fileUrl) {
    //         return nextProps.data
    //     }
    //     return null;
    // }

    render() {
        // let {uploadText, fileTypeList, fileSize, maxNum, fileUrl} = Object.assign(this.state, this.props.data);
        let {uploadText, fileTypeList, fileSize, maxNum, fileUrl} = this.state;
        let uploadParameters = {
            accept: ".doc,.docx,.ppt,.pptx,.xls,.xlsx,.pdf,.zip,.rar",
            // listType: "picture-card",
            // className: "avatar-uploader",
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
                // console.log('xxxx; ', e);
                // return false;

                if (fileUrl.length > maxNum)
                    return false;
                if ('1' === '' + maxNum)
                    fileUrl = [];
                fileUrl.push({
                    key: '',
                    msg: '',
                    originalName: e.file.name,
                    type: '',
                    url: '',
                    file: e.file,
                    uid: e.file.uid,
                    progressRate: 0, // 上传进度
                    uploadRes: null, // 上传结果 '成功' or '失败'
                });

                this.setState({fileUrl}, () => {
                    this.getUploadFile(e.file, e.file.uid);
                });
            }
        };
        let upHtml = <div
            style={{
                color: '#2B3441',
                fontSize: '14px',
                cursor: fileUrl.length >= maxNum ? 'no-drop' : 'pointer',
            }}
        >
            <img src={uploadImg} alt=""
                 style={{
                     width: '18px',
                     height: '18px',
                     marginRight: '6px',
                     verticalAlign: '-1px'
                 }}
            />
            添加文件
            <span
                style={{
                    color: 'rgba(43,52,65,0.45)',
                    marginLeft: '6px'
                }}
            >{fileUrl.length}/{maxNum}</span>
        </div>;

        return (
            <div
                className={'uplDocCss'}
                style={
                    this.props.style ? {
                        width: '320px',
                        borderRadius: '4px',
                        border: '1px solid rgba(43,52,65,0.25)',
                        ...this.props.style,

                    } : {
                        width: '320px',
                        borderRadius: '4px',
                        border: '1px solid rgba(43,52,65,0.25)',

                    }
                }
            >
                <div
                    style={{
                        minHeight: '50px',
                        padding: '16px'
                    }}
                >
                    {
                        fileUrl.length <= 0 ? <div
                            style={{
                                color: 'rgba(43,52,65,0.45)',
                                textAlign: 'center',
                                lineHeight: '32px',
                                fontSize: '20px',
                            }}
                        >
                            请添加文件
                        </div> : this.makeDocumentView(fileUrl)
                    }
                </div>
                <div
                    style={{
                        textAlign: 'center',
                        height: '80px',
                        borderTop: '1px solid rgba(43,52,65,0.25)',
                        padding: '15px'
                    }}
                >
                    {
                        fileUrl.length >= maxNum ? upHtml : <Upload {...uploadParameters}>
                            {upHtml}
                        </Upload>
                    }
                    <div
                        style={{
                            color: 'rgba(43,52,65,0.45)',
                            // marginTop: '12px',
                            lineHeight: '18px'
                        }}
                    >单个文件不超过 {fileSize}M
                    </div>
                </div>
            </div>
        );
    }

    getUploadFile(file, uid) {
        let {fileUrl} = this.state;

        FetchUtil.uploadFile({
            file
        }, (res) => {
            setTimeout(() => {
                fileUrl = fileUrl.map(item => {
                    if ('' + item.uid === '' + uid) {
                        item.key = res.data.key;
                        item.msg = res.data.msg;
                        item.originalName = res.data.originalName;
                        item.type = res.data.type;
                        item.url = res.data.url;
                        item.uploadRes = '成功';
                        // item.uploadRes = '失败';
                    }
                    return item;
                });
                this.setState({fileUrl}, () => {
                    this.callBack(fileUrl);
                });
            }, 500);

        }, (err) => {
            fileUrl = fileUrl.map(item => {
                if ('' + item.uid === '' + uid) {
                    item.uploadRes = '失败';
                }
                return item;
            });
            this.setState({fileUrl});

        }, (event) => { // 上传进度监控
            fileUrl = fileUrl.map(item => {
                if ('' + item.uid === '' + uid) {
                    item.progressRate = (event.loaded / event.total) * 100;
                }
                return item;
            });
            this.setState({fileUrl});

        });
    }

    makeDocumentView(fileUrl) {
        let htmlArr = [];
        fileUrl.forEach((item, idx) => {
            if (item.url) {
                htmlArr.push(<div
                    key={'img_' + idx}
                    style={{
                        position: 'relative',
                        marginBottom: fileUrl.length - 1 == idx ? '0px' : '18px'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            paddingRight: '35px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}
                        title={item.originalName}
                    >
                        <img src={
                            this.fileIcon(item.originalName ?
                                item.originalName.substring(item.originalName.lastIndexOf(".") + 1) : '')
                        } alt=""
                             style={{
                                 width: '16px',
                                 height: '16px',
                                 marginRight: '8px',
                                 verticalAlign: '-2px',
                             }}
                        />
                        {item.originalName}
                    </div>
                    <a
                        style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                        }}
                        onClick={() => {
                            fileUrl.splice(idx, 1);
                            this.setState({fileUrl}, () => {
                                this.callBack(fileUrl)
                            });
                        }}
                    >删除</a>
                </div>);

            } else if (!item.uploadRes) {
                htmlArr.push(<div
                    key={'img_' + idx}
                    className={'Progress'}
                    style={{
                        position: 'relative',
                        marginBottom: fileUrl.length - 1 == idx ? '0px' : '18px'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            paddingRight: '35px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis'
                        }}
                        title={item.originalName}
                    >
                        <img src={
                            this.fileIcon(item.originalName ?
                                item.originalName.substring(item.originalName.lastIndexOf(".") + 1) : '')
                        } alt=""
                             style={{
                                 width: '16px',
                                 height: '16px',
                                 marginRight: '8px',
                                 verticalAlign: '-2px',
                             }}
                        />
                        {item.originalName}
                    </div>
                    <Progress percent={item.progressRate} status="active" showInfo={false}
                              size="small"
                    />
                    <a
                        style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                        }}
                        onClick={() => {
                            fileUrl.splice(idx, 1);
                            this.setState({fileUrl}, () => {
                                this.callBack(fileUrl);
                            });
                        }}
                    >删除</a>
                </div>);

            } else if ('失败' === '' + item.uploadRes) {
                htmlArr.push(<div
                    key={'img_' + idx}
                    style={{
                        position: 'relative',
                        marginBottom: fileUrl.length - 1 == idx ? '0px' : '18px'
                    }}
                >
                    <div
                        style={{
                            width: '100%',
                            paddingRight: '95px',
                            overflow: 'hidden',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            color: '#F12C20'
                        }}
                        title={item.originalName}
                    >
                        <img src={
                            this.fileIcon('失败')
                        } alt=""
                             style={{
                                 width: '16px',
                                 height: '16px',
                                 marginRight: '8px',
                                 verticalAlign: '-2px',
                             }}
                        />
                        {item.originalName}
                    </div>
                    <div
                        style={{
                            position: 'absolute',
                            right: '0',
                            top: '0',
                        }}
                    >
                        <a
                            onClick={() => {
                                fileUrl.forEach((cItem, cIdx) => {
                                    if (cIdx == idx) {
                                        cItem.uploadRes = null;
                                        cItem.progressRate = 0;
                                    }
                                });
                                this.setState({fileUrl}, () => {
                                    this.getUploadFile(item.file, item.uid);
                                });
                            }}
                        >重新上传</a>
                        <span
                            style={{
                                width: '1px',
                                height: '14px',
                                background: '#DCDEE0',
                                display: 'inline-block',
                                margin: '0 4px',
                                position: 'relative',
                                top: '2px',
                            }}
                        />
                        <a
                            onClick={() => {
                                fileUrl.splice(idx, 1);
                                this.setState({fileUrl}, () => {
                                    this.callBack(fileUrl);
                                });
                            }}
                        >删除</a>
                    </div>
                </div>);

            }
        });
        return htmlArr.length > 0 ? htmlArr : null;
    }

    // 图标配置
    fileIcon(type) {
        switch (type + '') {
            case '失败':
                return war;

            case 'mp4':
                return mp4;

            default:
                return document;
        }
    }

}

export default UploadDocument
