import React, {Component} from 'react';
import {
    Button,
    Card,
    DatePicker,
    Input,
    InputNumber,
    message,
    Popconfirm,
    Upload,
    Radio,
    Modal, Divider, Empty, Collapse
} from "antd";
import {LoadingOutlined, PlusOutlined, InfoCircleOutlined, LeftOutlined} from "@ant-design/icons";
import moment from "moment";
import ApiConst from "../../../../../base/urls/ApiConst";
import ApiInterface from "../../../../../base/urls/ApiInterface";
import SelectLesseeProjectModal from "../../Components/SelectLesseeProjectMoal";
import SelectLessorModal from "../../Components/SelectLessorModal";
import SelectLesseeGoodsModal from "../../Components/SelectLesseeGoodsModal";
import Model from "../../Model";
import '../../Components/selectGoodsModal.css';
import cloneDeep from "lodash/cloneDeep";

const {Panel} = Collapse;

/*
承租方发起对账
 */
class InitializationToolCreate extends Component {
    constructor(props) {
        super(props);
        this.pageSize = 10;
        this.current = 1;
        this.status = 0;
        this.state = {
            data: [],
            keyWord: '',
            total: 0,
            isModalVisible: false,
            isSelectGoodsModalVisible: false, // 添加物资弹窗
            isSelectLesseeModalVisible: false, // 选择承租方弹窗
            isSelectProjectModalVisible: false, // 选择项目弹窗
            onSendModalVisible: false, // 发起对账弹窗
            onSendButtonDisabled: true,
            count: 10,
            // 起租物资列表
            LeaseList: [],
            // 在租物资列表
            RentList: [],
            lesseeName: '',
            lesseeSn: '',
            projectSn: '',
            projectName: '',
            startTime: '',
            remark: '',
            isAsync: false,
            imgUrl: '',
            projectType: 1, // 项目类型 1.特供项目 2.非特供项目 3.其他
            projectNameRemark: '' // 项目名称备注
        };
        this.Leasecolumns = [
            {
                title: "SKU名称",
                key: "goodsName",
                dataIndex: "goodsName",
                width: '22%'
            },
            {
                title: "SKU规格",
                key: "goodsName",
                dataIndex: "goodsName",
                width: '21%',
                render: (res, record) => {
                    return record.specList.map(item => <p
                        style={{marginBottom: 0}}>{item.specName}：{item.specValue}</p>)
                }
            },
            // {
            //     title: "SPU名称",
            //     key: "goodsParentName",
            //     dataIndex: "goodsParentName",
            //     width: '22%'
            // },
            {
                title: "单位",
                key: "goodsUnit",
                dataIndex: "goodsUnit",
                width: '15%'
            },
            {
                title: "数量",
                key: "goodsQuantity",
                dataIndex: "goodsQuantity",
                width: '20%',
                render: (res, record) => {
                    return <InputNumber
                        min={-999999.9999}
                        max={999999.9999}
                        precision={4}
                        defaultValue={record.goodsQuantity}
                        step="1"
                        onChange={value => {
                            let newList = this.state.LeaseList.map(item => {
                                if (item.leaseGoodsSn === record.leaseGoodsSn) {
                                    item.goodsQuantity = value;
                                }
                                return item;
                            });
                            this.setState({
                                LeaseList: newList
                            });
                        }}
                        style={{width: '100%'}}
                        title={record.goodsQuantity}
                    />
                }
            },
            {
                title: "操作",
                key: "Option",
                dataIndex: "Option",
                width: 70,
                render: (res, record) => {
                    return <Popconfirm
                        placement="topRight"
                        title="确定删除该物资？"
                        onConfirm={() => {
                            let newList = this.state.LeaseList.filter(i => i.leaseGoodsSn !== record.leaseGoodsSn);
                            this.setState({
                                LeaseList: newList
                            });
                        }}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a style={{color: '#ff4757'}}>删除</a>
                    </Popconfirm>
                }
            },
        ];
    }

    componentDidMount() {

    }

    componentWillUnmount() {
    }

