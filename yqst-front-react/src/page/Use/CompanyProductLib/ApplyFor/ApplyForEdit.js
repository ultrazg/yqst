import React, {Component} from 'react';

import {
    Button,
    message,
    Input,
    Select,
    Modal,
    Checkbox
} from 'antd';
import {
    CheckOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import SWTable from 'SWViews/table';
import {formatDate} from "../../../../utils";
import CompanyProductModel from "../CompanyProductModel";

const {Option} = Select;

class ApplyForEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applyType: '',
            item: {},
            selectModalVisi: false,
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {

    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '企业产品库'},
                    {
                        title: '申请列表',
                        link: '/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForList'
                    },
                    {title: '新增申请'},
                ]}
                topView={<div>
                    <Button type="primary" icon={<CheckOutlined/>}
                            style={{
                                fontSize: '16px',
                                borderRadius: '6px',
                                paddingTop: '0px',
                                paddingBottom: '0px'
                            }}
                            onClick={() => {
                                if (!this.state.applyType) {
                                    message.info('请先选择申请类型');
                                    return;
                                }
                                if (!this.state.item.goodsParentSn) {
                                    message.info('请先选择企业产品');
                                    return;
                                }
                                CompanyProductModel.ApplyAdd({
                                    applyType: this.state.applyType,
                                    goodsParentSn: this.state.item.goodsParentSn
                                }, (res) => {
                                    message.success("申请提交成功");
                                    this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/ApplyForList')
                                }, () => {
                                })
                            }}
                    >提交申请</Button>
                    <Button
                        icon={<RollbackOutlined/>}
                        style={{
                            fontSize: '16px',
                            borderRadius: '6px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            marginLeft: '16px'
                        }}
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/applyFor/applyForList');
                        }}
                    >返回</Button>
                </div>}
            >
                {this.SelectView(
                    '申请类型',
                    this.state.applyType,
                    [{value: 1, name: '新增产品'}],
                    (key) => {
                        this.setState({applyType: key});
                    }
                )}
                {this.TextInputSelectView(
                    '选择企业产品',
                    this.state.item.goodsParentSn || '',
                    () => {
                        this.setState({selectModalVisi: true})
                    }
                )}
                {this.TxtView('企业产品名称', this.state.item.goodsName || '')}
                {this.state.selectModalVisi ?
                    <SelectProductListModal
                        ok={(data) => {
                            this.setState({item: data, selectModalVisi: false})
                        }}
                        cancel={() => {
                            this.setState({selectModalVisi: false})
                        }}
                        callback={(data) => {

                        }}
                    /> : null}
            </ViewCoat>
        );
    }

    SelectView(label, val, data = [], callback, placeholder = '请选择', labelSty = {}) {
        return <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    width: '120px',
                    textAlign: 'right',
                    color: '#2B3441',
                    ...labelSty
                }}>{label}：
                </div>
                <div style={{flex: 1}}>
                    <Select
                        showSearch
                        placeholder={placeholder}
                        value={val + ''}
                        onChange={callback && callback}
                        style={{width: 356, height: 32}}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        <Option value={''}>请选择</Option>
                        {
                            data.map(item => {
                                return <Option key={item.value} value={item.value + ''}>{item.name}</Option>
                            })
                        }
                    </Select>
                </div>
            </div>
            <div style={{height: '24px'}}/>
        </>
    }

    TextInputSelectView(label, val, callback, placeholder = '请选择', labelSty = {}) {
        return <>
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <div style={{
                    width: '120px',
                    textAlign: 'right',
                    color: '#2B3441',
                    ...labelSty
                }}>{label}：
                </div>
                <div style={{flex: 1}}>
                    <Input
                        placeholder={placeholder}
                        value={val + ''}
                        style={{width: 356, height: 32}}
                        onClick={() => {
                            callback && callback();
                        }}
                    />
                </div>
            </div>
            <div style={{height: '24px'}}/>
        </>
    }

    TxtView(label, content) {
        return <>
            <div style={{display: 'flex', lineHeight: '32px'}}>
                <div
                    style={{
                        width: '120px',
                        textAlign: 'right',
                        color: '#2B3441',
                    }}
                >{label}：
                </div>
                <div
                    style={{
                        flex: 1,
                    }}
                >{content}</div>
            </div>
            <div style={{height: '10px'}}/>
        </>
    }
}

class SelectProductListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [], current: 1,
        }
    }

    componentDidMount() {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord) => {
        CompanyProductModel.ProductList({
            current,
            pageSize,
            keyWord
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }

    render() {
        let {ok, cancel} = this.props;
        const columns = [
            {
                title: '', width: 50, dataIndex: 'isChose', render: (text, record, index) => {
                    return <Checkbox checked={text} onChange={(e) => {
                        let tableData = this.state.tableData;
                        tableData = tableData.map((item, idx) => {
                            return {
                                ...item,
                                isChose: index == idx
                            }
                        });
                        this.setState({tableData})
                    }}/>
                }
            },
            {
                title: '产品名称', width: '25%', dataIndex: 'goodsName', render: (text, record) => {
                    const urlArr = record.imgUrl.split(',')
                    return (
                        <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                            <div style={{width: 62}}>
                                <img width={62} height={62} src={urlArr[0] && urlArr[0]} alt="" className={'imgCover'}/>
                            </div>
                            <div style={{flex: 1}}>
                                <h3
                                    className={'sw-table-title'}
                                    style={{margin: 0, fontSize: 14, fontWeight: 400, color: '#4481EB'}}
                                >
                                    {text}
                                </h3>
                                <p
                                    className={'sw-table-dec'}
                                    style={{margin: 0, fontSize: 12, fontWeight: 400}}
                                >
                                    {record.goodsCode}
                                </p>
                            </div>
                        </div>
                    )
                }
            },
            {title: '产品类目', width: '20%', dataIndex: 'catNamePath'},
            {title: '产品价格', width: 120, dataIndex: 'showPrice'},
            {title: '创建日期', width: 125, dataIndex: 'createTime', render: text => formatDate(text)},
            {
                title: '状态', width: '9%', dataIndex: 'status', render: text => {
                    switch (parseInt(text)) {
                        case 1:
                            return "未启用"
                        case 2:
                            return "已启用"
                        case 3:
                            return "已停用"
                        default:
                            return ""
                    }
                }
            }
        ];
        return <Modal visible={true} title={'选择企业产品'}
                      style={{top: 15}} width={800}
                      onCancel={() => {
                          cancel && cancel()
                      }}
                      onOk={() => {
                          let selectItem = null;
                          let tableData = this.state.tableData;
                          for (let i = 0; i < tableData.length; i++) {
                              if (tableData[i].isChose) {
                                  selectItem = tableData[i];
                                  break;
                              }
                          }
                          if (selectItem) {
                              ok && ok(selectItem);
                          } else {
                              message.warning("请选择企业产品");
                          }
                      }}>
            <SWTable
                scroll={{y: 350}}
                dataSource={this.state.tableData}
                columns={columns}
                rowKey={'goodsParentSn'}
                pagination={{
                    current: this.state.current,
                    total: this.state.total,
                    onChange: (page, pageSize) => {
                        this.setState({current: page})
                        this.getPage(page)
                    }
                }}
            />
        </Modal>
    }
}

export default ApplyForEdit;
