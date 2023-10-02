import React, {Component} from 'react';
import {Card, Col, Empty, message, Pagination, Row, Switch, Divider} from 'antd'
import IsPower from '../../../Power/IsPower'
import model from '../../model'


class ApplyVisibleSetting extends Component {
    state = {
        softList: [],
        current: 1,
        total: 0
    };

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {

    }

    getList = () => {
        model.softGroupUserShowList({
            current: this.state.current,
            pageSize: 10
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
        let {list, softList} = this.state;
        return (
            <IsPower
                key={'SOFT_MANAGE_ENTER'}
                permissionsName={'SOFT_MANAGE_ENTER'}
                style={{paddingTop: '50px'}}
            >
                <h1
                    style={{
                        fontSize: '20px',
                        lineHeight: '28px',
                        padding: '24px 0',
                        borderBottom: '1px solid rgba(43,52,65,0.25)',
                        margin: '0 0 15px 0'
                    }}
                >
                    可见性设置
                </h1>
                <div>
                    <IsPower
                        key={'SOFT_VISIBLE_ENTER'}
                        permissionsName={'SOFT_VISIBLE_ENTER'}
                        style={{paddingTop: '50px'}}
                    >
                        <div style={{margin: '16px 0'}}>
                            {
                                this.state.softList.length !== 0 ? (
                                    <div>
                                        {
                                            this.state.softList && this.state.softList.map((item, index) => (
                                                <div key={index}>
                                                    {index !== 0 && <Divider style={{margin: '12px 0'}}/>}
                                                    <div style={{position: 'relative'}}>
                                                        <img
                                                            style={{width: 40, height: 40, display: 'inline-block'}}
                                                            src={item.logo}
                                                            alt=""
                                                        />
                                                        <h3
                                                            style={{
                                                                textAlign: 'center',
                                                                lineHeight: '22px',
                                                                marginBottom: 0,
                                                                display: 'inline-block',
                                                                fontSize: '16px',
                                                                fontWeight: '500',
                                                                marginLeft: '12px'
                                                            }}
                                                        >
                                                            {item.softName}
                                                        </h3>
                                                        <div
                                                            style={{
                                                                padding: '0 12px',
                                                                textAlign: 'right',
                                                                display: 'inline-block',
                                                                position: 'absolute',
                                                                right: 0,
                                                                top: 8
                                                            }}
                                                        >
                                                            <Switch
                                                                onChange={(checked) => this.changeShow(checked, item)}
                                                                checkedChildren="显示" unCheckedChildren="隐藏"
                                                                checked={item.isShow === 1}/>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
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
            </IsPower>
        );
    }
}

export default ApplyVisibleSetting;
