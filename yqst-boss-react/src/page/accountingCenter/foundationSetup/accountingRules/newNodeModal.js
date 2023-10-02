import React, {Component, Fragment} from 'react';
import {Button, Col, Input, Modal, Row} from 'antd';
import get from 'lodash/get';
import keys from 'lodash/keys';
import compact from 'lodash/compact';
import BusinessNodeModal from './businessNodeModal';
import SelectSubjectModal from './selectSubjectModal';
import Ellipsis from '../../../../baseview/Ellipsis';
import Comparison from '../../../../utils/Comparison';

class NewNodeModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            businessNodeVisible: false,
            selectSubjectVisible: false,
            businessData: undefined,
            listEntryVO: [{}],
            selectSubjectType: 0,
            currentIndex: 0,
            nodeDisplay: false,
            entryDisplay: false,
            subjectValue: undefined
        };
    }

    componentDidMount() {

    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps.defaultValue) {
            this.setState({
                listEntryVO: get(nextProps, 'defaultValue.listEntryVO') || [{}],
                businessData: nextProps.defaultValue
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return !Comparison(nextProps, this.props) || !Comparison(nextState, this.state);
    }

    componentWillUnmount() {

    }

    getBusinessData = (data) => {
        if (data.id) {
            delete data.createTime;
            delete data.updateTime;
        }
        this.setState({businessData: data});
    };

    getSelectSubjectData = (data) => {
        const {currentIndex, selectSubjectType, listEntryVO} = this.state;
        if (selectSubjectType === 0) {
            listEntryVO[currentIndex] = Object.assign(listEntryVO[currentIndex], data);
        } else {
            listEntryVO[currentIndex] = Object.assign(listEntryVO[currentIndex], data);
        }
    };

    renderDec = () => {
        const {businessData} = this.state;
        return (
            <Row style={styles.mt10}>
                <Col span={12} style={styles.lineStyle}>
                    <Col span={6}>节点 Id:</Col>
                    <Col span={18}>{get(businessData, 'nid')}</Col>
                </Col>
                <Col span={12} style={styles.lineStyle}>
                    <Col span={6}>节点编号:</Col>
                    <Col span={18}>{get(businessData, 'nodeSn')}</Col>
                </Col>
                <Col span={12} style={styles.lineStyle}>
                    <Col span={6}>节点名称:</Col>
                    <Col span={18}>{get(businessData, 'name')}</Col>
                </Col>
                <Col span={24} style={styles.lineStyle}>
                    <Col span={3}>节点描述:</Col>
                    <Col span={21}>
                        <Ellipsis tooltip={true} length={100}>
                            {get(businessData, 'memo')}
                        </Ellipsis>
                    </Col>
                </Col>
            </Row>
        );
    };

    addEntry = () => {
        const {listEntryVO} = this.state;
        this.setState({
            listEntryVO: listEntryVO.concat([{}])
        });
    };

    handleOk = () => {
        let {businessData, listEntryVO} = this.state;
        if (!businessData) {
            this.setState({
                nodeDisplay: true
            });
            return;
        }
        let showEntryDisplay = false;
        listEntryVO.forEach((item, index) => {
            if (index === 0 && keys(item).length < 6) {
                showEntryDisplay = true;
            }
            if (keys(item).length < 6 && keys(item).length !== 0) {
                showEntryDisplay = true;
            }
        });
        if (showEntryDisplay === true) {
            this.setState({
                entryDisplay: true
            });
            return;
        }
        businessData.listEntryVO = listEntryVO;
        if (businessData.listEntryVO) {
            businessData.listEntryVO.forEach((item, index) => {
                if (JSON.stringify(item) === '{}') {
                    delete businessData.listEntryVO[index];
                }
            });
        }
        businessData.listEntryVO = compact(businessData.listEntryVO);
        this.props.onOk(businessData);
        this.props.handleCancel();
    };

    clear = () => {
        this.setState({
            businessNodeVisible: false,
            selectSubjectVisible: false,
            businessData: undefined,
            listEntryVO: [{}],
            selectSubjectType: 0,
            currentIndex: 0,
            nodeDisplay: false,
            entryDisplay: false,
            subjectValue: undefined
        });
    };

    getLineValue = (index) => {
        const {listEntryVO} = this.state;
        return listEntryVO[index];
    };

    render() {
        const {visible, handleCancel, templateData, templateId} = this.props;
        const {listEntryVO, businessData} = this.state;
        return (
            <Fragment>
                <Modal
                    title="新增节点"
                    maskClosable={false}
                    width={760}
                    afterClose={this.clear}
                    visible={visible}
                    onOk={this.handleOk}
                    onCancel={handleCancel}
                >
                    <Row>
                        <Col span={24}>
                            <Button
                                onClick={() => {
                                    this.setState({
                                        businessNodeVisible: true,
                                        nodeDisplay: false
                                    });
                                }}
                                type='primary'
                                size='large'
                            >
                                选择业务节点
                            </Button>
                            <h3
                                style={{
                                    marginLeft: 20,
                                    marginBottom: 0,
                                    color: 'red',
                                    display: this.state.nodeDisplay ? 'inline-block' : 'none'
                                }}
                            >
                                请选择业务节点!
                            </h3>
                        </Col>
                        <Col span={24} style={{minHeight: 100}}>
                            {
                                this.state.businessData
                                    ? this.renderDec()
                                    : null
                            }
                        </Col>
                        <Col span={24}>
                            <h2><span style={{color: 'red', verticalAlign: 'text-top', marginRight: 5}}>*</span>设置分录:
                            </h2>
                        </Col>
                        <Col span={24}>
                            <Button
                                disabled={this.state.listEntryVO.length >= 5}
                                onClick={this.addEntry}
                                type='primary'
                                size='large'
                            >
                                添加分录
                            </Button>
                            <h3
                                style={{
                                    marginLeft: 20,
                                    marginBottom: 0,
                                    color: 'red',
                                    display: this.state.entryDisplay ? 'inline-block' : 'none'
                                }}
                            >
                                请补充完整分录数据!
                            </h3>
                        </Col>
                        <Col span={24} style={{minHeight: 100, marginTop: 20}}>
                            {
                                listEntryVO && listEntryVO.map((item, index) => {
                                    return (
                                        <Col key={index} span={24} style={{marginBottom: 10}}>
                                            <Col span={2}
                                                 style={{
                                                     textAlign: 'center',
                                                     fontSize: 16,
                                                     height: 32,
                                                     lineHeight: '32px'
                                                 }}
                                            >
                                                分录{index + 1}
                                            </Col>
                                            <Col
                                                span={3}
                                                style={{
                                                    textAlign: 'right',
                                                    fontSize: 16,
                                                    height: 32,
                                                    lineHeight: '32px'
                                                }}
                                            >
                                                借方 :
                                            </Col>
                                            <Col span={8} style={{paddingLeft: 10}}>
                                                <Input
                                                    placeholder='请选择科目'
                                                    value={get(item, 'debitContext')}
                                                    onClick={() => {
                                                        this.props.getTemplate(this.props.templateId);
                                                        this.setState({
                                                            entryDisplay: false,
                                                            selectSubjectVisible: true,
                                                            selectSubjectType: 0,
                                                            currentIndex: index,
                                                            subjectValue: item
                                                        });
                                                    }}
                                                />
                                            </Col>
                                            <Col
                                                span={3}
                                                style={{
                                                    textAlign: 'right',
                                                    fontSize: 16,
                                                    height: 32,
                                                    lineHeight: '32px'
                                                }}
                                            >
                                                贷方 :
                                            </Col>
                                            <Col span={8} style={{paddingLeft: 10}}>
                                                <Input
                                                    placeholder='请选择科目'
                                                    value={get(item, 'creditContext')}
                                                    onClick={() => {
                                                        this.props.getTemplate(this.props.templateId);
                                                        this.setState({
                                                            entryDisplay: false,
                                                            selectSubjectVisible: true,
                                                            selectSubjectType: 1,
                                                            currentIndex: index,
                                                            subjectValue: item
                                                        });
                                                    }}
                                                />
                                            </Col>
                                        </Col>
                                    );
                                })
                            }
                        </Col>
                    </Row>
                </Modal>
                <BusinessNodeModal
                    defaultValue={businessData}
                    visible={this.state.businessNodeVisible}
                    getNodeModalThis={this.props.getNodeModalThis}
                    handleCancel={() => {
                        this.setState({
                            businessNodeVisible: false
                        });
                    }}
                    onOk={this.getBusinessData}
                />
                <SelectSubjectModal
                    visible={this.state.selectSubjectVisible}
                    lineValue={this.getLineValue(this.state.currentIndex)}
                    templateId={templateId}
                    templateDetailLoading={this.props.templateDetailLoading}
                    handleCancel={() => {
                        this.setState({
                            selectSubjectVisible: false
                        });
                    }}
                    onOk={this.getSelectSubjectData}
                    type={this.state.selectSubjectType}
                    templateData={templateData}
                    defaultValue={this.state.subjectValue}
                />
            </Fragment>
        );
    }
}

const styles = {
    lineStyle: {
        padding: '5px',
        fontSize: 14,
        fontWeight: 600
    },
    mt10: {
        marginTop: 10
    }
};

export default NewNodeModal;
