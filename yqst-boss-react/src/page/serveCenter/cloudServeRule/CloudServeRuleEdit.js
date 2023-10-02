/**
 * Created by yb on 2019/11/18
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Row, Col, message, Input, Radio, DatePicker} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import UploadFile from '../../../baseview/uploadFile/UploadFile'

const { RangePicker } = DatePicker;


class CloudServeRuleEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            softPar: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                isHide: '',
                catId: '',
                startTime: '',
                endTime: '',
                visible: false,
                rowData: {},
                rowInfo: {},
            },
            goodsPar: {
                list: [],
                total: 0,
                current: 1,
                pageSize: 10,
                keyWord: '',
                startTime: '',
                endTime: '',
                sortType: 2,
                type: 1,
                visible: false,
                rowData: {},
                infoVisible: false,
                rowInfo: {
                    shopGoodsDetail: {
                        specResponseList: []
                    }
                },
                changeProperties: {
                    propertiesList: []
                }
            }
        };
        this.id = '';
        this.crumb = [
            {name: '云服务中心'},
            {name: "云服务及规则管理"},
            {name: "云服务规则列表", link: '/Pages/CloudServeRuleList'},
            {name: "新增云服务规则"}
        ];

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.crumb = [
                {name: '云服务中心'},
                {name: "云服务及规则管理"},
                {name: "云服务规则列表", link: '/Pages/CloudServeRuleList'},
                {name: "云服务规则详情", link: `/Pages/CloudServeRuleDetail?id=${this.id}`},
                {name: "编辑云服务规则"}
            ];
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
                            <Link style={{marginLeft: 15}}
                                to={this.id ? `/Pages/CloudServeRuleDetail?id=${this.id}` : '/Pages/CloudServeRuleList'}
                            >
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    {this.makeBaseView()}
                    {this.makeSoftMod()}
                    {this.makeGoodsMod()}
                    {this.makeGoodsInfoMod()}
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        let {data, softPar, goodsPar} = this.state;
        Model.CServeSGGet({id: this.id}, (res) => {
            data = res.data;
            softPar.rowData.softName = res.data.softName;
            softPar.rowData.softId = res.data.softId;
            softPar.rowInfo.softFreeParDTOS = res.data.softFreeParDTOS || [];
            goodsPar.rowData.goodsId = res.data.shopGoodsParentId;
            goodsPar.rowData.goodsName = res.data.goodsParentName;
            goodsPar.rowData.goodsParentId = res.data.goodsParentId;
            goodsPar.rowData.shopId = res.data.shopId;
            goodsPar.changeProperties.goodsId = res.data.goodsId;
            goodsPar.changeProperties.propertiesList = [];

            this.setState({
                data,
                softPar,
                goodsPar
            }, () => {
                this.formRef.current.resetFields();
            });
        }, (err) => {
        });
    }

    getSoftList(current) {
        let {softPar} = this.state;
        softPar.current = current ? current : softPar.current;

        Model.UserAttSList({
            current: softPar.current,
            pageSize: softPar.pageSize,
            keyWord: softPar.keyWord,
            isHide: softPar.isHide,
            catId: softPar.catId,
            startTime: softPar.startTime,
            endTime: softPar.endTime,

        }, (res) => {

            softPar.list = res.data.records && res.data.records.map(item => {
                item.isChecked = false;
                if('' + softPar.rowData.id === '' + item.id){
                    item.isChecked = true;
                }

                return item;
            });
            softPar.total = res.data.total || 0;
            softPar.visible = true;

            this.setState({
                softPar,
            });

        }, (err) => {
        });
    }

    getSoftInfo() {
        let {softPar} = this.state;
        Model.UserAttSGet({id: softPar.rowData.id}, (res) => {
            this.setState({softPar:{
                ...softPar,
                rowInfo: res.data,
            }});
        }, (err) => {
        });
    }

    getGoodsList(current){
        let {goodsPar} = this.state;
        goodsPar.current = current ? current : goodsPar.current;

        Model.ShopGPage({
            current: goodsPar.current,
            pageSize: goodsPar.pageSize,
            keyWord: goodsPar.keyWord,
            startTime: goodsPar.startTime,
            endTime: goodsPar.endTime,
            sortType: goodsPar.sortType,
            type: goodsPar.type,

        }, (res) => {

            goodsPar.list = res.data.records && res.data.records.map(item => {
                item.isChecked = false;
                if('' + goodsPar.rowData.goodsId === '' + item.goodsId){
                    item.isChecked = true;
                }

                return item;
            });
            goodsPar.total = res.data.total || 0;
            goodsPar.visible = true;

            this.setState({
                goodsPar,
            });

        }, (err) => {
        });
    }

    getGoodsInfo(){
        let {goodsPar} = this.state;
        if(!goodsPar.rowData.goodsId)
            return message.error('数据问题，请重新选择规则SPU。');

        Model.ShopGGet({goodsId: goodsPar.rowData.goodsId}, (res) => {
            if(res.data.shopGoodsDetail && res.data.shopGoodsDetail.specResponseList){
                res.data.shopGoodsDetail.specResponseList.forEach(item => {
                    item.isChecked = false;
                    if('' + goodsPar.changeProperties.goodsId === '' + item.goodsId)
                        item.isChecked = true;
                });
            }
            goodsPar.rowInfo = res.data;
            goodsPar.infoVisible = true;

            this.setState({goodsPar});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data, softPar, goodsPar} = this.state;
        const carData = [
            {
                key: 'jbKey',
                title: '基本信息',
                data: [
                    this.id ? {key: 'id', type: 'Texts', label: '规则ID', span: 12, value: data.id} : {},
                    this.id ? {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''} : {},
                    {
                        key: 'ruleSn', type: 'Input', span: 12, placeholder: '请填写(仅限英文及数字字符)', label: '规则编码',
                        value: data.ruleSn || '',
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
                        key: 'name', type: 'Input', span: 12, placeholder: '请填写', label: '规则名称',
                        value: data.name || '',
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
                        key: 'brief', type: 'Input', value: data.brief || '', label: '规则描述', placeholder: '请填写规则描述', span: 12,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                        options: {
                            rules: [{
                                required: false, message: '规则描述不能为空',
                            }],
                        },
                    },
                ],
                style: {marginTop: 0},
            },
            {
                key: 'gzKey',
                title: '规则设置',
                data: [
                    {key: 'softName', label: '云服务名称', span: 12, type: 'Custom',
                        value: softPar.rowData.softName || '',
                        options: {
                            rules: [{
                                required: true, message: '云服务名称不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowSoft.name}
                                     onClick={() => {
                                         this.getSoftList(1);
                                     }}
                        />
                    },
                    {key: 'softId', type: 'Custom', label: '云服务ID', span: 12,
                        value: softPar.rowData.softId || '',
                        options: {
                            rules: [{
                                required: false, message: '云服务ID不能为空',
                            }],
                        },
                        view: <Input placeholder="选择云服务名称后自动带出" disabled={true}/>
                    },
                    {key: 'goodsName', label: '规则SPU', span: 12, type: 'Custom',
                        value: goodsPar.rowData.goodsName || '',
                        options: {
                            rules: [{
                                required: true, message: '规则SPU不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowSoft.name}
                             onClick={() => {
                                 this.getGoodsList(1);
                             }}
                        />
                    },
                    {key: 'skuName', label: '规则SKU', span: 12, type: 'Custom',
                        value: this.jointName(goodsPar.changeProperties.propertiesList || []) || data.skuName || '',
                        options: {
                            rules: [{
                                required: true, message: '规则SKU不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                             title={this.jointName(goodsPar.changeProperties.propertiesList || []) || data.skuName || ''}
                             // value={this.state.rowSoft.name}
                             onClick={() => {
                                 if(!goodsPar.rowData.goodsName)
                                     return message.error('请先选择规格SPU！');
                                 this.getGoodsInfo();
                             }}
                        />
                    },
                ],
                style: {marginTop: 15},
            },
        ];
        const columns = [
            {
                title: '选中项',
                key: '',
                dataIndex: '',
                width: 80,
                render: (res, data, idx) => {
                    return <Radio checked={'1' === '' + res.isSelect} onChange={(e) => {
                        softPar.rowInfo.softFreeParDTOS.forEach(item => {
                            item.isSelect = '0';

                            if(item.parId == res.parId){
                                item.isSelect = '1';

                            }

                        });
                        this.setState({softPar});
                    }}/>
                }
            },
            {
                title: '参数ID',
                key: 'parId',
                dataIndex: 'parId',
            },
            {
                title: '参数编码',
                key: 'parSn',
                dataIndex: 'parSn',
            },
            {
                title: '参数',
                key: '',
                dataIndex: '',
                render: (res) => {
                    const vals = res.parValueList && res.parValueList.map(item => {
                        return item.parValue + item.typeValue
                    });
                    return vals.join(',');
                }
            },
        ];

        return <div>
            {
                carData.map((item, idx) => {
                    return <Card
                        type="inner"
                        key={item.key}
                        title={item.title}
                        style={item.style ? item.style : ''}
                    >
                        <AssemblySet key={item.key} data={item.data} form={this.formRef.current}/>
                    </Card>
                })
            }
            {
                softPar.rowInfo.softFreeParDTOS && <Card
                    type="inner"
                    title='配置参数'
                    style={{marginTop: 15}}
                >
                    <SWTable
                        columns={columns}
                        dataSource={softPar.rowInfo.softFreeParDTOS || []}
                        pagination={false}
                    />
                </Card>
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

    makeSoftMod(){
        let {softPar} = this.state;
        const columns = [
            {
                title: '选择',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '云服务ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '云服务编码',
                key: 'softSn',
                dataIndex: 'softSn',
            },
            {
                title: '云服务名称',
                key: 'name',
                dataIndex: 'name',
            },
            {
                title: '云服务分类',
                key: 'catName',
                dataIndex: 'catName',
            },
            {
                title: '开发者ID',
                key: 'devId',
                dataIndex: 'devId',
            },
            {
                title: '版本',
                key: 'softVersion',
                dataIndex: 'softVersion',
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
            title="选择云服务"
            width={900}
            visible={softPar.visible}
            onOk={() => {
                let changeItem = null;
                softPar.list.forEach(item => {
                    if(item.isChecked){
                        changeItem = item;
                        return false;
                    }
                });

                if(!changeItem && !softPar.rowData.id){
                    return message.error('请选择一个云服务！');
                }

                softPar.visible = false;
                softPar.rowData = changeItem;
                const {setFieldsValue} = this.formRef.current;
                setFieldsValue({softName: changeItem ? changeItem.name : '', softId:  changeItem ? changeItem.id : ''});
                this.setState({softPar}, () => {this.getSoftInfo();});
            }}
            onCancel={() => {
                softPar.visible = false;
                this.setState({softPar});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            关键字：
                            <Input value={softPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                                this.setState({
                                    softPar: {
                                        ...softPar,
                                        keyWord: e.target.value
                                    }
                                });
                            }}/>
                        </Col>
                        <Col span={12}>
                            创建时间：
                            <RangePicker
                                style={{width: '80%'}}
                                value = {
                                    softPar.startTime ?
                                        [moment(softPar.startTime, 'YYYY-MM-DD'), moment(softPar.endTime, 'YYYY-MM-DD')] : null
                                }
                                onChange={(date, dateString) => {
                                    this.setState({
                                        softPar: {
                                            ...softPar,
                                            startTime: dateString[0] || '',
                                            endTime: dateString[1] || '',
                                        }
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            softPar: {
                                ...softPar,
                                current: 1,
                                keyWord: '',
                                startTime: '',
                                endTime: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getSoftList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={softPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            softPar.list = softPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.id === '' + item.id){
                                    item.isChecked = true;

                                }
                                return item
                            });
                            this.setState({softPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: softPar.total,
                        current: softPar.current,
                        pageSize: softPar.pageSize,
                        onChange: (a, b) => {
                            this.getSoftList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeGoodsMod(){
        let {goodsPar} = this.state;
        const columns = [
            {
                title: '选择',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '商品ID',
                key: 'goodsId',
                dataIndex: 'goodsId',
            },
            {
                title: '商品编码',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
            },
            {
                title: '商品名称',
                key: 'goodsName',
                dataIndex: 'goodsName',
            },
            {
                title: '店铺ID',
                key: 'shopId',
                dataIndex: 'shopId',
            },
            {
                title: '店铺名称',
                key: 'shopName',
                dataIndex: 'shopName',
            },
            {
                title: '价格',
                key: 'goodsPrice',
                dataIndex: 'goodsPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
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
            title="选择规则SPU"
            width={900}
            visible={goodsPar.visible}
            onOk={() => {
                let changeItem = null;
                goodsPar.list.forEach(item => {
                    if(item.isChecked){
                        changeItem = item;
                        return false;
                    }
                });

                if(!changeItem && !goodsPar.rowData.goodsId){
                    return message.error('请选择一个规则SPU！');
                }

                goodsPar.visible = false;
                goodsPar.rowData = changeItem;
                goodsPar.changeProperties = {};
                this.formRef.current.setFieldsValue({goodsName: changeItem ? changeItem.goodsName : '', skuName: ''});
                this.setState({goodsPar});
            }}
            onCancel={() => {
                goodsPar.visible = false;
                this.setState({goodsPar});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Row>
                        <Col span={12}>
                            关键字：
                            <Input value={goodsPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                                this.setState({
                                    goodsPar: {
                                        ...goodsPar,
                                        keyWord: e.target.value
                                    }
                                });
                            }}/>
                        </Col>
                        <Col span={12}>
                            创建时间：
                            <RangePicker
                                style={{width: '80%'}}
                                value = {
                                    goodsPar.startTime ?
                                        [moment(goodsPar.startTime, 'YYYY-MM-DD'), moment(goodsPar.endTime, 'YYYY-MM-DD')] : null
                                }
                                onChange={(date, dateString) => {
                                    this.setState({
                                        goodsPar: {
                                            ...goodsPar,
                                            startTime: dateString[0] || '',
                                            endTime: dateString[1] || '',
                                        }
                                    });
                                }}
                            />
                        </Col>
                    </Row>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            goodsPar: {
                                ...goodsPar,
                                current: 1,
                                keyWord: '',
                                startTime: '',
                                endTime: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getGoodsList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={goodsPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            goodsPar.list = goodsPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.goodsId === '' + item.goodsId){
                                    item.isChecked = true;

                                }
                                return item
                            });
                            this.setState({goodsPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: goodsPar.total,
                        current: goodsPar.current,
                        pageSize: goodsPar.pageSize,
                        onChange: (a, b) => {
                            this.getGoodsList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeGoodsInfoMod(){
        let {goodsPar} = this.state;
        const columns = [
            {
                title: '选择',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
            {
                title: '规格',
                key: '',
                dataIndex: '',
                width: 200,
                render: (rowData) => {
                    let ggText = [];
                    rowData.propertiesList && rowData.propertiesList.forEach((item, idx) => {
                        ggText.push(<div style={{marginBottom: 5}}>
                            {item.specName + '：' + item.specValue + '；'}
                        </div>)
                    });
                    return ggText
                }
            },
            {
                title: '规格ID',
                key: 'goodsId',
                dataIndex: 'goodsId',
            },
            {
                title: '规格编码',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
            },
            {
                title: '含税单价',
                key: 'marketPrice',
                dataIndex: 'marketPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '库存',
                key: 'inventory',
                dataIndex: 'inventory',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
            },
            {
                title: '单SKU图片',
                key: 'mainUrl',
                dataIndex: 'mainUrl',
                width: 200,
                render: (res, data, idx) => {
                    return <UploadFile
                        key={'img_' + idx}
                        data={{
                            maxNum:1,
                            uploadText:'',
                            fileUrlList: [res],
                            isReadOnly: true
                        }}
                        // callBackFiles={callBackFiles}
                    />
                }
            },
        ];

        return <Modal
            title="选择规则SKU"
            width={900}
            visible={goodsPar.infoVisible}
            onOk={() => {
                let changeItem = null;
                goodsPar.rowInfo.shopGoodsDetail.specResponseList.forEach(item => {
                    if(item.isChecked){
                        changeItem = item;
                        return false;
                    }
                });

                if(!changeItem && !goodsPar.changeProperties.goodsId){
                    return message.error('请选择一个规则SKU！');
                }

                goodsPar.infoVisible = false;
                goodsPar.changeProperties = changeItem;
                this.formRef.current.setFieldsValue({skuName: changeItem ? this.jointName(changeItem.propertiesList || []) : ''});
                this.setState({goodsPar});
            }}
            onCancel={() => {
                goodsPar.infoVisible = false;
                this.setState({goodsPar});
            }}
        >
            <SWTable
                columns={columns}
                dataSource={goodsPar.rowInfo.shopGoodsDetail.specResponseList || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            goodsPar.rowInfo.shopGoodsDetail.specResponseList = goodsPar.rowInfo.shopGoodsDetail.specResponseList.map(item => {
                                item.isChecked = false;
                                if('' + record.goodsId === '' + item.goodsId)
                                    item.isChecked = true;

                                return item
                            });
                            this.setState({goodsPar});
                        }
                    }
                }}
                pagination={false}
            />
        </Modal>
    }

    jointName(list = []){
        let resName = '';
        list.forEach(item => {
            resName += (item.specName + '：' + item.specValue + '；');
        });

        return resName
    }

    onSubmit(e){
        const {goodsPar, softPar} = this.state;
        const {validateFields} = this.formRef.current;
        this.setState({loading: true});
        validateFields().then(values => {

            if(this.id)
                values.id = this.id;
            values.parId = '';
            softPar.rowInfo.softFreeParDTOS && softPar.rowInfo.softFreeParDTOS.forEach(item => {
                if('1' === '' + item.isSelect){
                    values.parId = item.parId;
                    return false;
                }
            });
            if(!values.parId) {
                this.setState({loading: false});
                return message.error('请选择一个配置参数！');
            }
            values.goodsParentId = goodsPar.rowData.goodsParentId;
            values.shopGoodsParentId = goodsPar.rowData.goodsId;
            values.goodsId = goodsPar.changeProperties.goodsId;
            values.shopId = goodsPar.rowData.shopId;

            delete values.goodsName;
            delete values.createTime;
            // console.log('xxxxxx: ', values);
            // return false;

            Model.CServeSGSave(values, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/CloudServeRuleList');

            }, (err) => {
                this.setState({loading: false});

            })
        }).catch(()=>{
            this.setState({loading: false});
        });
    }
}

export default CloudServeRuleEdit
