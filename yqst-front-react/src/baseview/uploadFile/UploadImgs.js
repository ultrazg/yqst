/**
 * Created by yb on 2019/12/26
 *
 */
/*
*  组件的使用例子
    <UploadImgs
        data={{
            fileUrl: [
                'https://sunawtest.oss-cn-shenzhen.aliyuncs.com/jiuerliu/test/58ce71d7e0b2cd9b8cb9eb262f31e601.png',
                'https://sunawtest.oss-cn-shenzhen.aliyuncs.com/jiuerliu/test/b001388646d49021e62ce7b8c7784333.jpg',
            ]
        }}
        callBack={(url) => {
            console.log('返回值： ', url);
        }}
    />
* */

import React, {Component} from 'react';
import { Upload, Modal, message, Button, Progress } from 'antd';
import './UploadCss.less';
import FetchUtil from "../../base/network/FetchUtil";
import {upload, war, uploadImg, close} from "../../resource/index";

const urlLayout = (list = []) => {
    list = list.map(item => {
        if (item && typeof (item) == 'string') {
            return {
                file: '',
                uid: '',
                progressRate: 0, // 上传进度
                url: item,
                uploadRes: null, // 上传结果 '成功' or '失败'
                hasHover: false,
            }

        } else {
            return item;

        }
    });
    return list;
};

class UploadImgs extends Component {

    constructor(props) {
        super(props);
        this.state = {
            fileTypeList: false,// 文件格式，在图片上传前校验 ['.xlsx', .....]
            uploadText: '上传', // 组件提示文案
            fileSize: false,// 限制上传图片大小
            maxNum: 9, // 最多上传张数，当只上传一张时候，可以修改已上传的图片
            ...(props.data ? props.data : {}),
            fileUrl: urlLayout(props.data && props.data.fileUrl ? props.data.fileUrl : []),//  图片路径
        };
        this.callBack = (urls) => {
            // 整理返回的结果；
            let resArr = [];
            urls.forEach(item => {
                if (item.url)
                    resArr.push(item.url);
            });
            this.props.callBack && this.props.callBack(resArr);
        }; // 上传后地址回调
    }

