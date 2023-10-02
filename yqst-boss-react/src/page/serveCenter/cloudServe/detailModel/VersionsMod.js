/**
 * Created by yb on 2019/11/20
 */

import React, {Component} from 'react';
import { Card } from 'antd';
import Model from "../../Model";
import moment from 'moment'
import SWTable from 'SWViews/table';


class VersionsMod extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            total: 0,
            requestPar: {
                current: 1,
                pageSize: 10,
                softId: '',
            },
        };
    }

    componentDidMount() {
        this.getList();
    }

    // 视图层
    render() {
        return (
            <div>
                {this.makeBBView()}
            </div>
        );
    }

    getList() {
        Model.CServeSVPage({
            ...this.state.requestPar,
            softId: this.props.id,

        }, (res) => {
            this.setState({
                list: res.data.records || [],
                total: res.data.total || 0,
            })
        }, (err) => {
        })
    }

    makeBBView(){
        const {requestPar, list} = this.state;
        const columns = [
            {
                title: '版本',
                key: 'softVersion',
                dataIndex: 'softVersion',
                width: 120,
            },
            {
                title: '更新时间',
                key: 'logUpdateTime',
                dataIndex: 'logUpdateTime',
                width: 120,
                render: (res) => {
                    let times = res ? moment(res).format('YYYY-MM-DD') : '';

                    return times ? <div>
                        <div>{times.split(' ')[0]}</div>
                        <div>{times.split(' ')[1]}</div>
                    </div> : times;
                }
            },
            {
                title: '更新说明',
                key: 'memo',
                dataIndex: 'memo',
            },
        ];
        return <Card
            type="inner"
            title="版本情况"
        >
            <SWTable
                columns={columns}
                dataSource={list}
                pagination={
                    {
                        total: this.state.total,
                        current: requestPar.current,
                        pageSize: requestPar.pageSize,
                        onChange: (a, b) => {
                            requestPar.current = a;
                            this.setState({requestPar}, () => {
                                this.getList();
                            })
                        },
                        showTotal: (total, range) => `共有${total}条`
                    }
                }
            />
        </Card>
    }
}

export default VersionsMod
