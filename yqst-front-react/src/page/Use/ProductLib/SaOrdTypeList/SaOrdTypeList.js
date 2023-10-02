import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Table,
    Divider,
    Popconfirm,
    message,
} from 'antd';
import Model from '../../Model'
import '../ProductLibLess.less'

class SaOrdTypeList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            keyWord: '',
            shopData: []
        };
    }

    search = () => {
        this.getPage()
    }

    getPage = (current = this.state.current, pageSize = this.state.pageSize, keyWord = this.state.keyWord) => {
        Model.sellerCategoryList({
            keyWord
        }, res => {
            const recursive = (data) => {
                data.forEach(n => {
                    if (n.children && n.children.length === 0) {
                        delete n.children
                    } else {
                        recursive(n.children)
                    }
                })
            }
            recursive(res.data)
            this.setState({
                tableData: res.data,
                total: res.data.length
            })
        })
    }

    del = (id) => {
        Model.sellerCategoryDelete({catSn: id}, res => {
            message.success('删除成功')
            this.getPage()
        })
    }


    componentDidMount() {
        this.getPage()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '产品类别列表'},
                ]}
            >
                {this.renderModal()}
                <h4 style={{marginBottom: 12}}>搜索</h4>
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {this.renderOperationButton()}
                {/* 表格区域 */}
                {this.renderTable()}
            </ViewCoat>
        );
    }

    renderSearch = () => {
        return (
            <div>
                <label
                    style={{fontSize: 14, fontWeight: 500, lineHeight: '20px', marginRight: 8}}
                >
                    关键词 :
                </label>
                <Input
                    style={{width: 272, height: 40, fontSize: '14px'}}
                    value={this.state.keyWord}
                    placeholder={'请输入关键字'}
                    onChange={e => {
                        this.setState({keyWord: e.target.value})
                    }}
                    onKeyDown={e => {
                        if (e.keyCode === 13) this.search()
                    }}
                    maxLength={30}
                />
                <Button
                    type="primary"
                    onClick={this.search}
                    style={{
                        marginLeft: 16,
                        width: 96,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                >
                    搜索
                </Button>
                <Button
                    style={{
                        marginLeft: 16,
                        width: 96,
                        height: 40,
                        fontSize: 16,
                        verticalAlign: 'bottom',
                        borderRadius: 6
                    }}
                    onClick={() => this.setState({keyWord: ''})}
                >
                    重置
                </Button>
            </div>
        )
    }

    renderOperationButton = () => {
        return (
            <div style={{marginTop: 24}}>
                <Button
                    className={'operation-btn-style'}
                    type='primary'
                    onClick={() => {
                        this.setState({visible: true})
                    }}
                >
                    <PlusOutlined />
                    添加
                </Button>
            </div>
        );
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {title: '产品类别名称', dataIndex: 'catName'},
            {title: '操作', width: 200, dataIndex: 'operation', render: (text, record) => operationBtn(record)},
        ]
        const operationBtn = (record) => (
            <>
                <a
                    onClick={() => {
                        this.setState({
                            visible: true,
                            parentSn: record.sn
                        })
                    }}
                >
                    添加子类别
                </a>
                <Divider type={'vertical'}/>
                <a
                    onClick={() => {
                        this.setState({
                            visible: true,
                            sn: record.sn,
                            parentSn: record.parentSn,
                            typeValue: record.catName
                        })
                    }}
                >
                    编辑
                </a>
                <Divider type={'vertical'}/>
                <Popconfirm
                    title="确认删除该条数据?"
                    onConfirm={() => this.del(record.sn)}
                    okText="确认"
                    cancelText="取消"
                >
                    <a
                        style={{color: '#F12C20'}}
                    >
                        删除
                    </a>
                </Popconfirm>
            </>
        )
        return (
            <div className={'sw-table'} style={{marginTop: 26}}>
                <Table
                    columns={columns}
                    dataSource={tableData}
                    rowKey={'sn'}
                />
            </div>
        )
    }

    saveOrUpdate = () => {
        if (this.state.typeValue === '' || this.state.typeValue === undefined) {
            message.error('请填写类别名称')
            return
        }
        Model.sellerCategorySave({
            categoryName: this.state.typeValue,
            parentSn: this.state.parentSn,
            sn: this.state.sn,
        }, res => {
            this.setState({visible: false});
            if (!this.state.parentSn && !this.state.sn) {
                message.success('新增类别成功');

            } else if (this.state.parentSn && this.state.sn) {
                message.success('修改类别成功');

            } else if (this.state.parentSn && !this.state.sn) {
                message.success('新增子类别成功');

            }
            this.getPage()
        })
    }

    renderModal = () => {
        const {parentSn, sn} = this.state;
        return (
            <Modal
                afterClose={() => {
                    this.setState({typeValue: '', sn: undefined, parentSn: ''})
                }}
                title={parentSn ? '添加产品子类别' : sn ? '修改产品类别' : '添加产品类别'}
                className={'sw-modal'}
                destroyOnClose={true}
                visible={this.state.visible}
                onCancel={() => this.setState({visible: false})}
                onOk={this.saveOrUpdate}
            >
                <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                    <label
                        style={{
                            width: '80px',
                            fontSize: 14,
                            color: '#2B3441',
                            textAlign: 'right'
                        }}
                    >
                        类别名称:
                    </label>
                    <Input
                        placeholder="请填写"
                        style={{flex: 1, marginLeft: 8, fontSize: '14px'}}
                        value={this.state.typeValue}
                        onChange={(e) => {
                            this.setState({typeValue: e.target.value})
                        }}
                        maxLength={30}
                    />
                </div>
            </Modal>
        )
    }

}

export default SaOrdTypeList;
