import React, {Component} from 'react';
import {Form, Input, Button, Row, Col, message, Cascader} from 'antd';
import Model from '../../Model'
import CityData from "../../../../resource/SwCityData";
import UploadFileMethod from "../../../../baseview/uploadFile/UploadFileMethod";
import CheckInput from "../../../../utils/checkInput/CheckInput";

const {TextArea} = Input;
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

class CompanyBasInfEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            indList: [],
        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.getUserIList();
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div className={'cbiCss'}>
                <h1>企业基本信息</h1>
                {this.makeBaseView()}
            </div>
        );
    }

    getGetErpInfo() {
        Model.GetErpInfo({}, (res) => {
            this.setState({data: res.data}, () => {
                const comAddressId = [], addressId = [], industryId = [];
                // 收集所在地址id
                if (res.data.provinceId) {
                    comAddressId.push(res.data.provinceId + '');
                }
                if (res.data.cityId) {
                    comAddressId.push(res.data.cityId + '');
                }
                if (res.data.districtId) {
                    comAddressId.push(res.data.districtId + '');
                }

                // 收集办公地址id
                if (res.data.officeProvinceId) {
                    addressId.push(res.data.officeProvinceId + '');
                }
                if (res.data.officeCityId) {
                    addressId.push(res.data.officeCityId + '');
                }
                if (res.data.officeDistrictId) {
                    addressId.push(res.data.officeDistrictId + '');
                }

                // 收集行业id
                if (res.data.parentIndustryId) {
                    industryId.push(res.data.parentIndustryId)
                }
                if (res.data.industryId) {
                    industryId.push(res.data.industryId)
                }

                this.formRef.current.setFieldsValue({
                    companyName: res.data.enterpriseName || '',
                    companyFullName: res.data.enterpriseFullName || '',
                    counId: res.data.counId || '',
                    companyPhone: res.data.contactPhone || '',
                    faxWay: res.data.faxWay || '',
                    email: res.data.email || '',
                    officeAddress: res.data.companyOfficeAddress || '',
                    logo: res.data.logo || '',
                    country: res.data.country || '',
                    addressId: addressId,
                    comAddressId: comAddressId,
                    industryId: industryId,
                });

            });
        }, (err) => {
        });
    }

    getUserIList(parentId = 0) {
        Model.UserIList({parentId}, (res) => {
            const indList = res.data && res.data.map(item => {
                item.childList = item.childList && item.childList.map(cItem => {
                    return {
                        ...cItem,
                        value: cItem.id,
                        label: cItem.industryName,
                    }
                });
                item.children = item.childList;
                delete item.childList;
                return {
                    ...item,
                    value: item.id,
                    label: item.industryName,
                }
            });
            this.setState({indList: indList}, () => {
                this.getGetErpInfo();
            });
        }, (err) => {
        });
    }

    onChange(value, selectedOptions) {

    }

    makeBaseView() {
        let {data, indList} = this.state;

        return (
            <Form ref={this.formRef} scrollToFirstError={true} {...formItemLayout} autoComplete="off"
                  className={'formCss'}
                  onFinish={(e) => {
                      // e.persist();
                      window.globalPermissions.checkPermission('ERP_MESSAGE_EDIT', (res) => {
                          if (res)
                              return message.error('抱歉，您没有该操作权限，请联系管理员！');

                          this.onSubmit();
                      });
                  }}
            >
                <Row>
                    <Col span={12}>
                        <Form.Item label={'企业名称'} name={'companyName'} rules={[
                            {required: true, message: '企业名称不能为空!'},
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入企业名称"
                            />
                        </Form.Item>
                        <Form.Item label={'公司全称'} name={'companyFullName'} rules={[
                            {required: true, message: '公司全称不能为空!'},
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入公司全称"
                            />
                        </Form.Item>
                        <Form.Item label={'行业'} name={'industryId'} rules={[
                            {required: true, message: '行业不能为空!'},
                        ]}>
                            <Cascader
                                popupClassName={'sucCss_hyCas'}
                                placeholder="请选择所属行业"
                                options={indList}
                                style={{width: '356px'}}
                                showSearch={{
                                    filter: (inputValue, path) => {
                                        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                    }
                                }}
                            />
                            {/*<Select
                            showSearch
                            placeholder="请选择行业"
                            filterOption={(input, option) =>
                                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            style={{width: '356px', fontSize: '14px'}}
                        >
                            {
                                indList && indList.map((item, idx) => {
                                    return <Option key={'opt_' + idx} value={item.id}>
                                        {item.industryName}
                                    </Option>
                                })
                            }
                        </Select>*/}
                        </Form.Item>
                        <Form.Item label="所在地区" name={'comAddressId'} rules={[
                            {
                                required: true,
                                message: '所在地区不能为空!',
                            }
                        ]}>
                            <Cascader
                                popupClassName={'sucCss_cas'}
                                options={CityData.data}
                                placeholder="请选择所在地区"
                                style={{width: '356px'}}
                                showSearch={{
                                    filter: (inputValue, path) => {
                                        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item label={'邮编'} name={'counId'} rules={[
                            {required: false, message: '邮编不能为空!'},
                            {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback, '邮编')
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={6}
                                placeholder="请输入邮编"
                            />
                        </Form.Item>
                        <Form.Item label={'电话'} name={'companyPhone'} rules={[
                            {required: false, message: '电话不能为空!'},
                            {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback, '电话')
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={15}
                                placeholder="请输入电话"
                            />
                        </Form.Item>
                        <Form.Item label={'传真'} name={'faxWay'} rules={[
                            {required: false, message: '传真不能为空!'},
                            {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback, '传真')
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={15}
                                placeholder="请输入传真"
                            />
                        </Form.Item>
                        <Form.Item label={'邮箱'} name={'email'} rules={[
                            {required: false, message: '邮箱不能为空!'},
                            {
                                validator: (rule, value, callback) => this.checkEma(rule, value, callback)
                            }
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入邮箱"
                            />
                        </Form.Item>
                        <Form.Item label={'国家'} name={'country'} rules={[
                            {required: false, message: '国家不能为空!'},
                        ]}>
                            <Input
                                style={{width: '356px'}}
                                maxLength={30}
                                placeholder="请输入国家"
                                disabled={true}
                            />
                        </Form.Item>
                        <Form.Item label="办公地址" style={{margin: '0px'}} name={'addressId'} rules={[
                            {
                                required: false,
                                message: '办公地址不能为空!',
                            }
                        ]}>
                            <Cascader
                                popupClassName={'sucCss_cas'}
                                options={CityData.data}
                                placeholder="请选择办公地址"
                                style={{width: '356px'}}
                                showSearch={{
                                    filter: (inputValue, path) => {
                                        return path.some(option => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1);
                                    }
                                }}
                            />
                        </Form.Item>
                        <Form.Item name={'officeAddress'} rules={[
                            {
                                required: false,
                                message: '详细地址不能为空!',
                            }
                        ]}>
                            <TextArea
                                rows={4}
                                maxLength={50}
                                placeholder="请填写详细地址"
                                style={{fontSize: '14px', resize: 'none', width: '356px', marginTop: '8px'}}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                style={{width: '96px', height: '36px', fontSize: '16px', marginTop: '8px'}}
                            >
                                保存信息
                            </Button>
                            <Button
                                style={{width: '80px', height: '36px', fontSize: '16px', marginLeft: '16px'}}
                                onClick={() => {
                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBasInf/index');
                                }}
                            >
                                取消
                            </Button>
                        </Form.Item>
                    </Col>
                    <Col span={12}
                         style={{paddingLeft: '162px'}}
                    >
                        <Form.Item label="企业Logo" style={{margin: '0px'}} name={'logo'} rules={[
                            {
                                required: false,
                                message: '企业Logo不能为空!',
                            }
                        ]}>
                            <div>
                                <img
                                    src={data.logo || window.globalConfig.logo}
                                    alt=""
                                    style={{width: '144px', height: '144px', borderRadius: '6px'}}
                                    className={'imgCover'}
                                />
                                <div>
                                    <UploadFileMethod
                                        data={{
                                            fileTypeList: ['jpg', 'png', 'jpeg']
                                        }}
                                        callBack={(url) => {
                                            this.setState({
                                                data: {
                                                    ...data,
                                                    logo: url
                                                }
                                            }, () => {
                                                this.formRef.current.setFieldsValue({
                                                    logo: url || '',
                                                });
                                            });
                                        }}
                                    >
                                        <Button
                                            style={{
                                                marginLeft: '24px',
                                                marginTop: '16px',
                                                width: '102px',
                                                height: '36px',
                                                fontSize: '16px',
                                                padding: '0px'
                                            }}
                                        >更换Logo</Button>
                                    </UploadFileMethod>
                                </div>
                            </div>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }

    checkValidator(rule, value, callback, text) {
        const numAndLet = /^[0-9]+$/;
        if (value && !numAndLet.test(value)) {
            callback(`${text}只能填写数字！`);
            return false;
        }
        callback();
    }

    checkEma(rule, value, callback) {
        if (value && !CheckInput.checkEmail(value)) {
            callback('请输入正确的邮箱！');
            return false;
        }
        callback();
    }

    onSubmit(e) {
        // e.preventDefault();
        this.formRef.current.validateFields(['companyName', 'industryId', 'counId', 'companyPhone', 'faxWay', 'email', 'officeAddress', 'logo', 'addressId', 'comAddressId', 'companyFullName'])
            .then(values => {
                if (values.comAddressId[2]) {
                    values.regionId = values.comAddressId[2];
                } else if (values.comAddressId[1]) {
                    values.regionId = values.comAddressId[1];
                } else if (values.comAddressId[0]) {
                    values.regionId = values.comAddressId[0];
                } else {
                    values.regionId = '';
                }

                if (values.addressId[2]) {
                    values.officeRegionId = values.addressId[2];
                } else if (values.addressId[1]) {
                    values.officeRegionId = values.addressId[1];
                } else if (values.addressId[0]) {
                    values.officeRegionId = values.addressId[0];
                } else {
                    values.officeRegionId = '';
                }

                values.industryId = values.industryId[1];
                delete values.comAddressId;
                delete values.addressId;
                // console.log('values: ', values);
                // return false;

                // 更新企业logo
                Model.MyCompanyCLUpdate({
                    logo: values.logo
                }, (res) => {
                }, (err) => {
                    message.error('企业LOGO更新失败！');
                });

                // 保存其它信息
                Model.UserCUpdate({...values}, (res) => {
                    message.success('保存成功！');
                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBasInf/index');
                }, (err) => {
                });
            });
    }
}

export default CompanyBasInfEdit;
