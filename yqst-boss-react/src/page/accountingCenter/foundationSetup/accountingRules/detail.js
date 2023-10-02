import React, {Component, Fragment} from 'react';
import {Row, Col, Form, Button, Card, Popconfirm, message, Modal, Divider, Spin} from 'antd';
import {ReloadOutlined} from '@ant-design/icons';
import cloneDeep from 'lodash/cloneDeep';
import get from 'lodash/get';
import ViewContent from '../../../../baseview/viewContent/ViewContent';
import HehTitle from '../../../../baseview/hehComponent/HehTitle';
import AssemblySet from '../../../../baseview/assemblySet/AssemblySet';
import NewNodeModal from './newNodeModal';
import accountingModel from '../../model/accountingModel';
import {Link} from 'react-router-dom';

const crumb = [
    {name: '基础设置'},
    {name: '记账规则管理列表', link: '/Pages/AccountingRules'},
    {name: '记账规则管理详情'}
];


class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateLoading: false,
            templateDetailLoading: false,
            activeKey: [],
            newNodeVisible: false,
            allTemplateList: [],
            listCourseGroupVO: [],
            listNodeVO: [],
            defaultValue: undefined,
            newModalValue: undefined,
            editIndex: undefined,
            templateId: undefined
        };
        this.id = this.props.location.search.substr(1).split('=')[1];
    }

    componentDidMount() {
        if (this.id) {
            this.getAllTemplateList();
            this.getDefaultValue();
        }
    }

    componentWillUnmount() {

    }

    getDefaultValue = () => {
        accountingModel.accountingRuleDetail({id: this.id}, res => {
            if (res && res.ret === 0) {
                this.getTemplateDetail(res.data.templateId);
                this.setState({
                    defaultValue: res.data,
                    listNodeVO: get(res, 'data.listNodeVO')
                });
            }
        });
    };

    getAllTemplateList = () => {
        this.setState({
            templateLoading: true
        });
        accountingModel.templateAllList({}, res => {
            if (res && res.ret === 0) {
                this.setState({
                    allTemplateList: res.data,
                    templateLoading: false
                });
            }
        });
    };

    getTemplateDetail = (id) => {
        this.setState({
            templateDetailLoading: true
        });
        accountingModel.templateDetail({id}, res => {
            if (res && res.ret === 0) {
                this.setState({
                    listCourseGroupVO: get(res, 'data.listCourseGroupVO') || [],
                    templateId: id,
                    templateDetailLoading: false
                });
            }
        });
    };

    getModalData = (listNodeVO) => {
        const {editIndex} = this.state;
        if (editIndex !== undefined) {
            this.state.listNodeVO.splice(editIndex, 1, listNodeVO);
        } else {
            this.state.listNodeVO = this.state.listNodeVO.concat([listNodeVO]);
        }
        this.setState({
            listNodeVO: this.state.listNodeVO,
            editIndex: undefined
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (err) return;
            let {listNodeVO} = this.state;
            if (listNodeVO.length === 0) {
                message.error('至少新增一个节点');
                return;
            }
            const submitData = {
                id: this.id,
                ruleSn: get(values, 'ruleSn'),
                name: get(values, 'name'),
                templateName: get(values, 'templateName.label'),
                templateId: get(values, 'templateName.key'),
                memo: get(values, 'memo'),
                listNodeVO: listNodeVO
            };
            this.save(submitData);
        });
    };

    save = (data) => {
        accountingModel.accountingRuleSave({saveRuleDTO: JSON.stringify(data)}, res => {
            if (res && res.ret === 0) {
                message.success(this.id ? '修改记账规则成功' : '新建记账规则成功');
                this.props.history.push('/Pages/AccountingRules');
            } else if (res && res.ret === 207015) {
                this.props.form.setFieldsValue({
                    templateName: undefined
                });
                this.setState({listNodeVO: []});
                this.getAllTemplateList();
            } else if (res && res.ret === 207016) {
                this.nodeModalThis.getList();
            } else if (get(res, 'ret') === 207017 || get(res, 'ret') === 207021) {
                this.getTemplateDetail(data.templateId);
            }
        });
    };

    render() {
        const {newModalValue} = this.state;
        return (
            <Fragment>
                {/* 新增节点模态框 */}
                <NewNodeModal
                    visible={this.state.newNodeVisible}
                    defaultValue={newModalValue}
                    getNodeModalThis={(vthis) => {
                        this.nodeModalThis = vthis;
                    }}
                    handleCancel={() => {
                        this.setState({
                            newNodeVisible: false,
                            newModalValue: undefined,
                            editIndex: undefined
                        });
                    }}
                    getTemplate={this.getTemplateDetail}
                    templateDetailLoading={this.state.templateDetailLoading}
                    templateData={this.state.listCourseGroupVO}
                    templateId={this.state.templateId}
                    onOk={this.getModalData}
                />
                {/* 新增节点模态框 */}

                <ViewContent crumb={crumb}>
                    <div style={styles.container}>
                        <HehTitle>规则信息</HehTitle>
                        <Row style={styles.mt10}>
                            <Col span={20}>
                                {this.makeFormItem()}
                            </Col>
                        </Row>
                        <Row style={styles.minHeight}>
                            <Col span={24}>
                                <HehTitle>设置规则</HehTitle>
                                <Button
                                    style={styles.mt10}
                                    type='primary'
                                    size='large'
                                    onClick={() => {
                                        const templateInfo = this.props.form.getFieldValue('templateName');
                                        if (!templateInfo) {
                                            this.props.form.setFields({
                                                templateName: {
                                                    value: undefined,
                                                    errors: [new Error('请先选择应用模板!')]
                                                }
                                            });
                                            return;
                                        }
                                        if (this.state.listCourseGroupVO.length === 0) {
                                            this.props.form.setFields({
                                                templateName: {
                                                    value: undefined,
                                                    errors: [new Error('该应用模板没有大类信息!')]
                                                }
                                            });
                                            return;
                                        }
                                        this.setState({newNodeVisible: true});
                                    }}
                                >
                                    新增节点
                                </Button>
                                {this.renderData()}
                            </Col>
                        </Row>
                        <Row style={{marginTop: 10}}>
                            <Col span={24} style={styles.tac}>
                                <Button type='primary' onClick={this.handleSubmit}>保存</Button>
                                <Button style={styles.ml10} type='danger'>
                                    <Link to='/Pages/AccountingRules'>取消</Link>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </ViewContent>
            </Fragment>
        );
    }

    makeFormItem = () => {
        const {defaultValue} = this.state;
        let templateValue = undefined;
        let noSetData = [
            {
                key: 'ruleSn',
                type: 'Input',
                span: 12,
                value: get(defaultValue, 'ruleSn'),
                placeholder: '请填规则编码',
                label: '规则编码',
                options: {
                    rules: [{
                        required: true, message: '编码不能为空'
                    }, {
                        pattern: new RegExp('^\\w+$', 'g'),
                        message: '只能为字母或者数字不能包含特殊符号,中文,空格等'
                    }]
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'name',
                type: 'Input',
                span: 12,
                value: get(defaultValue, 'name'),
                placeholder: '请填写规则名称',
                label: '规则名称',
                options: {
                    rules: [{
                        required: true, message: '规则名称不能为空'
                    }]
                },
                attribute: {
                    maxLength: 30
                }
            },
            {
                key: 'templateName',
                type: 'LabelSelect',
                span: 12,
                value: get(defaultValue, 'templateId') ? {
                    key: get(defaultValue, 'templateId'),
                    label: get(defaultValue, 'templateName')
                } : undefined,
                placeholder: '请选择所要应用的模板',
                label: '应用模板',
                data: {
                    list: this.state.allTemplateList,
                    valueName: 'id',
                    labelName: 'templateName'
                },
                attribute: {
                    style: {width: '100%'},
                    labelInValue: true,
                    showSearch: true,
                    loading: this.state.templateLoading,
                    dropdownRender: menu => (
                        <div>
                            <Spin spinning={this.state.templateLoading} size="large">
                                {menu}
                            </Spin>
                            <Divider style={{margin: '4px 0'}}/>
                            <div
                                style={{padding: '8px', cursor: 'pointer', textAlign: 'right'}}
                                onMouseDown={e => e.preventDefault()}
                            >
                                <span onClick={() => {
                                    this.getAllTemplateList();
                                }}>
                                    <ReloadOutlined /> 刷新数据
                                </span>
                            </div>
                        </div>
                    ),
                    onDropdownVisibleChange: (open) => {
                        if (open === true) {
                            this.getAllTemplateList();
                        }
                    },
                    filterOption: (input, option) => {
                        return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                    },
                    onSelect: (value) => {
                        templateValue = this.props.form.getFieldsValue(['templateName']);
                    },
                    onChange: (value) => {
                        const {listNodeVO} = this.state;
                        const vthis = this;
                        if (listNodeVO.length !== 0) {
                            Modal.confirm({
                                title: '模板切换警告',
                                content: `该模板下面已拥有${listNodeVO.length}条节点数据,如果你确定切换模板,节点数据将会被清空!`,
                                onOk() {
                                    vthis.setState({listNodeVO: []});
                                    vthis.getTemplateDetail(value.key);
                                },
                                onCancel() {
                                    vthis.props.form.setFieldsValue({
                                        templateName: templateValue.templateName
                                    });
                                }
                            });
                        } else {
                            this.getTemplateDetail(value.key);
                        }
                    }
                },
                options: {
                    rules: [{
                        required: true, message: '应用模板不能为空'
                    }]
                }
            },
            {
                key: 'memo',
                type: 'Input',
                span: 12,
                value: get(defaultValue, 'memo'),
                placeholder: '请输入备注',
                label: '备注',
                options: {
                    rules: [{
                        required: true, message: '备注不能为空'
                    }]
                },
                attribute: {
                    type: 'textarea',
                    rows: 4,
                    maxLength: 200
                }
            }
        ];
        return (
            <div>
                <AssemblySet key={'mackKmMod'} data={noSetData} form={this.props.form}/>
            </div>
        );
    };

    setNewModalValue = (index) => {
        const {listNodeVO} = this.state;
        const newNode = cloneDeep(listNodeVO);
        this.setState({newModalValue: newNode[index]});
    };

    removeNode = (index) => {
        let {listNodeVO} = this.state;
        listNodeVO.splice(index, 1);
        this.setState({listNodeVO});
    };

    renderData = () => {
        let {listNodeVO} = this.state;
        return (
            listNodeVO && listNodeVO.map((res, index) => {
                return (
                    <Card key={res.id ? `${res.id}${index}` : `${res.nid}${index}`} title={`节点 ${index + 1}`}
                          style={{marginTop: 10}} size="small"
                          extra={
                              [
                                  <a key={1} onClick={() => {
                                      this.setState({
                                          newNodeVisible: true,
                                          editIndex: index
                                      });
                                      this.setNewModalValue(index);
                                  }}>编辑</a>,
                                  <Popconfirm
                                      key={2}
                                      title="确认删除该节点?"
                                      onConfirm={() => this.removeNode(index)}
                                      okText="确定"
                                      cancelText="取消"
                                  >
                                      <a style={{marginLeft: 10}} key={2}>删除</a>
                                  </Popconfirm>
                              ]
                          }>
                        <Row>
                            <Col span={10} style={styles.font}>节点 ID
                                : {get(res, 'nid')}</Col>
                            <Col span={10} style={styles.font}>节点编号
                                : {get(res, 'nodeSn')}</Col>
                            <Col span={10}
                                 style={styles.font}>节点名称: {get(res, 'name')}</Col>
                            <Col span={10} style={styles.font}>节点描述
                                : {get(res, 'memo')}</Col>
                            {
                                res.listEntryVO && res.listEntryVO.map((childItem, childIndex) => {
                                    return (
                                        <Row key={childIndex}>
                                            <Col span={24}>
                                                <Col span={1} style={styles.font}>分录{childIndex + 1} :</Col>
                                                <Col span={8} style={styles.font}>借方
                                                    : {childItem.debitContext}</Col>
                                                <Col span={8} style={styles.font} offset={1}>贷方
                                                    : {childItem.creditContext}</Col>
                                            </Col>
                                        </Row>
                                    );
                                })
                            }
                        </Row>
                    </Card>
                );
            })
        );
    };
}

const styles = {
    container: {
        backgroundColor: 'rgba(255,255,255,.85)',
        backgroundClip: 'padding-box',
        borderRadius: '6px',
        border: '1px solid rgba(0,0,0,.1)',
        boxShadow: '0 0.25rem 0.75rem rgba(0,0,0,.1)',
        padding: '20px 10px 10px 20px'
    },
    mt10: {
        marginTop: 10
    },
    minHeight: {
        minHeight: 350
    },
    tac: {
        textAlign: 'center'
    },
    ml10: {
        marginLeft: 10
    },
    font: {
        fontSize: 14,
        fontWeight: 600
    }
};

export default Detail;
