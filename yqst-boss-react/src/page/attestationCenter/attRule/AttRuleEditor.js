/**
 * Created by yb on 2019/09/129
 */

import React, {Component} from 'react';
import {
    Form,
    Button,
    Modal,
    Card,
    Row,
    Col,
    Input,
    message,
    Radio,
    Select,
    Switch
} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from './SwitchName';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";

const { Option } = Select;
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


class AttRuleEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false,
            docPra: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                type: '',
                isSubAuth: 0,
            },
            visibleType: '', // 认证组弹窗的（1和2都是打开状态，其它表示关闭）： 1 （应用的认证组）；2（限制条件设置）
            rowDoc: {},
            rowQZDoc: {},
            docData: {},

            zzPra: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                type: '',
            },
            zzRowData: {},
            zzVisible: false,
            docGroupIdx: '',
            docIdx: '',
        };
        this.id = '';
        this.crumb = [
            {name: '认证中心'},
            {name: "认证规则管理列表", link: '/Pages/AttRuleList'},
            {name: "新增认证规则"}
        ];
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '认证中心'},
                {name: "认证规则管理列表", link: '/Pages/AttRuleList'},
                {name: "认证规则管理详情", link: `/Pages/AttRuleDetail?id=${this.id}`},
                {name: "编辑认证规则"},
            ];
        }
    }

    // 视图层
    render() {
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.handleSubmit}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn = {
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined />} loading={this.state.loading}>保存</Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/AttRuleDetail?id=${this.id}` : '/Pages/AttRuleList'}
                            >
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeDocView()}
                    {this.makeZZView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDRGet({ruleId: this.id}, (res) => {
            const {setFieldsValue, resetFields} = this.formRef.current;
            setFieldsValue({isPre: '1' === '' + res.data.isPre});
            this.setState({
                data: res.data,
                rowDoc: {
                    docParentId: res.data.parentId,
                    name: res.data.parentName,
                    type: res.data.parentType,
                    isApprove: res.data.isApprove,
                },
                rowQZDoc: {
                    docParentId: res.data.preId,
                    name: res.data.preName,
                },
                docData: {
                   ...res.data
                }
            }, ()=>{
                resetFields();
            });
        }, (err) => {
        });
    }

    getDocInfo(id) {
        Model.UserAttDocPGet({docParentId: id}, (res) => {
            this.setState({
                docData: res.data,
            });
        }, (err) => {
        });
    }

    getDocList(current, type) {
        let {docPra, rowDoc, rowQZDoc} = this.state;
        docPra.current = current ? current : docPra.current;
        Model.UserAttDocPPage({
            current: docPra.current,
            pageSize: docPra.pageSize,
            keyWord: docPra.keyWord,
            type: docPra.type,
            isSubAuth: '2' === '' + rowDoc.type ? 1 : 0,
        }, (res) => {

            const newList = res.data.records && res.data.records.map((item, idx) => {
                item.isChecked = false;
                if('1' === '' + type){
                    if('' + rowDoc.docParentId === '' + item.docParentId){
                        item.isChecked = true;
                    }

                }else{
                    if('' + rowQZDoc.docParentId === '' + item.docParentId){
                        item.isChecked = true;
                    }

                }

                return item
            });

            docPra.total = res.data.total || 0;
            docPra.list = newList || [];

            this.setState({
                docPra,
                visibleType: type ? type : ''
            })
        }, (err) => {
        })
    }

    getZZList(current) {
        let {zzPra, docGroupIdx, docIdx} = this.state;
        zzPra.current = current ? current : zzPra.current;

        Model.UserAttDocPage({
            current: zzPra.current,
            pageSize: zzPra.pageSize,
            keyWord: zzPra.keyWord,
            startTime: zzPra.startTime,
            endTime: zzPra.endTime,
            type: zzPra.type,
        }, (res) => {
            const newList = res.data.records && res.data.records.map(item => {
                item.isChecked = false;
                if(this.state.docData.getDocGroupVOList[docGroupIdx].getDocVOList[docIdx].autoDocId == item.id){
                    item.isChecked = true;
                }
                return item;
            });
            zzPra.list = newList;
            zzPra.total = res.data.total || 0;

            this.setState({
                zzPra,
                zzVisible: true,
            })
        }, (err) => {
        })
    }

    makeBaseView() {
        let {data, rowDoc, rowQZDoc} = this.state;
        if(!this.formRef.current){
            return null
        }

        const {getFieldValue} = this.formRef.current;

        let allData = [
            {
                title: '基本信息',
                key: 'JBKey',
                data: [
                    this.id ? {key: 'ruleId', type: 'Texts', label: '规则ID', span: 12, formItemLayout, value: data.ruleId} : {},
                    this.id ? {key: 'status', type: 'Texts', label: '状态', span: 12, formItemLayout,
                        value: SwitchName.status(data.status)} : {},
                    this.id ? {key: 'createTime', type: 'Texts', label: '创建时间', span: 12, formItemLayout,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''} : {},
                    {
                        key: 'ruleCode', type: 'Input', span: 12, value: data.ruleCode || '', formItemLayout, placeholder: '请填写(仅限英文及数字字符)', label: '规则编码',
                        options: {
                            rules: [{
                                required: true, message: '规则编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {
                        key: 'ruleName', type: 'Input', span: 12, value: data.ruleName || '', formItemLayout, placeholder: '请填写', label: '规则名称',
                        options: {
                            rules: [{
                                required: true, message: '规则名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'ruleMemo', type: 'Input', value: data.ruleMemo || '', formItemLayout, label: '规则描述', placeholder: '请填写规则描述', span: 12,
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
            {
                title: '应用的认证组',
                key: 'YYKey',
                data: [
                    {
                        key: 'parentName', type: 'Custom', span: 12,  formItemLayout, label: '认证组名称',
                        value: rowDoc.name,
                        options: {
                            rules: [{
                                required: true, message: '认证组名称不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowDoc.name}
                             onClick={() => {
                                 this.getDocList(1, 1);
                             }}
                        />
                    },
                    {
                        key: 'parentId', type: 'Custom', span: 12,  formItemLayout, label: '关联云服务ID',
                        value: rowDoc.docParentId,
                        options: {
                            rules: [{
                                required: false, message: '关联云服务ID不能为空',
                            }],
                        },
                        view: <Input placeholder="自动填充"
                            // value={this.state.rowSoft.id}
                             disabled={true}
                        />
                    },
                ],
                style: {marginTop: 15},
            },
            {
                title: '限制条件设置',
                key: 'QZKey',
                data: [
                    {
                        key: 'isPre', type: 'Switch', span: 24, label: '前置条件',
                        value: '1' === '' + data.isPre,
                        callBack: (isPre)=>{
                            data.isPre = Number(isPre) + '';
                            this.setState({
                                data
                            })
                        },
                        checkedChildren: '有', unCheckedChildren: '无',
                        options: {
                            rules: [{
                                required: true, message: '前置条件不能为空',
                            }],
                        },
                        formItemLayout: {
                            labelCol: {
                                xs: { span: 24 },
                                sm: { span: 4 },
                            },
                            wrapperCol: {
                                xs: { span: 24 },
                                sm: { span: 20 },
                            },
                        },
                        attribute: {
                            disabled: '1' === '' + rowDoc.type || '3' === '' + rowDoc.type
                        }
                    },
                    getFieldValue('isPre') ?
                        {
                            key: 'preName', type: 'Custom', span: 12,  formItemLayout, label: '认证组名称',
                            value: rowQZDoc.name,
                            options: {
                                rules: [{
                                    required: true, message: '认证组名称不能为空',
                                }],
                            },
                            view: <Input placeholder="点击选择" readOnly={true}
                                // value={this.state.rowSoft.name}
                                 onClick={() => {
                                     this.getDocList(1, 2);
                                 }}
                            />
                        } : {},
                    getFieldValue('isPre') ?
                        {
                            key: 'preId', type: 'Custom', span: 12,  formItemLayout, label: '认证组ID',
                            value: rowQZDoc.docParentId,
                            options: {
                                rules: [{
                                    required: false, message: '认证组ID不能为空',
                                }],
                            },
                            view: <Input placeholder="自动填充"
                                // value={this.state.rowSoft.id}
                                 disabled={true}
                            />
                        } : {},
                    {
                        key: 'isApprove', type: 'Switch', span: 12,  formItemLayout, label: '是否多次认证',
                        value: '1' === '' + rowDoc.isApprove,
                        options: {
                            rules: [{
                                required: true, message: '前置条件不能为空',
                            }],
                        },
                    },
                ],
                style: {marginTop: 15},
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
                        <AssemblySet key={item.key} data={item.data} form={this.formRef}/>
                    </Card>
                })
            }
            {
                this.state.docData.getDocGroupVOList && <Card
                    type="inner"
                    title='填写规则设置'
                    bodyStyle={{padding: '15px, 10px'}}
                    style={{marginTop: 15}}
                >
                    {
                        this.state.docData.getDocGroupVOList.length > 0 && this.state.docData.getDocGroupVOList.map((item, idx) => {
                            let columns = [
                                {
                                    title: '资质ID',
                                    key: 'docId',
                                    dataIndex: 'docId',
                                },
                                {
                                    title: '资质名称',
                                    key: 'docName',
                                    dataIndex: 'docName',
                                },
                                {
                                    title: '资质类型',
                                    key: 'docType',
                                    dataIndex: 'docType',
                                    render: (res) => {
                                        return SwitchName.docType(res);
                                    }
                                },
                                {
                                    title: '限制数量',
                                    key: 'docParam',
                                    dataIndex: 'docParam',
                                    width: 120,
                                    render: (res, data, idx) => {
                                        const retRes = (type) => {
                                            switch (type + '') {
                                                case '2':
                                                case '6':
                                                case '7':
                                                    return <Input value={res} placeholder="请填写"
                                                          maxLength={8}
                                                          onChange={(e) => {
                                                              const numAndLet = /^[0-9]+$/;
                                                              if(e.target.value && (!numAndLet.test(e.target.value) || e.target.value <= 0)){
                                                                  message.error('只能填写大于零整数！');
                                                                  return false;
                                                              }
                                                              this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[idx].docParam = e.target.value;
                                                              this.setState({docData: this.state.docData})
                                                          }}
                                                    />;

                                                default:
                                                    return '无'
                                            }
                                        };
                                        return retRes(data.docType)
                                    }
                                },
                                {
                                    title: '是否显示',
                                    key: 'isDisplay',
                                    dataIndex: 'isDisplay',
                                    render: (res, data, rIdx) => {
                                        return <Switch
                                            checked={'1' === '' + res}
                                            checkedChildren="是"
                                            unCheckedChildren="否"
                                            onChange={(val) => {
                                                this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isDisplay = val ? 1 : 0;
                                                if(!val){
                                                    this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isRequired = 0;
                                                    this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isAutoWrite = 0;
                                                }
                                                this.setState({
                                                    docData: this.state.docData
                                                });
                                            }}
                                        />
                                    }
                                },
                                {
                                    title: '是否必填',
                                    key: 'isRequired',
                                    dataIndex: 'isRequired',
                                    render: (res, data, rIdx) => {
                                        return <Switch
                                            checked={'1' === '' + res}
                                            checkedChildren="是"
                                            unCheckedChildren="否"
                                            disabled={'0' === '' + data.isDisplay}
                                            onChange={(val) => {
                                                this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isRequired = val ? 1 : 0;
                                                this.setState({
                                                    docData: this.state.docData
                                                });
                                            }}
                                        />
                                    }
                                },
                                {
                                    title: '是否自动填写',
                                    key: 'isAutoWrite',
                                    dataIndex: 'isAutoWrite',
                                    render: (res, data, rIdx) => {
                                        return <Switch
                                            checked={'1' === '' + res}
                                            checkedChildren="是"
                                            unCheckedChildren="否"
                                            disabled={'0' === '' + data.isDisplay}
                                            onChange={(val) => {
                                                this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isAutoWrite = val ? 1 : 0;
                                                this.setState({
                                                    docData: this.state.docData
                                                });
                                            }}
                                        />
                                    }
                                },
                                {
                                    title: '自动填写依据',
                                    key: 'autoDocId',
                                    dataIndex: 'autoDocId',
                                    render: (res, data, rIdx) => {
                                        return '0' === '' + data.isAutoWrite ? '无' : <div>
                                            <a>{res ? res : ''}</a>
                                            <Button style={{marginLeft: 10}} onClick={() => {
                                                this.setState({
                                                    docGroupIdx: idx,
                                                    docIdx: rIdx,
                                                }, () => {
                                                    this.getZZList(1);
                                                });
                                            }}>选择</Button>
                                        </div>
                                    }
                                },
                            ];
                            if('1' === '' + item.isVerify){
                                columns.push(
                                    {
                                        title: '接口认证',
                                        key: 'isVerify',
                                        dataIndex: 'isVerify',
                                        render: (res, data, rIdx) => {
                                            return <Switch
                                                checked={'1' === '' + res}
                                                checkedChildren="是"
                                                unCheckedChildren="否"
                                                onChange={(val) => {
                                                    this.state.docData.getDocGroupVOList[data.pIdx].getDocVOList[rIdx].isVerify = val ? 1 : 0;
                                                    this.setState({
                                                        docData: this.state.docData
                                                    });
                                                }}
                                            />
                                        }
                                    }
                                )
                            }
                            const newGetDocVOList = item.getDocVOList && item.getDocVOList.map(cItem => {
                                return {
                                    ...cItem,
                                    pIdx: idx
                                }
                            });
                            return <Card
                                key={'sav_' + idx}
                                type="inner"
                                bodyStyle={{padding: 10}}
                                title={<Row>
                                    <Col span={10}>资质组ID：{item.docGroupId}</Col>
                                    <Col span={10}>资质组名称：{item.docGroupName}</Col>
                                    <Col span={4}>接口认证：
                                        <Switch
                                            checked={'1' === '' + item.isVerify}
                                            checkedChildren="是"
                                            unCheckedChildren="否"
                                            onChange={(val) => {
                                                this.state.docData.getDocGroupVOList[idx].isVerify = val ? 1 : 0;
                                                this.setState({
                                                    docData: this.state.docData
                                                });
                                            }}
                                        />
                                    </Col>
                                </Row>}
                                style={{marginTop: 0 != idx ? 15 : 0}}
                            >
                                <SWTable
                                    columns={columns}
                                    dataSource={newGetDocVOList}
                                    pagination={false}
                                />
                            </Card>
                        })
                    }
                    {
                        this.state.docData.getDocGroupVOList.length <= 0 && <div style={{
                            textAlign: 'center',
                            color: '#ccc',
                            fontSize: 20
                        }}>
                            暂无数据......
                        </div>
                    }
                </Card>
            }
        </div>;
    }

    checkValidator(rule, value, callback){
        const numAndLet = /^[0-9a-zA-Z]+$/;
        if(value && !numAndLet.test(value)){
            callback('编码只能是数字或者字母！');
            return false;
        }
        callback();
    }

    makeDocView(){
        let {docPra, visibleType} = this.state;
        const columns = [
            {
                title: '',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '认证组ID',
                key: 'docParentId',
                dataIndex: 'docParentId',
            },
            {
                title: '认证组编码',
                key: 'parentCode',
                dataIndex: 'parentCode'
            },
            {
                title: '认证组名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '认证组类型',
                key: 'type',
                dataIndex: 'type',
                render: (res) => {
                    return SwitchName.type(res);
                }
            },
            {
                title: '关联云服务',
                key: 'softName',
                dataIndex: 'softName',
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        return <Modal
            title="请选择认证组"
            width={900}
            visible={'1' === '' + visibleType || '2' === '' + visibleType}
            onOk={() => {
                let hasChangeDoc = false;
                const {getFieldValue, setFieldsValue, } = this.formRef.current;
                docPra.list.forEach(item => {
                    if(item.isChecked){
                        hasChangeDoc = true;
                        if('1' === '' + visibleType){
                            setFieldsValue({parentName: item.name, parentId: item.docParentId});
                            // 企业、个人实名认证时，前置条件都是关闭状态，清空之前选的记录
                            if('1' === '' + item.type || '3' === '' + item.type){
                                this.state.rowQZDoc = {};
                                if(getFieldValue('isPre'))
                                    setFieldsValue({isPre: false, preName: '', preId: ''});
                            }
                            this.setState({rowDoc: item, visibleType: '', rowQZDoc: this.state.rowQZDoc}, () => {
                                this.getDocInfo(item.docParentId);
                            });

                        }else{
                            setFieldsValue({preName: item.name, preId: item.docParentId});
                            this.setState({rowQZDoc: item, visibleType: ''});
                        }

                        return false;
                    }
                });
                if(!hasChangeDoc){
                    if(('1' === '' + visibleType && !this.state.rowDoc.docParentId) || ('2' === '' + visibleType && !this.state.rowQZDoc.docParentId)){
                        message.error('请选择一个认证组！');

                    }else if(('1' === '' + visibleType && this.state.rowDoc.docParentId) || ('2' === '' + visibleType && this.state.rowQZDoc.docParentId)){
                        this.setState({visibleType: ''});

                    }
                }
            }}
            onCancel={() => {
                this.setState({visibleType: ''});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            关键字：
                            <Input value={docPra.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称、云服务'} onChange={(e) => {
                                this.setState({
                                    docPra: {
                                        ...docPra,
                                        keyWord: e.target.value
                                    }
                                });
                            }}/>
                        </Col>
                        <Col span={12}>
                            认证组类型：
                            <Select value={docPra.type} style={{ width: '75%' }} onChange={(val) => {
                                this.setState({
                                    docPra: {
                                        ...docPra,
                                        type: val
                                    }
                                });
                            }}>
                                <Option value=''>全部</Option>
                                <Option value='1'>企业实名认证</Option>
                                <Option value='2'>云服务主认证</Option>
                                <Option value='3'>个人实名认证</Option>
                                <Option value='4'>云服务子模块认证</Option>
                            </Select>
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            docPra: {
                                ...docPra,
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                                type: '',
                                isSubAuth: 0,
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getDocList(1, visibleType);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={docPra.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            docPra.list.forEach(item => {
                                item.isChecked = false;
                                if('' + record.docParentId === '' + item.docParentId){
                                    item.isChecked = !item.isChecked;
                                }
                            });
                            this.setState({docPra});
                        }
                    }
                }}
                pagination={
                    {
                        total: docPra.total,
                        current: docPra.current,
                        pageSize: docPra.pages,
                        onChange: (a, b) => {
                            this.getDocList(a, visibleType);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeZZView(){
        let {zzPra, zzVisible, docGroupIdx, docIdx} = this.state;
        const columns = [
            {
                title: '',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '资质ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '资质编码',
                key: 'docCode',
                dataIndex: 'docCode'
            },
            {
                title: '资质名称',
                key: 'docName',
                dataIndex: 'docName',
            },
            {
                title: '资质类型',
                key: 'docType',
                dataIndex: 'docType',
                render: (res) => {
                    return SwitchName.docType(res);
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
                width: 100,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD HH:mm:ss') : '';
                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
        ];
        return <Modal
            title="选择依据的资质"
            width={900}
            visible={zzVisible}
            onOk={() => {
                zzPra.list.forEach(item => {
                    if(item.isChecked){
                        this.state.docData.getDocGroupVOList[docGroupIdx].getDocVOList[docIdx].autoDocId = item.id;
                        this.setState({docData: this.state.docData, zzVisible: false});
                        return false;
                    }
                });
            }}
            onCancel={() => {
                this.setState({zzVisible: false});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={12}>
                        关键字：
                        <Input value={zzPra.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            this.setState({
                                zzPra: {
                                    ...zzPra,
                                    keyWord: e.target.value
                                }
                            });
                        }}/>
                    </Col>
                    <Col span={12}>
                        资质类型：
                        <Select value={zzPra.type} style={{ width: '75%' }} onChange={(val) => {
                            this.setState({
                                zzPra: {
                                    ...zzPra,
                                    type: val
                                }
                            });
                        }}>
                            <Option value=''>全部</Option>
                            <Option value='1'>文本</Option>
                            <Option value='2'>图片</Option>
                            <Option value='5'>地址</Option>
                            <Option value='3'>时间点</Option>
                            <Option value='4'>时间区间</Option>
                            <Option value='6'>附件</Option>
                        </Select>
                    </Col>

                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            zzPra: {
                                ...zzPra,
                                current: 1,
                                pageSize: 10,
                                keyWord: '',
                                startTime: '',
                                endTime: '',
                                type: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getZZList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={zzPra.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            zzPra.list.forEach(item => {
                                item.isChecked = false;
                                if('' + record.id === '' + item.id){
                                    item.isChecked = !item.isChecked;
                                }
                            });
                            this.setState({zzPra});
                        }
                    }
                }}
                pagination={
                    {
                        total: zzPra.total,
                        current: zzPra.current,
                        pageSize: zzPra.pages,
                        onChange: (a, b) => {
                            this.getZZList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    handleSubmit = ()=>{
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields().then(values => {

            const {docData} = this.state;

            if(this.id){
                values.ruleId = this.id;
                delete values.status;
                delete values.createTime;
            }
            values.isApprove = values.isApprove ? 1 : 0;
            values.isPre = values.isPre ? 1 : 0;
            if('0' === '' + values.isPre){
                values.preId = '';
                values.preName = '';
            }
            let judgeAutoDocId = false, judgeDocParam = false;
            values.docGroup = docData.getDocGroupVOList.map(item => {
                return {
                    docGroupId: item.docGroupId,
                    docGroupName: item.docGroupName,
                    isVerify: item.isVerify,
                    docVOList: item.getDocVOList && item.getDocVOList.map(cItem => {
                        if(!judgeAutoDocId){
                            judgeAutoDocId = '1' === '' + cItem.isAutoWrite && (!cItem.autoDocId || '0' === '' + cItem.autoDocId);
                        }
                        if(!judgeDocParam){
                            judgeDocParam = ('2' === '' + cItem.docType || '6' === '' + cItem.docType) && !cItem.docParam;
                        }
                        return {
                            docId: cItem.docId,
                            docParam: cItem.docParam,
                            isDisplay: cItem.isDisplay,
                            isRequired: cItem.isRequired,
                            isAutoWrite: cItem.isAutoWrite,
                            autoDocId: cItem.autoDocId,
                            isVerify: cItem.isVerify,
                        }
                    }),
                }
            });
            if(judgeAutoDocId){
                message.error('请选择规则设置中的自动填写依据！');
                this.setState({loading: false});
                return false;
            }
            if(judgeDocParam){
                message.error('请填写规则设置中的限制数量！');
                this.setState({loading: false});
                return false;
            }

            // console.log('vvvvvvv: ', values);
            // return false;

            Model.UserAttDRSave({ruleMessage: JSON.stringify(values)}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/AttRuleList');

            }, (err) => {
                this.setState({loading: false});

            });

        }).catch(()=>{
            this.setState({loading: false});
        });
    }
}

export default AttRuleEditor
