import React, {Component} from 'react';
import {Form, Table, Modal} from "antd";
import HeadSearch from "../../../../baseview/headSearch/HeadSearch";
import TabsViewContent from "../../../../baseview/tabsViewContent/TabsViewContent";
import Model from "../Model";


class ESPayDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            current: 1,
            pageSize: 10,
            total: 0,
            list: [],
            startTime: '',
            endTime: '',
            keyWord: '',
            modalContent: ''
        };
        this.companySn = '';
        this.companyName = '';
    }

    getList = ()=>{
        const {current, pageSize, startTime, endTime, keyWord} = this.state;
        Model.GetPaymentDetailPageList({
            current,
            pageSize,
            startTime,
            endTime,
            keyWord,
            companySn: this.companySn
        }, res=>{
            this.setState({
                list: res.data.records,
                total: res.data.total
            })
        })
    }

    componentDidMount() {
        let searchArr = this.props.location.search.substr(1).split('&');
        this.companySn = searchArr[0].split("=")[1];
        this.companyName = decodeURI(searchArr[1].split("=")[1]);

        if(this.companySn){
            this.getList()
        }
    }

    render() {
        return (
            <TabsViewContent
                crumb={[{name: '电子签章服务中心'}, {name: "数据管理"}, {name: "付费数据"}]}
            >
                {this.makeHeadSearch()}
                {this.tableView()}
                {this.renderModal()}
            </TabsViewContent>
        )
    }

    makeHeadSearch = ()=> {
        let searchDatas = [
            {key: 'keyWord', type: 'Input', value: '', placeholder: '可查询编号', label: '搜索编号', maxLength: 30},
            // {
            //     key: 'good', type: 'Select', value: '', placeholder: '请选择商品套餐', label: '商品筛选',
            //     list: [
            //         {value: '', name: '请选择套餐'},
            //         {value: 1, name: '认证套餐'},
            //         {value: 2, name: '签署服务套餐'},
            //     ],
            // },
            // {
            //     key: 'channel', type: 'Select', value: '', placeholder: '请选择付款渠道', label: '付款渠道',
            //     list: [
            //         {value: '', name: '请选择付款渠道'},
            //         {value: 1, name: '微信'},
            //         {value: 2, name: '支付宝'},
            //     ],
            // },
            {key: 'times', type:'RangePicker', value:'', placeholder: ['开始时间', '结束时间'], label: '申请时间',},
        ];
        return (
            <HeadSearch data={searchDatas} callBack={(obj) => {
                let startTime = obj.times[0] || '';
                let endTime = obj.times[1] || '';
                let keyWord = obj.keyWord;
                this.setState({
                    current: 1,
                    startTime,
                    endTime,
                    keyWord
                }, ()=>{
                    this.getList()
                })
            }}/>
        )
    }

    tableView = ()=> {

        const columns = [
            {
                title: '付费编号',
                dataIndex: 'orderSn'
            },
            {
                title: '付费日期',
                dataIndex: 'createTime'
            },
            {
                title: '购买商品',
                dataIndex: 'goodsName'
            },
            {
                title: '商品规格',
                dataIndex: 'specList',
                render: (specList)=>{
                    return (
                        <div>
                            {
                                specList && specList.map((item, index)=>{
                                    return <p key={index}>{item.specName} {item.specValue}</p>
                                })
                            }
                        </div>
                    )
                }
            },
            {
                title: '购买数量',
                dataIndex: 'goodsNum'
            },
            {
                title: '购买金额',
                dataIndex: 'totalAmount'
            },
            // {
            //     title: '付款渠道',
            //     dataIndex: 'payChannel'
            // },
            // {
            //     title: '套餐内容',
            //     dataIndex: 'handle',
            //     render: (text, records)=> (
            //         <span
            //             style={{color: '#4481EB', cursor: 'pointer'}}
            //             onClick={()=>{
            //                 this.showModal(records.specList);
            //             }}
            //         >查看</span>)
            // }
        ];

        const {current, pageSize, total, list} = this.state;

        return (
            <div>
                <p style={{marginLeft: 10, fontWeight: 'normal'}}>公司名称：{this.companyName}</p>
                <Table
                    columns={columns}
                    dataSource={list}
                    bordered
                    style={{marginTop: 18}}
                    rowKey={'orderSn'}
                    pagination={{
                        total,
                        current,
                        pageSize,
                        onChange:(current)=>{
                            this.setState({
                                current
                            }, ()=>{
                                this.getList()
                            })
                        },
                        showTotal: total=> `共${total}条`
                    }}
                />
            </div>
        )
    }

    showModal = (specList=[] )=>{
        let modalContent = '';
        specList.forEach((item, index)=>{
            modalContent += `${item.specValue}${item['specName']}${index === specList.length - 1 ? '' : ' + '}`
        })

        this.setState({
            modalContent,
            visible: true
        })
    }

    renderModal = ()=>{
        return (
            <Modal
                title={null}
                visible={this.state.visible}
                closable={false}
                footer={null}
                width={290}
                onCancel={()=>{this.setState({visible: false})}}
            >
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center'
                }}>
                    <h3>商品内容</h3>
                    <span style={{textAlign: 'center', marginTop: 10}}>{this.state.modalContent}</span>
                    <span
                        style={{
                            fontSize: 15,
                            color: '#4481EB',
                            marginTop: 25,
                            cursor: 'pointer'
                        }}
                        onClick={()=>{this.setState({visible: false})}}
                    >确定</span>
                </div>
            </Modal>
        )
    }

}

export default ESPayDetail