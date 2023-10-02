import React, {Component} from 'react';
import CompanyProductModel from "../CompanyProductModel";
import {Checkbox, message, Modal, Input} from "antd";
import SWTable from 'SWViews/table';
const { Search } = Input;

class CorrelationSelectProductListModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: [],
            current: 1,
            pageSize: 10,
            keyWord: '',
            sortType: 2,
        }
    }

    componentDidMount() {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord, sortType = this.state.sortType) => {
        CompanyProductModel.CorrelationPlatformList({
            current,
            pageSize,
            keyWord,
            sortType,
        }, res => {
            this.setState({
                tableData: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }

    render() {
        let {ok, cancel} = this.props;
        const columns = [
            {
                title: '', width: 50, dataIndex: 'isChose', render: (text, record, index) => {
                    return <Checkbox checked={text} onChange={(e) => {
                        let tableData = this.state.tableData;
                        tableData = tableData.map((item, idx) => {
                            return {
                                ...item,
                                isChose: index == idx
                            }
                        });
                        this.setState({tableData})
                    }}/>
                }
            },
            {title: 'SKU产品编号', width: '25%', dataIndex: 'goodsCode'},
            {
                title: '产品名称', dataIndex: 'goodsName',
                // render: (text, record) => {
                //     return (
                //         <div style={{display: 'flex', flex: 1, flexDirection: 'row'}}>
                //             <div style={{flex: 1}}>
                //                 <h3
                //                     className={'sw-table-title'}
                //                     style={{padding: 0, margin: 0, fontSize: 14, fontWeight: 400, color: '#4481EB'}}
                //                 >
                //                     {text}
                //                 </h3>
                //                 <p
                //                     className={'sw-table-dec'}
                //                     style={{margin: 0, fontSize: 12, fontWeight: 400}}
                //                 >
                //                     {record.goodsCode}
                //                 </p>
                //             </div>
                //         </div>
                //     )
                // }
            },
            {title: '产品类目', width: '25%', dataIndex: 'catNamePath'},
            {title: '基本单位', width: '20%', dataIndex: 'unit'},
            // {title: '创建日期', width: 125, dataIndex: 'createTime', render: text => formatDate(text)},
            // {
            //     title: '状态', width: '9%', dataIndex: 'status', render: text => {
            //         switch (parseInt(text)) {
            //             case 1:
            //                 return "未启用"
            //             case 2:
            //                 return "已启用"
            //             case 3:
            //                 return "已停用"
            //             default:
            //                 return ""
            //         }
            //     }
            // }
        ];
        return <Modal visible={true} title={'选择平台产品'}
                      style={{top: 15}} width={800}
                      onCancel={() => {
                          cancel && cancel()
                      }}
                      onOk={() => {
                          let selectItem = null;
                          let tableData = this.state.tableData;
                          for (let i = 0; i < tableData.length; i++) {
                              if (tableData[i].isChose) {
                                  selectItem = tableData[i];
                                  break;
                              }
                          }
                          if (selectItem) {
                              ok && ok(selectItem);
                          } else {
                              message.warning("请选择平台产品");
                          }
                      }}>
            <Search
                allowClear={false}
                value={this.state.keyWord}
                placeholder="可查询产品编号、产品名称"
                allowClear
                onChange={(e) => {
                    this.setState({keyWord: e.target.value});
                }}
                onSearch={(val) => {
                    this.setState({keyWord: val, current: 1}, () => {
                        this.getPage();
                    });
                }}
                style={{ width: 500, margin: '0 10px', marginBottom: '15px' }}
            />
            <SWTable
                scroll={{y: 350}}
                dataSource={this.state.tableData}
                columns={columns}
                rowKey={'platformGoodsSn'}
                pagination={{
                    current: this.state.current,
                    total: this.state.total,
                    onChange: (page, pageSize) => {
                        this.setState({current: page}, () => {
                            this.getPage(page);
                        });
                    }
                }}
            />
        </Modal>
    }
}

export default CorrelationSelectProductListModal;
