import React, {Component} from 'react';
import {Card, Input, Select, Radio, Form, Button, message, Modal, Row, Col, Table, DatePicker} from "antd";
import {MinusCircleOutlined} from '@ant-design/icons';
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import moment from "moment";
import Model from "../Model";
import NumberFormat from "../../../../utils/numberformat/NumberFormat";
import UploadFile from "../../../../baseview/uploadFile/UploadFile";

const {RangePicker} = DatePicker;
const {Option} = Select;

export default class ESAddServiceRule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            serviceRuleSn: null,
            serviceLife: 1,
            // 1为认证前服务 2为认证后服务
            ruleType: 1,
            createTime: "",
            // 服务内容列表
            serviceList: [],
            // spu
            spuPar: {
                visible: false,
                startTime: '',
                endTime: '',
                current: 1,
                keyWord: '',
                total: 0,
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
            serviceOptions: [],
        };
    }

    componentDidMount() {
        let serviceRuleSn = this.props.location.search.substr(1).split('=')[1];
        serviceRuleSn = serviceRuleSn ? serviceRuleSn : null;

        if(serviceRuleSn){
            // 获取规则详情
            Model.GetServiceRuleDetail({serviceRuleSn}, res=>{
                let {serviceLife, ruleType, createTime, serviceList, spuPar, skuPar } = this.state;
                serviceLife = res.data.serviceLife;
                ruleType = res.data.ruleType;
                createTime = res.data.createTime;
                serviceList = res.data.serviceList;
                spuPar.select.goodsName = res.data.goodsName;
                spuPar.select.shopGoodsParentSn = res.data.shopGoodsParentSn;
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

            this.setState({
                serviceRuleSn
            })
        }

        Model.GetServiceList({}, res=>{
            this.setState({
                serviceOptions: res.data
            }, ()=>{
                if(!serviceRuleSn){
                    this.addServiceContent()
                }
            })
        }, err=>{})
    }

    handleChange = (event, name)=>{
        const value = event.target ? event.target.value : event;
        this.setState({
            [name]: value
        })
    }

    // 添加一条服务内容
    addServiceContent = () => {
        let {serviceList, serviceOptions} = this.state;
        let arr = [...serviceOptions];
        if(serviceList.length >= arr.length ){
            return false
        }

        for(let i=0; i<serviceList.length; i++){
            for(let j=0; j<arr.length; j++){
                if(serviceList[i].serviceSn === arr[j].serviceSn){
                    arr.splice(j, 1);
                }
            }
        }

        serviceList.push({serviceSn: arr[0].serviceSn, serviceNum: 1});
        this.setState({
            serviceList
        })
    }

    // 服务内容是否可选
    isDisable = (serviceSn)=>{
        const {serviceList} = this.state;
        for(let i=0; i<serviceList.length; i++){
            if(serviceList[i].serviceSn === serviceSn){
                return true
            }
        }

        return false;
    }

    render() {
        const {serviceRuleSn} = this.state;
        return (
            <TabsViewContent
                crumb={[
                        {name: '电子签章服务中心'},
                        {name: '服务规则管理', link: '/Pages/esServiceRulesList'},
                        {name:  serviceRuleSn ? '修改服务规则' : '添加服务规则'}
                    ]}
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
                        {
                            serviceRuleSn ? (
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '30%', textAlign: 'right'}}>规则ID:</div>
                                    <div style={{width: '70%', paddingLeft: 10}}>{serviceRuleSn}</div>
                                </div>
                            ) : null
                        }


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

                        {
                            serviceRuleSn ? (
                                <div style={{display: 'flex'}}>
                                    <div style={{width: '30%', textAlign: 'right'}}>创建时间:</div>
                                    <div style={{width: '70%', paddingLeft: 10}}>{createTime}</div>
                                </div>
                            ) : null
                        }

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
                                <li style={{position: 'relative', display: 'flex',justifyContent: 'space-between',marginTop: index > 0 ? 15 : 0}} key={index}
                                    onMouseEnter={()=>{
                                        if(serviceList.length > 1){
                                            serviceList[index].isShowDelBtn = 'block';
                                            this.setState({
                                                serviceList
                                            })
                                        }
                                    }}
                                    onMouseLeave={()=>{
                                        serviceList[index].isShowDelBtn = 'none';
                                        this.setState({
                                            serviceList
                                        })
                                    }}
                                >
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
                                                        serviceOptions.map(item=>{
                                                            return <Option key={item.serviceSn} value={item.serviceSn} disabled={this.isDisable(item.serviceSn)}>
                                                                {item.serviceName}
                                                            </Option>
                                                        })
                                                    }
                                                </Select>
                                            </div>
                                        </div>


                                    </div>

                                    <div className='right' style={{width: '38%'}}>
                                        <div style={{display: 'flex', alignItems: 'center'}}>
                                            <div style={{width: '30%', textAlign: 'right'}}>服务次数:</div>
                                            <div style={{width: '70%', paddingLeft: 10}}>
                                                <Input
                                                    style={{width: '100%'}}
                                                    value={serviceList[index].serviceNum}
                                                    onChange={(e) => {
                                                        if(e.target.value.length > 8){
                                                            return
                                                        }
                                                        let num = parseInt(e.target.value);
                                                        if(!num){
                                                            num = '1'
                                                        }
                                                        serviceList[index].serviceNum = num;
                                                        this.setState({
                                                            serviceList
                                                        })
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/*删除*/}
                                    <MinusCircleOutlined
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#e7292f',
                                            fontSize: 18,
                                            cursor: 'pointer',
                                            display: item.isShowDelBtn ? item.isShowDelBtn : 'none'
                                        }}
                                        onClick={()=>{
                                            serviceList.splice(index, 1);
                                            this.setState({
                                                serviceList
                                            })
                                        }}
                                    />
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
                                    <Option value={0}>无限</Option>
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
        const {ruleType, serviceList, serviceLife, serviceRuleSn} = this.state;
        const {specList, goodsSn, goodsImg} = this.state.skuPar.select;
        const {shopSn, goodsName, shopGoodsParentSn, goodsParentSn} = this.state.spuPar.select;

        if(!shopGoodsParentSn){
            message.error('请选择一个规则spu!');
            return
        }

        if(!goodsSn){
            message.error('SKU不能为空！');
            return
        }

        let params = {
            serviceRuleSn,
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
        let shopGoodsParentSn = this.state.spuPar.select.shopGoodsParentSn;
        if(!shopGoodsParentSn){
            message.error('请先选择一个规则spu！');
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
        const {keyWord} = spuPar;
        const columns = [
            {
                title: '选择',
                width: 60,
                key: 'select',
                render: (res) => {
                    return <Radio key={res.shopGoodsParentSn} checked={res.isChecked}/>
                }
            },
            {
                title: '商品ID',
                dataIndex: 'shopGoodsParentSn',
                key: 'shopGoodsParentSn',
            },
            {
                title: '商品编码',
                dataIndex: 'goodsCode',
                key: 'goodsCode',
            },
            {
                title: '商品名称',
                dataIndex: 'goodsName',
                key: 'goodsName',
            },
            {
                title: '店铺ID',
                dataIndex: 'shopSn',
                key: 'shopSn',
            },
            {
                title: '店铺名称',
                dataIndex: 'shopName',
                key: 'shopName',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
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
                        skuPar.select = {};
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

                message.error('请选择一个规则spu')


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
                        <Input value={keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            this.setState({
                                spuPar: {
                                    ...spuPar,
                                    current: 1,
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
                rowKey={'shopGoodsParentSn'}
                onRow={(record, idx) => {

                    return {
                        onClick: (event) => {
                            spuPar.list = spuPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.shopGoodsParentSn === '' + item.shopGoodsParentSn){
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
                        onChange: (current, b) => {
                            spuPar.current = current;
                            this.setState({
                                spuPar
                            }, ()=>{
                                this.getSpuList();
                            })

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
                width: 60,
                key: 'select',
                render: (res) => {
                    return <Radio key={res.shopGoodsParentSn} checked={res.isChecked}/>
                }
            },
            {
                title: '规格',
                dataIndex: 'specList',
                key: 'specList',
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
                dataIndex: 'goodsSn',
                key: 'goodsSn',
            },
            {
                title: '规格编码',
                dataIndex: 'goodsCode',
                key: 'goodsCode',
            },
            {
                title: '含税单价',
                dataIndex: 'goodsPrice',
                key: 'goodsPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 2, true)
                }
            },
            {
                title: '库存',
                dataIndex: 'goodsNum',
                key: 'goodsNum',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0)
                }
            },
            {
                title: '单SKU图片',
                dataIndex: 'goodsImg',
                key: 'goodsImg',
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
                for(let i=0; i<skuPar.list.length; i++){
                    let item = skuPar.list[i];
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
                }
                message.error('请选择sku')

            }}
            onCancel={() => {
                skuPar.visible = false;
                this.setState({skuPar});
            }}
        >

            <Table
                columns={columns}
                dataSource={skuPar.list || []}
                rowKey={'goodsSn'}
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
                        // current: skuPar.current,
                        pageSize: skuPar.pageSize,
                        // onChange: (current, b) => {
                        //     skuPar.current = current;
                        //     this.setState({
                        //         skuPar
                        //     }, ()=>{
                        //         this.getSkuList();
                        //     })
                        //
                        // },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

}