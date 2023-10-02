/**
 * Created by yb on 2019/11/11.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Tabs, message} from 'antd';
import {DeleteOutlined, EditOutlined, CheckOutlined, RollbackOutlined } from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from './SwitchName';
import VersionsMod from './detailModel/VersionsMod';
import VisibilityMod from './detailModel/VisibilityMod';
import RightMod from './detailModel/RightMod';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../baseview/uploadFile/UploadFile'
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const { TabPane } = Tabs;
const { confirm } = Modal;


class CloudServeDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.id = '';
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: '云服务中心'},
                        {name: "云服务及规则管理"},
                        {name: "云服务列表", link: '/Pages/CloudServeList'},
                        {name: "云服务详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={`/Pages/CloudServeEdit?id=${this.id}`}>
                                <Button type="primary" icon={<EditOutlined />}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined />} style={{marginLeft: 15}}
                                    onClick={() => {this.onDel()}}
                            >删除</Button>
                            <Link to={'/Pages/CloudServeList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs type="card">
                        <TabPane tab="基本信息" key="1">
                            {this.makeBaseView()}
                        </TabPane>
                        <TabPane tab="版本情况" key="2">
                            {/*{this.makeBBView()}*/}
                            <VersionsMod id={this.id}/>
                        </TabPane>
                        <TabPane tab="应用桌面可见性" key="3">
                            {/*{this.makeZMView()}*/}
                            <VisibilityMod formCurrent={this.formRef.current} data={this.state.data}/>
                        </TabPane>
                        <TabPane tab="应用市场可见性" key="4">
                            {this.makeSCView()}
                        </TabPane>
                        <TabPane tab="参数规格设置" key="5">
                            {this.makeGGView()}
                        </TabPane>
                        <TabPane tab="激活设置" key="6">
                            {this.makeJHView()}
                        </TabPane>
                        <TabPane tab="权限配置" key="7">
                            {/*{this.makeQXView()}*/}
                            <RightMod id={this.id}/>
                        </TabPane>
                        <TabPane tab="开通操作设置" key="8">
                            {this.makeCZView()}
                        </TabPane>
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttSGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetDataOne = [
            {key: 'id', type: 'Texts', label: '云服务ID', span: 12, value: data.id},
            {key: 'softSn', type: 'Texts', label: '云服务编码', span: 12, value: data.softSn},
            {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
            {key: 'devId', type: 'Texts', label: '开发者ID', span: 12, value: data.devId},
            {key: 'devName', type: 'Texts', label: '开发者名称', span: 12, value: data.devName},
            {key: 'name', type: 'Texts', label: '云服务名称', span: 12, value: data.name},
            {key: 'catName', type: 'Texts', label: '云服务分类', span: 12, value: data.catName},
            {key: 'description', type: 'Texts', label: '云服务描述', span: 12, value: data.description},
            {key: 'logo', type: 'Texts', label: '云服务logo', span: 12,
                value: data.logo ? <UploadFile
                    data={{
                        maxNum:1,
                        uploadText:'',
                        fileUrlList: data.logo.split(','),
                        isReadOnly: true
                    }}
                    // callBackFiles={callBackFiles}
                /> : ''},
        ];
        return <Card
            type="inner"
            title="基本信息"
        >
            <AssemblySet key={'noSetDataOne'} data={noSetDataOne} form={this.formRef.current}/>
        </Card>
    }

    makeBBView(){
        const columns = [
            {
                title: '版本',
                key: '',
                dataIndex: '',
            },
            {
                title: '更新说明',
                key: '',
                dataIndex: '',
            },
            {
                title: '更新时间',
                key: '',
                dataIndex: '',
            },
        ];
        return <Card
            type="inner"
            title="版本情况"
        >
            <SWTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </Card>
    }

    makeZMView(){
        const {data} = this.state;
        const zmData = [
            {key: 'isHide', type: 'Texts', label: '可见性设置', span: 12,
                value: SwitchName.isHide(data.isHide)},
            {key: 'listCount', type: 'Texts', label: '已选择企业数', span: 12,
                value: <div>
                    {NumberFormat.thousandBit(data.listCount || 0, 0)}
                    <Button style={{marginLeft: 15}} type="primary">查看</Button>
                </div>},
        ];
        return <Card
            type="inner"
            title="应用桌面可见性"
        >
            <AssemblySet key={'makeZMView'} data={zmData} form={this.formRef.current}/>
            <a style={{marginTop: 15}}>注：所有注册企业均可见该云服务</a>
        </Card>
    }

    makeSCView(){
        const {data} = this.state;
        const zmData = [
            {key: 'markDisplay', type: 'Texts', label: '可见性类型', span: 12,
                value: SwitchName.markDisplay(data.markDisplay)},
            '2' === '' + data.markDisplay ? {key: 'keyWord', type: 'Texts', label: '搜索关键词(精确搜索)', span: 12, value: data.keyWord} : {},
        ];
        return <div>
            <Card
                type="inner"
                title="应用市场可见性"
            >
                <AssemblySet key={'makeSCView'} data={zmData} form={this.formRef.current}/>
                <a>{SwitchName.markDisplayTxt(data.markDisplay)}</a>
            </Card>
        </div>
    }

    makeGGView(){
        const {data} = this.state;
        const columns = [
            {
                title: '参数规格ID',
                key: 'parId',
                dataIndex: 'parId',
            },
            {
                title: '规格名称',
                key: 'parName',
                dataIndex: 'parName',
            },
            {
                title: '规格类型',
                key: 'parTypeName',
                dataIndex: 'parTypeName',
            },
            {
                title: '单位',
                key: '',
                dataIndex: '',
                render: (res) => {
                    let strArr = [];
                    res.listParValueDTOS && res.listParValueDTOS.forEach(item => {
                        strArr.push(item.typeValueName);
                    });
                    return strArr.join('；');
                }
            },
            {
                title: '值',
                key: '',
                dataIndex: '',
                render: (res) => {
                    let strArr = [];
                    res.listParValueDTOS && res.listParValueDTOS.forEach(item => {
                        strArr.push(item.parValue);
                    });
                    return strArr.join('；');
                }
            },
        ];
        return <Card
            type="inner"
            title="参数规格设置"
        >
            <SWTable
                columns={columns}
                dataSource={data.listParDTOS || []}
                pagination={false}
            />
        </Card>
    }

    makeJHView(){
        const {data} = this.state;
        const columns = [
            {
                title: '选择',
                key: '',
                dataIndex: '',
                render: (res) => {
                    return '1' === '' + res.isSelect ? <CheckOutlined style={{color: '#0090bb'}} /> : '';
                }
            },
            {
                title: '参数ID',
                key: 'parId',
                dataIndex: 'parId',
            },
            {
                title: '参数编码',
                key: 'parSn',
                dataIndex: 'parSn',
            },
            {
                title: '参数',
                key: '',
                dataIndex: '',
                render: (res) => {
                    let strArr = [];
                    res.parValueList && res.parValueList.forEach(item => {
                        strArr.push(item.parValue + item.typeValue);
                    });
                    return strArr.join(',');
                }
            }
        ];
        const dataJH = [
            {key: 'maxNum', type: 'Texts', label: '最大可激活数', span: 12,
                value: NumberFormat.thousandBit(data.maxNum || 0, 0)},
            {key: 'freeNum', type: 'Texts', label: '免费可激活数', span: 12,
                value: NumberFormat.thousandBit(data.freeNum || 0, 0)},
            {key: 'csTexts', type: 'Texts', label: '免费激活参数', span: 24,
                formItemLayout: {
                    labelCol: {
                        xs: {span: 24},
                        sm: {span: 3},
                    },
                    wrapperCol: {
                        xs: {span: 24},
                        sm: {span: 21},
                    },
                },
                value: <SWTable
                    columns={columns}
                    dataSource={data.softFreeParDTOS || []}
                    pagination={false}
                />
            },
        ];
        return <Card
            type="inner"
            title="激活设置"
        >
            <AssemblySet key={'makeJHView'} data={dataJH} form={this.formRef.current}/>
        </Card>
    }

    makeQXView(){
        const columns = [
            {
                title: '权限ID',
                key: '',
                dataIndex: '',
            },
            {
                title: '权限编码',
                key: '',
                dataIndex: '',
            },
            {
                title: '功能模块',
                key: '',
                dataIndex: '',
            },
            {
                title: '功能名称',
                key: '',
                dataIndex: '',
            },
            {
                title: '功能描述',
                key: '',
                dataIndex: '',
            },
        ];
        return <Card
            type="inner"
            title="权限配置"
        >
            <SWTable
                columns={columns}
                dataSource={[]}
                pagination={false}
            />
        </Card>
    }

    makeCZView(){
        const {data} = this.state;
        const columns = [
            {
                title: '开通类型',
                key: 'types',
                dataIndex: 'types',
            },
            {
                title: '操作按钮名称',
                key: 'buttonName',
                dataIndex: 'buttonName',
            },
            {
                title: '是否显示按钮',
                key: 'isShow',
                dataIndex: 'isShow',
                render: (res) => {
                    return SwitchName.isShow(res);
                }
            },
            {
                title: '是否显示操作提示',
                key: 'isShowPop',
                dataIndex: 'isShowPop',
                render: (res) => {
                    return SwitchName.isShowPop(res);
                }
            },
            {
                title: '备注',
                key: 'memo',
                dataIndex: 'memo',
            },
        ];
        const dataSource = [];
        if(data.freeButtonParJson){
            data.freeButtonParJson.types = '免费';
            dataSource.push(data.freeButtonParJson);
        }

        if(data.chargeButtonParJson){
            data.chargeButtonParJson.types = '收费';
            dataSource.push(data.chargeButtonParJson);
        }

        return <Card
            type="inner"
            title="开通操作设置"
        >
            <SWTable
                columns={columns}
                dataSource={dataSource}
                pagination={false}
            />
        </Card>
    }

    onDel(){
        return confirm({
            title: '确认要删除该云服务吗?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.CServeSDelete({id: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/CloudServeList');

                }, (err) => {});
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }
}

export default CloudServeDetail