    componentDidMount() {
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data && nextProps.data.fileUrl) {
            nextProps.data.fileUrl = nextProps.data.fileUrl.map(item => {
                if(item && typeof(item) == 'string'){
                    return {
                        file: '',
                        uid: '',
                        progressRate: 0, // 上传进度
                        url: item,
                        uploadRes: null, // 上传结果 '成功' or '失败'
                        hasHover: false,
                    }

                }else{
                    return item;

                }
            });
            if(nextProps.data.fileUrl.length > 0){
                return nextProps.data;
            }
            return null;

        }
        return null;
    }

    render() {
        let {uploadText, fileTypeList, fileSize, maxNum, fileUrl} = this.state;
        let uploadParameters = {
            accept: 'image/*',
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
                if (fileUrl.length > maxNum)
                    return false;
                if ('1' === '' + maxNum)
                    fileUrl = [];
                fileUrl.push({
                    file: e.file,
                    uid: e.file.uid,
                    progressRate: 0, // 上传进度
                    url: '',
                    uploadRes: null, // 上传结果 '成功' or '失败'
                    hasHover: false,
                });
                this.setState({fileUrl}, () => {
                    this.getUploadFile(e.file, e.file.uid);
                });
            }
        };

        return (
            <div
                className={'uplImgCss'}
                style={
                    this.props.style ? {
                        overflow: 'hidden',
                        paddingTop: '10px',
                        ...this.props.style,

                    } : {
                        overflow: 'hidden',
                        paddingTop: '10px',

                    }
                }
            >
                {
                    fileUrl.length < maxNum && <div
                        style={{
                            display: 'inline-block',
                            marginRight: '16px',
                            verticalAlign: 'bottom',
                            float: 'left'
                        }}
                    >
                        <Upload {...uploadParameters}>
                            <img src={upload} alt=""
                                 style={{width: '72px', height: '72px', cursor: 'pointer'}}
                            />
                        </Upload>
                    </div>
                }
                {this.makeImgView(fileUrl)}
            </div>
        );
    }

    getUploadFile(file, uid) {
        let {fileUrl} = this.state;

        FetchUtil.uploadFile({
            file
        }, (data) => {
            setTimeout(() => {
                fileUrl = fileUrl.map(item => {
                    if ('' + item.uid === '' + uid) {
                        item.url = data.data.url;
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

    makeImgView(fileUrl) {
        let htmlArr = [];
        fileUrl.forEach((item, idx) => {
            if (item.url) {
                htmlArr.push(<div
                    key={'img_' + idx}
                    style={{
                        display: 'inline-block',
                        // background: '#ccc',
                        width: '72px',
                        height: '72px',
                        textAlign: 'center',
                        float: 'left',
                        marginRight: '16px',
                        marginBottom: '16px',
                        borderRadius: '4px',
                        position: 'relative',
                    }}
                >
                    <img src={close} alt=""
                         style={{
                             width: '18px',
                             height: '18px',
                             position: 'absolute',
                             top: '-8px',
                             right: '-8px',
                             cursor: 'pointer',
                         }}
                         onClick={() => {
                             fileUrl.splice(idx, 1);
                             this.setState({fileUrl}, () => {
                                 this.callBack(fileUrl);
                             });
                         }}
                    />
                    <img src={item.url} alt=""
                         style={{
                             display: 'inline-block',
                             width: '72px',
                             height: '72px',
                             borderRadius: '4px',
                         }}
                    />
                </div>);

            } else if (!item.uploadRes) {
                htmlArr.push(<div
                    className={'Progress'}
                    key={'img_' + idx}
                    style={{
                        display: 'inline-block',
                        background: 'rgba(43, 52, 65, 0.15)',
                        width: '72px',
                        height: '72px',
                        lineHeight: '72px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        marginRight: '16px',
                        float: 'left'
                    }}
                >
                    <Progress percent={item.progressRate} status="active" showInfo={false}
                              size="small"
                              style={{
                                  width: '48px',
                                  height: '4px'
                              }}
                    />
                </div>);

            } else if ('失败' === '' + item.uploadRes) {
                htmlArr.push(<div
                    className={'Progress'}
                    key={'img_' + idx}
                    style={{
                        display: 'inline-block',
                        background: 'rgba(43, 52, 65, 0.15)',
                        width: '72px',
                        height: '72px',
                        textAlign: 'center',
                        borderRadius: '4px',
                        marginRight: '16px',
                        position: 'relative',
                        float: 'left'
                    }}
                    onMouseEnter={() => {
                        fileUrl.forEach((cItem, cIdx) => {
                            cItem.hasHover = false;
                            if (cIdx == idx) {
                                cItem.hasHover = true;
                            }
                        });
                        this.setState({fileUrl});
                    }}
                    onMouseLeave={() => {
                        fileUrl.forEach((cItem, cIdx) => {
                            cItem.hasHover = false;
                        });
                        this.setState({fileUrl});
                    }}
                >
                    {
                        item.hasHover && <img src={close} alt=""
                                              style={{
                                                  width: '18px',
                                                  height: '18px',
                                                  position: 'absolute',
                                                  top: '-8px',
                                                  right: '-8px',
                                                  cursor: 'pointer',
                                              }}
                                              onClick={() => {
                                                  fileUrl.splice(idx, 1);
                                                  this.setState({fileUrl}, () => {
                                                      this.callBack(fileUrl);
                                                  });
                                              }}
                        />
                    }
                    <img src={item.hasHover ? uploadImg : war} alt=""
                         style={{width: '20px', marginTop: '15px'}}
                    />
                    <div
                        style={{
                            color: item.hasHover ? '#4481EB' : '#F12C20',
                            marginTop: '10px',
                            fontSize: '12px',
                            cursor: item.hasHover ? 'pointer' : '',
                        }}
                        onClick={() => {
                            if (!item.hasHover) return false;
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
                    >{item.hasHover ? '重新上传' : '上传失败'}</div>
                </div>);

            }
        });
        return htmlArr.length > 0 ? htmlArr : null;
    }
}

export default UploadImgs
