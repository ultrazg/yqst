import React, {Component} from 'react';
import {
    Button,
    message,
    Input,
    Select,
    Switch,
    Table,
} from 'antd';
import {upload, word} from '../../../../../resource';
import UploadFileMethod from '../../../../../baseview/uploadFile/UploadFileMethod';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';
import Model from './Model';
import SWTable from 'SWViews/table';

const { Option } = Select;

class SaContractEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            typeSnList: [],
            contractTemplateName: '',
            contractTypeSn: '',
            isEffective: 0,
            contractTemplateEnclosure: '',
            parList: [],
        };
        this.sn = '';
    }

    componentDidMount() {
        this.sn = this.props.location.search.substr(1).split("=")[1];
        this.getContractTTPage();
        if(this.sn)
            this.getContractTInfo();
    }

    componentWillUnmount() {

    }

    render() {
        let {typeSnList = [], contractTemplateName, contractTypeSn, isEffective, contractTemplateEnclosure, parList} = this.state;
        const columns = [
            {
                title: '字段名（英文）',
                key: 'paramEnglishName',
                dataIndex: 'paramEnglishName',
            },
            {
                title: '字段名（中文）',
                key: 'paramChineseName',
                dataIndex: 'paramChineseName',
                render: (res, data, idx) => {
                    return <Input
                        placeholder="请输入"
                        maxLength={30}
                        value={res}
                        style={{
                            width: '162px',
                            height: '32px',
                            lineHeight: '32px',
                            fontSize: '14px',
                        }}
                        onChange={(e) => {
                            parList[idx].paramChineseName = e.target.value;
                            this.setState({parList});
                        }}
                    />
                }
            },
            {
                title: '字段类型',
                key: 'paramType',
                dataIndex: 'paramType',
                render: (res, data, idx) => {
                    return <Select
                        placeholder={'请选择'}
                        value={res + ''}
                        style={{
                            width: '162px',
                            height: '32px',
                            lineHeight: '32px',
                            fontSize: '14px',
                        }}
                        onChange={(val) => {
                            parList[idx].paramType = val;
                            parList[idx].paramReferenceValue = '';
                            this.setState({parList});
                        }}
                    >
                        <Option value="">请选择</Option>
                        <Option value="1">文本</Option>
                        <Option value="2">选项</Option>
                    </Select>
                }
            },
            {
                title: '字段参数',
                key: 'paramReferenceValue',
                dataIndex: 'paramReferenceValue',
                width: 310,
                render: (res, data, idx) => {
                    return (
                        <Input
                            placeholder={'2' !== '' + data.paramType ? '请选择': '使用逗号隔开，如：“30天，60天，180天”'}
                            maxLength={30}
                            value={res}
                            style={{
                                width: '300px',
                                height: '32px',
                                lineHeight: '32px',
                                fontSize: '14px',
                            }}
                            onChange={(e) => {
                                if('2' === '' + data.paramType)
                                    e.target.value = e.target.value.replace(/，|,/g, ',');
                                parList[idx].paramReferenceValue = e.target.value;
                                this.setState({parList});
                            }}
                        />
                    );
                }
            },
        ];

        return (
            <ViewCoat
                breadCrumb={[
                    {title: '合同模板', link: '/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractList'},
                    {title: this.sn ? '编辑合同模板' : '新增合同模板'},
                ]}
                topView={<div>
                    <Button type="primary"
                        style={{
                            width: '64px',
                            height: '32px',
                            fontSize: '16px',
                            padding: '0px'
                        }}
                        onClick={() => {
                            this.onSubmit();
                        }}
                    >提交</Button>
                </div>}
            >
                <div
                    style={{color: '#2B3441'}}
                >
                    <span
                        style={{
                            width: '116px',
                            textAlign: 'right',
                            marginRight: '9px',
                            display: 'inline-block',
                        }}
                    >
                        <span style={{color: '#F12C20'}}>*</span>合同模版名称：
                    </span>
                    <Input
                        placeholder="请输入"
                        style={{
                            width: '356px',
                            height: '32px',
                            lineHeight: '32px',
                            fontSize: '14px',
                        }}
                        value={contractTemplateName}
                        onChange={(e) => {
                            this.setState({contractTemplateName: e.target.value});
                        }}
                    />
                </div>
                <div
                    style={{color: '#2B3441', margin: '24px 0px'}}
                >
                    <span
                        style={{
                            width: '116px',
                            textAlign: 'right',
                            marginRight: '9px',
                            display: 'inline-block',
                        }}
                    >
                        <span style={{color: '#F12C20'}}>*</span>模版类型：
                    </span>
                    <Select placeholder="请选择"
                        showSearch
                        value={contractTypeSn}
                        style={{
                            width: '356px',
                            height: '32px',
                            lineHeight: '32px',
                            fontSize: '14px'
                        }}
                        onChange={(val) => {
                            this.setState({contractTypeSn: val});
                        }}
                        filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value="">请选择</Option>
                        {
                            typeSnList.map(item => {
                                return <Option key={item.key} value={item.sn + ''}>
                                    {item.contractTemplateTypeName}
                                </Option>
                            })
                        }
                    </Select>
                </div>
                <div
                    style={{
                        color: '#2B3441',
                        paddingLeft: '13px'
                    }}
                >
                    <span style={{color: '#F12C20'}}>*</span>模版文件
                    <span style={{color: 'rgba(43, 52, 65, 0.5)'}}>（只支持10M以内的docx格式文件）</span>
                </div>
                <div
                    style={{
                        marginTop: '24px',
                        marginLeft: '140px'
                    }}
                >
                    <UploadFileMethod
                        data={{
                            fileSize: 10,
                            fileTypeList: ['docx'],
                            accept: '*',
                            // fileUrl: contractTemplateEnclosure
                        }}
                        callBack={(url, file) => {
                            this.setState({contractTemplateEnclosure: url}, () => {
                                Model.ContractTAnalysis({
                                    getContractTemplateEnclosure: this.state.contractTemplateEnclosure,
                                    fileName: file.name,
                                }, (res) => {
                                     const newParList = res.data && res.data.map((item, idx) => {
                                        return {
                                            ...item,
                                            key: idx,
                                            paramSn: '',
                                            paramChineseName: '',
                                            paramType: '',
                                            paramReferenceValue: '',
                                        }
                                    });
                                    this.setState({parList: newParList});
                                });
                            });
                        }}
                    >
                        {
                            contractTemplateEnclosure ? <img src={word} alt=""
                                  style={{
                                      width: '72px',
                                      height: '72px',
                                      cursor: 'pointer',
                                  }}
                            /> : <img src={upload} alt=""
                                  style={{
                                      width: '72px',
                                      height: '72px',
                                      cursor: 'pointer',
                                  }}
                            />
                        }
                    </UploadFileMethod>
                </div>
                {
                    parList && parList.length > 0 ? <div
                        style={{
                            marginTop: '24px',
                        }}
                    >
                        <div
                            style={{
                                color: '#2B3441',
                                paddingLeft: '13px',
                                marginBottom: '13px',
                            }}
                        >
                            <span style={{color: '#F12C20'}}>*</span>设置业务字段
                        </div>
                        <Table
                            columns={columns}
                            dataSource={parList}
                            pagination={false}
                        />
                    </div> : null
                }
                <div
                    style={{
                        color: '#2B3441',
                        paddingLeft: '13px',
                        marginTop: '32px'
                    }}
                >
                    <span style={{color: '#F12C20'}}>*</span>启用：
                    <Switch
                        className={'Switch'}
                        checked={'' + isEffective === '1'}
                        onChange={(checked) => {
                            this.setState({isEffective: checked ? '1' : '0'});
                        }}
                        style={{marginLeft: '8px'}}
                    />
                </div>
            </ViewCoat>
        );
    }

    getContractTInfo(){
        Model.ContractTInfo({sn: this.sn}, (res) => {
            this.setState({
                contractTemplateName: res.data.contractTemplateName,
                contractTypeSn: res.data.contractTypeSn,
                isEffective: res.data.isEffective,
                contractTemplateEnclosure: res.data.contractTemplateEnclosure,
                parList: res.data.parList && res.data.parList.map(item => {
                    return {
                        ...item,
                        key: item.sn
                    }
                }),
            });
        });
    }

    getContractTTPage(){
        Model.ContractTTPage({
            current: 1,
            pageSize: 999999,
            keyWord: '',
            sortType: 2,
        }, (res) => {
            const typeSnList = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    key: item.sn,
                }
            });
            this.setState({typeSnList});
        });
    }

    onSubmit(){
        let {contractTemplateName, contractTypeSn, isEffective, contractTemplateEnclosure, parList} = this.state;

        if(!contractTemplateName)
            return message.error('合同模版名称不能为空！', 1);

        if(!contractTypeSn)
            return message.error('模版类型不能为空！', 1);

        if(!contractTemplateEnclosure)
            return message.error('模版文件不能为空！', 1);

        if(parList && parList.length > 0){
            let spyRes = false;
            parList = parList.map(item => {
                delete item.key;
                if(!item.paramChineseName || !item.paramType || !item.paramReferenceValue)
                    spyRes = true;
                return item;
            });

            if(spyRes)
                return message.error('设置业务字段不能留空！', 1);

        }else{
            parList = [];

        }

        let obj = {
            contractTemplateName,
            contractTypeSn,
            contractTemplateEnclosure,
            isEffective,
            parList,
            contractInitiatorType: 2,
        };
        if(this.sn)
            obj.sn = this.sn;

        Model.ContractTSave(obj, (res) => {
            message.success('提交成功！', 1);
            this.props.history.push('/pages/appCenter/sellAssistant/terminalPage/saConTemplate/saContractList');
        });
    }
}

export default SaContractEdit;
