/**
 * Created by yb on 2019/09/03.
 */

import React, {Component} from 'react';
import {Form, Button, Card, Table, Tabs, Timeline} from 'antd';
import {RollbackOutlined, } from '@ant-design/icons';
import {Link} from "react-router-dom";
import Model from "../Model";
import moment from 'moment'
import AssemblySet from "../../../baseview/assemblySet/AssemblySet";
import ViewContent from "../../../baseview/viewContent/ViewContent";
import NumberFormat from "../../../utils/numberformat/NumberFormat";
import UploadFile from '../../../baseview/uploadFile/UploadFile'

const { TabPane } = Tabs;
const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 3},
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 21},
    },
};


class ComProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            logList: [],
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
            <Form ref={this.formRef}>
                <ViewContent
                    crumb={[
                        {name: "商品中心"},
                        {name: "产品管理"},
                        {name: "产品列表", link: '/Pages/ComProductList'},
                        {name: "产品详情"},
                    ]}
                    topBtn = {
                        <div>
                            <Link to={'/Pages/ComProductList'} style={{marginLeft: 15}}>
                                <Button icon={<RollbackOutlined />}>返回</Button>
                            </Link>
                        </div>
                    }
                >
                    <Tabs defaultActiveKey="1" onChange={(key) => {
                        if('2' === '' + key && this.state.logList.length <= 0){
                            Model.SellerGLList({goodsUid: this.id}, (res) => {
                                this.setState({logList: res.data});
                            }, (err) => {
                            });
                        }
                    }}>
                        <TabPane tab="产品详情" key="1">
                            {this.makeBaseView()}
                            {this.makeTPView()}
                            {this.makeMSView()}
                            {this.makeGGView()}
                            {this.makeSKUView()}
                            {this.makeTWView()}
                        </TabPane>
                        <TabPane tab="操作记录" key="2">
                            {this.makeJLView()}
                        </TabPane>
                    </Tabs>
                </ViewContent>
            </Form>
        );
    }

    getInfo() {
        Model.SellerGGet({goodsUid: this.id}, (res) => {
            this.setState({data: res.data});
        }, (err) => {
        });
    }

    makeBaseView() {
        let {data} = this.state;
        let noSetData = [
            {key: 'goodsName', type: 'Texts', label: '产品名称', span: 12, value: data.goodsName},
            {key: 'goodsCat', type: 'Texts', label: '产品类目', span: 12, value: data.goodsCat},
            {key: 'goodsCode', type: 'Texts', label: '产品编码', span: 12, value: data.goodsCode},
            {key: 'taxCode', type: 'Texts', label: '税务分类代码', span: 12, value: data.taxCode},
            {key: 'userName', type: 'Texts', label: '所属企业', span: 12, value: data.userName},
            {key: 'goodsUid', type: 'Texts', label: '产品ID', span: 12, value: data.goodsUid},
            {key: 'createTime', type: 'Texts', label: '创建时间', span: 12, value: data.createTime ? moment(data.createTime).format('YYYY-MM-DD HH:mm:ss') : ''},
        ];
        return <Card
            type="inner"
            title="基本信息"
        >
            <AssemblySet key={'makeBaseView'} data={noSetData} form={this.formRef.current}/>
        </Card>
    }

    makeTPView() {
        let {data} = this.state;
        let noSetData = [
            {
                key: 'mainImgUrl', type: 'UploadFile', label: '产品图片', formItemLayout, span: 24,
                value: data.mainImgUrl ? data.mainImgUrl.split(',') : [],
                data: {
                    maxNum: 1,
                    fileUrlList: data.mainImgUrl ? data.mainImgUrl.split(',') : [],
                    isDowload: false,
                    isReadOnly: true,
                },
            }
        ];
        return <Card
            type="inner"
            title="产品图片"
            style={{marginTop: 15}}
        >
            {/*<AssemblySet key={'makeTPView'} data={noSetData} form={this.formRef.current}/>*/}
            <UploadFile
                key={'a'}
                data={{
                    maxNum:1,
                    uploadText:'',
                    fileUrlList: data.mainImgUrl ? data.mainImgUrl.split(',') : [],
                    isReadOnly: true
                }}
                // callBackFiles={callBackFiles}
            />
        </Card>
    }

    makeMSView() {
        let {data} = this.state;
        return <Card
            type="inner"
            title="产品描述"
            style={{marginTop: 15}}
        >
            <div style={{textIndent: 26}}>{data.goodsShowName}</div>
        </Card>
    }

    makeGGView() {
        let {data} = this.state;

        return <Card
            type="inner"
            title="产品规格"
            style={{marginTop: 15}}
        >
            <div
                style={{
                    maxHeight: 300,
                    overflowY: 'auto'
                }}
            >
                {
                    data.specList && data.specList.length > 0 ? data.specList.map((item, idx) => {
                        return <div key={idx} style={{
                            padding: 10,
                            background: '#fafafa',
                            borderRadius: 6,
                            marginBottom: 10
                        }}>
                            <div>
                                <span>规格名：</span>
                                {item.specName}
                            </div>
                            <div style={{margin: '10px 0'}}>
                                <span>规格值：</span>
                                {
                                    item.specResList && item.specResList.map((cItem, cIdx) => {
                                        return <span style={{
                                            marginRight: 10,
                                            padding: '2px 10px',
                                            display: 'inline-block',
                                            border: '1px solid #e8e8e8',
                                            borderRadius: 6,
                                            backgroundColor: '#fff'
                                        }} key={'c_' + cIdx}>
                                            {cItem.specValue}
                                        </span>
                                    })
                                }
                            </div>
                        </div>
                    }) : <div style={{textAlign: 'center', fontSize: 20}}>暂无产品规格....</div>
                }
            </div>
        </Card>
    }

    makeSKUView(){
        let {data} = this.state;
        const columns = [
            {
                title: '规格',
                dataIndex: '',
                key: '',
                width: '30%',
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
                title: '建议零售价/元',
                dataIndex: 'price',
                key: 'price',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0);
                }
            },
            {
                title: '成本价',
                dataIndex: 'marketPrice',
                key: 'marketPrice',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0);
                }
            },
            {
                title: '库存',
                dataIndex: 'inventory',
                key: 'inventory',
                render: (res) => {
                    return NumberFormat.thousandBit(res || 0, 0);
                }
            },
            {
                title: 'SKU编码',
                dataIndex: 'goodsCode',
                key: 'goodsCode',
            },
            {
                title: '单SKU产品图片',
                dataIndex: 'mainUrl',
                key: 'mainUrl',
                width: 200,
                render: (res) => {
                    return <UploadFile
                        key={'a'}
                        data={{
                            maxNum:1,
                            uploadText:'',
                            fileUrlList: [res],
                            isReadOnly: true
                        }}
                        // callBackFiles={callBackFiles}
                    />
                }
            }
        ];
        const newDataSou = data.specResponseList && data.specResponseList.map((item, idx) => {
            return {
                ...item,
                key: idx,
            }
        }) || [];

        return <Card
            type="inner"
            title="SKU组合"
            style={{marginTop: 15}}
        >
            <Table dataSource={newDataSou} columns={columns} />
        </Card>
    }

    makeTWView(){
        let {data} = this.state;
        return <Card
            type="inner"
            title="图文详情"
            style={{marginTop: 15}}
        >
            <div dangerouslySetInnerHTML = {{__html:data.goodsDescribe}} ></div>
        </Card>
    }

    makeJLView(){
        return <Timeline style={{marginLeft: 25}}>
            {
                this.state.logList.map((item, idx) => {
                    return <Timeline.Item key={'log_' + idx}>
                        <h3>{item.title}</h3>
                        <div>
                            <span>操作人：{item.operator}</span>
                            <span style={{marginLeft: 15}}>操作时间：{item.createTime ? moment(item.createTime).format('YYYY-MM-DD') : ''}</span>
                        </div>
                    </Timeline.Item>
                })
            }
            {
                this.state.logList.length <= 0 && <div style={{textAlign: 'center', fontSize: 20, color: '#ccc', margin: 15}}>
                    暂无操作记录...
                </div>
            }
        </Timeline>
    }
}

export default ComProductDetail
