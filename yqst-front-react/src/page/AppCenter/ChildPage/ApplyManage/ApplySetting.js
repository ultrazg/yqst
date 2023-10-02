import React, {Component} from 'react';
import {add, remove} from '../../../../resource'
import model from '../../model'
import IsPower from '../../../Power/IsPower'
import {Empty} from 'antd'


class ApplySetting extends Component {
    state = {
        softVOList: []
    };

    componentDidMount() {
        this.getList()
    }

    componentWillUnmount() {

    }

    getList = () => {
        model.softGroupUserSoftList({}, res => {
            this.setState({
                softVOList: res.data,
            })
        })
    };

    render() {
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
                    应用设置
                </h1>
                <div>
                    {
                        this.state.softVOList && this.state.softVOList.map((n, index) => (
                            this.renderItem(n, index)
                        ))
                    }
                    {
                        this.state.softVOList && (this.state.softVOList.length === 1 || this.state.softVOList.length === 0) && (
                            <div style={{marginTop: 50}}>
                                <Empty description={'暂无应用数据,请前往应用市场开通'}/>
                            </div>
                        )
                    }
                </div>
            </IsPower>
        );
    }

    renderItem = (n, index) => {
        return (
            n.softVOList.length !== 0 && <div key={n.groupName + index}>
                <div
                    style={{
                        color: 'rgba(43,52,65,0.65)',
                        margin: '16px 0'
                    }}
                >
                    {n.groupName}
                </div>
                <div>
                    {
                        n.softVOList && n.softVOList.map((item, idx) => {
                            return (
                                <div
                                    onClick={() => {
                                        this.props.history.push(`/pages/appCenter/ApplyManageNewUI/applyDetail?softId=${item.softId}&serviceTag=${item.serviceTag}`)
                                    }}
                                    className={'applyS'}
                                    key={'use_' + idx}
                                    style={{
                                        display: 'inline-block',
                                        width: '192px',
                                        height: '64px',
                                        padding: '12px',
                                        borderRadius: '6px',
                                        border: '1px solid rgba(43,52,65,0.25)',
                                        marginBottom: '24px',
                                        marginRight: (idx === 0 || ++idx % 3 !== 0) ? '24px' : '0px',
                                        position: 'relative',
                                    }}
                                >
                                    <div
                                        style={{cursor: 'pointer'}}
                                    >
                                        <img
                                            src={item.logo}
                                            alt=""
                                            style={{
                                                width: '40px',
                                                height: '40px',
                                                marginRight: '12px',
                                            }}
                                        />
                                        <span
                                            style={{
                                                overflow: 'hidden',
                                                whiteSpace: 'nowrap',
                                                textOverflow: 'ellipsis',
                                                display: 'inline-block',
                                                width: '110px',
                                                verticalAlign: 'middle',
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}

export default ApplySetting;
