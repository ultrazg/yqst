/**
 * Created by ljy on 2017/12/21
 */
import React, {Component} from 'react';
import {Button, Input, Table, Modal, Select, Form, TreeSelect, message} from 'antd';
import {connect} from 'react-redux';
import ViewContent from "../../../baseview/viewContent/ViewContent";

const TreeNode = TreeSelect.TreeNode;
const columns = [{
    title: '序号',
    dataIndex: 'id',
    width: 70
}, {
    title: '方案标签名称',
    dataIndex: 'name',
}, {
    title: '操作',
    dataIndex: 'opera',
    width: '20%'
}];

class FinancialTag extends Component {
    classNameTempData = {
        now: {id: '0', catName: ''},
    };

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            modalType: '',
            visible: false,
            sourceData: [{id: '0', catName: '无', listSoftCatDTOS: []}],
            data: [],
            pagination: {total: 0, pageSize: 10},

            selectedSuperCa: {id: '0', catName: '无'}

        };
        this.formRef = React.createRef();
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        this.setListData([1, 2, 3, 4, 5]);
        // SoftCategoryModel.getSoftCategoryList({}, (res) => {
        //     this.setState({
        //         sourceData: [{id: '0', catName: '无', listSoftCatDTOS: []}].concat(res.data)
        //     });
        //     this.setListData(res.data);
        // }, () => {
        // });
    }

    addCa() {
        // if (!(this.classClassifyNameComponent.props.value + "")) {
        //     return;
        // }
        // SoftCategoryModel.addSoftCategory({
        //     catName: this.classClassifyNameComponent.props.value,
        //     parentId: this.state.selectedSuperCa.id
        // }, (res) => {
        message.info("添加方案标签成功", 2);
        this.setState({
            visible: false
        });
        //     setTimeout(()=>{
        //         this.refresh();
        //     },600);
        // }, () => {
        // });
    }

    editCa() {
        // SoftCategoryModel.addSoftCategory({
        //         id: this.classNameTempData.now.id,
        //         catName: this.classClassifyNameComponent.props.value,
        //         parentId: this.state.selectedSuperCa.id
        //     },
        //     (res) => {
        message.info("修改方案标签成功", 2);
        this.setState({
            visible: false
        });
        //     setTimeout(()=>{
        //         this.refresh();
        //     },600);
        // }, () => {
        // });
    }

    delCa() {
        // SoftCategoryModel.delSoftCategory({
        //         id: this.classNameTempData.now.id,
        //     },
        //     (res) => {
        message.info("删除方案标签成功", 2);
        this.setState({
            visible: false
        });
        //     setTimeout(()=>{
        //         this.refresh();
        //     },600);
        // }, () => {
        // });
    }

    showDelModal() {
        this.showModal('del');
    }

    delHandleOk() {
        this.setState({
            delLoading: true,
        });
        //网路请求
        this.handleOk()
    }

    showModal(type) {
        this.setState({
            title: type == 'del' ? '删除方案标签' : type == 'edit' ? '修改方案标签' : '添加方案标签',
            modalType: type,
            visible: true,
        });
    }

    handleOk = () => {
        //网路请求
        switch (this.state.modalType) {
            case 'del':
                this.delCa();
                break;
            case 'edit':
                this.editCa();
                break;
            case 'add':
                this.addCa();
                break;
        }
    }

    handleCancel() {
        this.setState({
            visible: false,
            confirmLoading: false,
        });
    }

    setListData(list) {
        let data = [];
        for (let i = 0; i < list.length; i++) {
            data.push({
                key: list[i].id || i,
                id: i,
                name: <span>{"方案标签" + i}</span>,
                opera: <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Button type="primary" onClick={() => {
                            this.classNameTempData.now = {id: list[i].id, catName: list[i].catName}
                            this.showDelModal();
                        }}>删除</Button>
                        <div style={{width: 5}}/>
                        <Button type="primary" onClick={() => {
                            this.classNameTempData = {
                                now: {id: list[i].id, catName: list[i].catName},
                            };
                            this.setState({
                                selectedSuperCa: {id: '0', catName: '无'}
                            });
                            this.showModal('edit');
                        }}>编辑</Button>
                    </div>
                </div>,
            });
        }
        this.setState({
            data: data,
            pagination: {total: data.length, pageSize: 10}
        });
    }

    renderSub(data) {
        return data.listSoftCatDTOS.map((item, idx2) => {
            return {
                key: item.id,
                index: 0,
                name: <span>{item.catName}</span>,
                opera: <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div style={{display: 'flex', flexDirection: 'row'}}>
                        <Button type="primary" onClick={() => {
                            this.classNameTempData.now = {id: item.id, catName: item.catName}
                            this.showDelModal();
                        }}>删除</Button>
                        <div style={{width: 5}}/>
                        <Button type="primary" onClick={() => {
                            this.classNameTempData = {
                                now: {id: item.id, catName: item.catName},
                            };
                            this.setState({
                                selectedSuperCa: {id: data.id, catName: data.catName}
                            });
                            this.showModal('edit');

                        }}>编辑</Button>
                    </div>
                </div>,
                children: item.listSoftCatDTOS.length > 0 ? this.renderSub(item) : [],
            }
        })
    }

    render() {
        return (
            <Form ref={this.formRef}>
                <ViewContent crumb={[
                    {name: "金融方案管理"}, {name: "标签管理列表"}
                ]}>
                    <div style={{
                        textAlign: 'right',
                        marginBottom: 15
                    }}>
                        <Button type="primary" onClick={() => {
                            this.classNameTempData.now = {id: '0', catName: ''};
                            this.setState({
                                selectedSuperCa: {id: '0', catName: '无'},
                            });
                            this.showModal('add');
                        }}>添加方案标签</Button>
                    </div>
                    <Table columns={columns} dataSource={this.state.data}
                           pagination={this.state.pagination}/>
                    {this.state.visible ?
                        (this.state.modalType == 'del' ? this.delClassifyOpera() : this.publicClassifyOpera()) : null}
                </ViewContent>
            </Form>
        );
    }

    publicClassifyOpera() {
        const {getFieldDecorator} = this.formRef.current;
        return <Modal
            visible={this.state.modalType == 'del' ? false : this.state.visible}
            onOk={() => {
                this.handleOk()
            }}
            confirmLoading={this.state.confirmLoading}
            onCancel={() => {
                this.handleCancel()
            }}>
            <p style={{color: '#333', fontSize: 16}}>{this.state.title}</p>
            <div style={{marginTop: 10, display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                <span style={{width: 100, fontSize: 14,}}>方案标签名称：</span>
                {getFieldDecorator('方案标签名称', {
                    rules: [{required: true, message: '请输入方案标签名称'}],
                    initialValue: this.state.modalType == 'edit' ? this.classNameTempData.now.catName : ""
                })(
                    <Input
                        style={{flex: 1}}
                        ref={(c) => {
                            this.classClassifyNameComponent = c;
                        }}
                        placeholder="方案标签名称"/>
                )}
            </div>
            {/*<div style={{*/}
            {/*marginTop: 10,*/}
            {/*display: 'flex',*/}
            {/*flexDirection: 'row',*/}
            {/*alignItems: 'center',*/}
            {/*}}>*/}
            {/*<span style={{width: 80, fontSize: 14}}>上级：</span>*/}
            {/*<TreeSelect*/}
            {/*showSearch*/}
            {/*style={{flex: 1}}*/}
            {/*value={this.state.selectedSuperCa.catName}*/}
            {/*dropdownStyle={{maxHeight: 400, overflow: 'auto'}}*/}
            {/*placeholder="请选择上级方案标签"*/}
            {/*allowClear*/}
            {/*treeDefaultExpandAll*/}
            {/*onChange={(datastr) => {*/}
            {/*console.log(datastr, 'datastr');*/}
            {/*if (datastr) {*/}
            {/*this.setState({*/}
            {/*selectedSuperCa: JSON.parse(datastr),*/}
            {/*});*/}
            {/*} else {*/}
            {/*this.setState({*/}
            {/*selectedSuperCa: {id: '0', catName: '无'},*/}
            {/*});*/}
            {/*}*/}
            {/*}}*/}
            {/*>*/}
            {/*{this.state.sourceData.map((item, index) => {*/}
            {/*return <TreeNode value={JSON.stringify(item)} title={item.catName} key={item.id}>*/}
            {/*{this.renderSubTree(item)}*/}
            {/*</TreeNode>*/}
            {/*})}*/}
            {/*</TreeSelect>*/}
            {/*</div>*/}
        </Modal>
    }

    renderSubTree(data) {
        return data.listSoftCatDTOS.map((item, index) => {
            return <TreeNode value={JSON.stringify(item)} title={item.catName} key={item.id}>
                {this.renderSubTree(item)}
            </TreeNode>
        });
    }

    delClassifyOpera() {
        return (<Modal
            visible={this.state.modalType == 'del' ? this.state.visible : false}
            okText={"删除"}
            onOk={() => {
                this.handleOk()
            }}
            confirmLoading={this.state.confirmLoading}
            onCancel={() => {
                this.handleCancel();
            }}>
            <p style={{color: '#333', fontSize: 16}}>{"是否删除该方案标签"}</p>
        </Modal>);
    }
}

const FinancialTagPage = FinancialTag;

function mapStateToProps(state) {
    const {IndexReducers} = state;
    return {IndexReducers}
}

export default connect(mapStateToProps)(FinancialTagPage)