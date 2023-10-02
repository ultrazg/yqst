/**
 * Created by yb on 2019/11/20
 */

import React, {Component} from 'react';
import {Form, Button, Modal, Card, Tabs, Row, Col, message, Input, Radio} from 'antd';
import {CheckOutlined, RollbackOutlined} from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';
import VersionsMod from './editModel/VersionsMod';
import VisibilityMod from './editModel/VisibilityMod';
import BazaarVisibilityMod from './editModel/BazaarVisibilityMod';
import SpecificationMod from './editModel/SpecificationMod';
import ActivateMod from './editModel/ActivateMod';
import RightMod from './editModel/RightMod';
import OpenMod from './editModel/OpenMod';
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import UploadFile from '../../../baseview/uploadFile/UploadFile'

const { TabPane } = Tabs;


class CloudServeEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            activeKey: '1',

            // 基本信息_所用的参数
            basPar: {
                devPar: {
                    rowData: {},
                    list: [],
                    total: 0,
                    current: 1,
                    pageSize: 10,
                    keyWord: '',
                    visible: false
                },
                catPar: {
                    rowData: {},
                    list: [],
                    total: 0,
                    current: 1,
                    pageSize: 10,
                    keyWord: '',
                    visible: false
                },
                logo: '',
            },

            // 版本情况_所用的参数
            verPar: {
                list: [],
            },

            // 应用桌面可见性_所用的参数
            visPar: {
                isHide: '',
                listAccountList: [],
            },

            // 应用市场可见性_所用的参数
            bazVisPar: {
                markDisplay: '',
                keyWord: '',
            },

            // 参数规格设置_所用的参数
            spePar: {
                parList: [],
            },

            // 激活设置_所用的参数
            actPar: {
                maxNum: '',
                freeNum: '',
                freeParList: [],
            },

            // 权限配置_所用的参数
            rigPar: {
                authList: [],
            },

            // 开通操作设置_所用的参数
            opePar: {
                chargeButtonPar: {},
                freeButtonPar: {},
            },
        };
        this.id = '';
        this.crumb = [
            {name: '云服务中心'},
            {name: "云服务及规则管理"},
            {name: "云服务列表", link: '/Pages/CloudServeList'},
            {name: "新增云服务"}
        ];

        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.id = this.props.location.search.substr(1).split("=")[1];
        if (this.id) {
            this.getInfo();
            this.getVersionPage();
            // this.getSoftPage();
            this.getAuthPage();
            this.crumb = [
                {name: '云服务中心'},
                {name: "云服务及规则管理"},
                {name: "云服务列表", link: '/Pages/CloudServeList'},
                {name: "云服务详情", link: `/Pages/CloudServeDetail?id=${this.id}`},
                {name: "编辑云服务"}
            ];
        }
    }

    // 视图层
    render() {
        let {verPar, activeKey, data} = this.state;
        return (
            <Form ref={this.formRef} autoComplete="off" onFinish={this.onSubmit}>
                <ViewContent
                    crumb={this.crumb}
                    topBtn = {
                        <div>
                            <Button htmlType="submit" type="primary" icon={<CheckOutlined />} loading={this.state.loading}>保存</Button>
                            <Link style={{marginLeft: 15}}
                                  to={this.id ? `/Pages/CloudServeDetail?id=${this.id}` : '/Pages/CloudServeList'}
                            >
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs type="card" activeKey={activeKey} onChange={(key) => {
                        this.setState({activeKey: key});
                    }}>
                        <TabPane tab="基本信息" key="1">
                            {this.makeBaseView()}
                        </TabPane>
                        <TabPane tab="版本情况" key="2">
                            {
                                '2' === '' + activeKey && <VersionsMod
                                    pState={this.state}
                                    callBack={(list) => {
                                        verPar.list = list;
                                        this.setState({verPar, data});
                                    }}
                                    formRef={this.formRef}
                                />
                            }
                        </TabPane>
                        <TabPane tab="应用桌面可见性" key="3">
                            {
                                '3' === '' + activeKey && <VisibilityMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        this.setState({visPar: obj, data});
                                    }}
                                />
                            }
                        </TabPane>
                        <TabPane tab="应用市场可见性" key="4">
                            {
                                '4' === '' + activeKey && <BazaarVisibilityMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        this.setState({bazVisPar: obj});
                                    }}
                                />
                            }
                        </TabPane>
                        <TabPane tab="参数规格设置" key="5">
                            {
                                '5' === '' + activeKey && <SpecificationMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        let allArr = [];
                                        let newParList = obj.parList.map(item => {
                                            let listParValueDTOS = [];
                                            item.listParValueDTOS.forEach(cItem => {
                                                cItem.parValue.split(',').forEach(val => {
                                                    listParValueDTOS.push({
                                                        ...cItem,
                                                        parValue: val
                                                    });
                                                });
                                            });

                                            return {
                                                ...item,
                                                listParValueDTOS: listParValueDTOS,
                                            };
                                        });
                                        newParList.forEach((item,idx)=>{
                                            allArr.push(item.listParValueDTOS);
                                        });
                                        const newList = this.cartesianProductOf(...allArr).map((arrS, idx) => {
                                            return {
                                                // key: 'car_' + idx,
                                                freeParId: '',
                                                parSn: '',
                                                isSelect: 0,
                                                listParValueDTOS: arrS,
                                            }
                                        });
                                        this.setState({
                                            spePar: obj,
                                            actPar: {
                                                ...this.state.actPar,
                                                freeParList: newList
                                            }
                                        });
                                    }}
                                />
                            }
                        </TabPane>
                        <TabPane tab="激活设置" key="6">
                            {
                                '6' === '' + activeKey && <ActivateMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        this.setState({actPar: obj});
                                    }}
                                />
                            }
                        </TabPane>
                        <TabPane tab="权限配置" key="7">
                            {
                                '7' === '' + activeKey && <RightMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        this.setState({rigPar: obj, data});
                                    }}
                                    formRef={this.formRef}
                                />
                            }
                        </TabPane>
                        <TabPane tab="开通操作设置" key="8">
                            {
                                '8' === '' + activeKey && <OpenMod
                                    pState={this.state}
                                    callBack={(obj) => {
                                        this.setState({opePar: obj});
                                    }}
                                />
                            }
                        </TabPane>
                    </Tabs>
                    {this.makeDevMod()}
                    {this.makeCatMod()}
                </ViewContent>
            </Form>
        );
    }

    getInfo(){
        let {data, basPar, visPar, bazVisPar, spePar, actPar, rigPar, opePar, verPar} = this.state;
        let {devPar, catPar} = basPar;

        Model.UserAttSGet({id: this.id}, (res) => {
            data = res.data;
            devPar.rowData.userName = data.devName || '';
            devPar.rowData.id = data.devId || '';
            catPar.rowData.catName = data.catName || '';
            catPar.rowData.id = data.catId || '';
            basPar.logo = data.logo || '';
            visPar.isHide = data.isHide;
            bazVisPar.markDisplay = data.markDisplay;
            bazVisPar.keyWord = data.keyWord;
            spePar.parList = data.listParDTOS || [];
            actPar.maxNum = data.maxNum || '';
            actPar.freeNum = data.freeNum || '';
            actPar.freeParList = data.softFreeParDTOS && data.softFreeParDTOS.map(item => {
                return {
                    freeParId: item.parId,
                    parSn: item.parSn,
                    isSelect: item.isSelect,
                    listParValueDTOS: item.parValueList && item.parValueList.map(iItem => {
                        return {
                            parValue: iItem.parValue,
                            typeValueId: iItem.typeValueId,
                            typeValueName: iItem.typeValue,
                        }
                    }),
                }
            });
            opePar.freeButtonPar = {
                buttonName: data.freeButtonParJson.buttonName,
                isShow: data.freeButtonParJson.isShow,
                memo: data.freeButtonParJson.memo,
                isShowPop: data.freeButtonParJson.isShowPop,
            };
            opePar.chargeButtonPar = {
                buttonName: data.chargeButtonParJson.buttonName,
                isShow: data.chargeButtonParJson.isShow,
                memo: data.chargeButtonParJson.memo,
                isShowPop: data.chargeButtonParJson.isShowPop,
            };

            this.setState({
                data,
                basPar,
                bazVisPar,
                opePar,
            }, () => {
                const {setFieldsValue} = this.formRef.current;
                setFieldsValue({
                    softSn: data.softSn,
                    devName: devPar.rowData.userName || '',
                    devId: devPar.rowData.id || '',
                    name: data.name || '',
                    catName: catPar.rowData.catName || '',
                    logo: data.logo || '',
                    description: data.description || '',
                });
                this.getSoftPage();
            });
        }, (err) => {
        });
    }

    getVersionPage(){
        let {verPar} = this.state;

        Model.CServeSVPage({
            current: 1,
            pageSize: 10000,
            softId: this.id,
        }, (res) => {
            verPar.list = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    logUpdateTime: item.logUpdateTime ? moment(item.logUpdateTime).format('YYYY-MM-DD') : '',
                }
            });
            this.setState({verPar});
        }, (err) => {});
    }

    getSoftPage(){
        let {visPar} = this.state;
        Model.CServeSLPage({
            current: 1,
            pageSize: 10000,
            softId: this.id,
            type: '2' === '' + this.state.data.isHide ? '1' : '2',
        }, (res) => {
            const newListAccountList = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    key: item.userId,
                    uid: item.userId,
                    accountSn: item.accountSn,
                    companyName: item.userName,
                }
            });
            visPar.listAccountList = newListAccountList;
            this.setState({visPar});

        }, (err) => {});
    }

    getAuthPage(){
        let {rigPar} = this.state;
        Model.CServeSAPage({
            current: 1,
            pageSize: 10000,
            softId: this.id,
        }, (res) => {
            rigPar.authList = res.data.records || [];
            this.setState({rigPar})
        }, (err) => {});
    }

    getDevList(current){
        let {basPar} = this.state;
        let {devPar} = basPar;
        devPar.current = current ? current : devPar.current;

        Model.CServeSDPage({
            current: devPar.current,
            pageSize: devPar.pageSize,
            keyWord: devPar.keyWord,

        }, (res) => {
            devPar.list = res.data.records && res.data.records.map(item => {
                item.isChecked = false;
                if('' + devPar.rowData.id === '' + item.id){
                    item.isChecked = true;
                }

                return item;
            });
            devPar.total = res.data.total || 0;
            devPar.visible = true;

            this.setState({
                basPar,
            });

        }, (err) => {});
    }

    getCatList(current) {
        let {basPar} = this.state;
        let {catPar} = basPar;
        catPar.current = current ? current : catPar.current;

        Model.CServeSCPage({
            current: catPar.current,
            pageSize: catPar.pageSize,
            keyWord: catPar.keyWord,

        }, (res) => {
            const mapChildren = (list) => {
                list.forEach((item, idx) => {
                    item.key = (++idx + (parseInt(catPar.current) - 1) * 10) + '_' + item.id;
                    item.isChecked = false;
                    if('' + catPar.rowData.id === '' + item.id){
                        item.isChecked = true;
                    }
                    // item.numXH = ++idx + (parseInt(catPar.current) - 1) * 10;
                    if(item.listSoftCatDTOS && item.listSoftCatDTOS.length > 0){
                        item.children = item.listSoftCatDTOS;
                        mapChildren(item.listSoftCatDTOS);
                    }
                });
                return list;
            };
            const newList = mapChildren(res.data.records || []).map((item, idx) => {
                return {
                    ...item,
                    numXH: ++idx + (parseInt(catPar.current) - 1) * 10,
                }
            });
            catPar.list = newList;
            catPar.visible = true;
            catPar.total = res.data.total || 0;

            this.setState({
                basPar
            })
        }, (err) => {
        })
    }

    makeBaseView(){
        const {data, basPar} = this.state;
        const {devPar, catPar} = basPar;
        const carData = [
            {
                key: 'jbKey',
                title: '基本信息',
                data: [
                    this.id ? {key: 'id', type: 'Texts', label: '云服务ID', span: 12, value: data.id} : {},
                    this.id ? {key: 'createTime', type: 'Texts', label: '创建时间', span: 12,
                        value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD') : ''} : {},
                    {
                        key: 'softSn', type: 'Input', span: 12, placeholder: '请填写(仅限英文及数字字符)', label: '云服务编码',
                        value: data.softSn || '',
                        options: {
                            rules: [{
                                required: true, message: '云服务编码不能为空',
                            }, {
                                validator: (rule, value, callback) => this.checkValidator(rule, value, callback)
                            }],
                        },
                        attribute: {
                            maxLength: 20
                        }
                    },
                    {key: 'devName', label: '开发者名称', span: 12, type: 'Custom',
                        value: devPar.rowData.userName || '',
                        options: {
                            rules: [{
                                required: true, message: '开发者名称不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowSoft.name}
                             onClick={() => {
                                 this.getDevList(1);
                             }}
                        />
                    },
                    {key: 'devId', type: 'Custom', label: '开发者ID', span: 12,
                        value: devPar.rowData.id || '',
                        options: {
                            rules: [{
                                required: false, message: '开发者ID不能为空',
                            }],
                        },
                        view: <Input placeholder="选择开发者名称后自动带出" disabled={true}/>
                    },
                    {
                        key: 'name', type: 'Input', span: 12, placeholder: '请填写云服务名称', label: '云服务名称',
                        value: data.name || '',
                        options: {
                            rules: [{
                                required: true, message: '云服务名称不能为空',
                            }],
                        },
                        attribute: {
                            maxLength: 30
                        }
                    },
                    {
                        key: 'catName', span: 12, label: '云服务分类',
                        value: catPar.rowData.catName || '',
                        type: 'Custom',
                        options: {
                            rules: [{
                                required: true, message: '云服务分类不能为空',
                            }],
                        },
                        view: <Input placeholder="点击选择" readOnly={true}
                            // value={this.state.rowSoft.name}
                             onClick={() => {
                                 this.getCatList(1);
                             }}
                        />
                    },
                    {
                        key: 'logo', type: 'UploadFile', label: '云服务logo', span: 12,
                        options: {
                            rules: [{
                                required: true, message: '云服务logo不能为空',
                            }],
                        },
                        value: basPar.logo ? basPar.logo.split(',') : [],
                        data: {
                            maxNum: 1,
                            fileUrlList: basPar.logo ? basPar.logo.split(',') : [],
                            fileTypeList: ['bmp', 'jpeg' , 'gif', 'png', 'jpg'],
                            fileSize: 1,
                        },
                        callBackFiles: (url) => {
                            basPar.logo = url.join(',');
                            this.setState({basPar}, () => {
                                const {setFieldsValue} = this.formRef.current;
                                setFieldsValue({
                                    logo: url.join(','),
                                });
                            });
                        },
                    },
                    {
                        key: 'description', type: 'Input', value: data.description || '', label: '云服务描述', placeholder: '请填写云服务描述', span: 12,
                        attribute: {
                            maxLength: 200,
                            style: {
                                width: '100%',
                                height: '100px',
                            },
                            type: "textarea",
                        },
                    },
                ],
                style: {marginTop: 0},
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

    makeDevMod(){
        let {basPar} = this.state;
        let {devPar} = basPar;
        const columns = [
            {
                title: '开发者ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '开发者编码',
                key: 'devSn',
                dataIndex: 'devSn',
            },
            {
                title: '企业ID',
                key: 'userId',
                dataIndex: 'userId',
            },
            {
                title: '企业名称',
                key: 'userName',
                dataIndex: 'userName',
            },
            {
                title: '添加时间',
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
            {
                title: '操作',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
        ];

        return <Modal
            title="选择开发者"
            width={900}
            visible={devPar.visible}
            onOk={() => {
                let changeItem = null;
                const {setFieldsValue} = this.formRef.current;
                devPar.list.forEach(item => {
                    if(item.isChecked){
                        changeItem = item;
                        return false;
                    }
                });

                if(!changeItem && !devPar.rowData.id){
                    return message.error('请选择一个开发者！');
                }

                devPar.visible = false;
                devPar.rowData = changeItem;
                setFieldsValue({devName: changeItem ? changeItem.userName : '', devId:  changeItem ? changeItem.id : ''});
                this.setState({basPar});
            }}
            onCancel={() => {
                devPar.visible = false;
                this.setState({basPar});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={24}>
                        关键字：
                        <Input value={devPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            devPar.keyWord = e.target.value;
                            this.setState({
                                basPar,
                            });
                        }}/>
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        devPar.current = 1;
                        devPar.keyWord = '';
                        this.setState({basPar});
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getDevList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={devPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            devPar.list = devPar.list.map(item => {
                                item.isChecked = false;
                                if('' + record.id === '' + item.id){
                                    item.isChecked = true;

                                }
                                return item
                            });
                            this.setState({basPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: devPar.total,
                        current: devPar.current,
                        pageSize: devPar.pageSize,
                        onChange: (a, b) => {
                            this.getDevList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    makeCatMod(){
        let {basPar} = this.state;
        let {catPar} = basPar;
        const columns = [
            {
                title: '排序',
                key: 'numXH',
                dataIndex: 'numXH',
            },
            {
                title: '分类ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '分类编码',
                key: 'catSn',
                dataIndex: 'catSn',
            },
            {
                title: '分类名称',
                key: 'catName',
                dataIndex: 'catName',
            },
            {
                title: '选择',
                key: '',
                dataIndex: '',
                width: 60,
                render: (res) => {
                    return <Radio checked={res.isChecked}/>
                }
            },
        ];
        return <Modal
            title="选择云服务分类"
            width={900}
            visible={catPar.visible}
            onOk={() => {
                let changeItem = null;
                const {setFieldsValue} = this.formRef.current;
                const recCatList = (list) => {
                    list.forEach(item => {
                        if(item.isChecked){
                            changeItem = item;
                            return false;

                        }else if(item.children && item.children.length > 0){
                            recCatList(item.children);

                        }
                    });

                    return changeItem
                };
                recCatList(catPar.list);

                if(!changeItem && !catPar.rowData.id){
                    return message.error('请选择一个云服务分类！');
                }

                setFieldsValue({catName: changeItem ? changeItem.catName : ''});
                catPar.rowData = changeItem ? changeItem : {};
                catPar.visible = false;

                this.setState({basPar});
            }}
            onCancel={() => {
                catPar.visible = false;
                this.setState({basPar});
            }}
        >
            <Row style={{marginBottom: 15}}>
                <Col span={20}>
                    <Col span={24}>
                        关键字：
                        <Input value={catPar.keyWord} style={{ width: '80%' }} placeholder={'可查询ID、编码、名称'} onChange={(e) => {
                            catPar.keyWord = e.target.value;
                            this.setState({basPar});
                        }}/>
                    </Col>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        catPar.keyWord = '';
                        catPar.current = 1;
                        this.setState({basPar});
                    }}>重置</Button>
                    <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                        this.getCatList(1);
                    }}>搜索</Button>
                </Col>
            </Row>

            <SWTable
                columns={columns}
                dataSource={catPar.list || []}
                onRow={(record, idx) => {
                    return {
                        onClick: (event) => {
                            const recCatList = (list) => {
                                list.forEach(item => {
                                    if('' + record.id === '' + item.id){
                                        item.isChecked = !item.isChecked;

                                    }else{
                                        item.isChecked = false;

                                    }
                                    if(item.children && item.children.length > 0){
                                        recCatList(item.children);
                                    }
                                });

                                return list;
                            };
                            catPar.list = recCatList(catPar.list);
                            this.setState({catPar});
                        }
                    }
                }}
                pagination={
                    {
                        total: catPar.total,
                        current: catPar.current,
                        pageSize: catPar.pages,
                        onChange: (a, b) => {
                            this.getCatList(a);
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Modal>
    }

    cartesianProductOf(){
        return Array.prototype.reduce.call(arguments,function(a, b) {
            let ret = [];
            a.forEach(function(a) {
                b.forEach(function(b) {
                    ret.push(a.concat([b]));
                });
            });
            return ret;
        }, [[]]);
    }

    onSubmit = () => {
        const {basPar, verPar, visPar, bazVisPar, spePar, actPar, rigPar, opePar} = this.state;
        let {devPar, catPar} = basPar;
        this.setState({loading: true});
        const {validateFields} = this.formRef.current;
        validateFields(['softSn', 'devName', 'devId', 'name', 'catName', 'logo', 'description']).then(values => {
            if(this.id)
                values.id = this.id;

            // 判断基本信息有没有必填的
            if(!values.softSn || !values.devName || !values.name || !values.catName || !values.logo || values.logo.length <= 0){
                this.setState({loading: false, activeKey: '1'});
                return false;
            }
            values.catId = catPar.rowData.id;
            delete values.catName;

            // 判断版本情况有没有必填的
            if(verPar.list <= 0){
                message.error('请添加版本情况！');
                this.setState({loading: false, activeKey: '2'});
                return false;
            }
            values.versionLogList = verPar.list;

            // 判断应用桌面可见性
            if((!visPar.isHide && '0' !== '' + visPar.isHide) || (('2' === '' + visPar.isHide || '3' === '' + visPar.isHide) && visPar.listAccountList.length <= 0)){
                if(!visPar.isHide && '0' !== '' + visPar.isHide)
                    message.error('可见性设置不能为空！');

                else if(('2' === '' + visPar.isHide || '3' === '' + visPar.isHide) && visPar.listAccountList.length <= 0)
                    message.error('请选择企业！');

                this.setState({loading: false, activeKey: '3'});
                return false;
            }
            values.isHide = visPar.isHide;
            values.listAccountList = visPar.listAccountList;

            // 判断市场应用市场可见性
            if(!bazVisPar.markDisplay || ('2' === '' + bazVisPar.markDisplay && !bazVisPar.keyWord)){
                if(!bazVisPar.markDisplay)
                    message.error('可见性类型不能为空！');

                else if('2' === '' + bazVisPar.markDisplay && !bazVisPar.keyWord)
                    message.error('可见性类型不能为空！');
                this.setState({loading: false, activeKey: '4'});
                return false;
            }
            values.markDisplay = bazVisPar.markDisplay;
            values.keyWord = bazVisPar.keyWord;

            // 判断参数规格设置
            if(spePar.parList <= 0){
                message.error('请添加参数规格！');
                this.setState({loading: false, activeKey: '5'});
                return false;
            }
            values.parList = spePar.parList;

            // 判断激活设置
            if(!actPar.maxNum || !actPar.freeNum || actPar.freeParList.length <= 0){
                if(!actPar.maxNum)
                    message.error('最大可激活数不能为空！');

                else if(!actPar.freeNum)
                    message.error('免费可激活数不能为空！');

                else if(actPar.freeParList.length <= 0)
                    message.error('免费激活参数不能为空！');
                this.setState({loading: false, activeKey: '6'});
                return false;

            }
            let hasSelect = false, hasEmpParSn = false, hasSameCode = false;
            actPar.freeParList.forEach((item, idx) => {
                if('1' === '' + item.isSelect)
                    hasSelect = true;

                if(!item.parSn)
                    hasEmpParSn = true;

                actPar.freeParList.forEach((iItem, iIdx) => {
                    if(iIdx <= idx) return false;

                    if(item.parSn == iItem.parSn)
                        hasSameCode = true;
                });
            });
            if(!hasSelect || hasEmpParSn || hasSameCode){
                if(!hasSelect)
                    message.error('请勾选一个免费激活参数！');

                else if(hasEmpParSn)
                    message.error('免费激活参数列表编码不能为空！');

                else if(hasSameCode)
                    message.error('参数编码不能重复！');
                this.setState({loading: false, activeKey: '6'});
                return false;
            }
            values.maxNum = actPar.maxNum;
            values.freeNum = actPar.freeNum;
            values.freeParList = actPar.freeParList;

            // 判断权限配置
            if(rigPar.authList.length <= 0){
                message.error('请添加权限配置！');
                this.setState({loading: false, activeKey: '7'});
                return false;
            }
            let hasEmpRight = false, hasMK = false, hasMC = false;
            rigPar.authList.forEach(item => {
                if(!item.parentName)
                    hasMK = true;
                else if(!item.resName)
                    hasMC = true;
                else if(!item.resCode){
                    hasEmpRight = true;
                }
            });
            if(hasEmpRight || hasMK || hasMC){
                if(hasMK)
                    message.error('已添加的功能模块不能为空！');
                else if(hasMC)
                    message.error('已添加的功能名称不能为空！');
                else if(hasEmpRight)
                    message.error('已添加的权限编码不能为空！');

                this.setState({loading: false, activeKey: '7'});
                return false;
            }
            values.authList = rigPar.authList;

            // 判断开通权限
            if(!opePar.chargeButtonPar.buttonName || !opePar.freeButtonPar.buttonName){
                message.error('操作按钮名称不能为空');
                this.setState({loading: false, activeKey: '8'});
                return false;
            }
            delete opePar.chargeButtonPar.key;
            delete opePar.chargeButtonPar.typeName;
            delete opePar.freeButtonPar.key;
            delete opePar.freeButtonPar.typeName;

            values.chargeButtonPar = opePar.chargeButtonPar;
            values.freeButtonPar = opePar.freeButtonPar;

            Model.CServeSSave({
                softSaveMessage: JSON.stringify(values),
            }, (res) => {
                message.success('保存成功！');
                this.props.history.push('/Pages/CloudServeList');

            }, (err) => {
                this.setState({loading: false});

            });
        }).catch(err=>{
            this.setState({loading: false});
        })
    }
}

export default CloudServeEdit
