// 修改和添加功能合并到 ESAddServiceRule中了，该页面无效


import React, {Component} from 'react';
import {Card, Input, Select, Radio, Form, Button, Modal, Row, Col, DatePicker, Table, message} from "antd";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import moment from "moment";
import Model from "../Model";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import UploadFile from "../../../../baseview/uploadFile/UploadFile";

const {RangePicker} = DatePicker;

const {Option} = Select;

export default class ESEditServiceRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceRuleSn: "",
            serviceLife: 1,
            // 1为认证前服务 2为认证后服务
            ruleType: 1,
            createTime: "",
            // 服务内容列表
            serviceList: [
                {
                    serviceSn: 1,
                    serviceNum: 1
                },
                {
                    serviceSn: 2,
                    serviceNum: 2
                }
            ],
            // spu
            spuPar: {
                visible: false,
                startTime: '',
                endTime: '',
                current: 1,
                keyWord: '',
                total: 60,
                pageSize: 10,
                sortType: 1,
                list: [],
                select: {}
            },
            // sku
            skuPar: {
                visible: false,
                list: [],
                current: 1,
                pageSize: 10,
                total: 0,
                keyWord: '',
                startTime: '',
                endTime: '',
                select: {}
            },
            // 服务可选列表
            serviceOptions: []
        };
    }

    componentDidMount() {
        let serviceRuleSn = this.props.location.search.substr(1).split('=')[1];
        this.setState({
            serviceRuleSn
        })

        // 获取规则详情
        Model.GetServiceRuleDetail({serviceRuleSn}, res=>{
            let {serviceLife, ruleType, createTime, serviceList, spuPar, skuPar } = this.state;
            serviceLife = res.data.serviceLife;
            ruleType = res.data.ruleType;
            createTime = res.data.createTime;
            serviceList = res.data.serviceList;
            spuPar.select.goodsName = res.data.goodsName;
            spuPar.select.shopGoodsParentSn = res.data.goodsParentSn;
            spuPar.select.shopSn = res.data.shopSn;
            skuPar.select.specList = res.data.specList;
            skuPar.select.goodsSn = res.data.goodsSn;

            this.setState({
                serviceLife,
                ruleType,
                createTime,
                serviceList,
                spuPar,
                skuPar
            })


        }, err => {
            console.log(err)
        });

        Model.GetServiceList({}, res=>{
            this.setState({
                serviceOptions: res.data
            })
        }, err=>{})

    }

    handleChange = (event, name) => {
        const value = event.target ? event.target.value : event;
        this.setState({
            [name]: value
        })
    }

    addServiceContent = () => {
        let {serviceList, serviceOptions} = this.state;
        serviceList.push({serviceSn: serviceOptions[0].serviceSn, serviceNum: 1});
        this.setState({
            serviceList
        })
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: '服务规则管理', link: '/Pages/esServiceRulesList'}, {name: "修改服务规则"}]}
            >
                {this.baseInfoView()}
                {this.serviceContentView()}
                {this.serviceSettingView()}
                {this.buttonView()}
                {this.makeSpuMod()}
                {this.makeSkuMod()}
            </TabsViewContent>
        )
    }


    baseInfoView = () => {
        const {spuPar, skuPar, createTime, serviceRuleSn} = this.state;
        const spuName = spuPar.select.goodsName;
        let skuName = '';
        let specList = skuPar.select.specList;
        specList && specList.forEach((item) => {
            skuName += item.specName + '：' + item.specValue + '； '
        });

        return (
            <Card title='基本信息'>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}>
                    <div className='left' style={{
                        width: '38%',
                    }}>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>规则ID:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>{serviceRuleSn}</div>
                        </div>

                        <div style={{display: 'flex', marginTop: 15, alignItems: 'center'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>spu:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>
                                <Input
                                    style={{width: '100%'}}
                                    value={spuName}
                                    onClick={()=>{
                                        this.getSpuList();
                                    }}
                                />
                            </div>
                        </div>


                    </div>

                    <div className='right' style={{
                        width: '38%'
                    }}>
                        <div style={{display: 'flex'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>创建时间:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>{createTime}</div>
                        </div>

                        <div style={{display: 'flex', marginTop: 15, alignItems: 'center'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>sku:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>
                                <Input
                                    style={{width: '100%'}}
                                    value={skuName}
                                    onClick={() => {
                                        this.getSkuList()
                                    }}
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </Card>
        )
    }

    serviceContentView = () => {
        const {serviceList, serviceOptions} = this.state;
        return (
            <Card title='服务内容' style={{marginTop: 30}}
                  extra={<span style={{color: '#4481EB', cursor: 'pointer'}} onClick={this.addServiceContent}>添加</span>}
            >
                <ul style={{width: '100%'}}>
                    {
                        serviceList.map((item, index) => {
                            return (
                                <li style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    marginTop: index > 0 ? 15 : 0
                                }} key={index}>
                                    <div className='left' style={{width: '38%',}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{width: '30%', textAlign: 'right'}}>配置服务内容:</div>
                                            <div style={{width: '70%', paddingLeft: 10}}>
                                                <Select value={serviceList[index].serviceSn} style={{width: '100%'}}
                                                        onChange={(value) => {
                                                            serviceList[index].serviceSn = value;
                                                            this.setState({
                                                                serviceList
                                                            })
                                                        }}>
                                                    {
                                                        serviceOptions.map((item)=>{
                                                            return (
                                                                <Option key={item.serviceSn} value={item.serviceSn}>
                                                                    {item.serviceName}
                                                                </Option>
                                                            )
                                                        })
                                                    }
                                                </Select>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='right' style={{
                                        width: '38%'
                                    }}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{width: '30%', textAlign: 'right'}}>服务次数:</div>
                                            <div style={{width: '70%', paddingLeft: 10}}>
                                                <Input
                                                    style={{width: '100%'}}
                                                    value={serviceList[index].serviceNum}
                                                    onChange={(e) => {
                                                        serviceList[index].serviceNum = e.target.value;
                                                        this.setState({
                                                            serviceList
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </Card>
        )
    }

    serviceSettingView = () => {
        const {serviceLife, ruleType} = this.state;
        return (
            <Card title='服务设置' style={{marginTop: 30}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                    <div className='left' style={{width: '38%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>服务期限:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>
                                <Select value={serviceLife} style={{width: '100%'}} onChange={(value) => {
                                    this.handleChange(value, 'serviceLife')
                                }}>
                                    <Option value={1}>1月</Option>
                                    <Option value={2}>2月</Option>
                                    <Option value={3}>3月</Option>
                                    <Option value={4}>4月</Option>
                                    <Option value={5}>5月</Option>
                                    <Option value={6}>6月</Option>
                                    <Option value={7}>7月</Option>
                                    <Option value={8}>8月</Option>
                                    <Option value={9}>9月</Option>
                                    <Option value={10}>10月</Option>
                                    <Option value={11}>11月</Option>
                                    <Option value={12}>12月</Option>
                                </Select>
                            </div>
                        </div>
                    </div>

                    <div className='right' style={{width: '38%'}}>
                        <div style={{display: 'flex', alignItems: 'center'}}>
                            <div style={{width: '30%', textAlign: 'right'}}>是否为认证前服务:</div>
                            <div style={{width: '70%', paddingLeft: 10}}>
                                <Radio.Group value={ruleType} onChange={(e) => {
                                    this.handleChange(e, 'ruleType')
                                }}>
                                    <Radio value={1}>是</Radio>
                                    <Radio value={2}>否</Radio>
                                </Radio.Group>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

    getInfo = () => {
        const {ruleType, serviceList, serviceLife} = this.state;
        const {specList, goodsSn, goodsImg} = this.state.skuPar.select;
        const {shopSn, goodsName, shopGoodsParentSn, goodsParentSn} = this.state.spuPar.select;
        let params = {
            serviceRuleSn: null,
            goodsParentSn,
            goodsImageUrl: goodsImg,
            shopSn,
            shopGoodsParentSn,
            goodsSn,
            goodsName,
            serviceLife,
            ruleType,
            specList,
            serviceList
        }


        Model.AddOrEditServiceRule(params, res=>{
            this.props.history.replace('/Pages/esServiceRulesList')
        }, err=>{})
    }

    buttonView = () => {
        return (
            <div style={{display: 'flex', justifyContent: 'center', margin: '36px 0'}}>
                <Button onClick={this.getInfo} type='primary' style={{width: 135, height: 36}}>确定</Button>
            </div>
        )
    }

    getSpuList = ()=>{
        const {spuPar} = this.state;
        const {current, pageSize, sortType, keyWord, startTime, endTime} = spuPar;
        Model.GetServiceGoodsList({current, pageSize, sortType, keyWord, startTime, endTime}, res=>{
            this.setState({
                spuPar: {
                    ...spuPar,
                    total: res.data.total,
                    list: res.data.records,
                    visible: true
                }

            })
        }, err=> {
            console.log(err);
        })
    }

    getSkuList = ()=> {
        // let shopGoodsParentSn = this.state.spuPar.select.shopGoodsParentSn;
        let shopGoodsParentSn = 's39p8y8gyvmmdp8g';
        if(!shopGoodsParentSn){
            message.error('请选择一个云服务！');
            return
        }

        Model.GetServiceGoodsDetail({shopGoodsParentSn}, res=>{
            const {skuPar} = this.state;
            this.setState({
                skuPar: {
                    ...skuPar,
                    list: res.data,
                    visible: true
                }
            })
        }, err=>{
            console.log(err);
        })
    }

    // spu选择弹窗
    makeSpuMod = () =>{
        let {spuPar, skuPar} = this.state;
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
                key: 'shopGoodsParentSn',
                dataIndex: 'shopGoodsParentSn',
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
                key: 'shopSn',
                dataIndex: 'shopSn',
            },
            {
                title: '店铺名称',
                key: 'shopName',
                dataIndex: 'shopName',
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
            visible={spuPar.visible}
            onOk={() => {

                for(let i=0; i<spuPar.list.length; i++){
                    let item = spuPar.list[i];
                    if(item.isChecked){
                        skuPar.select = {}
                        this.setState({
                            spuPar: {
                                ...spuPar,
                                visible: false,
                                select: item
                            },
                            skuPar: {
                                ...skuPar
                            }
                        })
                        return false;
                    }
                }


            }}
            onCancel={() => {
                this.setState({
                    spuPar: {
                        ...spuPar,
                        visible: false
                    }
                })
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={12}>
                        关键字：
                        <Input value='' style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            this.setState({
                                spuPar: {
                                    ...spuPar,
                                    keyWord: e.target.value
                                }
                            })
                        }}/>
                    </Col>
                    <Col span={12}>
                        创建时间：
                        <RangePicker
                            style={{width: '80%'}}
                            value = {
                                spuPar.startTime ?
                                    [moment(spuPar.startTime, 'YYYY-MM-DD'), moment(spuPar.endTime, 'YYYY-MM-DD')] : null
                            }
                            onChange={(date, dateString) => {
                                this.setState({
                                    spuPar: {
                                        ...spuPar,
                                        startTime: dateString[0] || '',
                                        endTime: dateString[1] || '',
                                    }
                                });
                            }}
                        />
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        this.setState({
                            spuPar: {
                                ...spuPar,
                                current: 1,
                                keyWord: '',
                                startTime: '',
                                endTime: '',
                            }
                        });
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getSpuList();
                    }}>搜索</Button>
                </Col>
            </Row>

            <Table
                columns={columns}
                dataSource={spuPar.list}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            spuPar.list = spuPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.goodsId === '' + item.goodsId){
                                    item.isChecked = true;
                                }
                                return item
                            });
                            this.setState({spuPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: spuPar.total,
                        current: spuPar.current,
                        pageSize: spuPar.pageSize,
                        onChange: (a, b) => {
                            this.getSpuList();
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    // sku选择弹窗
    makeSkuMod(){
        const {skuPar} = this.state;
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
                key: 'specList',
                dataIndex: 'specList',
                width: 200,
                render: (rowData) => {
                    let ggText = [];
                    rowData && rowData.forEach((item, idx) => {
                        ggText.push(<div style={{marginBottom: 5}}>
                            {item.specName + '：' + item.specValue + '；'}
                        </div>)
                    });
                    return ggText
                }
            },
            {
                title: '规格ID',
                key: 'goodsSn',
                dataIndex: 'goodsSn',
            },
            {
                title: '规格编码',
                key: 'goodsCode',
                dataIndex: 'goodsCode',
            },
            {
                title: '含税单价',
                key: 'goodsPrice',
                dataIndex: 'goodsPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '库存',
                key: 'goodsNum',
                dataIndex: 'goodsNum',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
            },
            {
                title: '单SKU图片',
                key: 'goodsImg',
                dataIndex: 'goodsImg',
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
            visible={skuPar.visible}
            onOk={() => {
                skuPar.list.forEach(item => {
                    if(item.isChecked){
                        this.setState({
                            skuPar: {
                                ...skuPar,
                                visible: false,
                                select: item
                            }
                        })
                        return false;
                    }
                });

            }}
            onCancel={() => {
                skuPar.visible = false;
                this.setState({skuPar});
            }}
        >

            <Table
                columns={columns}
                dataSource={skuPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            skuPar.list = skuPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.goodsSn === '' + item.goodsSn){
                                    item.isChecked = true;

                                }
                                return item
                            });
                            this.setState({skuPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: skuPar.total,
                        current: skuPar.current,
                        pageSize: skuPar.pageSize,
                        onChange: (a, b) => {
                            this.getSkuList();
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

}