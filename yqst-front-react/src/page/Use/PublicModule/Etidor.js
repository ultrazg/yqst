import 'braft-editor/dist/index.css'
import 'braft-extensions/dist/color-picker.css'
import 'braft-extensions/dist/table.css'
import React from 'react'
import {Card, Modal} from 'antd'
import BraftEditor from 'braft-editor'
import ColorPicker from 'braft-extensions/dist/color-picker'
import Table from 'braft-extensions/dist/table'
import ApiConst from '../../../base/urls/ApiConst'
import ApiInterface from '../../../base/urls/ApiInterface'


const options = {
    includeEditors: ['editor-id-1'],
    theme: 'light',
}

const tableOptions = {
    defaultColumns: 3,
    defaultRows: 3,
    withDropdown: true,
    columnResizable: true,
    exportAttrString: 'border="1" style="border-collapse: collapse"',
}

BraftEditor.use(ColorPicker(options))
// BraftEditor.use(Table(tableOptions))
export default class BasicDemo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editorState: BraftEditor.createEditorState(props.value || ''), // 设置编辑器初始内容
            outputHTML: props.value || '',
        }
    }

    handleChange = (editorState) => {
        console.log(editorState.toHTML())
        this.setState({
            editorState: editorState,
            outputHTML: editorState.toHTML()
        })
    }

    getValue = () => {
        return this.state.outputHTML
    }

    myUploadFn = (param) => {
        const serverURL = ApiConst.Versions().sunaw + ApiInterface.uploadFile;//upload 是接口地址
        const xhr = new XMLHttpRequest();
        const fd = new FormData();

        const successFn = (response) => {
            // 假设服务端直接返回文件上传后的地址
            // 上传成功后调用param.success并传入上传后的文件地址
            const upLoadObject = JSON.parse(response && response.currentTarget && response.currentTarget.response);
            param.success({
                url: upLoadObject.data.url,
                meta: {
                    id: upLoadObject && upLoadObject.data.key,
                    title: upLoadObject && upLoadObject.data.originalName,
                    alt: upLoadObject && upLoadObject.data.originalName,
                    loop: false, // 指定音视频是否循环播放
                    autoPlay: false, // 指定音视频是否自动播放
                    controls: false, // 指定音视频是否显示控制栏
                    poster: '', // 指定视频播放器的封面
                }
            })
        };

        const progressFn = (event) => {
            // 上传进度发生变化时调用param.progress
            param.progress(event.loaded / event.total * 100)
        };

        const errorFn = (response) => {
            // 上传发生错误时调用param.error
            param.error({
                msg: 'unable to upload.'
            })
        };

        xhr.upload.addEventListener("progress", progressFn, false);
        xhr.addEventListener("load", successFn, false);
        xhr.addEventListener("error", errorFn, false);
        xhr.addEventListener("abort", errorFn, false);

        fd.append('file', param.file);
        xhr.open('POST', serverURL, true);
        xhr.send(fd)

    };

    render() {
        const {editorState} = this.state
        const extendControls = [
            {
                key: 'custom-button',
                type: 'button',
                text: '使用帮助',
                onClick: () => this.setState({visible: true})
            }
        ]
        const media = {
            allowPasteImage: true, // 是否允许直接粘贴剪贴板图片（例如QQ截图等）到编辑器
            image: true, // 开启图片插入功能
            video: true, // 开启视频插入功能
            audio: true, // 开启音频插入功能
            validateFn: null, // 指定本地校验函数，说明见下文
            uploadFn: this.myUploadFn, // 指定上传函数，说明见下文
            removeConfirmFn: null, // 指定删除前的确认函数，说明见下文
            onRemove: null, // 指定媒体库文件被删除时的回调，参数为被删除的媒体文件列表(数组)
            onChange: null, // 指定媒体库文件列表发生变化时的回调，参数为媒体库文件列表(数组)
            onInsert: null, // 指定从媒体库插入文件到编辑器时的回调，参数为被插入的媒体文件列表(数组)
        }
        return (
            <div className="editor-wrapper">
                <Modal
                    title={'富文本使用帮助'}
                    visible={this.state.visible}
                    onCancel={() => this.setState({visible: false})}
                    footer={null}
                >
                    <div>
                        <h3>1.引用功能, 键入 shift + enter 可以跳出引用区域</h3>
                        <h3>2.代码功能, 必须要换行再键入 shift + enter 来跳出区域,不然会把最后一行文字给换行下来</h3>
                        <h3>3.调整图片大小,鼠标在图片上会显示设置选项,有个设置大小选项,或者图片底部两个角也可以调整图片大小</h3>
                        {/*<h3>4.表格暂不支持插入多媒体文件</h3>*/}
                    </div>
                </Modal>
                <BraftEditor
                    id={'editor-id-1'}
                    value={editorState}
                    extendControls={extendControls}
                    onChange={this.handleChange}
                    media={media}
                />
            </div>
        )
    }
}
