import React, {Component} from 'react';
import {RViewer, RViewerTrigger} from 'react-viewerjs';

import {Form, Input, Button, Row, Col, message, Steps, DatePicker, Cascader, Select} from 'antd';
import {logo, none, war, mp4, document, pass, passSuc} from '../../../../resource'
import Model from '../../Model'
import cloneDeep from 'lodash/cloneDeep';
import isArray from 'lodash/isArray';
import moment from 'moment';
import UploadImgs from "../../../../baseview/uploadFile/UploadImgs";
import UploadDocument from "../../../../baseview/uploadFile/UploadDocument";
import CityData from "../../../../resource/SwCityData";
import IsPower from '../../../Power/IsPower'


const {Step} = Steps;
const {RangePicker} = DatePicker;
let checkName = [];
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 24},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 24},
    },
};

class CompanyAutInf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            templateData: {},
            infoData: {},
            comData: {},
            isAgainSub: false,
            previewImage: '',
            picIdx: 0,
        };
        this.parentSn = '540224';  // 540224 = 企业实名认证
        this.formRef = React.createRef();
    }

    componentDidMount() {
        window.globalPermissions.checkPermission('DOC_ENTERPRISE_INFO', (res) => {
            if(!res)
                this.getAuthInfoModuleGet();
        });

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={'caiCss'}>
                <Form ref={this.formRef}/>
                <IsPower
                    key={'DOC_ENTERPRISE_INFO'}
                    permissionsName={'DOC_ENTERPRISE_INFO'}
                    style={{paddingTop: '240px'}}
                >
                    <h1>企业认证信息</h1>
                    <Form ref={this.formRef} scrollToFirstError={true} autoComplete="off" {...formItemLayout}
                          className={'form'} onFinish={this.onSubmit}>
                        {
                            this.reservedView()
                        }
                    </Form>
                </IsPower>
            </div>
        );
    }

    getAuthInfoModuleGet(isNewModel = 1, authStateVal = null) {
        Model.AuthInfoModuleGet({
            parentSn: this.parentSn,
            isNewModel: isNewModel, // 0：获取旧模板，1：获取新模板
            type: 1
        }, (res) => {
            this.collectCheckName(res.data.getDocGroupSnapshotVOList || []);
            if (authStateVal)
                res.data.authState = authStateVal;

            this.setState({templateData: res.data, isAgainSub: false}, () => {
                this.formRef.current.resetFields();

                // 认证状态（-2：缺少认证模板，-1：待提交，0：待审核，1：已审核，2：审核不通过 3：已失效）
                if ('0' === '' + res.data.authState || '1' === '' + res.data.authState || '2' === '' + res.data.authState || '3' === '' + res.data.authState) {
                    this.getAuthManageDetail();

                    if ('1' === '' + res.data.authState)
                        this.getCompanyAuthGet();
                }
            });

        }, (err) => {
        });
    }

    getAuthManageDetail() {
        Model.AuthManageDetail({
            id: this.state.templateData.id
        }, (res) => {
            this.setState({
                infoData: res.data
            });
        }, (err) => {
        });
    }

    getCompanyAuthGet() {
        Model.CompanyAuthGet({}, (res) => {
            this.setState({comData: res.data});
        }, (err) => {
        });
    }

    // 收集编辑提交的值并返回对应列表
    collectCheckName(list = []) {
        list.forEach(item => {
            item.getDocSnapshot && item.getDocSnapshot.forEach(chItem => {
                checkName.push(`${chItem.id}-${chItem.docSn}`);
                // 地址格式处理 replace
                if ('5' === '' + chItem.docType) {
                    chItem.cloneValue = cloneDeep(chItem.value);
                }
            });
        });
        return list;
    }

    reservedView() {
        let {templateData, infoData, comData, previewImage, picIdx} = this.state;
        // 个人实名认证通过
        if ('' + templateData.authState === '1') {
            return <div>
                <div className={'cai_Top'}>
                    <img className={'imgCover'} style={{width: '96px', height: '96px', borderRadius: '6px'}}
                         src={comData.logo || logo} alt=""/>
                    <div>
                        认证名称
                        <h2>{comData.authUserName || ''}</h2>
                    </div>
                </div>
                <div className={'cai_con'}>
                    <h2>基本信息</h2>
                    <ul>
                        <li className={'li_bottom'}>
                            <span>企业名称：</span>
                            {comData.enterpriseName || ''}
                        </li>
                        <li>
                            <span>企业地址：</span>

                        </li>
                    </ul>
                </div>
                <div className={'cai_con'}>
                    <h2>主题证件信息</h2>
                    <ul>
                        <li className={'li_bottom'}>
                            <Row>
                                <Col span={8}>
                                    <span>企业类型：</span>

                                </Col>
                                <Col span={16}>
                                    <span>工商执照注册号/统一社会信用代码：</span>

                                </Col>
                            </Row>
                        </li>
                        <li className={'li_bottom'}>
                            <span>经营范围：</span>
                            <span className={'span_con'}>

                            </span>
                        </li>
                        <li className={'li_bottom'}>
                            <span>企业成立日期：</span>

                        </li>
                        <li>
                            <span>企业营业期限：</span>
                        </li>
                    </ul>
                </div>
                <IsPower
                    key={'DOC_ENTERPRISE_AUTHINFO'}
                    permissionsName={'DOC_ENTERPRISE_AUTHINFO'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    <h2
                        style={{
                            fontSize: '16px',
                            marginTop: '32px',
                            marginBottom: '16px',
                        }}
                    >认证情况</h2>
                    <Row style={{marginBottom: '8px'}}>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >认证组编号：</span>
                            {infoData.uParentSn}
                        </Col>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >认证组名称：</span>
                            {infoData.parentName}
                        </Col>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >认证状态：</span>
                            <span
                                style={{color: '#03A613'}}
                            >已通过</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >提交时间：</span>
                            {
                                infoData.createTime ? moment(infoData.createTime).format("YYYY-MM-DD HH:mm") : ''
                            }
                        </Col>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >提交企业：</span>
                            {infoData.userName}
                        </Col>
                        <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                }}
                            >审核时间：</span>
                            {
                                infoData.dealTime ? moment(infoData.dealTime).format("YYYY-MM-DD HH:mm") : ''
                            }
                        </Col>
                    </Row>
                </IsPower>
                <div
                    style={{
                        marginTop: '32px'
                    }}
                >
                    {
                        '1' === '' + templateData.isApprove && <Button type="primary"
                                                                       style={{
                                                                           width: '128px',
                                                                           height: '36px',
                                                                           fontSize: '16px',
                                                                       }}
                                                                       onClick={() => {
                                                                           window.globalPermissions.checkPermission('DOC_ENTERPRISE_RECOMMIT', (res) => {
                                                                               if (res)
                                                                                   return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                                                               templateData.authState = '-1';
                                                                               this.setState({
                                                                                   isAgainSub: true,
                                                                                   templateData
                                                                               });
                                                                           });
                                                                       }}
                        >更新资料</Button>
                    }
                    <Button
                        style={{
                            width: '128px',
                            height: '36px',
                            fontSize: '16px',
                            marginLeft: '16px'
                        }}
                        onClick={() => {
                            window.globalPermissions.checkPermission('DOC_ENTERPRISE_AUTHINFO', (res) => {
                                if (res)
                                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                this.getAuthInfoModuleGet(0, '资料详情');
                            });
                        }}
                    >资料详情</Button>
                </div>
            </div>

            // 没有认证模板的展示
        } else if ('' + templateData.authState === '-2') {
            return <div
                style={{textAlign: 'center', marginTop: '100px'}}
            >
                <img src={none} alt=""
                     style={{width: '293px',}}
                />
                <p
                    style={{color: 'rgba(43,52,65,0.65)', marginTop: '30px', marginBottom: '0px'}}
                >暂无认证资料</p>
            </div>;

            // 用户没有提交过认证，或者更新认证资料
        } else if ('' + templateData.authState === '-1') {
            return <div>
                <Steps current={0}>
                    <Step title="提交认证资料" description=""/>
                    <Step title="平台审核" subTitle="" description=""/>
                    <Step title="完成" description=""/>
                </Steps>
                {
                    templateData.getDocGroupSnapshotVOList && templateData.getDocGroupSnapshotVOList.map((item, idx) => {
                        return <div
                            key={'List_' + idx}
                        >
                            <h2
                                style={{
                                    fontSize: '16px',
                                    marginTop: '32px',
                                    marginBottom: '24px',
                                }}
                            >{item.groupName || ''}</h2>
                            {
                                item.getDocSnapshot && item.getDocSnapshot.map((cItem, cIdx) => {
                                    return this.makeFormItem(cItem, cIdx, idx);
                                })
                            }
                        </div>
                    })
                }
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        style={{width: '68px', height: '36px', fontSize: '16px', marginTop: '8px', lineHeight: '100%'}}
                    >提交</Button>
                    {
                        this.state.isAgainSub && <Button
                            style={{
                                width: '68px',
                                height: '36px',
                                fontSize: '16px',
                                marginTop: '8px',
                                marginLeft: '16px'
                            }}
                            onClick={() => {
                                this.getAuthInfoModuleGet();
                            }}
                        >取消</Button>
                    }
                </Form.Item>
            </div>

            // 实名认证待审核、审核不通过
        } else if ('' + templateData.authState === '0' || '' + templateData.authState === '2') {
            return <div>
                <Steps current={1} status={'' + templateData.authState === '2' ? 'error' : 'process'}>
                    <Step title="提交认证资料" description=""
                          icon={<img src={passSuc} alt=""
                                     style={{
                                         width: '32px',
                                         height: '32px',
                                         borderRadius: '50%',
                                         marginBottom: '2px'
                                     }}
                          />}
                    />
                    <Step title={<div
                        style={{
                            color: '#2B3441',
                            fontSize: '16px',
                        }}
                    >
                        {
                            '' + templateData.authState === '2' ? '审核不通过' : '平台待审核'
                        }
                    </div>} subTitle="" description=""
                          icon={<img src={pass} alt=""
                                     style={{
                                         width: '32px',
                                         height: '32px',
                                         boxShadow: '0px 0px 4px 0px rgba(241,44,32,0.5)',
                                         borderRadius: '50%',
                                         marginLeft: '2px',
                                         marginBottom: '2px'
                                     }}
                          />}
                    />
                    <Step title="完成" description=""/>
                </Steps>
                <IsPower
                    key={'DOC_ENTERPRISE_AUTHINFO'}
                    permissionsName={'DOC_ENTERPRISE_AUTHINFO'}
                    isShowRes={false}
                    isShowWait={false}
                >
                    <div
                        style={{
                            borderBottom: '1px solid rgba(43, 52, 65, 0.09)',
                            paddingBottom: '24px',
                        }}
                    >
                        <h2
                            style={{
                                fontSize: '16px',
                                marginTop: '32px',
                                marginBottom: '24px',
                            }}
                        >认证情况</h2>
                        <Row style={{paddingLeft: '30px', marginBottom: '8px'}}>
                            <Col span={8}>
                            <span
                                style={{
                                    lineHeight: '20px',
                                    marginBottom: '8px',
                                    fontWeight: '600',
                                }}
                            >认证组编号：</span>
                                {infoData.uParentSn}
                            </Col>
                            <Col span={8}>
                                <span
                                    style={{
                                        lineHeight: '20px',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                    }}
                                >认证组名称：</span>
                                {infoData.parentName}
                            </Col>
                            <Col span={8}>
                                <span
                                    style={{
                                        lineHeight: '20px',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                    }}
                                >认证状态：</span>
                                <span
                                    style={{color: '' + templateData.authState === '2' ? '#f00' : '#4481EB'}}
                                >{'' + templateData.authState === '2' ? '审核不通过' : '待审核'}</span>
                            </Col>
                        </Row>
                        <Row style={{paddingLeft: '30px', marginBottom: '8px'}}>
                            <Col span={8}>
                                <span
                                    style={{
                                        lineHeight: '20px',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                    }}
                                >提交企业：</span>
                                {infoData.userName}
                            </Col>
                            <Col span={8}>
                                <span
                                    style={{
                                        lineHeight: '20px',
                                        marginBottom: '8px',
                                        fontWeight: '600',
                                    }}
                                >提交时间：</span>
                                {
                                    infoData.createTime ? moment(infoData.createTime).format("YYYY-MM-DD HH:mm") : ''
                                }
                            </Col>
                            {
                                '' + templateData.authState === '2' ? [
                                    <Col span={8}>
										<span
                                            style={{
                                                lineHeight: '20px',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                            }}
                                        >审核时间：</span>
                                        {
                                            infoData.dealTime ? moment(infoData.dealTime).format("YYYY-MM-DD HH:mm") : ''
                                        }
                                    </Col>
                                ] : null
                            }
                        </Row>
                        <Row style={{paddingLeft: '30px', marginBottom: '8px'}}>
                            {
                                '' + templateData.authState === '2' ? [
                                    <Col span={24}>
										<span
                                            style={{
                                                lineHeight: '20px',
                                                marginBottom: '8px',
                                                fontWeight: '600',
                                            }}
                                        >驳回原因：</span>
                                        {infoData.memo}
                                    </Col>,
                                ] : null
                            }
                        </Row>
                    </div>
                </IsPower>
                {
                    templateData.getDocGroupSnapshotVOList && templateData.getDocGroupSnapshotVOList.map((item, idx) => {
                        return <div
                            key={'List_' + idx}
                        >
                            <h2
                                style={{
                                    fontSize: '16px',
                                    marginTop: '32px',
                                    marginBottom: '24px',
                                }}
                            >{item.groupName || ''}</h2>
                            {
                                item.getDocSnapshot && item.getDocSnapshot.map((cItem, cIdx) => {
                                    return this.makeTextView(cItem, cIdx);
                                })
                            }
                        </div>
                    })
                }
                {
                    '' + templateData.authState === '2' && '1' === '' + templateData.isApprove
                    &&
                    <Button
                        type="primary"
                        style={{
                            width: '128px',
                            height: '36px',
                            fontSize: '16px',
                            marginTop: '16px'
                        }}
                        onClick={() => {
                            templateData.authState = '-1';
                            this.setState({
                                isAgainSub: true,
                                templateData
                            });
                        }}
                    >重新提交</Button>
                }
            </div>

        } else if ('资料详情' === '' + templateData.authState) {
            return <IsPower
                key={'DOC_ENTERPRISE_AUTHINFO'}
                permissionsName={'DOC_ENTERPRISE_AUTHINFO'}
                style={{paddingTop: '150px'}}
            >
                <div>
                    {
                        templateData.getDocGroupSnapshotVOList && templateData.getDocGroupSnapshotVOList.map((item, idx) => {
                            return <div
                                key={'List_' + idx}
                            >
                                <h2
                                    style={{
                                        fontSize: '16px',
                                        marginTop: '32px',
                                        marginBottom: '24px',
                                    }}
                                >{item.groupName || ''}</h2>
                                {
                                    item.getDocSnapshot && item.getDocSnapshot.map((cItem, cIdx) => {
                                        return this.makeTextView(cItem, cIdx);
                                    })
                                }
                            </div>
                        })
                    }
                    {/*图片放大组件*/}
                    <RViewer options={{
                        toolbar: {//Since there is only one picture, let's hide "prev" and "next"
                            prev: true,
                            next: true
                        }
                    }} imageUrls={previewImage}>
                        <RViewerTrigger index={picIdx}>
                            <div ref={(c) => {
                                this.showPicPreview = c
                            }}></div>
                        </RViewerTrigger>
                    </RViewer>
                    <Button
                        style={{
                            width: '128px',
                            height: '36px',
                            fontSize: '16px',
                            marginTop: '16px'
                        }}
                        onClick={() => {
                            this.getAuthInfoModuleGet();
                        }}
                    >返回</Button>
                </div>
            </IsPower>;

        } else {
            return null;

        }
    }

    enlargeImg(url, idx) {
        this.setState(
            {previewImage: url, picIdx: idx},
            () => {
                this.showPicPreview && this.showPicPreview.click();
            }
        )
    }

    makeFormItem(item, cIdx, pIdx) {
        const {getFieldValue, setFields, setFieldsValue} = this.formRef.current;
        let {templateData, isAgainSub} = this.state;
        const selectOption = {
            mode: "multiple"
        }
        if (item.docParam === '' || parseInt(item.docParam) === 1) {
            delete selectOption.mode
        }
        const changeValues = (rule, value, callback) => {
            if (value.length > parseInt(item.docParam)) {
                callback(`该选项最大数量为${parseInt(item.docParam)}`)
            } else {
                callback()
            }
        }
        item.rules = []
        if (item.docType + '' === '7' && item.docParam !== '') {
            item.rules = [{
                required: true,
                validator: changeValues
            }]
        }
        const docTypeFun = (type) => {
            switch (type + '') {
                case '7': // 下拉选择框
                    return (
                        <Select
                            labelInValue={true}
                            {...selectOption}
                        >
                            {item && item.listOption && item.listOption.map(n => (
                                <Select.Option
                                    key={n.optionId + ''}
                                    value={n.optionId + ''}
                                >
                                    {n.optionName}
                                </Select.Option>
                            ))}
                        </Select>
                    )
                case '6': // 文件
                    const changeType = (pra) => {
                        pra = pra ? JSON.parse(pra) : [];
                        pra = pra.map(item => {
                            return {
                                key: '',
                                msg: '',
                                originalName: item.fileName,
                                type: item.type,
                                url: item.url,
                                file: '',
                                uid: '',
                                progressRate: 0, // 上传进度
                                uploadRes: null, // 上传结果 '成功' or '失败'
                            }
                        });
                        return pra;
                    };
                    return <UploadDocument
                        style={{
                            width: '356px'
                        }}
                        data={{
                            fileUrl: changeType(item.value),
                            maxNum: item.docParam || 1,
                        }}
                        callBack={(url) => {
                            let obj = {};
                            obj[`${item.id}-${item.docSn}`] = url;
                            setFieldsValue(obj);
                        }}
                    />;

                case '5': // 地址
                    return <Cascader
                        popupClassName={'perInfCss_cas'}
                        options={CityData.data}
                        placeholder="请选择地区"
                        style={{width: '356px'}}
                        onChange={(value, selectedOptions) => {
                            let addressVal = {};
                            addressVal.province = selectedOptions[0] ? selectedOptions[0].label : '';
                            addressVal.provinceId = selectedOptions[0] ? selectedOptions[0].value : '';
                            addressVal.city = selectedOptions[1] ? selectedOptions[1].label : '';
                            addressVal.cityId = selectedOptions[1] ? selectedOptions[1].value : '';
                            addressVal.district = selectedOptions[2] ? selectedOptions[2].label : '';
                            addressVal.districtId = selectedOptions[2] ? selectedOptions[2].value : '';

                            templateData.getDocGroupSnapshotVOList[pIdx].getDocSnapshot[cIdx].value = JSON.stringify(addressVal);
                            this.setState({templateData})
                        }}
                    />;

                case '4': // 日期区间
                    return <RangePicker
                        style={{
                            width: '356px'
                        }}
                    />;

                case '3': // 日期
                    return <DatePicker
                        dropdownClassName={'prn_DatePicker'}
                        style={{
                            width: '356px'
                        }}
                    />;

                case '2': // 上传图片
                    return <UploadImgs
                        data={{
                            fileUrl: item.value ? item.value.split(',') : [],
                            maxNum: item.docParam || 1,
                        }}
                        callBack={(url) => {
                            let obj = {};
                            obj[`${item.id}-${item.docSn}`] = url;
                            setFieldsValue(obj);
                            templateData.getDocGroupSnapshotVOList[pIdx].getDocSnapshot[cIdx].value = url.length > 0 ? url.join(',') : '';

                            this.setState({templateData});
                        }}
                    />;

                case '1': // 文本框组件
                default :
                    return <Input
                        style={{width: '356px'}}
                        maxLength={30}
                        placeholder={`请输入${item.docName || ''}`}
                    />;
            }
        };

        const initialValue = (type) => {
            switch ('' + type) {
                case '7':
                    let newValue = []
                    if (item.value && item.value !== '') {
                        newValue = JSON.parse(item.value)
                    }
                    newValue.forEach(n => {
                        n.key = n.optionId
                        n.label = n.optionName
                        delete n.optionId
                        delete n.optionName
                    })
                    return isAgainSub && (item.value && item.value !== '') ? newValue : [];
                case '6':
                    let valArr = item.value ? JSON.parse(item.value) : [];
                    valArr = valArr.map(filItem => {
                        return {
                            originalName: filItem.fileName,
                            type: filItem.type,
                            url: filItem.url,
                        }
                    });

                    return isAgainSub && item.value ? valArr : [];

                case '5':
                    let valObj = item.value ? JSON.parse(item.value) : '';
                    let addId = [];
                    if (valObj) {
                        addId = [valObj.provinceId, valObj.cityId, valObj.districtId];
                    }
                    return isAgainSub && item.value ? addId : [];

                case '4':
                    return isAgainSub && item.value ? [moment(item.value.split(',')[0], 'YYYY-MM-DD'), moment(item.value.split(',')[1], 'YYYY-MM-DD')] : '';

                case '3':
                    return isAgainSub && item.value ? moment(item.value, 'YYYY-MM-DD') : '';

                case '2':
                    return isAgainSub && item.value ? item.value.split(',') : [];

                case '1':
                    // default:
                    return isAgainSub && item.value ? item.value : '';
            }
        };

        return <Form.Item
            label={item.docName || ''}
            key={'cList_' + cIdx}
            name={item.id + '-' + item.docSn}
            initialValue={initialValue(item.docType)}
            rules={[
                {required: '' + item.isRequired === '1', message: `${item.docName || ''}不能为空!`},
            ].concat(item.rules)}
        >
            {docTypeFun(item.docType)}
        </Form.Item>
    }

    makeTextView(item, cIdx) {
        const valueFun = (values) => {
            switch (item.docType + '') {
                case '7':
                    values = values ? JSON.parse(values) : '';
                    const optionNames = []
                    values && values.forEach(n => optionNames.push(n.optionName))
                    return optionNames.join(',')
                case '6':
                    values = values ? JSON.parse(values) : '';
                    return values ? <div
                        style={{
                            width: '356px',
                            borderRadius: '4px',
                            border: '1px solid rgba(43,52,65,0.25)',
                            padding: '16px',
                        }}
                    >
                        {
                            values.map((fItem, fIdx) => {
                                return <div
                                    key={'fItem_' + fIdx}
                                    style={{
                                        position: 'relative',
                                        marginBottom: values.length - 1 == fIdx ? '0px' : '18px'
                                    }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            paddingRight: '35px',
                                            overflow: 'hidden',
                                            whiteSpace: 'nowrap',
                                            textOverflow: 'ellipsis'
                                        }}
                                        title={fItem.fileName}
                                    >
                                        <img src={
                                            this.fileIcon(fItem.fileName ?
                                                fItem.fileName.substring(fItem.fileName.lastIndexOf(".") + 1) : '')
                                        } alt=""
                                             style={{
                                                 width: '16px',
                                                 height: '16px',
                                                 marginRight: '8px',
                                                 verticalAlign: '-2px',
                                             }}
                                        />
                                        {fItem.fileName}
                                    </div>
                                    <a
                                        style={{
                                            position: 'absolute',
                                            right: '0',
                                            top: '0',
                                        }}
                                        onClick={() => {
                                            window.download(fItem.url);
                                        }}
                                    >下载</a>
                                </div>
                            })
                        }
                    </div> : null;

                case '5':
                    values = values ? JSON.parse(values) : '';
                    return values ? values.province + values.city + values.district : values;

                case '4':
                    return values ? values.replace(',', ' 至 ') : '';

                case '2':
                    let imgArr = values ? values.split(',') : [];
                    return imgArr.map((url, imgIdx) => {
                        return <img src={url} alt=""
                                    title={'查看大图'}
                                    key={'img_' + imgIdx}
                                    style={{
                                        display: 'inline-block',
                                        borderRadius: '4px',
                                        width: '72px',
                                        height: '72px',
                                        marginRight: '16px',
                                        marginBottom: '16px',
                                        cursor: 'pointer',
                                    }}
                                    onClick={() => this.enlargeImg(imgArr, imgIdx)}
                        />
                    });

                case '3':
                case '1':
                default:
                    return values;
            }
        };

        return <Row
            key={'TextView_' + cIdx}
            style={{paddingLeft: '30px', marginBottom: '24px'}}
        >
            <Col span={24}
                 style={{
                     lineHeight: '20px',
                     marginBottom: '8px',
                     fontWeight: '600',
                 }}
            >{item.docName || ''}：</Col>
            <Col span={24}
                 style={{lineHeight: '32px'}}
            >
                {valueFun(item.value)}
            </Col>
        </Row>
    }

    // 图标配置
    fileIcon(type) {
        switch (type + '') {
            case '失败':
                return war;

            case 'mp4':
                return mp4;

            default:
                return document;
        }
    }

    onSubmit = (e) => {
        let {templateData} = this.state;
        this.formRef.current.validateFields(checkName).then(values => {
            let cloneData = cloneDeep(templateData);

            // 整理提交数据的格式
            cloneData.getDocGroupSnapshotVOList.forEach((item, idx) => {
                item.getDocSnapshot.forEach((cItem, cIdx) => {
                    for (let idAndDocSn in values) {
                        if (cItem.id == idAndDocSn.split('-')[0] && cItem.docSn == idAndDocSn.split('-')[1]) {
                            // 照片
                            if ('2' === '' + cItem.docType) {
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn] ? values[idAndDocSn].join(',') : '';

                            } else if ('3' === '' + cItem.docType) {
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn] ? values[idAndDocSn].format('YYYY-MM-DD') : '';

                                // 日期区间
                            } else if ('4' === '' + cItem.docType) {
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn][0] ? (values[idAndDocSn][0].format('YYYY-MM-DD') + ',' + values[idAndDocSn][1].format('YYYY-MM-DD')) : '';

                                // 省市区
                            } else if ('5' === '' + cItem.docType) {
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value || '';

                                // 附件
                            } else if ('6' === '' + cItem.docType) {
                                values[idAndDocSn] = values[idAndDocSn].map(vItem => {
                                    return {
                                        fileName: vItem.originalName,
                                        type: vItem.type,
                                        url: vItem.url,
                                    }
                                });
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn].length <= 0 ? '' : JSON.stringify(values[idAndDocSn]);

                            } else if ('7' === '' + cItem.docType) {
                                if (!isArray(values[idAndDocSn])) {
                                    values[idAndDocSn] = [values[idAndDocSn]]
                                }
                                values[idAndDocSn].forEach(n => {
                                    n.optionId = n.key
                                    n.optionName = n.label
                                    delete n.key
                                    delete n.label
                                })
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn].length <= 0 ? '' : JSON.stringify(values[idAndDocSn]);
                            } else {
                                cloneData.getDocGroupSnapshotVOList[idx].getDocSnapshot[cIdx].value = values[idAndDocSn];

                            }
                        }
                    }
                });
            });

            // 去除多余字段
            cloneData.docParentSnapshot = cloneData.getDocGroupSnapshotVOList;
            cloneData.isAuth = cloneData.authState;
            delete cloneData.getDocGroupSnapshotVOList;
            delete cloneData.isApprove;
            delete cloneData.parentSn;
            delete cloneData.authState;

            window.globalPermissions.checkPermission('DOC_ENTERPRISE_RECOMMIT', (res) => {
                if (res)
                    return message.error('抱歉，您没有该操作权限，请联系管理员！');

                Model.AuthInfoSave({
                    saveUserDoc: JSON.stringify(cloneData),
                }, (res) => {
                    message.success('提交成功', 1);
                    this.getAuthInfoModuleGet(0);

                }, (err) => {
                });
            });
        });
    }

}

export default CompanyAutInf;