    render() {
        return (
            <>
                <Card bodyStyle={{padding: 0}} style={{padding: "36px 24px", borderRadius: "6px"}}>
                    <h1
                        style={{
                            margin: 0,
                            fontSize: "24px",
                            fontWeight: 500,
                            lineHeight: "33px",
                            color: "#2B3441"
                        }}
                    >
                        承租方发起期初对账
                    </h1>
                </Card>
                <div style={{padding: "24px", borderRadius: "6px", marginTop: "24px", background: "#fff"}}>
                    <Button style={{marginBottom: 20}} onClick={() => {
                        window.history.go(-1);
                    }}><LeftOutlined/>返回</Button>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>对账供应商：</span>
                        <Input
                            readOnly
                            style={{
                                cursor: 'pointer',
                                width: 300
                            }}
                            placeholder='选择供应商'
                            value={this.state.lesseeName}
                            onClick={() => {
                                this.setState({
                                    projectName: '',
                                    projectSn: '',
                                    isSelectLesseeModalVisible: true
                                })
                            }}/>
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>对账项目类型：</span>
                        <Radio.Group value={this.state.projectType} onChange={e => {
                            this.setState({projectType: e.target.value});
                            if (e.target.value === 1) {
                                this.setState({
                                    projectName: '',
                                    projectNameRemark: '',
                                    projectSn: ''
                                });
                            }
                        }}>
                            <Radio value={1}>特供项目</Radio>
                            <Radio value={2}>非特供项目</Radio>
                        </Radio.Group>
                    </p>
                    {
                        this.state.projectType === 1
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目：</span>
                                <Input
                                    readOnly
                                    style={{
                                        cursor: 'pointer',
                                        width: 300
                                    }}
                                    value={this.state.projectName}
                                    placeholder={'请选择项目'}
                                    // disabled={!this.state.lesseeSn}
                                    onClick={() => {
                                        // if (!this.state.lesseeSn) {
                                        //     return false;
                                        // } else {
                                        this.setState({
                                            isSelectProjectModalVisible: true
                                        });
                                        // }
                                    }}/>
                            </p>
                            : null
                    }
                    {
                        this.state.projectType === 2
                            ? <p style={{
                                display: 'flex'
                            }}>
                                <span style={{width: 150}}>对账项目：</span>
                                非特供项目
                            </p>
                            : null
                    }
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>初始化日：</span>
                        <DatePicker
                            format={'YYYY-MM-DD'}
                            defaultPickerValue={this.state.startTime ? moment(this.state.startTime).format('YYYY-MM-DD') : null}
                            onChange={date => {
                                // const startTime = moment(date).format('YYYY-MM-DD');
                                this.setState({
                                    startTime: date
                                });
                            }}
                        />
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}></span>
                        <span style={{fontSize: 'smaller', color: '#3d3c3c', userSelect: 'none'}}>建议填写未结算周期的期初日</span>
                    </p>
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>结算单图片(选填)：</span>
                        <Upload
                            accept={'.png,.jpg,.bmp,.gif'}
                            beforeUpload={this.beforeUpload}
                            name="file"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={ApiConst.Versions().sunaw + ApiInterface.uploadFile}
                            onChange={this.handleChange}
                        >
                            {
                                this.state.imgUrl ? (
                                    <div
                                        style={{
                                            width: 104,
                                            height: 104,
                                            backgroundColor: '#fafafa',
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <img
                                            style={{padding: 8}}
                                            width={'100%'}
                                            height={'100%'}
                                            src={this.state.imgUrl}
                                            alt=""
                                        />
                                    </div>
                                ) : (
                                    <div
                                        style={{
                                            width: 104,
                                            height: 104,
                                            backgroundColor: '#fafafa',
                                            border: '1px dashed #d9d9d9',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            textAlign: 'center'
                                        }}
                                    >
                                        {this.state.loading ? <LoadingOutlined style={{
                                            fontSize: 28,
                                            color: '#999',
                                            flex: '1 0 100%',
                                            marginTop: 25
                                        }}/> : <PlusOutlined style={{
                                            fontSize: 24,
                                            color: '#999',
                                            flex: '1 0 100%',
                                            marginTop: 25
                                        }}/>}
                                        <div
                                            style={{
                                                fontSize: 12,
                                                marginTop: 8,
                                            }}
                                            className="ant-upload-text"
                                        >
                                            点击上传
                                        </div>
                                    </div>
                                )
                            }
                        </Upload>
                    </p>
                    <Divider orientation="left" plain>
                        起租物资
                    </Divider>
                    <Button
                        type="primary"
                        style={{color: '#fff', marginBottom: 20}}
                        onClick={() => {
                            this.setState({isSelectGoodsModalVisible: true});
                        }}
                        disabled={!this.state.lesseeSn}
                    >
                        <PlusOutlined/>添加物资
                    </Button>
                    {
                        this.state.LeaseList.length === 0
                            ? <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                            : <Collapse defaultActiveKey={0} style={{marginBottom: 20}}>
                                {
                                    this.state.LeaseList.map((item, index) => (
                                        <Panel header={item.goodsName} key={index}>
                                            <div className="title-bar">
                                                <span>SKU 名称</span>
                                                <span>SKU 规格</span>
                                                <span>数量</span>
                                                <span>SKU 单位</span>
                                                <span>操作</span>
                                            </div>
                                            {
                                                item.skuList && item.skuList.map((itm, idx) => (
                                                    <div className='title-bar' style={{background: 'none'}} key={idx}>
                                                        <span>{itm.goodsName}</span>
                                                        <span>
                                                            {
                                                                itm.specList && itm.specList.map((it, idx) => (
                                                                    <p style={{margin: 0}}
                                                                       key={idx}>{it.specName} : {it.specValue}</p>
                                                                ))
                                                            }
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
                                                    </div>
                                                ))
                                            }
                                        </Panel>
                                    ))
                                }
                            </Collapse>
                    }
                    {/*<Table*/}
                    {/*    columns={this.Leasecolumns}*/}
                    {/*    dataSource={this.state.LeaseList}*/}
                    {/*    pagination={false}*/}
                    {/*    style={{marginBottom: 20}}*/}
                    {/*/>*/}
                    <p style={{
                        display: 'flex'
                    }}>
                        <span style={{width: 150}}>备注(选填)：</span>
                        <Input style={{width: 300}} value={this.state.remark} name='remark' maxLength={100}
                               onChange={this.onChangeHandle}/>
                    </p>
                    {/* isSubmit 是否提交 0.否 1.是 */}
                    <Button
                        type="primary"
                        style={{marginRight: 20}}
                        onClick={() => {
                            let {
                                lesseeSn,
                                projectSn,
                                startTime,
                                remark,
                                LeaseList,
                                RentList,
                                imgUrl,
                                projectType,
                                projectNameRemark
                            } = this.state;

                            if (!lesseeSn) {
                                message.error('请选择供应商！', 1);

                                return false;
                            }
                            if (projectType === 1) {
                                if (!projectSn) {
                                    message.error('请选择项目！', 1);

                                    return false;
                                }
                            }
                            if (projectType === 3) {
                                if (!projectNameRemark) {
                                    message.error('请输入项目名称备注！', 1);

                                    return false;
                                }
                            }
                            if (!startTime) {
                                message.error('请选择初始化日！', 1);

                                return false;
                            }
                            if (LeaseList.length === 0) {
                                message.error('请选择起租物资！', 1);

                                return false;
                            }

                            this.onSend(0);
                        }}
                    >
                        保存
                    </Button>
                    <Button
                        type="primary"
                        style={{marginRight: 20}}
                        onClick={() => {
                            let {
                                lesseeSn,
                                projectSn,
                                startTime,
                                remark,
                                LeaseList,
                                RentList,
                                imgUrl,
                                projectType,
                                projectNameRemark
                            } = this.state;

                            if (!lesseeSn) {
                                message.error('请选择供应商！', 1);

                                return false;
                            }
                            if (projectType === 1) {
                                if (!projectSn) {
                                    message.error('请选择项目！', 1);

                                    return false;
                                }
                            }
                            if (projectType === 3) {
                                if (!projectNameRemark) {
                                    message.error('请输入项目名称备注！', 1);

                                    return false;
                                }
                            }
                            if (!startTime) {
                                message.error('请选择初始化日！', 1);

                                return false;
                            }
                            if (LeaseList.length === 0) {
                                message.error('请选择起租物资！', 1);

                                return false;
                            }
                            this.setState({
                                onSendModalVisible: true
                            }, () => {
                                this.countDown();
                            });
                        }}
                    >
                        发起对账
                    </Button>
                    <Button onClick={() => {
                        this.props.history.go(-1);
                    }}>
                        取消
                    </Button>
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
                                this.onSend(1);
                            }}
                        >
                            确定{this.state.onSendButtonDisabled ? `(${this.state.count}s)` : null}
                        </Button>
                    </Modal>
                    {/*发起对账确认弹窗end*/}

                    {/*添加起租物资弹窗start*/}
                    {
                        this.state.isSelectGoodsModalVisible
                            ? <SelectLesseeGoodsModal
                                lessorSn={this.state.lesseeSn}
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
                                        isSelectGoodsModalVisible: false,
                                        LeaseList: newData
                                    }, () => {
                                        message.success('添加成功！');
                                    });
                                    // let LeaseList = this.state.LeaseList;
                                    // let newData = data.filter(item => {
                                    //     let isExist = false;
                                    //     LeaseList.forEach(leaseItem => {
                                    //         if (leaseItem.leaseGoodsSn === item.leaseGoodsSn) {
                                    //             isExist = true;
                                    //         }
                                    //     });
                                    //     return !isExist;
                                    // });
                                    // this.setState({
                                    //     LeaseList: [...LeaseList, ...newData],
                                    //     isSelectGoodsModalVisible: false
                                    // }, () => {
                                    //     message.success('添加成功！');
                                    // });
                                }}
                                onClose={() => {
                                    this.setState({isSelectGoodsModalVisible: false});
                                }}
                            />
                            : null
                    }
                    {/*添加起租物资弹窗end*/}
                    {/*选择承租方弹窗start*/}
                    {
                        this.state.isSelectLesseeModalVisible
                            ? <SelectLessorModal
                                onClose={() => {
                                    this.setState({isSelectLesseeModalVisible: false});
                                }}
                                onSelect={data => {
                                    this.setState({
                                        lesseeSn: data.lessorSn,
                                        lesseeName: data.lessorName,
                                        isSelectLesseeModalVisible: false
                                    });
                                }}
                            />
                            : null
                    }
                    {/*选择承租方弹窗end*/}

                    {/*选择项目弹窗start*/}
                    {
                        this.state.isSelectProjectModalVisible
                            ? <SelectLesseeProjectModal
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
                            />
                            : null
                    }
                    {/*选择项目弹窗end*/}
                </div>
            </>
        );
    }

    onChangeHandle = e => {
        this.setState({[e.target.name]: e.target.value});
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

    onSend = isSubmit => {
        // isSubmit 0.保存 1.发起对账
        let {
            lesseeSn,
            projectSn,
            startTime,
            remark,
            LeaseList,
            RentList,
            imgUrl,
            projectType,
            projectNameRemark
        } = this.state;

        // if (!lesseeSn) {
        //     message.error('请选择供应商！', 1);
        //
        //     return false;
        // }
        if (projectType === 1) {
            projectNameRemark = '';
            // if (!projectSn) {
            //     message.error('请选择项目！', 1);
            //
            //     return false;
            // }
        }
        if (projectType === 2) {
            projectSn = '';
            projectNameRemark = '';
        }
        if (projectType === 3) {
            projectSn = '';
            // if (!projectNameRemark) {
            //     return message.error('请输入项目名称备注！', 1);
            // }
        }
        // if (!startTime) {
        //     message.error('请选择初始化日！', 1);
        //
        //     return false;
        // }
        const settlementStartTime = moment(startTime).format('YYYY-MM-DD');
        // if (LeaseList.length === 0) {
        //     message.error('请选择起租物资！', 1);
        //
        //     return false;
        // }
        // if (RentList.length === 0) {
        //     message.error('请选择在租物资！', 1);
        //
        //     return false;
        // }
        let startingGoodsList = LeaseList.map(item => {
            return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        });
        // if (startingGoodsList.some(item => item.goodsQuantity == '0.0000' || item.goodsQuantity == '0')) {
        //     return message.error('起租物资列表存在物资数量为0！', 2.5);
        // }
        if (startingGoodsList.some(item => item.goodsQuantity == null)) {
            return message.error('起租物资列表物资数量不能为空！', 2.5);
        }
        // let leasingGoodsList = RentList.map(item => {
        //     return {'leaseGoodsSn': item.leaseGoodsSn, 'goodsQuantity': item.goodsQuantity}
        // });

        Model.LesseeAddInit({
            startingGoodsList,
            // leasingGoodsList,
            lessorSn: lesseeSn,
            projectSn,
            settlementStartTime,
            remark,
            enclosureUrlList: imgUrl,
            isSubmit,
            projectType,
            projectNameRemark
        }, res => {
            message.success(res.msg, 1, () => {
                this.props.history.push('/pages/appCenter/InitializationTool/MaterialRecListModule/List');
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

            this.getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    loading: false,
                }),
            );
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

export default InitializationToolCreate;
