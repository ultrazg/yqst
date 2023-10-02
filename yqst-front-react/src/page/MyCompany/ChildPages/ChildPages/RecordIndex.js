import React, {Component} from 'react';

import { Input, Button, Row, Col } from 'antd';
import SWTable from 'SWViews/table';

const columns = [
    {
        title: '操作时间',
        dataIndex: 'time',
        key: 'time',
        width: 150
    },
    {
        title: '操作者',
        dataIndex: 'name',
        key: 'name',
    },
    {
        title: '操作对象',
        dataIndex: 'obj',
        key: 'obj',
    },
    {
        title: '操作类型',
        dataIndex: 'type',
        key: 'type',
    },
    {
        title: '详细数据',
        dataIndex: 'comtent',
        key: 'comtent',
    },
];

class RecordIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [
                {
                    key: '1',
                    time: '2019-12-03 19:03',
                    name: '陈星岚',
                    obj: '企业基本信息',
                    type: '编辑基本信息',
                    comtent: '修改企业名称',
                },
                {
                    key: '2',
                    time: '2019-12-03 19:03',
                    name: '陈星岚',
                    obj: '企业基本信息',
                    type: '编辑基本信息',
                    comtent: '修改企业名称',
                },
            ]
        };

    }

    componentDidMount() {
        // this.getGetErpInfo();
    }

    componentWillUnmount() {}

    render() {
        return (
            <div
                style={{
                    padding: '30px 32px 24px'
                }}
            >
                <h1
                    style={{
                        fontSize: '20px',
                        color: '#2B3441',
                        marginBottom: '24px',
                        paddingBottom: '24px',
                        borderBottom: '1px solid rgba(43,52,65,0.09)'
                    }}
                >操作记录</h1>
                <Row
                    style={{marginBottom: '24px'}}
                >
                    <Col span={9}>
                        操作者：
                        <Input
                            style={{width: '210px', marginLeft: '6px', fontSize: '14px'}}
                            maxLength={30}
                            placeholder="请输入操作者"
                        />
                    </Col>
                    <Col span={9}>
                        操作对象：
                        <Input
                            style={{width: '210px', marginLeft: '6px', fontSize: '14px'}}
                            maxLength={30}
                            placeholder="请输入操作对象"
                        />
                    </Col>
                    <Col span={6}>
                        <Button type="primary"
                            style={{width: '64px', height: '32px', fontSize: '16px', marginLeft: '11px'}}
                        >搜索</Button>
                    </Col>
                </Row>
                <SWTable className={'Table'} dataSource={this.state.list} columns={columns} pagination={false}/>
            </div>
        );
    }
}

export default RecordIndex;
