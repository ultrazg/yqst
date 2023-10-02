/**
 * Created by yb on 2018/10/17
 */
/*
* 组件的使用方式：
* 1、引用组件的相对路径    import UploadFile from '../../../../utils/publicComponents/uploadFile/UploadFile'
* 2、使用样例  <UploadFile
                    key={'a'}
                    data={{
                        maxNum:1,
                        uploadText:'上传1号',
                        fileUrlList: ['http://pic1.win4000.com/pic/8/5c/e5a13e995c_250_350.jpg'],
                        isReadOnly: true
                    }}
                    callBackFiles={callBackFiles}
                />
* 3、同一页面多次使用上传组件时，使用key属性区分即可
* */

import React, {Component} from 'react';
import {Upload, Modal, message} from 'antd';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import './UploadCss.less';
import {RViewer, RViewerTrigger} from '../react-viewerjs/lib';
import FetchUtil from "../../base/network/FetchUtil";

class UploadFiles extends Component {

    constructor(props) {
        super(props);
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.state = {
            // type: 1,// 组件类型 1=图片，2=文件
            isReadOnly: false, // 是否只读，没有上传功能，只能查看图片
            isDowload: false, // 是否可以下载  只有只读图片的时候才有下载功能
            fileTypeList: false,// 文件格式，在图片上传前校验 ['.xlsx', .....]
            fileSize: false,// 限制上传图片大小
            previewVisible: false, // 是否展示大图弹窗
            uploadUrl: 'http://163.177.128.179:39241/upload',// 上传地址
            fileUrlList: [], // 图片路径
            previewImage: '', // 展示大图路径
            maxNum: 9, // 最多上传张数，当只上传一张时候，可以修改已上传的图片
            uploadText: '上传', // 组件提示文案
            sucText: '上传成功', // 组件上传成功的提示文案
            resText: '上传失败', // 组件上传失败的提示文案
            picIdx: 0, // 查看图片的位置
            style: {}
        };
        this.callBackFiles = (urls) => {
            if (this.props.callBackFiles) {
                this.props.callBackFiles(urls);
            }
        }; // 上传后地址回调
    }

