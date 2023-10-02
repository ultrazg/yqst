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
import { Form, Upload, Modal, message} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import './UploadCss.css';

class UploadYb extends Component {

    constructor(props) {
        super(props);
        this.windowWidth = document.documentElement.clientWidth;
        this.windowHeight = document.documentElement.clientHeight;
        this.state = {
            // type: 1,// 组件类型 1=图片，2=文件
            isReadOnly: false, // 是否只读，没有上传功能，只能查看图片
            fileType: false,// 文件格式，在图片上传前校验 ['.xlsx', .....]
            uploadUrl: 'http://163.177.128.179:39241/upload',// 上传地址
            fileUrlList: [], // 图片路径
            previewVisible: false, // 是否展示大图弹窗
            previewImage: '', // 展示大图路径
            maxNum: 2, // 最多上传张数，当只上传一张时候，可以修改已上传的图片
            uploadText: '上传', // 组件提示文案
            sucText: '上传成功', // 组件上传成功的提示文案
            resText: '上传失败', // 组件上传失败的提示文案
        };
        this.callBackFiles =  (urls)=>{
            if(this.props.callBackFiles){
                this.props.callBackFiles(urls);
            }
        }; // 上传后地址回调
    }

    // 关闭查看大图展示框
    handleCancel(){
        this.setState({ previewVisible: false },()=>{this.setState({ previewImage: '' })})
    }

    // 上传图片
    multImportFinancePlans(params){
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
            if(this.state.maxNum <= 1){
                fileUrlList = newArr ;
            }else{
                fileUrlList = fileUrlList.concat(newArr)
            }
            message.success(this.state.sucText, 2);
            this.setState({
                fileUrlList
            },()=>{THIS.callBackFiles(fileUrlList)});
        });
        xhr.addEventListener('error', () => {
            message.error(this.state.resText, 2);
        });
    }

    // 查看大图
    enlargeImg(url){
        this.setState({previewVisible: true, previewImage: url})
    }

    // 删除已上传的图片
    delImgUrl(idx){
        let fileUrlList = this.state.fileUrlList, THIS = this;
        fileUrlList.splice(idx, 1);
        this.setState({fileUrlList},()=>{THIS.callBackFiles(fileUrlList)});
    }

    render() {
        let {fileUrlList, previewVisible, previewImage, maxNum, uploadText,} = Object.assign(this.state, this.props.data);
        const uploadButton = (
            <div>
                <PlusOutlined />
                <div className="ant-upload-text">{uploadText}</div>
            </div>
        );
        let uploadParameters = {
            listType: "picture-card",
            className: "avatar-uploader",
            name: "avatar",
            showUploadList: false,
            beforeUpload: (file)=>{
                const fileType = this.state.fileType;
                if(fileType){
                    let res = false;
                    fileType.forEach((types, idx)=>{
                        if(file.name.indexOf(types) >= 0){
                            res = true;
                            return false;
                        }
                    });
                    if(!res){
                        message.error(`请上传以下格式文件：${fileType.split('、')}`);
                        return false;
                    }
                }
            },
            customRequest: (e)=>{
                this.multImportFinancePlans({file: e.file})
            }
        };
        let imgListHtml = (list=[])=>{
            let html = [];
            let changeImg = (idx)=>{
                if(this.state.maxNum <= 1){
                    return (
                        <div className='uploadImgCssY'>
                            <Upload {...uploadParameters}>
                                <i title='修改图片' style={{color:'#fff',cursor:'pointer', fontSize:'16px',position:'absolute',left:'0px',top:'0px'}} className="anticon anticon-reload"></i>
                            </Upload>
                        </div>
                    )
                }else{
                    return (
                        <i title="删除图片" className="anticon anticon-delete" onClick={()=>this.delImgUrl(idx)}></i>
                    )
                }
            };
            list.forEach((url, idx)=>{
                html.push(
                    <div className="ant-upload-list ant-upload-list-picture-card">
                        <div className="ant-upload-list-item ant-upload-list-item-done">
                            <div className="ant-upload-list-item-info">
                                <span>
                                    <a className="ant-upload-list-item-thumbnail"
                                       href={url}
                                       target="_blank"
                                       rel="noopener noreferrer">
                                        <img src={url}/>
                                    </a>
                                    <a href={url} target="_blank" rel="noopener noreferrer" className="ant-upload-list-item-name">
                                        xxx.png
                                    </a>
                                </span>
                            </div>
                            <span className="ant-upload-list-item-actions">
                                <i title='查看大图' className="anticon anticon-eye-o"
                                    onClick={()=>this.enlargeImg(url)}
                                ></i>
                                { !this.state.isReadOnly && changeImg(idx)}
                            </span>
                        </div>
                    </div>
                )
            })
            return html;
        };

        return (
            <div>
                {
                    !this.state.isReadOnly && <Upload {...uploadParameters}>
                        {fileUrlList.length >= maxNum ? null : uploadButton}
                    </Upload>
                }
                {imgListHtml(fileUrlList)}

                <Modal visible={previewVisible} footer={null} onCancel={()=>this.handleCancel()}>
                    <img alt="example" style={{ width: '100%', height: this.windowHeight*0.7 }} src={previewImage} />
                </Modal>
            </div>
        );
    }

    // componentWillReceiveProps(nextProps){
    //     if(nextProps.data.fileUrlList){
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

const uploadYb = Form.create()(UploadYb);

export default uploadYb