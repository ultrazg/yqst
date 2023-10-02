import React, {Component} from 'react';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';
import {PlusOutlined} from '@ant-design/icons';
import {
    Button,
    Input,
    Modal,
    Divider,
    Popconfirm,
    message,
} from 'antd';
import CompanyProductModel from '../CompanyProductModel'
import './CompanyClassLess.less'
import SWTable from 'SWViews/table';

class CompanyClassList extends Component {
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
        CompanyProductModel.CategoryList({
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
        CompanyProductModel.CompanyClassDel({catSn: id}, res => {
            message.success('删除成功')
            this.getPage()
        })
    }

    enable = (id, status) => {
        CompanyProductModel.CompanyClassEnable({catSn: id, categoryStatus: status}, res => {
            message.success((status == 1 ? '启用' : '停用') + "成功");
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
                    {title: '产品类目列表'},
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
                    style={{borderRadius: 6}}
                >
                    <PlusOutlined/>
                    添加
                </Button>
            </div>
        );
    }

    renderTable = () => {
        const {tableData} = this.state;
        const columns = [
            {title: '产品类目名称', dataIndex: 'catName'},
            {title: '操作', width: 230, dataIndex: 'operation', render: (text, record) => operationBtn(record)},
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
                    添加子类目
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
                <Divider type={'vertical'}/>
                <Popconfirm
                    title={"确认" + (record.categoryStatus == 1 ? "停用" : "启用") + "该条数据?"}
                    onConfirm={() => this.enable(record.sn, record.categoryStatus == 1 ? 2 : 1)}
                    okText="确认"
                    cancelText="取消"
                >
                    <a style={record.categoryStatus == 1 ? {color: '#F12C20'} : {}}>
                        {/*categoryStatus	int	产品类目状态 1:启用 2:停用*/}
                        {record.categoryStatus == 1 ? "停用" : "启用"}
                    </a>
                </Popconfirm>
            </>
        )
        return (
            <div className={'sw-table'} style={{marginTop: 26}}>
                <SWTable
                    columns={columns}
                    dataSource={tableData}
                    rowKey={'sn'}
                />
            </div>
        )
    }

    saveOrUpdate = () => {
        if (this.state.typeValue === '' || this.state.typeValue === undefined) {
            message.error('请填写类目名称')
            return
        }
        CompanyProductModel.CategorySave({
            categoryName: this.state.typeValue,
            parentSn: this.state.parentSn,
            sn: this.state.sn,
        }, res => {
            this.setState({visible: false});
            if (!this.state.parentSn && !this.state.sn) {
                message.success('新增类目成功');

            } else if (this.state.parentSn && this.state.sn) {
                message.success('修改类目成功');

            } else if (this.state.parentSn && !this.state.sn) {
                message.success('新增子类目成功');

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
                title={parentSn ? '添加产品子类目' : sn ? '修改产品类目' : '添加产品类目'}
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
                        类目名称:
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

export default CompanyClassList;
