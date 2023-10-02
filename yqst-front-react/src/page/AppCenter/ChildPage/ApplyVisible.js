// 这个是原型图上的应用管理 - 但是这个页面好像不需要

import React, {Component} from 'react';

import {
    Row,
    Col,
    Button,
    Pagination,
    Switch,
    Card,
    message,
    Empty,
} from 'antd';
import model from '../model'
import IsPower from '../../Power/IsPower';
import {LeftOutlined} from "@ant-design/icons";

class ApplyManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            softList: [],
            current: 1,
            total: 0
        };
    }

    componentDidMount() {
        this.getList()
        document.addEventListener('dragover', this.preventDefault);
        document.addEventListener('drop', this.preventDefault);
    }

    componentWillUnmount() {
        document.removeEventListener('dragover', this.preventDefault);
        document.removeEventListener('drop', this.preventDefault);
    }

    preventDefault(e) {
        e.preventDefault();
    }

    getList = () => {
        model.softGroupUserShowList({
            current: this.state.current
        }, res => {
            this.setState({
                softList: res.data.records,
                current: res.data.current,
                total: res.data.total
            })
        })
    }

    changeShow = (checked, item) => {
        window.globalPermissions.checkPermission('SOFT_VISIBLE_SET', (res) => {
            if (res)
                return message.error('抱歉，您没有该操作权限，请联系管理员！');

            model.softGroupUserShowSave({
                groupUserId: item.groupUserId,
                isShow: checked ? 1 : 0
            }, res => {
                message.success('保存成功');
                this.getList();
            })
        });
    }

    render() {
        let {softList} = this.state;
        return (
            <div
                className={'applyManage'}
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    background: '#fff',
                    borderRadius: '6px',
                    margin: '24px auto',
                    padding: '0 138px',
                    fontSize: '14px',
                    position: 'relative'
                }}
            >
                {/*推拽示例*/}
                {/*<Drag/>*/}
                <Button
                    className={'Button_leftIcon'}
                    icon={<LeftOutlined/>}
                    style={{
                        position: 'absolute',
                        left: '24px',
                        top: '25px',
                    }}
                    onClick={() => {
                        this.props.history.push('/pages/appCenter/applyManage');
                    }}
                >返回</Button>
                <IsPower
                    key={'SOFT_VISIBLE_ENTER'}
                    permissionsName={'SOFT_VISIBLE_ENTER'}
                    style={{paddingTop: '240px'}}
                >
                    <h1
                        style={{
                            fontSize: '20px',
                            lineHeight: '28px',
                            padding: '24px 0',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                            margin: '0px'
                        }}
                    >
                        管理应用
                    </h1>
                    <div style={{margin: '16px 0'}}>
                        {
                            this.state.softList.length !== 0 ? (
                                <Row gutter={12}>
                                    {
                                        this.state.softList && this.state.softList.map((item, index) => (
                                            <Col key={item.softId + item.groupUserId + index} span={8}
                                                 style={{margin: '6px 0'}}>
                                                <Card
                                                    hoverable
                                                    actions={[
                                                        <div style={{padding: '0 12px', textAlign: 'right'}}>
                                                            <Switch
                                                                onChange={(checked) => this.changeShow(checked, item)}
                                                                checkedChildren="显示" unCheckedChildren="隐藏"
                                                                checked={item.isShow === 1}/>
                                                        </div>
                                                    ]}
                                                >
                                                    <div
                                                        style={{display: 'flex'}}
                                                    >
                                                        <img style={{width: 64, height: 64}} src={item.logo} alt=""/>
                                                        <h3 style={{
                                                            textAlign: 'center',
                                                            flex: 1,
                                                            lineHeight: '64px',
                                                            marginBottom: 0
                                                        }}>{item.softName}</h3>
                                                    </div>
                                                </Card>
                                            </Col>
                                        ))
                                    }
                                </Row>
                            ) : <Empty style={{marginTop: 100}} description='暂无开通的应用,请前往应用市场开通.'/>
                        }
                    </div>
                    <div style={{textAlign: 'center', marginTop: 20, paddingBottom: 20}}>
                        <Pagination
                            hideOnSinglePage={true}
                            current={this.state.current}
                            total={this.state.total}
                            onChange={(page) => {
                                this.setState({current: page}, () => {
                                    this.getList()
                                })
                            }}
                            showSizeChanger={false}
                        />
                    </div>
                </IsPower>
            </div>
        );
    }
}

export default ApplyManage;
