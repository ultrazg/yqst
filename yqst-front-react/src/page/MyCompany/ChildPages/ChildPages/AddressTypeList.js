import React, {Component} from 'react';
import {LeftOutlined, PlusOutlined} from '@ant-design/icons';
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
import './AddressTypeLess.less'

class AddressTypeList extends Component {
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
        Model.MyCompanyAdressTypeList({
            keyWord
        }, res => {
            const recursive = (data) => {
                data.forEach(n => {
                    if (n.addressCategoryListVOList && n.addressCategoryListVOList.length === 0) {
                        delete n.addressCategoryListVOList
                    } else {
                        n.children = n.addressCategoryListVOList;
                        n.children && recursive(n.children)
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
        Model.MyCompanyAdressTypeDel({sn: id}, res => {
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
            <div style={{padding: "24px 24px"}}>
                <div style={{marginBottom: "12px"}}>
                    <Button
                        className={'Button_leftIcon'}
                        icon={<LeftOutlined/>}
                        onClick={() => {
                            this.props.history.push('/pages/myCompany/subjectSetUp/companyBusInf/index?key=3');
                        }}
                    >返回</Button>
                </div>
                {this.renderModal()}
                {/*	搜索区域 */}
                {this.renderSearch()}
                {/*	操作按钮区域 */}
                {this.renderOperationButton()}
                {/* 表格区域 */}
                {this.renderTable()}
            </div>
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
                        borderRadius: 6
                    }}
                >
                    搜索
                </Button>
                <Button
                    style={{
                        marginLeft: 16,
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
            <div style={{marginTop: 12}}>
                <Button
                    type='primary'
                    onClick={() => {
                        this.setState({visible: true})
                    }}
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
            {title: '分类名称', dataIndex: 'addressCategory'},
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
                    添加子分类
                </a>
                <Divider type={'vertical'}/>
                <a
                    onClick={() => {
                        this.setState({
                            visible: true,
                            sn: record.sn,
                            parentSn: record.parentSn,
                            typeValue: record.addressCategory
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
            <div className={'sw-table'} style={{marginTop: 12}}>
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
            message.error('请填写分类名称')
            return
        }
        Model.MyCompanyAdressTypeSave({
            addressCategory: this.state.typeValue,
            parentSn: this.state.parentSn,
            sn: this.state.sn || '',
        }, res => {
            this.setState({visible: false});
            if (!this.state.parentSn && !this.state.sn) {
                message.success('新增分类成功');

            } else if (this.state.parentSn && this.state.sn) {
                message.success('修改分类成功');

            } else if (this.state.parentSn && !this.state.sn) {
                message.success('新增子分类成功');

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
                title={parentSn ? '添加地址子分类' : sn ? '修改地址分类' : '添加地址分类'}
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
                        分类名称:
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

export default AddressTypeList;
