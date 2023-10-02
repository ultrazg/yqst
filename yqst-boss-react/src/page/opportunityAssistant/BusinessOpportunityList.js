import React, {Component} from 'react'
import {Row, Col, Table, Form, Input, Button, Select, Modal, Radio, DatePicker, message} from 'antd'
import OpportunityModel from "./model";
import ContentBody from './PlugInUnit/ContentBody'
import moment from 'moment';
import TabsViewContent from "../../baseview/tabsViewContent/TabsViewContent";
import HeadSearch from "../../baseview/headSearch/HeadSearch";
import {Link} from "react-router-dom";
import SWTable from 'SWViews/table';

const FormItem = Form.Item
const Option = Select.Option
const RadioGroup = Radio.Group
const {RangePicker} = DatePicker
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 16},
    },
};

class BusinessOpportunityLists extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 15,
                keyWord: '',
                sortType: 2,
                companySn: '',
                userSn: '',
                sourceSn: '',
                name: '',
                cityRegion: '',
            },
            search: decodeURIComponent(this.props.location.search).substr(1, decodeURIComponent(this.props.location.search).length - 1),
            sourceData: [],
            importListShow: false,
        };
        this.formRef = React.createRef();
    }

    componentWillMount(){
        let search = this.state.search.split('&');
        this.setState({
            requestPar: {
                ...this.state.requestPar,
                companySn: search[0].split('=')[1],
                userSn: search[1].split('=')[1],
            }
        }, () => {
            this.getOpportunityClueList();
            this.getOpportunitySourceList();
        });
    }

    showConfirm(title, onOk, onCancel) {
        Modal.confirm({
            title: title,
            onOk() {
                onOk && onOk();
            },
            onCancel() {
                onCancel && onCancel();
            },
        });
    }

    render() {
        return (
            <TabsViewContent
                crumb={[
                    {name: '商机助手中心'},
                    {name: "用户列表", link: '/Pages/OpportunityAssistantUserList'},
                    {name: '商机列表'},
                ]}
                // tabs={this.tabsConfig()}
                topBtn={
                    <Button type='primary' size='large'
                            onClick={() => this.setState({importListShow: true})}>导出跟进记录</Button>
                }
            >
                {this.makeHeadSearch()}
                {this.makeTable()}
                <Modal title={'导出商机选择'}
                       onOk={() => this.setState({importListShow: false})}
                       onCancel={() => this.setState({importListShow: false})}
                       visible={this.state.importListShow}
                       footer={null}>
                    <Form ref={this.formRef} autoComplete="off" onFinish={(values) => {this.onFinish(values)}}>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayout}
                                    label="商机选择"
                                    name="import"
                                    rules={[{ required: true, message: '请选择商机导出类型!' }]}
                                >
                                    <RadioGroup>
                                        <Radio value={false}>全部</Radio>
                                        <Radio value={true}>部分</Radio>
                                    </RadioGroup>
                                    {/*{getFieldDecorator('import', {
                                        rules: [{
                                            required: true, message: '请选择商机导出类型!',
                                        }]
                                    })(
                                        <RadioGroup>
                                            <Radio value={false}>全部</Radio>
                                            <Radio value={true}>部分</Radio>
                                        </RadioGroup>
                                    )}*/}
                                </FormItem>
                                <Form.Item
                                    noStyle
                                    shouldUpdate={(prevValues, currentValues) => prevValues.import !== currentValues.import}
                                >
                                    {({ getFieldValue }) => {
                                        return getFieldValue('import') ? (
                                            <Form.Item {...formItemLayout} name="importTime" label="商机创建时间" rules={[{ required: true, message: '请选择时间!' }]}>
                                                <RangePicker/>
                                            </Form.Item>
                                        ) : null;
                                    }}
                                </Form.Item>
                                {/*{getFieldValue('import') ?
                                    <FormItem
                                        {...formItemLayout}
                                        label="商机创建时间"
                                    >
                                        {getFieldDecorator('importTime', {
                                            rules: [{
                                                required: true, message: '请选择时间!',
                                            }]
                                        })(
                                            <RangePicker/>
                                        )}
                                    </FormItem> : null
                                }*/}
                            </Col>
                        </Row>
                        <div style={{textAlign: 'right'}}>
                            <Button type="primary" htmlType="submit">确定</Button>
                        </div>
                    </Form>
                </Modal>
            </TabsViewContent>
        )
    }

    getOpportunityClueList(){
        OpportunityModel.getOpportunityClueList(this.state.requestPar, success => {
            this.setState({
                list: success.data.records || [],
                total: success.data.total || 0,
            })
        });
    }

    getOpportunitySourceList(){
        OpportunityModel.getOpportunitySourceList({}, success => {
            let sourceData = [
                {value: '', name: '全部'}
            ];
            success.data && success.data.forEach(item => {
                sourceData.push({
                    ...item,
                    value: item.sn,
                    name: item.source,
                });
            });

            this.setState({
                sourceData: sourceData,
            });
        });
    }

    tabsConfig(){
        return [{
            tabName: '全部', callback: () => {
                this.setState({status: 0}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请中', callback: () => {
                this.setState({status: 1}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请成功', callback: () => {
                this.setState({status: 2}, () => {
                    this.getList()
                })
            }
        }, {
            tabName: '申请失败', callback: () => {
                this.setState({status: 3}, () => {
                    this.getList()
                })
            }
        }]
    }

    makeHeadSearch() {
        const searchDatas = [
            {key: 'name', type: 'Input', value: '', placeholder: '请输入', label: '客户名称', maxLength: 30},
            {
                key: 'sourceSn', type: 'Select', value: '', placeholder: '请选择', label: '线索来源',
                list: this.state.sourceData,
            },
            {key: 'cityRegion', type: 'Input', value: '', placeholder: '请输入', label: '所在城市', maxLength: 30},
            /*{key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '创建时间',}*/
        ];
        return <HeadSearch data={searchDatas} callBack={(obj) => {
            // obj.startTime = obj.times [0] || '';
            // obj.endTime = obj.times [1] || '';
            obj.current = 1;

            delete obj.times;
            this.setState({
                requestPar: {
                    ...this.state.requestPar,
                    ...obj
                }
            }, () => {
                this.getOpportunityClueList();
            });
        }}/>
    }

    makeTable() {
        let {list, requestPar} = this.state;
        const columns = [{
            title: '客户名称',
            dataIndex: 'name',
            key: 'name',
            width: 150,
            fixed: 'left',
        },{
            title: '联系人',
            key: 'contacts',
            dataIndex: 'contacts',
        }, {
            title: '联系方式',
            dataIndex: 'phone',
            key: 'phone',
        }, {
            title: '线索来源',
            dataIndex: 'source',
            key: 'source',
            // render:(a,b,c)=>{
            //     ////线索来源（0.为所有渠道、1.个人线索、2.汽车之家、3.搜狐汽车)
            //     switch (parseInt(a)){
            //         case 0:return <span>所有渠道</span>
            //         case 1:return <span>个人线索</span>
            //         case 2:return <span>汽车之家</span>
            //         case 3:return <span>搜狐汽车</span>
            //     }
            // }
        },{
            title: '项目名称',
            key: 'projectName',
            dataIndex: 'projectName',
        },{
            title: '意向内容',
            dataIndex: 'intentionContent',
            key: 'intentionContent',
            width: 150,
        },{
            title: '所在城市',
            dataIndex: 'cityRegion',
            key: 'cityRegion',
        }, {
            title: '是否已拜访',
            dataIndex: 'isArrived',
            key: 'isArrived',
            render: (a, b, c) => {
                return <span>{a == 1 ? '已拜访' : '未拜访'}</span>
            }
        },{
            title: '创建时间',
            dataIndex: 'createTime',
            key: 'createTime',
            render: (a, b, c) => {
                return moment(a).format('YYYY-MM-DD hh:mm:ss')
            },
            width: 150,
            fixed: 'right',
        }];

        return <div>
            <SWTable
                bordered
                scroll={{ x: 1300 }}
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            let obj = this.state.requestPar;
                            obj.current = a;
                            this.setState({requestPar: obj}, () => {
                                this.getOpportunityClueList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </div>
    }

    onFinish(values){
        // const {getFieldValue} = this.formRef.current;
        // let timer=getFieldValue('importTime')||[];
        let timer = values.importTime ? values.importTime : [];
        let search = this.state.search.split('&');
        let obj={
            companySn:search[0].split('=')[1]||'',
            userSn:search[1].split('=')[1]||'',
            startTime:timer[0]?moment(timer[0]).format('YYYY-MM-DD'):'',
            endTime:timer[1]?moment(timer[1]).format('YYYY-MM-DD'):''
        };
        OpportunityModel.getOpportunityExport({...obj}, success => {
            this.setState({importListShow: false}, () => {
                this.showConfirm("文件已经生产,立即下载?", () => {
                    window.download(success.data.url);
                    // window.open(success.data.url);
                    // window.location.href = success.data.url;
                    // const link = document.createElement('a')
                    // link.href = success.data.url;
                    // document.body.appendChild(link);
                    // link.click();
                    // document.body.removeChild(link);
                }, () => {
                });
            });
        })
    }

}

const BusinessOpportunityList = BusinessOpportunityLists

export default BusinessOpportunityList