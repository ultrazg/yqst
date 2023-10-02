import React, {useState} from 'react'
import cloneDeep from "lodash/cloneDeep";
import pull from "lodash/pull";
import {Input, message, Modal, Table} from "antd";

const Search = Input.Search;
//暂时解决原有<选择员工>modal卡顿重复的问题
export default function SelectPeopleModal({list, selectedList, callback, setCancel}) {
    let [allStaffUserList, setList] = useState(list || []);
    let [selectedRowKeys, setSelectedRowKeys] = useState(selectedList || []);
    const columns = [
        {
            title: '头像',
            dataIndex: 'photo',
            width: 120,
            render: text => (
                <img width={64} height={64}
                     src={text || 'https://sunawtest.oss-cn-shenzhen.aliyuncs.com/clue/520cd5b5eecb2cfdb70948c0d4e4207b.jpg'}
                     alt=""/>
            )
        },
        {
            title: '用户名', dataIndex: 'staffName', render: ((text, record) => (
                record.isAdmin === 1 ? text + '(企业创建者)' : text
            ))
        },
        {
            title: '职务名称',
            dataIndex: 'jobName'
        },
        {
            title: '所属部门',
            dataIndex: 'deptName',
        },
        {
            title: '手机号',
            dataIndex: 'phone',
        }
    ];
    const rowSelection = {
        selectedRowKeys: selectedRowKeys,
        onSelect: (record, selected, selectedRows, nativeEvent) => {
            let selectedArr = cloneDeep(selectedRowKeys);
            if (selected) {
                selectedArr.push(record.staffAccount);
            } else {
                pull(selectedArr, record.staffAccount);
            }
            setSelectedRowKeys(selectedArr);
        },
        onSelectAll: (selected, selectedRows, changeRows) => {
            let selectedArr = cloneDeep(selectedRowKeys);
            if (selected) {
                for (let i = 0; i < changeRows.length; i++) {
                    if (!selectedArr.includes(changeRows[i].staffAccount)) {
                        selectedArr.push(changeRows[i].staffAccount);
                    }
                }
                setSelectedRowKeys(selectedArr);
            } else {
                for (let i = 0; i < changeRows.length; i++) {
                    if (selectedArr.includes(changeRows[i].staffAccount)) {
                        pull(selectedArr, changeRows[i].staffAccount);
                    }
                }
                setSelectedRowKeys(selectedArr);
            }
        },
        // getCheckboxProps: record => {
        //     return {
        //         disabled: record.isAdmin === 1, // Column configuration not to be checked
        //     }
        // },
    };
    const showData = (list = []) => {
        let res = [];
        list.forEach(item => {
            if (!item.isHidden) {
                res.push(item);
            }
        });
        return res;
    };

    return (
        <Modal
            title='选择员工'
            style={{top: 10}}
            width={880}
            visible={true}
            onCancel={() => {
                setCancel()
            }}
            onOk={() => {
                let staffAccountList = selectedRowKeys.length > 0 ? allStaffUserList.map((item, index) => {
                    for (let i = 0; i < selectedRowKeys.length; i++) {
                        if (selectedRowKeys[i] == item.staffAccount) {
                            return {
                                id: item.staffAccount,
                                name: item.staffName,
                                isAdmin: item.isAdmin
                            }
                        }
                    }
                    return false
                }).filter(Boolean) : [];
                if (staffAccountList.length <= 0)
                    return message.error('请选择员工！');
                callback(staffAccountList);
            }}
        >
            <Search
                placeholder="可查询职务名称、用户名、所属部门、手机号"
                style={{marginBottom: '24px'}}
                onSearch={value => {
                    const newAllStaffUserList = allStaffUserList.map(item => {
                        let newIsHidden = true;
                        if (item.jobName.indexOf(value) >= 0 || item.staffName.indexOf(value) >= 0 || item.deptName.indexOf(value) >= 0 || item.phone.indexOf(value) >= 0) {
                            newIsHidden = false;
                        }
                        return {
                            ...item,
                            isHidden: newIsHidden
                        }
                    });
                    setList(newAllStaffUserList);
                }}
                onChange={(e) => {
                    const newAllStaffUserList = allStaffUserList.map(item => {
                        let newIsHidden = true;
                        if (item.jobName.indexOf(e.target.value) >= 0 || item.staffName.indexOf(e.target.value) >= 0 || item.deptName.indexOf(e.target.value) >= 0 || item.phone.indexOf(e.target.value) >= 0) {
                            newIsHidden = false;
                        }
                        return {
                            ...item,
                            isHidden: newIsHidden
                        }
                    });
                    setList(newAllStaffUserList);
                }}
            />
            <Table
                scroll={{y: 340}}
                columns={columns}
                dataSource={showData(allStaffUserList)}
                rowSelection={rowSelection}
                rowKey='staffAccount'
                pagination={{
                    showSizeChanger: false
                }}
            />
        </Modal>
    )
}
