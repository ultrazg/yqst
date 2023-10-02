/**
 * Created by yb
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Table, Tabs, Timeline, Upload, message, Input} from 'antd';
import {RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../../baseview/viewContent/ViewContent";
import UploadFiles from "../../../../baseview/uploadFile/UploadFile";
import StatusName from "./StatusName";

const { TabPane } = Tabs;
const { confirm } = Modal;
const { TextArea } = Input;

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}


class ESApplyForDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            visible: false,
            rejectReason: '',

            previewVisible: false,
            previewImage: ''
        };
        this.sn = '';
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split("=")[1];
        if (this.sn) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <ViewContent
                crumb={[
                    {name: '电子签章服务中心'},
                    {name: '电子签章申请'},
                    {name: "申请列表", link: '/Pages/ESApplyForList'},
                    {name: "申请详情"}
                ]}
                topBtn = {
                    <div>
                        {
                            '1' === '' + this.state.data.status ? [
                                <Button key={'primary'} type="primary" style={{marginRight: 15}}
                                    onClick={() => {this.agreeApply()}}
                                >同意申请</Button>,
                                <Button key={'danger'} type="danger" style={{marginRight: 15}}
                                    onClick={() => {
                                        this.setState({visible: true});
                                    }}
                                >驳回</Button>
                            ] : null
                        }
                        <Link to={'/Pages/ESApplyForList'}>
                            <Button icon={<RollbackOutlined />}>返回</Button>
                        </Link>
                    </div>
                }
            >
                {this.makeBaseView()}
                {this.rejectFun()}
            </ViewContent>
        );
    }

    getInfo() {
        Model.ESPlatformApplyGet({platformApplySn: this.sn}, (res) => {
            this.setState({
                data: res.data,
                visible: false,
                rejectReason: '',
            });
        }, (err) => {
        });
    }

    handlePreview = async file => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }

        this.setState({
            previewImage: file.url || file.preview,
            previewVisible: true,
        });
    };

    makeBaseView() {
        let { data, previewVisible, previewImage } = this.state;
        let imgMaxWidth = parseInt(document.body.clientWidth * 0.9);

        let allData = [
            {
                title: '申请信息',
                key: 'SQKey',
                data: [
                    {key: 'platformApplySn', type: 'Texts', label: '申请ID', span: 12, value: data.platformApplySn || ''},
                    {key: 'status', type: 'Texts', label: '状态', span: 12,
                        value: <div style={{color: StatusName(data.status, true)}}>
                            {StatusName(data.status)}
                        </div>
                    },
                    {key: 'companyName', type: 'Texts', label: '公司注册名称', span: 12, value: data.companyName || ''},
                    {key: 'legalRepresentative', type: 'Texts', label: '法人名称', span: 12, value: data.legalRepresentative || ''},
                    {key: 'businessLicenseNumber', type: 'Texts', label: '营业执照号码', span: 12, value: data.businessLicenseNumber || ''},
                    {key: 'contactName', type: 'Texts', label: '申请人', span: 12, value: data.contactName || ''},
                    {key: 'contactPhone', type: 'Texts', label: '联系电话', span: 12, value: data.contactPhone || ''},
                    {key: 'createTime', type: 'Texts', label: '申请时间', span: 12, value: data.createTime || ''},
                    {key: 'applyReason', type: 'Texts', label: '申请理由', span: 12, value: data.applyReason || ''},
                    {key: 'rejectReason', type: 'Texts', label: '驳回原因', span: 12, value: data.rejectReason || ''},
                    {key: 'businessLicenseUrl', type: 'Texts', label: '营业执照', span: 12,
                        value: (
                            <div className="clearfix">
                                <Upload
                                    action=""
                                    listType="picture-card"
                                    fileList={[
                                        {
                                            uid: '0',
                                            name: 'image.png',
                                            status: 'done',
                                            url: data.businessLicenseUrl,
                                        }
                                    ]}
                                    showUploadList={{showRemoveIcon: false}}
                                    onPreview={this.handlePreview}
                                    onChange={this.handleChange}
                                >
                                </Upload>
                                <Modal
                                    visible={previewVisible}
                                    footer={null}
                                    onCancel={()=>{this.setState({previewVisible: false})}}
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}
                                >
                                    <img alt="example" style={{maxWidth: imgMaxWidth}} src={previewImage} />
                                </Modal>
                            </div>
                        )},
                ],
                style: {},
            },
        ];

        return <div>
            {
                allData.map((item, idx) => {
                    return <Card
                        key={'car_' + idx}
                        type="inner"
                        title={item.title || '信息'}
                        style={item.style ? item.style : {}}
                        bodyStyle={item.bodyStyle ? item.bodyStyle : {}}
                    >
                        <AssemblySet key={item.key} data={item.data}/>
                    </Card>
                })
            }
        </div>
    }

    agreeApply(){
        return confirm({
            title: '确定同意该申请?',
            content: '',
            okText: '确定',
            cancelText: '取消',
            width: 210,
            onOk: ()=> {
                Model.ESPlatformApplyAgree({platformApplySn: this.sn}, (res) => {
                    message.success('操作成功！', 1);
                    this.getInfo();
                });
            },
            onCancel: ()=> {
            },
        });
    }

    rejectFun(){
        return <Modal
            width={404}
            title="驳回原因"
            visible={this.state.visible}
            onOk={() => {
                if(!this.state.rejectReason)
                    return message.error('请填写原因！');
                Model.ESPlatformApplyReject({
                    platformApplySn: this.sn,
                    rejectReason: this.state.rejectReason,
                }, (res) => {
                    message.success('操作成功！', 1);
                    this.getInfo();
                });
            }}
            onCancel={() => {
                this.setState({visible: false, rejectReason: ''});
            }}
        >
            <TextArea
                rows={4}
                value={this.state.rejectReason}
                placeholder={'请输入'}
                style={{width: '356px', resize: 'none', height: '72px', lineHeight: '32px', fontSize: '14px', verticalAlign: 'top',}}
                onChange={(e) => {
                    this.setState({rejectReason: e.target.value})
                }}
            />
        </Modal>
    }
}

export default ESApplyForDetail
