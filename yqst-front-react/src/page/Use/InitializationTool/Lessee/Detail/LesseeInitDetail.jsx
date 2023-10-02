import React, {Component} from 'react';
import {
    Button,
    Card,
    Collapse,
    DatePicker,
    Descriptions,
    Image,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Radio,
    Upload
} from "antd";
import {
    CloseCircleFilled, EditOutlined, InfoCircleOutlined, LeftOutlined, LoadingOutlined, PlusOutlined
} from "@ant-design/icons";
import moment from "moment";
import ApiConst from "../../../../../base/urls/ApiConst";
import ApiInterface from "../../../../../base/urls/ApiInterface";
import SelectLeaseGoodsModal from "../../Components/selectLeaseGoodsModal";
import {getPageQuery} from "../../../../../utils";
import Model from "../../Model";
import SelectLesseeProjectModal from "../../Components/SelectLesseeProjectMoal";
import SelectLesseeGoodsModal from "../../Components/SelectLesseeGoodsModal";
import lodash from "lodash";
import '../../Components/selectGoodsModal.css';
import cloneDeep from "lodash/cloneDeep";

const {Panel} = Collapse;

class LessorInitDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sn: '', // 测试状态 1.待提交 2.待确认 3.已确认 4.已驳回
            status: 0,
            data: {},
            startTime: '',
            isSelectGoodsModalVisible: false,
            isSelectGoodsModalVisible2: false,
            isSelectProjectModalVisible: false, // 起租物资列表
            LeaseList: [],
            startingGoodsList: [], // 在租物资列表
            RentList: [], // 备注
            remark: '', // 上传的图片
            imgUrl: '',
            lesseeSn: '',
            projectName: '',
            projectSn: '',
            projectNameRemark: '', // 项目名称备注
            projectType: 0, // 项目类型 1.特供项目 2.非特供项目 3.其他
            onSendButtonDisabled: true,
            count: 10,
            onSendModalVisible: false,
            lessorSn: ''
        };
    }

    componentDidMount() {
        const {sn} = getPageQuery();
        this.setState({
            sn
        }, () => {
            this.getList();
        });
    }

    render() {
        return (<>
            <Card bodyStyle={{padding: 0}} style={{padding: "36px 24px", borderRadius: "6px"}}>
                <h1
                    style={{
                        margin: 0, fontSize: "24px", fontWeight: 500, lineHeight: "33px", color: "#2B3441"
                    }}
                >
                    我是承租方 / 我发起的 / 期初物资对账详情
                </h1>
            </Card>
            <div style={{padding: "24px", borderRadius: "6px", marginTop: "24px", background: "#fff"}}>
                <Button style={{marginBottom: 20}} onClick={() => {
                    window.history.go(-1);
                }}><LeftOutlined/>返回</Button>
                {this.renderUpdateButton()}
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>状态：</span>
                    {this.selectStatus(this.state.status)}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>初始化编号：</span>
                    {this.state.data.initBusinessSn}
                </p>
                {this.state.status === 3 ? <>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>确认人：</span>
                        {this.state.data.auditorName}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>确认时间：</span>
                        {this.state.data.auditTime}
                    </p>
                </> : null}
                {this.state.status === 4 ? <>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>驳回理由：</span>
                        {this.state.data.rejectReason}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>驳回人：</span>
                        {this.state.data.auditorName}
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>驳回时间：</span>
                        {this.state.data.auditTime}
                    </p>
                </> : null}
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账供应商：</span>
                    {this.state.data.lessorName}
                </p>
                {this.makeProjectInfoHtml()}
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>初始化日：</span>
                    {this.state.status === 4 || this.state.status === 1 ? <DatePicker
                        format={'YYYY-MM-DD'}
                        allowClear={false}
                        value={moment(this.state.startTime)}
                        onChange={date => {
                            const startTime = moment(date).format('YYYY-MM-DD');
                            this.setState({
                                startTime
                            });
                        }}
                    /> : this.state.data.settlementStartTime}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>备注：</span>
                    {this.state.status === 4 || this.state.status === 1 ?
                        <Input style={{width: 300}} value={this.state.remark} maxLength={100}
                               onChange={this.onChangeHandle}/> : this.state.data.remark}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>结算单：</span>
                    {this.state.status === 4 || this.state.status === 1 ? <>
                        {this.state.imgUrl ? <div className='img-box'
                                                  style={{width: 60, marginRight: 20, position: 'relative'}}>
                            <Image
                                width={60}
                                src={this.state.imgUrl}
                            />
                            <CloseCircleFilled
                                title='删除结算单图片'
                                className='delete-img-btn'
                                onClick={() => {
                                    this.setState({
                                        imgUrl: ''
                                    });
                                }}
                                style={{
                                    fontSize: 18,
                                    color: 'red',
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '-8px',
                                    right: '-9px'
                                }}/>
                        </div> : null}
                        <Upload
                            accept={'.png,.jpg,.bmp,.gif'}
                            beforeUpload={this.beforeUpload}
                            name="file"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                            onChange={this.handleChange}
                        >
                            {<div
                                style={{
                                    width: 60,
                                    height: 60,
                                    backgroundColor: '#fafafa',
                                    border: '1px dashed #d9d9d9',
                                    borderRadius: '4px',
                                    cursor: 'pointer',
                                    textAlign: 'center',
                                }}
                            >
                                {this.state.loading ? <LoadingOutlined style={{
                                    fontSize: 28, color: '#999', flex: '1 0 100%', marginTop: 10,
                                }}/> : <PlusOutlined style={{
                                    fontSize: 24, color: '#999', flex: '1 0 100%', marginTop: 10
                                }}/>}
                                <div
                                    style={{
                                        fontSize: 'smaller'
                                    }}
                                    className="ant-upload-text"
                                >
                                    {this.state.imgUrl ? '重新上传' : '上传图片'}
                                </div>
                            </div>}
                        </Upload>
                    </> : this.state.imgUrl ? <Image
                        width={50}
                        style={{
                            border: '1px solid #f1f2f6', padding: 5, borderRadius: 3
                        }}
                        src={this.state.imgUrl}
                    /> : '-'}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>提交人：</span>
                    {this.state.data.submitterName}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>提交时间：</span>
                    {this.state.data.submitTime}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150, fontWeight: 600}}>起租物资：</span>
                    {this.state.status === 4 || this.state.status === 1 ?
                        <Button type="primary" style={{color: '#fff'}} onClick={() => {
                            this.setState({isSelectGoodsModalVisible: true});
                        }}><EditOutlined/>编辑物资</Button> : null}
                </p>
                {this.state.status === 4 || this.state.status === 1 ?
                    <Collapse defaultActiveKey={0} style={{marginBottom: 20}}>
                        {this.state.LeaseList.map((item, index) => (
                            <Panel header={item.goodsParentName} key={index}>
                                <div className="title-bar">
                                    <span>SKU 名称</span>
                                    <span>SKU 规格</span>
                                    <span>数量</span>
                                    <span>SKU 单位</span>
                                    <span>操作</span>
                                </div>
                                {item.skuList && item.skuList.map((itm, idx) => (
                                    <div className='title-bar' style={{background: 'none'}} key={idx}>
                                        <span>{itm.goodsName}</span>
                                        <span>
                                                                {itm.specList && itm.specList.map((it, idx) => (
                                                                    <p style={{margin: 0}}
                                                                       key={idx}>{it.specName} : {it.specValue}</p>))}
                                                            </span>
                                        <span>
                                                             <InputNumber
                                                                 min={-999999.9999}
                                                                 max={999999.9999}
                                                                 precision={4}
                                                                 defaultValue={itm.goodsQuantity}
                                                                 step="1"
                                                                 onChange={value => {
                                                                     // 给 LeaseList 的对应的 skuList 的 goodsQuantity 赋值
                                                                     this.setState(prevState => {
                                                                         const LeaseList = [...prevState.LeaseList];
                                                                         LeaseList[index].skuList[idx].goodsQuantity = value;
                                                                         return {
                                                                             LeaseList
                                                                         };
                                                                     });
                                                                 }}
                                                                 title={itm.goodsQuantity}
                                                             />
                                                        </span>
                                        <span>{itm.goodsUnit}</span>
                                        <span>
                                                            <Popconfirm
                                                                placement="topRight"
                                                                title="确定删除该物资？"
                                                                onConfirm={() => {
                                                                    // 删除 LeaseList 的对应的 skuList，如果 skuList 为空，则删除 skuList
                                                                    this.setState(prevState => {
                                                                        const LeaseList = [...prevState.LeaseList];
                                                                        LeaseList[index].skuList.splice(idx, 1);
                                                                        if (LeaseList[index].skuList.length === 0) {
                                                                            LeaseList.splice(index, 1);
                                                                        }
                                                                        return {
                                                                            LeaseList
                                                                        };
                                                                    });
                                                                }}
                                                                okText="确定"
                                                                cancelText="取消"
                                                            >
                                                                <a style={{color: '#ff4757'}}>删除</a>
                                                            </Popconfirm>
                                                        </span>
                                    </div>))}
                            </Panel>))}
                    </Collapse> : <Collapse defaultActiveKey={0}>
                        {this.state.startingGoodsList.map((item, index) => (
                            <Panel header={item.goodsParentName} key={index}>
                                {item.skuList && item.skuList.map((itm, idx) => (<Descriptions
                                    title={itm.goodsName}
                                    style={{marginBottom: 10}}
                                    bordered
                                    key={idx}
                                >
                                    <Descriptions.Item label="SKU 规格">
                                        {itm.specList && itm.specList.map((it, i) => (<>
                                            {it.specName}：{it.specValue}
                                            <br/>
                                        </>))}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="单位">
                                        {itm.goodsUnit}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="数量">
                                        {itm.goodsQuantity}
                                    </Descriptions.Item>
                                </Descriptions>))}
                            </Panel>))}
                    </Collapse>}


                {/*发起对账确认弹窗start*/}
                <Modal
                    title="确认提示"
                    visible={this.state.onSendModalVisible}
                    footer={null}
                    onCancel={() => {
                        this.setState({onSendModalVisible: false});
                    }}
                >
                    <p style={{fontSize: 18, color: '#262626'}}>
                        <InfoCircleOutlined style={{marginRight: 5, color: '#d46b08'}}/>
                        是否确认初始化期初数据？
                    </p>
                    <p style={{color: '#f5222d'}}>提示：期初数据初始化日后初始化日之前产生的进退场单等业务单据将变成历史，不参与结算</p>
                    <Button style={{marginRight: 15}} onClick={() => {
                        this.setState({onSendModalVisible: false});
                    }}>取消</Button>
                    <Button
                        type='primary'
                        disabled={this.state.onSendButtonDisabled}
                        onClick={() => {
                            const {status} = this.state;

                            if (status === 1) {
                                this.onSubmit();
                            } else if (status === 4) {
                                this.onInitUpdate();
                            }
                        }}
                    >
                        确定{this.state.onSendButtonDisabled ? `(${this.state.count}s)` : null}
                    </Button>
                </Modal>
                {/*发起对账确认弹窗end*/}

                {/*起租物资弹窗start*/}
                {this.state.isSelectGoodsModalVisible ? <SelectLesseeGoodsModal
                    lessorSn={this.state.lessorSn}
                    onSelect={data => {
                        let newData = cloneDeep(this.state.LeaseList);
                        //data对比查重，this.state.LeaseList
                        //spu层leaseGoodsParentSn，sku层leaseGoodsSn
                        for (let i = 0; i < data.length; i++) {
                            //spu是否重复
                            let hadSpuIdx = -1;
                            for (let j = 0; j < this.state.LeaseList.length; j++) {
                                if (data[i].leaseGoodsParentSn == this.state.LeaseList[j].leaseGoodsParentSn) {
                                    hadSpuIdx = j;
                                    break;
                                }
                            }
                            if (hadSpuIdx >= 0) {
                                //sku是否重复
                                for (let i2 = 0; i2 < data[i].skuList.length; i2++) {
                                    //sku是否重复
                                    let hadSkuIdx = -1;
                                    for (let j2 = 0; j2 < this.state.LeaseList[hadSpuIdx].skuList.length; j2++) {
                                        if (data[i].skuList[i2].leaseGoodsSn == this.state.LeaseList[hadSpuIdx].skuList[j2].leaseGoodsSn) {
                                            hadSkuIdx = j2;
                                            break;
                                        }
                                    }
                                    if (hadSkuIdx >= 0) {
                                        //不处理
                                    } else {
                                        newData[hadSpuIdx].skuList.push(data[i].skuList[i2]);
                                    }
                                }
                            } else {
                                newData.push(data[i]);
                            }
                        }

                        this.setState({
                            isSelectGoodsModalVisible: false, LeaseList: newData
                        }, () => {
                            message.success('添加成功！');
                        });
                    }}
                    onClose={() => {
                        this.setState({isSelectGoodsModalVisible: false});
                    }}
                /> : null}
                {/*起租物资弹窗end*/}

                {/*在租物资弹窗start*/}
                {this.state.isSelectGoodsModalVisible2 ? <SelectLeaseGoodsModal
                    onSelect={data => {
                        if (this.state.RentList.some(i => i.leaseGoodsSn === data.leaseGoodsSn)) {
                            message.warning('已存在，请勿重复添加！', 1);

                            return false;
                        } else {
                            message.success('添加成功！', 1);
                            const newRentList = [...this.state.RentList, data];
                            this.setState({
                                RentList: newRentList
                            });
                        }
                    }}
                    onClose={() => {
                        this.setState({isSelectGoodsModalVisible2: false})
                    }}
                /> : null}
                {/*在租物资弹窗end*/}
                {/*选择项目弹窗start*/}
                {this.state.isSelectProjectModalVisible ? <SelectLesseeProjectModal
                    lesseeSn={this.state.lesseeSn}
                    onClose={() => {
                        this.setState({isSelectProjectModalVisible: false})
                    }}
                    onSelect={data => {
                        this.setState({
                            projectSn: data.projectSn,
                            projectName: data.projectName,
                            isSelectProjectModalVisible: false
                        })
                    }}
                /> : null}
                {/*选择项目弹窗end*/}
            </div>
        </>);
    }

    renderUpdateButton = () => {
        const {showUpdateButton} = this.state.data;

        if (showUpdateButton === 0) {
            return null
        } else if (showUpdateButton === 2) {
            return (<>
                <Button
                    style={{marginLeft: 20}}
                    type='primary'
                    onClick={() => {
                        this.onSave();
                    }}
                >保存</Button>
                <Button
                    style={{marginLeft: 20}}
                    type='primary'
                    onClick={() => {
                        let {
                            startTime, LeaseList, projectType, projectNameRemark, projectSn
                        } = this.state;

                        if (!startTime) {
                            message.error('请选择初始化日！', 1);

                            return false;
                        }
                        if (LeaseList.length === 0) {
                            message.error('请选择起租物资！', 1);

                            return false;
                        }
                        if (projectType === 1) {
                            if (!projectSn) {
                                return message.error('请选择对账项目！', 1);
                            }
                        }
                        if (projectType === 3) {
                            if (!projectNameRemark) {
                                return message.error('请输入项目名称备注！', 1);
                            }
                        }
                        this.setState({
                            onSendModalVisible: true
                        }, () => {
                            this.countDown();
                        });
                    }}
                >提交</Button>
            </>)
        }
    }

    countDown = () => {
        let timer = setInterval(() => {
            const {count} = this.state;

            this.setState({
                count: count - 1
            }, () => {
                if (count <= 1) {
                    clearInterval(timer);
                    this.setState({
                        onSendButtonDisabled: false
                    });
                }
            });
        }, 1000);
    }

    getList = () => {
        const {sn} = this.state;
        Model.InitDetailGet({
            sn
        }, res => {
            this.setState({
                data: res.data,
                status: res.data.status, // LeaseList: this.makeLeaseList(res.data.startingGoodsList),
                LeaseList: res.data.startingGoodsList,
                startingGoodsList: res.data.startingGoodsList, // RentList: res.data.leasingGoodsList,
                remark: res.data.remark,
                startTime: res.data.settlementStartTime,
                imgUrl: res.data.enclosureUrlList && res.data.enclosureUrlList.length > 0 ? res.data.enclosureUrlList[0] : '',
                projectName: res.data.projectName,
                projectSn: res.data.projectSn,
                lesseeSn: res.data.lesseeSn,
                projectType: res.data.projectType,
                projectNameRemark: res.data.projectNameRemark,
                lessorSn: res.data.lessorSn || '',
            });
        });
    }

    makeProjectInfoHtml = () => {
        // status 状态 1.待提交 2.待确认 3.已确认 4.已驳回
        // projectType 项目类型 1.特供项目 2.非特供项目 3.其他
        let {projectType, status} = this.state;
        const selectProjectType = type => {
            switch (type) {
                case 1:
                    return '特供项目';
                case 2:
                    return '非特供项目';
                case 3:
                    return '其他';
                default:
                    return '';
            }
        }

        // 待提交和已驳回状态可以修改
        if (status === 1 || status === 4) {
            return (<>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账项目类型：</span>
                    <Radio.Group value={this.state.projectType} onChange={e => {
                        this.setState({projectType: e.target.value});
                        if (e.target.value === 1) {
                            this.setState({
                                projectName: '', projectNameRemark: '', projectSn: ''
                            });
                        }
                    }}>
                        <Radio value={1}>特供项目</Radio>
                        <Radio value={2}>非特供项目</Radio>
                        {/*<Radio value={3}>其他（如：找不到特供项目等）</Radio>*/}
                    </Radio.Group>
                </p>
                {this.state.projectType === 1 ? <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账项目：</span>
                    <Input
                        readOnly
                        style={{
                            cursor: 'pointer', width: 300
                        }}
                        value={this.state.projectName}
                        placeholder={!this.state.lesseeSn ? '请先选择承租方' : '请选择项目名称'}
                        disabled={!this.state.lesseeSn}
                        onClick={() => {
                            if (!this.state.lesseeSn) {
                                return false;
                            } else {
                                this.setState({
                                    isSelectProjectModalVisible: true
                                })
                            }
                        }}/>
                </p> : null}
                {this.state.projectType === 2 ? <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账项目：</span>
                    非特供项目
                </p> : null}
                {this.state.projectType === 3 ? <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>项目名称备注：</span>
                    <Input
                        style={{
                            width: 300
                        }}
                        value={this.state.projectNameRemark}
                        maxLength={50}
                        name='projectNameRemark'
                        placeholder={!this.state.lesseeSn ? '请先选择承租方' : '请输入项目名称备注'}
                        onChange={e => {
                            this.setState({
                                projectNameRemark: e.target.value
                            });
                        }}
                        disabled={!this.state.lesseeSn}
                    />
                </p> : null}
            </>)
        } else {
            return (<>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账项目类型：</span>
                    {selectProjectType(projectType)}
                </p>
                <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>{projectType === 3 ? '项目名称备注：' : '对账项目：'}</span>
                    {projectType === 1 ? this.state.data.projectName : projectType === 2 ? '非特供项目' : projectType === 3 ? this.state.projectNameRemark : null}
                </p>
                {projectType === 3 ? <p style={{
                    display: 'flex'
                }}>
                    <span style={{width: 150}}>对账项目：</span>
                    {this.state.data.projectName}
                </p> : null}
            </>)
        }
    }

    onChangeHandle = e => {
        this.setState({
            remark: e.target.value
        })
    }

    selectStatus = status => {
        // 状态 1.待提交 2.待确认 3.已确认 4.已驳回
        switch (status) {
            case 1:
                return <span style={{color: '#ffa502'}}>待提交</span>;
            case 2:
                return <span style={{color: '#1e90ff'}}>待确认</span>;
            case 3:
                return <span style={{color: '#2ed573'}}>已确认</span>;
            case 4:
                return <span style={{color: '#ff4757'}}>已驳回</span>;
            default:
                return "";
        }
    }

    makeLeaseList = data => {
        const dataSource = lodash.cloneDeep(data);
        let skuList = [];

        dataSource.map((item, index) => {
            item.skuList.map((itm, idx) => {
                skuList.push(itm);
            });
        });

        return skuList;
    }

    onInitUpdate = () => {
        let {
            startTime, LeaseList, RentList, remark, sn, imgUrl, projectSn, projectType, projectNameRemark
        } = this.state;
        let newLeaseList = [];

        LeaseList.map(item => {
            newLeaseList.push(...item.skuList);
        });

        if (!startTime) {
            message.error('请选择初始化日！', 1);

            return false;
        }
        if (projectType === 1) {
            projectNameRemark = '';
            if (!projectSn) {
                message.error('请选择项目！', 1);

                return false;
            }
        }
        if (projectType === 2) {
            projectSn = '';
            projectNameRemark = '';
        }
        if (projectType === 3) {
            projectSn = '';
            if (!projectNameRemark) {
                return message.error('请输入项目名称备注！', 1);
            }
        }
        if (LeaseList.length === 0) {
            message.error('请选择起租物资！', 1);

            return false;
        }
        // if (RentList.length === 0) {
        //     message.error('请选择在租物资！', 1);
        //
        //     return false;
        // }
        let startingGoodsList = newLeaseList.map(item => {
            return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        });
        // if (startingGoodsList.some(item => item.goodsQuantity == '0.0000' || item.goodsQuantity == '0')) {
        //     return message.error('起租物资列表存在物资数量为 0 ！', 2.5);
        // }
        if (startingGoodsList.some(item => item.goodsQuantity == null)) {
            return message.error('起租物资列表物资数量不能为空！', 2.5);
        }
        // let leasingGoodsList = RentList.map(item => {
        //     return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        // });

        Model.LesseeInitUpdate({
            sn, settlementStartTime: startTime, remark, startingGoodsList: newLeaseList, // leasingGoodsList,
            isSubmit: 1, enclosureUrlList: imgUrl, projectSn, projectType, projectNameRemark
        }, res => {
            message.success(res.msg, 1, () => {
                this.props.history.go(-1);
            });
        });
    }

    // 保存
    onSave = () => {
        //  0.否（仅保存） 1.是（保存并发起对账）
        let {
            startTime, LeaseList, RentList, remark, sn, imgUrl, projectType, projectNameRemark, projectSn
        } = this.state;
        let newLeaseList = [];

        LeaseList.map(item => {
            newLeaseList.push(...item.skuList);
        });

        if (!startTime) {
            message.error('请选择初始化日！', 1);

            return false;
        }
        if (LeaseList.length === 0) {
            message.error('请选择起租物资！', 1);

            return false;
        }
        if (projectType === 1) {
            if (!projectSn) {
                return message.error('请选择对账项目！', 1);
            }
        }
        if (projectType === 3) {
            projectSn = '';
            if (!projectNameRemark) {
                return message.error('请输入项目名称备注！', 1);
            }
        }
        // if (RentList.length === 0) {
        //     message.error('请选择在租物资！', 1);
        //
        //     return false;
        // }

        let startingGoodsList = newLeaseList.map(item => {
            return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        });
        // if (startingGoodsList.some(item => item.goodsQuantity == '0.0000' || item.goodsQuantity == '0')) {
        //     return message.error('起租物资列表存在物资数量为 0 ！', 2.5);
        // }
        if (startingGoodsList.some(item => item.goodsQuantity == null)) {
            return message.error('起租物资列表物资数量不能为空！', 2.5);
        }
        // let leasingGoodsList = RentList.map(item => {
        //     return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        // });

        Model.LesseeInitUpdate({
            sn, settlementStartTime: startTime, remark, startingGoodsList: newLeaseList, // leasingGoodsList,
            enclosureUrlList: imgUrl, isSubmit: 0, projectType, projectNameRemark, projectSn
        }, res => {
            message.success(res.msg, 2);
            this.props.history.go(-1);
        });
    }

    // 提交
    onSubmit = () => {
        //  0.否（仅保存） 1.是（保存并发起对账）
        let {
            startTime, LeaseList, RentList, remark, sn, imgUrl, projectType, projectNameRemark, projectSn
        } = this.state;
        let newLeaseList = [];

        LeaseList.map(item => {
            newLeaseList.push(...item.skuList);
        });

        if (!startTime) {
            message.error('请选择初始化日！', 1);

            return false;
        }
        if (LeaseList.length === 0) {
            message.error('请选择起租物资！', 1);

            return false;
        }
        if (projectType === 1) {
            if (!projectSn) {
                return message.error('请选择对账项目！', 1);
            }
        }
        if (projectType === 3) {
            projectSn = '';
            if (!projectNameRemark) {
                return message.error('请输入项目名称备注！', 1);
            }
        }
        // if (RentList.length === 0) {
        //     message.error('请选择在租物资！', 1);
        //
        //     return false;
        // }

        let startingGoodsList = newLeaseList.map(item => {
            return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        });
        // if (startingGoodsList.some(item => item.goodsQuantity == '0.0000' || item.goodsQuantity == '0')) {
        //     return message.error('起租物资列表存在物资数量为 0 ！', 2.5);
        // }
        if (startingGoodsList.some(item => item.goodsQuantity == null)) {
            return message.error('起租物资列表物资数量不能为空！', 2.5);
        }
        // let leasingGoodsList = RentList.map(item => {
        //     return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        // });

        Model.LesseeInitUpdate({
            sn, settlementStartTime: startTime, remark, startingGoodsList: newLeaseList, // leasingGoodsList,
            enclosureUrlList: imgUrl, isSubmit: 1, projectType, projectNameRemark, projectSn
        }, res => {
            message.success(res.msg, 1, () => {
                this.props.history.go(-1);
            });
        });
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({loading: true});
            return;
        }
        if (info.file.status === 'done') {
            this.setState({
                imgUrl: info.file.response.data.url
            });

            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                loading: false,
            }),);
        }
    };

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif';
        if (!isJpgOrPng) {
            message.error('请上传jpg/bmp/png/gif格式图片文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 30;
        if (!isLt2M) {
            message.error('图片必须小于 30MB!');
        }
        return isJpgOrPng && isLt2M;
    }
}

export default LessorInitDetail;