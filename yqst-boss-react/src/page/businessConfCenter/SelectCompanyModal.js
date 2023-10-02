import {Button, Checkbox, Col, Input, Modal, Row, Table} from "antd";
import React, {useEffect} from "react";
import request from "../../utils/request/request";
import useStateCallback from "../../utils/hooks/useStateCallback";
import cloneDeep from "lodash/cloneDeep";

const SelectCompanyModal = ({closeModal, onSubmit}) => {
    const [total, setTotal] = React.useState(0);
    const [list, setList] = React.useState([]);
    const [requestPar, setRequestPar] = useStateCallback({
        current: 1,
        pageSize: 10,
        keyWord: ''
    });
    const getList = (requestPar = {}) => {
        request('/boss/v1/user/account/page', requestPar, res => {
            setTotal(res.data.total || 0);
            setList(res.data.records || []);
        })
    }
    useEffect(() => {
        getList(requestPar)
    }, []);
    return <Modal
        style={{top: 10}}
        title="选择企业"
        width={650}
        className={'sw-modal'}
        visible={true}
        footer={null}
    >
        <Row style={{marginBottom: 10}}>
            <Col span={16}>
                <Col span={24}>
                    关键字：
                    <Input maxLength={30} value={requestPar.keyWord} style={{width: '80%'}}
                           placeholder={'可查询企业名称'} onChange={(e) => {
                        setRequestPar({
                            ...requestPar,
                            keyWord: e.target.value
                        })
                    }}/>
                </Col>
            </Col>
            <Col span={8}>
                <Button onClick={() => {
                    setRequestPar({
                        current: 1,
                        pageSize: 10,
                        keyWord: '',
                    })
                }}>重置</Button>
                <Button style={{marginLeft: 10}} type="primary" onClick={() => {
                    setRequestPar({
                        ...requestPar,
                        current: 1,
                        pageSize: 10,
                    }, (data) => {
                        getList(data);
                    })
                }}>搜索</Button>
            </Col>
        </Row>
        <Table
            style={{margin: 0, padding: 0}}
            columns={[
                {
                    title: '选择',
                    dataIndex: 'isChose',
                    key: 'isChose',
                    width: 60,
                    render: (text, record, index) => {
                        return <Checkbox
                            checked={text}
                            onChange={(e) => {
                                list[index].isChose = !record.isChose;
                                setList(cloneDeep(list));
                            }}
                        />
                    }
                },
                {
                    title: '企业ID',
                    dataIndex: 'id',
                    key: 'id',
                    width: '25%'
                },
                {
                    title: '企业号',
                    dataIndex: 'accountSn',
                    key: 'accountSn',
                    width: '35%'
                },
                {
                    title: '企业名',
                    dataIndex: 'companyName',
                    key: 'companyName',
                    width: '40%'
                }
            ]}
            dataSource={list}
            rowKey={'companySn'}
            pagination={
                {
                    showSizeChanger: false,
                    total: total,
                    current: requestPar.current,
                    pageSize: requestPar.pageSize,
                    onChange: (current, pageSize) => {
                        setRequestPar({
                            ...requestPar,
                            current: current
                        }, (data) => {
                            getList(data);
                        })
                    },
                    showTotal: (total, range) => `共有${total}条`
                }
            }
        />
        <div style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Button onClick={() => {
                closeModal && closeModal()
            }}>关闭</Button>
            <Button style={{marginLeft: 20}} type={'primary'} onClick={() => {
                let data = list.filter((item) => {
                    return item.isChose
                })
                if (data.length > 0)
                    onSubmit && onSubmit(data);
            }}>添加</Button>
        </div>
    </Modal>
}
export default SelectCompanyModal
