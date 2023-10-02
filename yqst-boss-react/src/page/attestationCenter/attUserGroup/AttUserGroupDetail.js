/**
 * Created by yb on 2019/10/23.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Row, Col, Modal, message, Input, DatePicker, Cascader, Popover, Select, Steps} from 'antd';
import {EditOutlined, DeleteOutlined, RollbackOutlined, QuestionCircleOutlined, CheckOutlined} from '@ant-design/icons';
import isArray from 'lodash/isArray'
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import SwitchName from './SwitchName';
import CityData from '../../../resource/SwCityData';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import UploadFile from "../../../baseview/uploadFile/UploadFile";
import UploadOnlyFile from "../../../baseview/uploadFile/UploadOnlyFile";

const {Step} = Steps;
const {confirm} = Modal;
const {RangePicker} = DatePicker;


class AttUserGroupDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                docParentSnapshot: []
            },
            logList: [],
            isEdit: false,
            loading: false,
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
            <Form ref={this.formRef} autoComplete="off">
                <ViewContent
                    crumb={[
                        {name: "认证中心"},
                        {name: "用户认证组列表", link: '/Pages/AttUserGroupList'},
                        {name: "用户认证组详情"},
                    ]}
                    topBtn={
                        !this.state.isEdit ? <div>
                            {
                                '3' !== '' + this.state.data.isAuth &&
                                <Button type="primary" icon={<EditOutlined/>} style={{marginLeft: 15}}
                                        onClick={() => {
                                            this.setState({
                                                isEdit: true
                                            }, () => {
                                                this.formRef.current.resetFields();
                                            })
                                        }}
                                >编辑</Button>
                            }
                            {
                                '3' === '' + this.state.data.isAuth &&
                                <Button type="danger" icon={<DeleteOutlined/>} style={{marginLeft: 15}}
                                        onClick={() => {
                                            this.delBtn()
                                        }}
                                >删除</Button>
                            }
                            <Link to={'/Pages/AttUserGroupList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined/>}>返回</Button>
                            </Link>
                        </div> : <div>
                            <Button type="primary" icon={<CheckOutlined/>} style={{marginLeft: 15}}
                                    onClick={this.handleSubmit.bind(this)}
                            >保存</Button>
                            {
                                '1' === '' + this.state.data.isAuth && (
                                    <Button
                                        style={{marginLeft: 15}}
                                        onClick={() => {
                                            confirm({
                                                title: '最新模板的资料可能会有较大差异,是否获取最新模板？',
                                                content: '',
                                                okText: '确认',
                                                cancelText: '取消',
                                                width: 480,
                                                onOk: () => {
                                                    // this.setState({isEdit: false});
                                                    this.getDocParent();
                                                },
                                                onCancel() {
                                                    // console.log('Cancel');
                                                },
                                            });
                                        }}
                                    >
                                        获取新模板
                                    </Button>
                                )
                            }
                            <Button style={{marginLeft: 15}} onClick={() => {
                                confirm({
                                    title: '确认要取消编辑吗?',
                                    content: '',
                                    okText: '确认',
                                    cancelText: '取消',
                                    onOk: () => {
                                        // this.setState({isEdit: false});
                                        this.getInfo();
                                    },
                                    onCancel() {
                                        // console.log('Cancel');
                                    },
                                });
                            }}>取消</Button>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeYHView()}
                    {this.makeBZView()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.UserAttDGet({id: this.id}, (res) => {
            this.setState({
                data: res.data,
                isEdit: false,
                loading: false
            });
        }, (err) => {
        });
    }

    getDocParent() {
        Model.UserAttDPGet({
            parentSn: this.state.data.parentSn,
            isNewModel: 1,
            userId: this.state.data.userId,
            personId: this.state.data.personId,
            type: this.state.data.type || 0,
        }, (res) => {
            this.setState({
                data: {
                    ...this.state.data,
                    docParentSnapshot: res.data.getDocGroupSnapshotVOList || []
                }
            });
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data, isEdit} = this.state;
        let noSetData = [
            {key: 'uParentSn', type: 'Texts', label: '用户认证组编号', span: 12, value: data.uParentSn},
            {
                key: 'isAuth', type: !isEdit ? 'Texts' : 'Select', label: '认证状态', span: 12,
                value: !isEdit ? SwitchName.isAuth(data.isAuth) : data.isAuth + '',
                data: {
                    list: [
                        {
                            value: '0',
                            name: '待认证'
                        },
                        {
                            value: '1',
                            name: '已通过'
                        },
                        {
                            value: '2',
                            name: '不通过'
                        },
                        {
                            value: '3',
                            name: '已失效',
                            disabled: true
                        }
                    ]
                },
            },
            {
                key: 'createTime', type: 'Texts', label: '产生时间', span: 12,
                value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''
            },
            {key: 'id', type: 'Texts', label: '认证组ID', span: 12, value: data.id},
            {key: 'parentName', type: 'Texts', label: '认证组名称', span: 12, value: data.parentName},
            {key: 'softName', type: 'Texts', label: '关联云服务', span: 12, value: data.softName},
            {key: 'userId', type: 'Texts', label: '企业ID', span: 12, value: data.userId},
            {key: 'userName', type: 'Texts', label: '企业名称', span: 12, value: data.userName},
            {
                key: 'memo', type: !isEdit ? 'Texts' : 'Input', label: '备注', placeholder: '请填写备注', span: 12,
                value: data.memo,
                attribute: {
                    maxLength: 200,
                    style: {
                        width: '100%',
                        height: '100px',
                    },
                    type: "textarea",
                },
            },
        ];
        return <Card
            type="inner"
            title="基本信息"
        >
            <AssemblySet key={'makeBaseView'} data={noSetData} form={this.formRef.current}/>
        </Card>
    }

    makeYHView() {
        const {data} = this.state;
        const {docParentSnapshot} = data;
        const columns = [
            {
                title: '资质ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '资质编码',
                key: 'docSn',
                dataIndex: 'docSn',
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
                width: 90,
                render: (res) => {
                    return SwitchName.docType(res);
                }
            },
            {
                title: '是否必填',
                key: 'isRequired',
                dataIndex: 'isRequired',
                width: 90,
                render: (res) => {
                    return SwitchName.isRequired(res);
                }
            },
            {
                title: '是否显示',
                key: 'isDisplay',
                dataIndex: 'isDisplay',
                width: 90,
                render: (res) => {
                    return SwitchName.isDisplay(res);
                }
            },
            {
                title: '接口验证',
                key: 'verifyStatus',
                dataIndex: 'verifyStatus',
                width: 90,
                render: (res, data) => {
                    return <div>
                        {SwitchName.verifyStatus(res)}
                        {
                            '2' === '' + res && <Popover placement="topRight" title={'不通过的原因：'}
                                                         content={<div style={{textAlign: 'center'}}>
                                                             {data.memo ? data.memo : '暂无填写原因...'}
                                                         </div>}
                            >
                                <QuestionCircleOutlined style={{fontSize: 14, marginLeft: 5}}/>
                            </Popover>
                        }
                    </div>;
                }
            },
            {
                title: '提交内容',
                key: 'value',
                dataIndex: 'value',
                width: 300,
                render: (res, data, idx) => {
                    return this.isValueFun(data, idx, data.pIdx);
                }
            },
        ];

        return <Card
            type="inner"
            title="用户认证组信息"
            style={{marginTop: 15}}
        >
            {
                docParentSnapshot && docParentSnapshot.map((item, idx) => {
                    // 记录父级的下标
                    const newGetDocSnapshot = item.getDocSnapshot ? item.getDocSnapshot.map((cItem, index) => {
                        cItem.pIdx = idx;
                        //加入唯一key防止输入时重新渲染
                        cItem.key = "newGetDocSnapshot-" + index;
                        return cItem
                    }) : [];
                    return <Card
                        key={'doc_' + idx}
                        type="inner"
                        style={{marginTop: 0 == idx ? 0 : 15}}
                        bodyStyle={{padding: '15px 5px'}}
                        title={
                            <Row>
                                <Col span={12}>
                                    资质组ID：{item.id}
                                </Col>
                                <Col span={12}>
                                    资质组名称：{item.groupName}
                                </Col>
                            </Row>
                        }
                    >
                        <SWTable
                            columns={columns}
                            dataSource={newGetDocSnapshot || []}
                            pagination={false}
                        />
                    </Card>
                })
            }
            {
                (!docParentSnapshot || docParentSnapshot.length <= 0) &&
                <div style={{textAlign: 'center', color: '#ccc', fontSize: '18px'}}>
                    暂无信息...
                </div>
            }
        </Card>
    }

    makeBZView() {
        const {listLogVOS = []} = this.state.data;
        return !this.state.isEdit ? <Card
            type="inner"
            title="操作记录"
            style={{marginTop: 15, width: '100%'}}
        >
            <Steps className={'Steps'} progressDot current={listLogVOS.length - 1} direction="vertical">
                {
                    listLogVOS.map((item, idx) => {
                        return <Step
                            key={'Steps_' + idx}
                            title={item.statusName}
                            description={<div>
                                <div>操作人：{item.createBy}</div>
                                <div>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD HH:mm:ss') : ''}</div>
                                <div>备注：{item.memo}</div>
                            </div>}
                        />
                    })
                }
            </Steps>
        </Card> : null;
    }

    isValueFun(parData, idx, pIdx) {
        let {isEdit, data} = this.state;
        const dateFormat = 'YYYY-MM-DD';
        switch (parData.docType + '') {
            case '1': // 返回文本
                return !isEdit ? parData.value : <Input
                    maxLength={200}
                    value={parData.value}
                    placeholder="请填写"
                    onChange={(e) => {
                        data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = e.target.value;
                        this.setState({data});
                    }}
                />;

            case '2': // 返回图片
                return <UploadFile
                    key={'tp' + parData.id}
                    data={{
                        maxNum: 3,
                        uploadText: '上传图片',
                        fileUrlList: parData.value ? parData.value.split(',') : [],
                        isReadOnly: !isEdit
                    }}
                    callBackFiles={(urls) => {
                        data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = urls.join(',');
                        this.setState({data});
                    }}
                />;

            case '3': // 时间点
                return !isEdit ? parData.value : <DatePicker
                    style={{width: '100%'}}
                    value={parData.value ? moment(parData.value, dateFormat) : null}
                    format={dateFormat}
                    onChange={(date, dateString) => {
                        data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = dateString;
                        this.setState({data});
                    }}
                />;

            case '4': // 时间区间
                return !isEdit ? parData.value : <RangePicker
                    style={{width: '100%'}}
                    defaultValue={parData.value ? [
                        moment(parData.value.split(',')[0], dateFormat),
                        moment(parData.value.split(',')[1], dateFormat)
                    ] : null}
                    format={dateFormat}
                    onChange={(date, dateString) => {
                        data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = dateString.join(',');
                        this.setState({data});
                    }}
                />;

            case '5': // 地址
                let values = parData.value ? JSON.parse(parData.value) : '';

                if (isEdit) {
                    return <Cascader
                        value={[values.provinceId + '', values.cityId + '', values.districtId + '']}
                        options={CityData.data}
                        placeholder="请选择"
                        onChange={(val, names) => {
                            // console.log(val, names);
                            let newVal = {};
                            newVal.provinceId = names[0] ? names[0].value : '';
                            newVal.province = names[0] ? names[0].label : '';
                            newVal.cityId = names[1] ? names[1].value : '';
                            newVal.city = names[1] ? names[1].label : '';
                            newVal.districtId = names[2] ? names[2].value : '';
                            newVal.district = names[2] ? names[2].label : '';
                            data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = JSON.stringify(newVal);
                            this.setState({data});
                        }}
                    />
                }
                return values ? values.province + values.city + values.district : '';

            case '6': // 附件
                return <div style={{width: 300}}>
                    <UploadOnlyFile
                        key={'fj' + parData.id}
                        data={{
                            maxNum: parseInt(parData.docParam || 1),
                            uploadText: '',
                            fileList: parData.value ? JSON.parse(parData.value) : [],
                            isReadOnly: !isEdit,
                            isDowload: !isEdit,
                            attributeName: {
                                originalName: 'fileName',
                                type: 'type',
                                url: 'url',
                            },
                        }}
                        callBackFiles={(obj) => {
                            data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = JSON.stringify(obj);
                            this.setState({data});
                        }}
                    />
                </div>;
            case '7':
                const selectValue = []
                const selectOptionShowData = []
                const selectOption = {
                    mode: 'multiple',
                    labelInValue: true,
                }
                if (parData.docParam === '' || parseInt(parData.docParam) < 2) {
                    delete selectOption.mode
                }
                let arr = []
                if (parData.value !== '') {
                    arr = JSON.parse(parData.value)
                }
                arr.forEach(n => {
                    selectValue.push(n.optionName)
                    selectOptionShowData.push({
                        optionId: n.optionId,
                        optionName: n.optionName,
                        key: n.optionId,
                        label: n.optionName
                    })
                })
                return (
                    !isEdit ? selectValue.join(',') :
                        <Select
                            {...selectOption}
                            defaultValue={selectOptionShowData}
                            onChange={(value) => {
                                if (isArray(value)) {
                                    value.forEach(n => {
                                        n.optionId = n.key
                                        n.optionName = n.label
                                    })
                                } else {
                                    value = [value]
                                    value.forEach(n => {
                                        n.optionId = n.key
                                        n.optionName = n.label
                                    })
                                }
                                data.docParentSnapshot[pIdx].getDocSnapshot[idx].value = JSON.stringify(value)
                                this.setState({data});
                            }}
                        >
                            {
                                parData.listOption && parData.listOption.map(n => (
                                    <Select.Option value={n.optionId} key={n.optionId}>{n.optionName}</Select.Option>
                                ))
                            }
                        </Select>
                )

            default:
                return null;
        }
    }

    delBtn() {
        confirm({
            title: '确认要删除该用户认证组吗？',
            content: '',
            okText: '确认',
            okType: 'danger',
            cancelText: '取消',
            onOk: () => {
                Model.UserAttDDelete({id: this.id}, (res) => {
                    message.success('删除成功！');
                    this.props.history.push('/Pages/AttUserGroupList');
                }, (err) => {
                });
            },
            onCancel() {
                // console.log('Cancel');
            },
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields(['isAuth', 'memo']).then(values => {

            let {data} = this.state, hasSky = false;
            if ('2' === '' + values.isAuth && !values.memo) {
                return message.error('认证状态为不通过时，请在备注填写不通过的原因！');
            }
            data.docParentSnapshot.forEach(item => {
                item.getDocSnapshot.forEach(cItem => {
                    if ('1' === '' + cItem.isRequired && !cItem.value) {
                        hasSky = true;
                        return false;
                    }
                });
                if (hasSky) return false;
            });
            if (hasSky) {
                message.error('资质组中的必填项不能为空！');
                this.setState({loading: false});
                return false;
            }
            data.isAuth = values.isAuth;
            data.memo = values.memo;

            Model.UserAttDUpdate({saveUserDoc: JSON.stringify(data)}, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/AttUserGroupList');
            }, (err) => {
                this.setState({loading: false});
            });

        }).catch(() => {
            this.setState({loading: false});
        });
    }
}

export default AttUserGroupDetail
