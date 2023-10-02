import React, {Component} from 'react';
import {Form, Button, DatePicker, message, Radio, Input, Modal, Pagination, Empty, Breadcrumb} from 'antd';
import moment from 'moment';
import './chains.css';
import Api from '../Api';
import request from '../../../utils/request/request';
import GraphCharts from "./GraphCharts";
import {cloneDeep} from "lodash";

const {RangePicker} = DatePicker;

/**
 * 项目供应链
 */
class ProjectChain extends Component {
    baseOptions = {
        tooltip: {
            // enterable: true,
            // alwaysShowContent: true,
            triggerOn: 'click',
            formatter: args => {
                const {id, name, projectSn} = args.data;
                // const {id, name} = args.data;
                this.toolTip(id, name, projectSn);
            },
            show: true,
        },
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [
            {
                type: 'graph',
                layout: 'force',
                force: {
                    layoutAnimation: true,
                    repulsion: 200,
                    edgeLength: [60, 180]
                },
                symbolSize: 60,
                roam: true,
                nodeScaleRatio: 0,
                label: {
                    show: true,
                    width: 50,
                    fontWeight: 'bold',
                    overflow: 'truncate'
                },
                edgeSymbol: ['circle', 'none'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 15
                },
                data: [],
                links: [],
                lineStyle: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0
                },
                emphasis: {
                    focus: "adjacency",
                    lineStyle: {
                        width: 10,
                    },
                },
            }
        ]
    };

    constructor(props) {
        super(props);
        this.state = {
            startTime: '',
            endTime: '',
            projectSn: '',
            projectName: '',
            companySn: '',
            total: 0,
            searchInput: '',
            sn: '',
            searchRequestPar: {
                current: 1,
                pageSize: 10,
                keyWord: ''
            },
            searchLists: [],
            lesseeQuantity: "-",
            lessorQuantity: "-",
            newLesseeQuantity: "-",
            newLessorQuantity: "-",
            tipLesseeQuantity: "-",
            tipLessorQuantity: "-",
            tipNewLesseeQuantity: "-",
            tipNewLessorQuantity: "-",
            emptyType: "键入关键词进行搜索",
        }
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <div style={{padding: "10px"}}>
                    <Breadcrumb>
                        <Breadcrumb.Item>数据中心</Breadcrumb.Item>
                        <Breadcrumb.Item>供应链关系图谱</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
                <Radio.Group
                    defaultValue="b"
                    buttonStyle="solid"
                    className={'radioGroup'}
                >
                    <Radio.Button
                        value="a"
                        onClick={() => this.props.history.push("/Pages/DataCenter/CompanyChain")}
                    >
                        企业供应链
                    </Radio.Button>
                    <Radio.Button
                        value="b"
                        onClick={() => this.props.history.push("/Pages/DataCenter/ProjectChain")}
                    >
                        项目供应链
                    </Radio.Button>
                </Radio.Group>
                <div className={'content'}>
                    <div className="left-layout">
                        <Form
                            layout={"vertical"}
                        >

                            <Form.Item label="项目名称">
                                <Input
                                    placeholder="请输入项目名称"
                                    readOnly
                                    value={this.state.projectName}
                                    style={{
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => {
                                        this.setState({
                                            isModalVisible: true
                                        })
                                        this.modalGetLists(1);
                                    }}
                                />
                            </Form.Item>
                            <Form.Item label="查找时间">
                                <RangePicker
                                    style={{
                                        width: "100%"
                                    }}
                                    defaultValue={moment()}
                                    format={'YYYY-MM-DD'}
                                    onChange={date => {
                                        const startTime = moment(date[0]).format('YYYY-MM-DD');
                                        const endTime = moment(date[1]).format('YYYY-MM-DD');
                                        this.setState({
                                            startTime,
                                            endTime
                                        });
                                    }}
                                    allowClear={false}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Button
                                    type="primary"
                                    onClick={this.onSearchHandle}
                                    style={{
                                        width: "100%",
                                        marginTop: "5px"
                                    }}
                                >查找关系</Button>
                            </Form.Item>
                        </Form>
                        <div style={{color: "#2f3542"}}>
                            <h3 style={{
                                fontSize: '15px'
                            }}>搜索项目的物资统计</h3>
                            <p style={{marginBottom: "0"}}>承租在租总量 {this.state.lesseeQuantity}</p>
                            <p style={{marginBottom: "0"}}>出租在租总量 {this.state.lessorQuantity}</p>
                            <p style={{marginBottom: "0"}}>新增承租总量 {this.state.newLesseeQuantity}</p>
                            <p style={{marginBottom: "0"}}>新增出租总量 {this.state.newLessorQuantity}</p>
                        </div>
                    </div>
                    <GraphCharts
                        ref={(c) => this.chartsRef = c}
                    />
                </div>
                <Modal
                    title="选择一个项目"
                    visible={this.state.isModalVisible}
                    footer={null}
                    width={600}
                    onCancel={() => {
                        this.setState({
                            isModalVisible: false,
                            emptyType: "键入关键词进行搜索"
                        })
                    }}
                >
                    <div className="modal-layout">
                        <span>
                            查询：
                            <Input
                                style={{width: "59%"}}
                                value={this.state.searchInput}
                                placeholder="输入关键字"
                                onPressEnter={() => {
                                    const keyWord = this.state.searchInput;
                                    this.setState({
                                        searchRequestPar: {
                                            ...this.state.searchRequestPar,
                                            keyWord
                                        }
                                    }, () => {
                                        this.modalGetLists(1);
                                    })
                                }}
                                onChange={e => {
                                    this.setState({
                                        searchInput: e.target.value
                                    })
                                }}
                            />
                            <Button
                                style={{marginLeft: "15px"}}
                                onClick={() => {
                                    this.setState({
                                        searchInput: '',
                                    })
                                }}
                            >重置</Button>
                            <Button
                                style={{marginLeft: "15px"}}
                                type={"primary"}
                                onClick={() => {
                                    const keyWord = this.state.searchInput;
                                    this.setState({
                                        searchRequestPar: {
                                            ...this.state.searchRequestPar,
                                            keyWord
                                        }
                                    }, () => {
                                        this.modalGetLists(1);
                                    })
                                }}
                            >搜索</Button>
                        </span>
                        <div className="result-layout">
                            {
                                this.state.searchLists.length === 0
                                    ? ""
                                    : this.state.searchLists.map((item, index) => (
                                        <div
                                            key={index}
                                        >
                                            项目名称：{item.projectName}
                                            <Button
                                                type={"link"}
                                                onClick={() => {
                                                    this.setState({
                                                        projectName: item.projectName,
                                                        projectSn: item.projectSn,
                                                        isModalVisible: false,
                                                        searchRequestPar: {
                                                            current: 1,
                                                            pageSize: 10,
                                                            keyWord: ''
                                                        },
                                                        searchLists: []
                                                    })
                                                }}
                                            >
                                                选择
                                            </Button>
                                        </div>
                                    ))
                            }
                        </div>
                        {
                            this.state.searchLists.length === 0
                                ? <Empty
                                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                                    description={this.state.emptyType}
                                />
                                : <Pagination
                                    style={{marginTop: "10px"}}
                                    defaultCurrent={1}
                                    total={this.state.total}
                                    showTotal={total => `${total}结果`}
                                    pageSize={10}
                                    size={"small"}
                                    showQuickJumper={false}
                                    showSizeChanger={false}
                                    onChange={page => {
                                        this.modalGetLists(page);
                                    }}
                                />
                        }
                    </div>
                </Modal>
            </>
        );
    }

    toolTip = (companySn, projectName, projectSn) => {
        if (projectName === undefined) {
            return false;
        }
        if (projectSn === undefined) {
            projectSn = companySn;
            companySn = this.state.companySn
        }
        const {startTime, endTime} = this.state;

        request(
            Api.projectLease,
            {
                companySn,
                projectSn,
                startTime,
                endTime,
            },
            res => {
                // TODO 错误处理
                const {lesseeQuantity, lessorQuantity, newLesseeQuantity, newLessorQuantity} = res.data;
                const dom = <div>
                    <p>出租在租量：{lessorQuantity}</p>
                    <p>承租在租量：{lesseeQuantity}</p>
                    <p>新增出租量：{newLessorQuantity}</p>
                    <p>新增承租量：{newLesseeQuantity}</p>
                </div>
                Modal.info({
                    title: projectName,
                    content: dom
                })
            },
            () => {
            }
        )
    }

    modalGetLists = current => {
        this.state.searchRequestPar.current = current
            ? current
            : this.state.searchRequestPar.current

        request(
            Api.projectPage,
            {
                ...this.state.searchRequestPar
            },
            res => {
                const total = res.data.total;
                const newList = res.data.records && res.data.records.map((item, index) => {
                    return {
                        ...item,
                        key: index
                    }
                });
                if (total === 0) {
                    this.setState({
                        emptyType: "查无数据"
                    })
                }
                this.setState({
                    searchLists: newList,
                    total
                })
            }, () => {
            }
        )
    }

    onSearchHandle = () => {
        const {startTime, endTime, projectSn} = this.state;
        if (!!startTime && !!endTime && !!projectSn) {
            request(
                Api.projectChains,
                {
                    startTime,
                    endTime,
                    projectSn
                },
                res => {
                    const {lesseeQuantity, lessorQuantity, newLesseeQuantity, newLessorQuantity, companySn} = res.data
                    this.setState({
                        companySn,
                        lessorQuantity,
                        lesseeQuantity,
                        newLessorQuantity,
                        newLesseeQuantity
                    })
                    //数据处理
                    this.transformOptionData(res.data);
                }, err => {
                    console.log(err);
                }
            );
        } else {
            message.warning("请完善表单");
        }
    }

    transformOptionData(orgData = {}) {
        let centerX = 300;
        let centerY = 300;
        orgData.x = centerX;
        orgData.y = centerY;
        orgData.id = orgData.projectSn;
        orgData.name = orgData.projectName;

        orgData.supplierList = this.calSupplierFun(centerX, centerY, orgData.supplierList && orgData.supplierList.length > 0 ?
            orgData.supplierList : []);
        // orgData.customerList = this.calCustomerFun(centerX, centerY - 300 * orgData.customerList.length / 2, orgData.customerList && orgData.customerList.length > 0 ?
        //     orgData.customerList : [], "customer");
        orgData = cloneDeep(orgData);
        //多维数组转一维数组
        let links = [];
        let data = [];
        // let otherOpt = {
        //     id: orgData.companySn,
        //     name: orgData.companyName
        // }
        orgData.supplierList.push({
            id: orgData.companySn,
            name: orgData.companyName,
            projectSn: orgData.projectSn,
            projectName: orgData.projectName,
            itemStyle: {
                color: '#3ba272'
            }
        });
        //
        let forSupplierListFun = (source = orgData.id, supplierList, pSn) => {
            for (let i = 0; i < supplierList.length; i++) {
                data.push(supplierList[i]);
                links.push({source: source, target: supplierList[i].id});
                links.push({source: source, target: pSn});
                if (supplierList[i].supplierList && supplierList[i].supplierList.length > 0) {
                    forSupplierListFun(supplierList[i].id,
                        supplierList[i].supplierList);
                }
            }
        }

        // forSupplierListFun(orgData.id, orgData.supplierList);
        forSupplierListFun(orgData.companySn, orgData.supplierList, orgData.projectSn);
        //
        // let forCustomerListFun = (source = orgData.id, list) => {
        //     for (let i = 0; i < list.length; i++) {
        //         data.push(list[i]);
        //         links.push({source: source, target: list[i].id});
        //         if (list[i].customerList && list[i].customerList.length > 0) {
        //             forCustomerListFun(list[i].id, list[i].customerList);
        //         } else if (list[i].projectList && list[i].projectList.length > 0) {
        //             forCustomerListFun(list[i].id, list[i].projectList);
        //         }
        //     }
        // }
        // forCustomerListFun(orgData.id, orgData.customerList);
        // console.log("data,", data, "ss")
        this.chartsRef && this.chartsRef.setData({
            startTime: this.state.startTime,
            endTime: this.state.endTime,
            api: Api.projectLease,
            tips: ['项目', '供应商']
        });
        this.chartsRef && this.chartsRef.setOptions(cloneDeep({
            ...this.baseOptions,
            series: [{
                ...this.baseOptions.series[0],
                data: [{
                    id: orgData.id,
                    name: orgData.name,
                    // x: orgData.x,
                    // y: orgData.y,
                    symbolSize: 60,
                    color: '#5470c6'
                }].concat(data),
                links: links
            }]
        }));
    }

    //供应商递归运算
    calSupplierFun = (currentX, currentY, list) => {
        //X Y间距
        let disX = 300;
        let disY = 300;
        currentX = currentX - disX;
        return list.map((item, index) => {
            let newCurrentY = currentY;
            if (index > 0) {
                for (let i = 0; i < index; i++) {
                    if (list[i].supplierList && list[i].supplierList.length > 0) {
                        newCurrentY += list[i].supplierList.length * disY;
                    }
                }
            }
            return {
                ...item,
                symbolSize: 60,
                itemStyle: {
                    color: '#9a60b4'
                },
                // id: item.supplierSn,
                // name: item.supplierName,
                id: item.companySn,
                name: item.companyName,
                // x: currentX,
                // y: currentY + disY * index,
                supplierList: item.supplierList && item.supplierList.length > 0 ?
                    this.calSupplierFun(currentX, newCurrentY - disY * item.supplierList.length / 2, item.supplierList) : [],
                // supplierList:[],
            }
        });
    }
    //客户递归运算
    // calCustomerFun = (currentX, currentY, list, key = '') => {
    //     //X Y间距
    //     let disX = 300;
    //     let disY = 300;
    //     currentX = currentX + disX;
    //     return list.map((item, index) => {
    //         let newCurrentY = currentY;
    //         if (index > 0) {
    //             for (let i = 0; i < index; i++) {
    //                 if (list[i].customerList && list[i].customerList.length > 0) {
    //                     newCurrentY += list[i].customerList.length * disY;
    //                 } else if (list[i].projectList && list[i].projectList.length > 0) {
    //                     newCurrentY += list[i].projectList.length * disY;
    //                 }
    //             }
    //         }
    //         return {
    //             ...item,
    //             symbolSize: 40,
    //             itemStyle: {
    //                 color: '#9a60b4'
    //             },
    //             id: item[key + 'Sn'],
    //             name: item[key + 'Name'],
    //             x: currentX,
    //             y: currentY + disY * index,
    //             customerList: item.customerList && item.customerList.length > 0 ?
    //                 this.calCustomerFun(currentX, newCurrentY - disY * item.customerList.length / 2, item.customerList, "customer") : [],
    //             projectList: item.projectList && item.projectList.length > 0 ?
    //                 this.calCustomerFun(currentX, newCurrentY - disY * item.projectList.length / 2, item.projectList, "project") : [],
    //         }
    //     });
    // }

}

export default ProjectChain;
