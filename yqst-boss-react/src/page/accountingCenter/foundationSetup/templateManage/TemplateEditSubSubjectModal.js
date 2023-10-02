import React, {Component} from 'react';
import {Button, Input, Modal, Table, message} from 'antd';

class TemplateEditSubSubjectModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: [{catName: '', key: 1, queue: 0}]
        };
    }

    componentDidMount() {

    }

    add = () => {
        const {dataSource} = this.state;
        const lastLineData = dataSource[dataSource.length - 1];
        dataSource.push({catName: '', key: lastLineData.key + 1, queue: lastLineData.key + 1});
        this.setState({dataSource});
    };

    inputChange = (e, record) => {
        const {dataSource} = this.state;
        if (dataSource[record.key - 1]) {
            dataSource[record.key - 1].catName = e.target.value;
        } else {
            dataSource.push({catName: e.target.value, key: record.key, queue: 0});
        }

        this.setState({dataSource});
    };

    modalClose = () => {
        this.setState({dataSource: [{catName: '', key: 1, queue: 0}]});
        this.props.close();
    };

    handleOk = () => {
        const {defaultValue, handleEdit, handleOk, handleCancel} = this.props;
        let allIsNot = true;
        let isHasNot = false;
        this.state.dataSource.forEach((item) => {
            if (item.catName !== '') {
                allIsNot = false;
            } else {
                isHasNot = true;
            }
        });
        if (allIsNot) {
            message.error('请至少一个输入子科目名称');
            return;
        }
        if (isHasNot === true) {
            this.showConfirm(this.state.dataSource);
            return;
        }
        this.state.dataSource = this.state.dataSource.filter(n => n.catName !== '');
        if (defaultValue) {
            handleEdit(this.state.dataSource);
        } else {
            handleOk(this.state.dataSource);
        }
        handleCancel();
        this.modalClose();
    };

    showConfirm = () => {
        const that = this;
        Modal.confirm({
            title: '输入了名称才会生成子科目，为空的不会生成子科目！是否保存？',
            onOk() {
                const {defaultValue, handleEdit, handleOk, handleCancel} = that.props;
                that.state.dataSource = that.state.dataSource.filter(n => n.catName !== '');
                if (defaultValue) {
                    handleEdit(that.state.dataSource);
                } else {
                    handleOk(that.state.dataSource);
                }
                handleCancel();
                that.modalClose();
            }
        });
    };

    componentWillReceiveProps(nextProps, nextContext) {
        if (nextProps && nextProps.defaultValue) {
            this.setState({
                dataSource: [{...nextProps.defaultValue, key: 1}]
            });
        }
    }

    render() {
        const {visible, handleCancel, defaultValue, subSubjectModalMaxLength} = this.props;
        const columns = [
            {
                title: '序号', dataIndex: 'key', key: 'key', render: (text) => (
                    <span>{(text > 0 && text < 10) ? `0${text}` : text}</span>
                )
            },
            {
                title: '子科目名称', dataIndex: 'catName', key: 'catName', render: (text, record) => (
                    <Input maxLength={30} onChange={(e) => this.inputChange(e, record)} value={record.catName}/>
                )
            }
        ];
        return (
            <Modal
                title="添加子科目"
                visible={visible}
                onOk={this.handleOk}
                onCancel={handleCancel}
                afterClose={this.modalClose}
            >
                {
                    !defaultValue && subSubjectModalMaxLength + this.state.dataSource.length >= 30 ?
                        <Button type='primary' disabled={true}>添加</Button> :
                        !defaultValue && subSubjectModalMaxLength + this.state.dataSource.length < 30 ?
                            <Button type='primary' onClick={this.add}>添加</Button> :
                            defaultValue ? null : null
                }
                <Table
                    dataSource={this.state.dataSource}
                    columns={columns}
                    rowKey='key'
                    pagination={false}
                />
            </Modal>
        );
    }
}

export default TemplateEditSubSubjectModal;
