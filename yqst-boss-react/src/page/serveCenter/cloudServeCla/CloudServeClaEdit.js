/**
 * Created by yb on 2019/11/13
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Row, Col, Input, Radio, message} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SoftModal from './submodule/SoftModal';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};


class CloudServeClaEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            catPar: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
            },
            rowCat: {},
            catVisible: false,
            softVisible: false,
            loading: false,
        };
        this.id = '';
        this.crumb = [
            {name: '云服务中心'},
            {name: '基本配置'},
            {name: "云服务分类列表", link: '/Pages/CloudServeClaList'},
            {name: "云服务分类新增"}
        ]

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '云服务中心'},
                {name: '基本配置'},
                {name: "云服务分类列表", link: '/Pages/CloudServeClaList'},
                {name: "云服务分类详情", link: `/Pages/CloudServeClaDetail?id=${this.id}`},
                {name: "云服务分类编辑"}
            ]
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.onSubmit.bind(this)}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn = {
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined />} loading={this.state.loading}>保存</Button>
                            <Link to={this.id ? `/Pages/CloudServeClaDetail?id=${this.id}` : '/Pages/CloudServeClaList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeCatView()}
                    <SoftModal
                        listPar={{
                            catId: this.id
                        }}
                        visible={this.state.softVisible}
                        callBack={() => {
                            this.setState({softVisible: false})
                        }}
                    />
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.CServeSCGet({id: this.id}, (res) => {
            this.setState({
                data: res.data,
                rowCat: {
                    id: res.data.parentId,
                    parentName: res.data.parentName,
                }
            }, () => {
                this.formRef.current.resetFields();
                this.formRef.current.setFieldsValue({parentName: res.data.parentName || ''})
            });
        }, (err) => {
        });
    }

    getCatList(current) {
        let {catPar, rowCat} = this.state;
        catPar.current = current ? current : catPar.current;

        Model.CServeSCPage({
            current: catPar.current,
            pageSize: catPar.pageSize,
            keyWord: catPar.keyWord,
        }, (res) => {
            const mapChildren = (list) => {
                list.forEach((item, idx) => {
                    item.key = (++idx + (parseInt(catPar.current) - 1) * 10) + '_' + item.id;
                    item.isChecked = false;
                    if('' + rowCat.id === '' + item.id){
                        item.isChecked = true;
                    }
                    // item.numXH = ++idx + (parseInt(catPar.current) - 1) * 10;
                    if(item.listSoftCatDTOS && item.listSoftCatDTOS.length > 0){
                        item.children = item.listSoftCatDTOS;
                        mapChildren(item.listSoftCatDTOS);
                    }
                });
                return list;
            };
            const newList = mapChildren(res.data.records || []).map((item, idx) => {
                return {
                    ...item,
                    numXH: ++idx + (parseInt(catPar.current) - 1) * 10,
                }
            });
            catPar.list = newList;
            catPar.total = res.data.total || 0;

            this.setState({
                catPar,
                catVisible: true
            })
        }, (err) => {
        })
    }

    makeBaseView(){
        let {data, rowCat} = this.state;
        const allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {key: 'id', type: 'Texts', label: '分类ID', span: 12, formItemLayout, value: data.id} : {},
                    this.id ? {key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''} : {},
                    this.id ? {key: 'softNum', type: 'Texts', label: '云服务数量', span: 12, formItemLayout,
                        value: <div>{NumberFormat.thousandBit(data.softNum || 0, 0)}
                            {
                                data.softNum && (parseInt(data.softNum) > 0) ? <Button type="primary" style={{marginLeft: 15}}
                                   onClick={() => {
                                       this.setState({softVisible: true});
                                   }}
                                >查看</Button> : ''
                            }
                        </div>
                    } : {},
                    {
                        key: 'catSn', type: 'Input', span: 12, value: data.catSn || '', formItemLayout, placeholder: '请填写(仅限英文及数字字符)', label: '分类编码',
                        options: {
                            rules: [{
                                required: true, message: '分类编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {
                        key: 'catName', type: 'Input', span: 12, value: data.catName || '', formItemLayout, placeholder: '请填写', label: '分类名称',
                        options: {
                            rules: [{
                                required: true, message: '分类名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'parentName', span: 12,  formItemLayout, label: '上级分类',
                        value: rowCat.parentName,
                        type: this.id && '1' === '' + data.isHasChild ? 'Texts' : 'Custom',
                        options: {
                            rules: [{
                                required: false, message: '上级分类不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowSoft.name}
                             onClick={() => {
                                 this.getCatList(1);
                             }}
                        />
                    },
                    {
                        key: 'memo', type: 'Input', value: data.memo || '', formItemLayout, label: '备注', placeholder: '请填写备注', span: 12,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                    },
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
        </div>
    }

    checkValidator(rule, value, callback){
        const numAndLet = /^[0-9a-zA-Z]+$/;
        if(value && !numAndLet.test(value)){
            callback('编码只能是数字或者字母！');
            return false;
        }
        callback();
    }

    makeCatView(){
        let {catPar, catVisible} = this.state;
        const columns = [
            {
                title: '排序',
                key: 'numXH',
                dataIndex: 'numXH',
            },
            {
                title: '分类ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '分类编码',
                key: 'catSn',
                dataIndex: 'catSn',
            },
            {
                title: '分类名称',
                key: 'catName',
                dataIndex: 'catName',
            },
            {
                title: '选择',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
        ];
        return <Modal
            title="选择云服务分类"
            width={900}
            visible={catVisible}
            onOk={() => {
                let changeItem = null;
                const recCatList = (list) => {
                    list.forEach(item => {
                        if(item.isChecked){
                            changeItem = item;
                            return false;

                        }else if(item.children && item.children.length > 0){
                            recCatList(item.children);

                        }
                    });

                    return changeItem
                };
                recCatList(catPar.list);

                if(!changeItem && !this.state.rowCat.id){
                    return message.error('请选择一个云服务分类！');
                }
                if(changeItem && (changeItem.parentId || '0' !== '' + changeItem.parentId )){
                    return message.error('暂时只能选第一级分类！');
                }

                this.formRef.current.setFieldsValue({parentName: changeItem ? changeItem.catName : ''});
                this.setState({rowCat: changeItem ? changeItem : {}, catVisible: false});
            }}
            onCancel={() => {
                this.setState({catVisible: false});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={24}>
                        关键字：
                        <Input value={catPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            this.setState({
                                catPar: {
                                    ...catPar,
                                    keyWord: e.target.value
                                }
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            catPar: {
                                ...catPar,
                                current: 1,
                                keyWord: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getCatList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={catPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            const recCatList = (list) => {
                                list.forEach(item => {
                                    if('' + record.id === '' + item.id){
                                        item.isChecked = !item.isChecked;

                                    }else{
                                        item.isChecked = false;

                                    }
                                    if(item.children && item.children.length > 0){
                                        recCatList(item.children);
                                    }
                                });

                                return list;
                            };
                            catPar.list = recCatList(catPar.list);
                            this.setState({catPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: catPar.total,
                        current: catPar.current,
                        pageSize: catPar.pages,
                        onChange: (a, b) => {
                            this.getCatList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    onSubmit(e){
        this.setState({loading: true});
        this.formRef.current.validateFields(['catSn', 'catName', 'memo', 'parentName']).then((values) => {
            if(this.id){
                values.id = this.id;
            }
            if(values.parentName){
                values.parentId = this.state.rowCat.id;

            }else{
                values.parentId = 0;

            }
            delete values.parentName;

            Model.CServeSCSave(values, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/CloudServeClaList');

            }, (err) => {
                this.setState({loading: false});

            });
        }).catch(()=>{
            this.setState({loading: false});
        })
    }

}

export default CloudServeClaEdit
