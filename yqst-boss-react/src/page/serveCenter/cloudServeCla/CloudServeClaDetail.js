/**
 * Created by yb on 2019/11/11.
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, message} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SoftModal from './submodule/SoftModal';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const {confirm} = Modal;


class CloudServeClaDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            softVisible: false
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
                        {name: '基本配置'},
                        {name: "云服务分类列表", link: '/Pages/CloudServeClaList'},
                        {name: "云服务分类详情"},
                    ]}
                    topBtn={
                        <div>
                            <Link to={`/Pages/CloudServeClaEdit?id=${this.id}`}>
                                <Button type="primary" icon={<EditOutlined/>}>编辑</Button>
                            </Link>
                            <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}} onClick={() => {
                                this.onClickDel();
                            }}>删除</Button>
                            <Link to={'/Pages/CloudServeClaList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.state.softVisible ? <SoftModal
                        listPar={{
                            catId: this.id
                        }}
                        visible={true}
                        callBack={() => {
                            this.setState({softVisible: false})
                        }}
                    /> : null}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.CServeSCGet({id: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        const carData = [
            {
                key: 'jbKey',
                title: '基本信息',
                data: [
                    {key: 'id', type: 'Texts', label: '分类ID', span: 12, value: data.id},
                    {
                        key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
                    },
                    {
                        key: 'softNum', type: 'Texts', label: '云服务数量', span: 12,
                        value: <div>{NumberFormat.thousandBit(data.softNum || 0, 0)}
                            {
                                data.softNum && (parseInt(data.softNum) > 0) ?
                                    <Button type="primary" style={{marginLeft: 15}}
                                            onClick={() => {
                                                this.setState({softVisible: true});
                                            }}
                                    >查看</Button> : ''
                            }
                        </div>
                    },
                    {key: 'catSn', type: 'Texts', label: '分类编码', span: 12, value: data.catSn},
                    {key: 'catName', type: 'Texts', label: '分类名称', span: 12, value: data.catName},
                    {key: 'parentName', type: 'Texts', label: '上级分类', span: 12, value: data.parentName},
                    {key: 'memo', type: 'Texts', label: '备注', span: 12, value: data.memo},
                ],
                style: {marginTop: 0},
            },
            // {
            //     key: 'gzKey',
            //     title: '规则设置',
            //     data: [
            //         {key: 'b', type: 'Texts', label: '云服务ID', span: 12, value: ''},
            //         {key: 'b1', type: 'Texts', label: '云服务名称', span: 12, value: ''},
            //         {key: 'b2', type: 'Texts', label: '规则SPU', span: 12, value: ''},
            //         {key: 'b3', type: 'Texts', label: '规则SKU', span: 12, value: ''},
            //         {key: 'b4', type: 'Texts', label: '配置参数', span: 12, value: ''},
            //     ],
            //     style: {marginTop: 15},
            // },
        ];
        return <div>
            {
                carData.map((item, idx) => {
                    return <Card
                        type="inner"
                        key={item.key}
                        title={item.title}
                        style={item.style ? item.style : ''}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }

        </div>
    }

    onClickDel() {
        return confirm({
            title: '你确定要删除该条数据吗?',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.CServeSCDelete({id: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/CloudServeClaList');
                }, (err) => {
                })
            },
            onCancel: () => {

            },
        });
    }
}

export default CloudServeClaDetail