    // 关闭查看大图展示框
    handleCancel() {
        this.setState({previewVisible: false}, () => {
            this.setState({previewImage: ''})
        })
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

    // 查看大图
    enlargeImg(url, idx) {
        const THIS = this;
        this.setState(
            {previewVisible: true, previewImage: url, picIdx: idx},
            () => {
                THIS.showPicPreview && THIS.showPicPreview.click();
            }
        )
    }

    // 删除已上传的图片
    delImgUrl(idx) {
        let fileUrlList = this.state.fileUrlList, THIS = this;
        fileUrlList.splice(idx, 1);
        this.setState({fileUrlList}, () => {
            THIS.callBackFiles(fileUrlList)
        });
    }

    render() {
        const THIS = this;
        let {fileUrlList, previewImage, maxNum, uploadText, style, fileTypeList, fileSize} = Object.assign(this.state, this.props.data);
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: '10px'}} className="ant-upload-text">{uploadText}</div>
            </div>
        );
        let uploadParameters = {
            accept: 'image/*',
            listType: "picture-card",
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
                    const isLt2M = file.size / 1024 / 1024 < parseInt(fileSize,0);
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
                        let {maxNum, fileUrlList} = this.state;
                        // let Obj = {};
                        // Obj['uid'] = "pic-" + e.file.uid;
                        // Obj['name'] = data.data.originalName;
                        // Obj['status'] = 'done';
                        // Obj['url'] = data.data.url;
                        // eslint-disable-next-line
                        if (1 == maxNum) { // 只能上传一张的时候
                            fileUrlList = [];
                            fileUrlList.push(data.data.url);

                        } else {
                            fileUrlList.push(data.data.url);

                        }
                        // fileUrlList.push(data.data.url);
                        // console.log('上传图片: ', fileUrlList);

                        this.setState({
                            fileUrlList,
                        }, () => {
                            this.callBackFiles(fileUrlList)
                        });
                    });
                }, () => {
                });
            }
        };
        let imgListHtml = (list = []) => {
            let html = [];
            let changeImg = (idx) => {
                return <DeleteOutlined style={{color: '#fff'}} title="删除图片" onClick={() => {
                    Modal.confirm({
                        title: '确认删除该图片?',
                        content: '',
                        okText: '是',
                        okType: 'danger',
                        cancelText: '否',
                        width: 220,
                        onOk() {
                            THIS.delImgUrl(idx)
                        },
                        onCancel() {
                            // console.log('Cancel');
                        },
                    });
                }}/>;
                // if (this.state.maxNum <= 1) {
                //     return (
                //         <div className={'uploadImgCssY'}>
                //             <Upload {...uploadParameters}>
                //                 <Icon type="redo" title='修改图片' style={{color: '#fff'}}/>
                //             </Upload>
                //         </div>
                //     )
                // } else {
                //     return (
                //         <Icon title="删除图片" type="delete" onClick={() => this.delImgUrl(idx)}/>
                //         // <i title="删除图片" className="anticon anticon-delete" onClick={()=>this.delImgUrl(idx)}>
                //         //     <svg viewBox="64 64 896 896" className="" data-icon="delete" width="1em" height="1em"
                //         //          fill="currentColor" aria-hidden="true">
                //         //         <path d="M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"></path>
                //         //     </svg>
                //         // </i>
                //     )
                // }
            };
            const dowloadHtml = (url, idx) => {
                return (
                    <i title="下载" className="anticon anticon-download" onClick={() => {
                        window.download(url)
                    }}>
                        <svg viewBox="64 64 896 896" className="" data-icon="download" width="1em" height="1em"
                             fill="currentColor" aria-hidden="true">
                            <path
                                d="M505.7 661a8 8 0 0 0 12.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z"></path>
                        </svg>
                    </i>
                )
            };

            list.forEach((url, idx) => {
                html.push(
                    <div key={'imgView_' + idx} className="ant-upload-list ant-upload-list-picture-card"
                        style={{
                            width: '108px',
                            height: '104px',
                            display: 'inline-block',
                            marginRight: '16px',
                            marginBottom: '16px',
                        }}
                    >
                        <div className="ant-upload-list-item ant-upload-list-item-done">
                            <div style={{width: '100%', height: '86px'}} className="ant-upload-list-item-info">
                                <span style={{width: '100%', height: '100%'}}>
                                    <a className="ant-upload-list-item-thumbnail"
                                       href={url}
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <img src={url} alt=''/>
                                    </a>
                                    <a href={url} target="_blank" rel="noopener noreferrer"
                                       className="ant-upload-list-item-name">
                                        xxx.png
                                    </a>
                                </span>
                            </div>
                            <span className="ant-upload-list-item-actions">
                                <span title='预览' role="img" aria-label="eye" className="anticon anticon-eye" onClick={() => this.enlargeImg(list, idx)}>
                                    <svg viewBox="64 64 896 896" focusable="false" className="" data-icon="eye" width="1em" height="1em"
                                         fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z">
                                        </path>
                                    </svg>
                                </span>
                                {/*<i title='预览' className="anticon anticon-eye-o"
                                   onClick={() => this.enlargeImg(list, idx)}
                                >
                                    <svg viewBox="64 64 896 896" className="" data-icon="eye" width="1em" height="1em"
                                         fill="currentColor" aria-hidden="true">
                                        <path
                                            d="M942.2 486.2C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 0 0 0 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM512 766c-161.3 0-279.4-81.8-362.7-254C232.6 339.8 350.7 258 512 258c161.3 0 279.4 81.8 362.7 254C791.5 684.2 673.4 766 512 766zm-4-430c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm0 288c-61.9 0-112-50.1-112-112s50.1-112 112-112 112 50.1 112 112-50.1 112-112 112z"></path>
                                    </svg>
                                </i>*/}
                                {!this.state.isReadOnly && changeImg(idx)}
                                {this.state.isReadOnly && this.state.isDowload && dowloadHtml(url, idx)}
                            </span>
                        </div>
                    </div>
                )
            })
            return html;
        };

        return (
            // <div className={'upCss'} style={{...style}}>
            //     {imgListHtml(fileUrlList)}
            //     {
            //         !this.state.isReadOnly && <Upload {...uploadParameters}>
            //             {fileUrlList.length >= maxNum ? null : uploadButton}
            //         </Upload>
            //     }
            //
            //     {/*图片放大组件*/}
            //     <RViewer options={{
            //         toolbar: {//Since there is only one picture, let's hide "prev" and "next"
            //             prev: true,
            //             next: true
            //         }
            //     }} imageUrls={previewImage}>
            //         <RViewerTrigger index={this.state.picIdx}>
            //             <div ref={(c)=>{this.showPicPreview=c}}></div>
            //         </RViewerTrigger>
            //     </RViewer>
            //     {/*<Modal visible={previewVisible} footer={null} onCancel={()=>this.handleCancel()}>
            //         <img alt="example" style={{ width: '100%', height: this.windowHeight*0.7 }} src={previewImage} />
            //     </Modal>*/}
            // </div>


            <div style={{
                // width: '108px',
                // height: '108px',
                ...style
            }}>
                {imgListHtml(fileUrlList)}
                {
                    !this.state.isReadOnly && <Upload {...uploadParameters}>
                        {fileUrlList.length >= maxNum ? null : uploadButton}
                    </Upload>
                }

                {/*图片放大组件*/}
                <RViewer options={{
                    toolbar: {
                        prev: true,
                        next: true
                    }
                }} imageUrls={previewImage}>
                    <RViewerTrigger index={this.state.picIdx}>
                        <div ref={(c)=>{this.showPicPreview=c}}></div>
                    </RViewerTrigger>
                </RViewer>
            </div>


        );
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.data.fileUrlList) {
    //         this.setState(nextProps.data)
    //     }
    // }

    static getDerivedStateFromProps(nextProps) {
        if (nextProps.data.fileUrlList) {
            return nextProps.data
        }
        return null
    }
}

const UploadFile = UploadFiles;

export default UploadFile
