import React, {Component} from 'react';
import {Row, Col, Skeleton, Empty, Modal} from 'antd';
import {head, leftArr, useApp, logo, none} from '../../../resource';
import Model from "../Model";
import {connect} from 'react-redux';
import {setIndexMes, allTypeNews, allNewsTotal} from "../../layout/redux/mainLayoutAction";
import moment from 'moment';
import model from '../../AppCenter/model'
import JudgePath from '../../AppCenter/ChildPage/JudgePath'


@connect(
    (state) => {
        const {mainLayoutReducers} = state;
        return {
            mainLayoutReducers
        }
    },
    (dispatch) => {
        return {
            setIndexMes: (position) => {
                dispatch(setIndexMes(position))
            },
            allTypeNews: (position) => {
                dispatch(allTypeNews(position))
            },
            allNewsTotal: (position) => {
                dispatch(allNewsTotal(position))
            },
        }
    }
)
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            timesText: this.timesFun(),
            unreadNum: 0,
            appList: [],
            appListLoading: false
        };
        if (localStorage && !localStorage.sessKey) {
            this.props.history.replace('/users/login/index');
            // this.props.history.push('/users/login/index');
        }
    }

    componentDidMount() {
        Model.GetStaffInfo({}, res => {
            const departmentName = []
            if (res.data.deptVO && res.data.deptVO.length > 0) {
                res.data.deptVO.forEach(n => {
                    departmentName.push(n.departmentName)
                })
            }
            this.props.setIndexMes({
                ...res.data,
                userAlias: res.data.name || '',
                staffId: res.data.id || '',
                departmentName: departmentName.join(',') || '',
                jobName: res.data.jobName || '',
                workPhone: res.data.workPhone || '',
                workEmail: res.data.workEmail || '',
            });
            localStorage.userAlias = res.data.name
            localStorage.staffId = res.data.id
            localStorage.departmentName = departmentName.join(',')
            localStorage.jobName = res.data.jobName
            localStorage.workPhone = res.data.workPhone
            localStorage.workEmail = res.data.workEmail

            this.getNewsModelIList();
            setTimeout(() => {
                this.getNewsModelUCount(1);
            }, 1 * 1000)
            setTimeout(() => {
                this.getNewsModelUCount(0);
            }, 1.5 * 1000)
            this.setState({appListLoading: true})
            setTimeout(() => {
                model.softGroupUserOftenUseList({}, res => {
                    this.setState({
                        appList: res.data || [],
                        appListLoading: false
                    })
                })
            }, 2 * 1000)

        })
    }

    componentWillUnmount() {

    }

    render() {
        let {data, timesText, unreadNum} = this.state;
        let {mainLayoutReducers} = this.props;
        let {indexData, allTypeNews} = mainLayoutReducers;
        let {isAwait, allList} = allTypeNews;
        let newAllList = [];
        allList.forEach(item => {
            if ('1' !== '' + item.id && '2' !== '' + item.id)
                newAllList.push(item);
        });
        const appList = this.state.appList;
        const numBerFun = (num = 0) => {
            if (num >= 100) {
                return <span
                    style={{
                        position: 'absolute',
                        left: '14px',
                        top: '0px',
                        padding: '4px',
                        borderRadius: '50%',
                        background: '#f00',
                        lineHeight: '10px',
                        color: '#fff',
                        fontSize: '10px',
                        zIndex: '1'
                    }}
                >99<sup>+</sup></span>;

            } else {
                return <span
                    style={{
                        position: 'absolute',
                        left: '14px',
                        top: '0px',
                        padding: num < 10 ? '4px 6px' : '4px 4px',
                        borderRadius: '50%',
                        background: '#f00',
                        lineHeight: '10px',
                        color: '#fff',
                        fontSize: '10px',
                        zIndex: '1'
                    }}
                >{num}</span>;

            }
        };

        return (
            <div className={'homeCss'}>
                <div className={'homeL'}>
                    <h1
                        style={{margin: '0'}}
                    >{timesText}{indexData.userAlias ? `，${indexData.userAlias}` : ''}</h1>
                    {
                        isAwait ? <Skeleton loading={isAwait}/> : [
                            <p key={'p'}>
                                您有 {unreadNum || 0} 条未读信息
                                {
                                    newAllList && newAllList.length > 0 ? <span>，
                                        <a
                                            onClick={() => {
                                                this.props.history.push(`/pages/home/applyMessage`);
                                            }}
                                        >查看更多</a>
                                    </span> : null
                                }
                            </p>,
                            <ul className={'leftList'} key={'ul'}>
                                {
                                    newAllList && newAllList.map((item, idx) => {
                                        if (idx >= 5)
                                            return false;
                                        return <li
                                            key={idx + '_list_' + item.infoTypeId}
                                            onClick={() => {
                                                this.props.history.push(`/pages/home/applyMessage?id=${item.id}`);
                                            }}
                                            style={{height: '40px', lineHeight: '40px', display: 'flex'}}
                                        >
                                            <span
                                                style={{
                                                    display: 'inline-block',
                                                    verticalAlign: 'top',
                                                    position: 'relative',
                                                    maxWidth: '150px',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                <img src={item.avatar || logo} alt=""
                                                     style={{width: '24px', height: '24px', borderRadius: '6px'}}
                                                />
                                                <a style={{padding: '0px 8px', paddingLeft: '16px'}}
                                                   title={item.infoType || ''}>
                                                    {item.infoType ? `[${item.infoType}]` : ''}
                                                </a>
                                                {item.unReadNumber && item.unReadNumber > 0 ? numBerFun(item.unReadNumber) : null}
                                            </span>
                                            <span
                                                title={item.lastInfoContent || ''}
                                                style={{
                                                    flex: 1,
                                                    display: 'inline-block',
                                                    overflow: 'hidden',
                                                    whiteSpace: 'nowrap',
                                                    textOverflow: 'ellipsis'
                                                }}
                                            >
                                                {item.lastInfoContent || ''}
                                            </span>
                                            <span style={{float: 'right', color: 'rgba(43,52,65,0.45)'}}>
                                                {item.createTime ? moment(item.createTime).format("MM-DD HH:mm") : ''}
                                                <img src={leftArr} alt=""
                                                     style={{width: '9px', marginLeft: '8px'}}/>
                                            </span>
                                        </li>
                                    })
                                }
                                {
                                    !newAllList || newAllList.length <= 0 ? <div
                                        style={{textAlign: 'center'}}
                                    >
                                        <img src={none} alt=""
                                             style={{width: '300px'}}
                                        />
                                        <div style={{color: '#BBBBBB'}}>暂无消息...</div>
                                    </div> : null
                                }
                            </ul>
                        ]
                    }
                    <div className={'leftTitle'}>常用应用</div>
                    {
                        this.state.appListLoading ?
                            <Skeleton loading={isAwait}/>
                            :
                            <div className={'leftUse'}>
                                {
                                    appList && appList.map((item, idx) => {
                                        if (idx >= 6)
                                            return false;
                                        return item.isShow + '' === '1' && <div
                                            title={item.softName}
                                            onClick={() => {
                                                if (item.isAuth === 0) {
                                                    Modal.info({
                                                        title: '应用未被授权使用.',
                                                        okText: '确定',
                                                    });
                                                    return
                                                }
                                                if (item.status === 1) {
                                                    JudgePath(item.serviceTag, this.props);
                                                } else if (item.status === 3) {
                                                    Modal.info({
                                                        title: '该应用已过期,请前往应用详情续费.',
                                                        okText: '立即前往',
                                                        onOk: () => {
                                                            this.props.history.push(`/pages/appCenter/ApplyManageNewUI/applyDetail?softId=${item.softId}&serviceTag=${item.serviceTag}`)
                                                        }
                                                    });
                                                }
                                            }}
                                            key={'appList_' + idx}
                                        >
                                            <img src={item.logo} alt=""/>
                                            {item.softName}
                                        </div>
                                    })
                                }
                            </div>
                    }
                    {
                        this.state.appListLoading === false && this.state.appList && this.state.appList.length === 0 && (
                            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE}/>
                        )
                    }
                </div>
                <div className={'homeR'}>
                    <div className={'rightT'}>
                        <img src={indexData.logo || logo} alt=""/>
                        <h1>{indexData.company || ''}</h1>
                        <div className={'border_bottom'}/>
                    </div>
                    <ul className={'rightM'}>
                        <li>
                            <span>行业：</span>
                            {indexData.industry || ''}
                        </li>
                        <li>
                            <span>地区：</span>
                            {(indexData.provinceName || '') + (indexData.cityName || '') + (indexData.districtName || '')}
                        </li>
                        <li>
                            <span>电话：</span>
                            {indexData.companyPhone || ''}
                        </li>
                        <li>
                            <span>邮箱：</span>
                            {indexData.companyEmail || ''}
                        </li>
                    </ul>
                    <div className={'border_bottom'}/>
                    <ul className={'rightM'}>
                        <li>
                            <span>姓名：</span>
                            {indexData.userAlias || ''}
                        </li>
                        <li>
                            <span>员工 ID：</span>
                            {indexData.staffId || ''}
                        </li>
                        <li>
                            <span>部门：</span>
                            {indexData.departmentName || ''}
                        </li>
                        <li>
                            <span>职务：</span>
                            {indexData.jobName || ''}
                        </li>
                        <li>
                            <span>工作电话：</span>
                            {indexData.workPhone || ''}
                        </li>
                        <li>
                            <span>工作邮箱：</span>
                            {indexData.workEmail || ''}
                        </li>
                    </ul>
                </div>
            </div>
        );
    }

    getNewsModelIList() {
        Model.NewsModelIList({}, (res) => {
            this.props.allTypeNews({
                allList: res.data,
                isAwait: false
            });
        }, (err) => {
            this.props.allTypeNews({
                allList: [],
                isAwait: false
            });
        });
    }

    getNewsModelUCount(type) {
        Model.NewsModelUCount({
            infoType: type
        }, (res) => {
            if ('1' !== '' + type) {
                this.setState({unreadNum: res.data.countUnreadInfo || 0});

            } else {
                this.props.allNewsTotal(res.data.countUnreadInfo || 0)

            }

        });
    }

    timesFun() {
        let res = '';
        let now = new Date(), hour = now.getHours();
        if (hour < 6) {
            document.write("凌晨好！")
        } else if (hour < 9) {
            return res = '早上好'
        } else if (hour < 12) {
            return res = '上午好'
        } else if (hour < 14) {
            return res = '中午好'
        } else if (hour < 17) {
            return res = '下午好'
        } else if (hour < 19) {
            return res = '傍晚好'
        } else if (hour < 22) {
            return res = '晚上好'
        } else {
            return res = '夜里好'
        }
    }
}

export default Home;
