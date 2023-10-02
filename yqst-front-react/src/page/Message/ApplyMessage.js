import React, {Component} from 'react';
import {
    Row,
    Col,
    Button,
    Pagination,
    Spin,
    Popconfirm,
    message,
} from 'antd';
import './ApplyMessageCss.less';
import {delMes, none, logo} from '../../resource';
import Model from "./Model";
import moment from 'moment'
import {connect} from "react-redux";
import {allTypeNews} from "../layout/redux/mainLayoutAction";
import {LeftOutlined} from "@ant-design/icons"

const analysisPar = (str = '') => {
    let resObj = {};
    if (str) {
        let arr = [];
        if (str.indexOf('&')) {
            arr = str.split('&');
            arr.forEach(item => {
                resObj[item.split('=')[0]] = item.split('=')[1];
            });

        } else {
            arr = str.split('=');
            resObj[arr[0]] = arr[1];
        }
    }
    return resObj;
};

@connect(
    (state) => {
        const {mainLayoutReducers} = state;
        return {
            mainLayoutReducers
        }
    },
    (dispatch) => {
        return {
            allTypeNews: (position) => {
                dispatch(allTypeNews(position))
            }
        }
    }
)
class ApplyMessage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allTypeList: [],
            changeRow: {},
            mesList: [],
            current: 1,
            pageSize: 10,
            total: 0,
            spinning: true,
        };
        this.urlPar = analysisPar(this.props.location.search.substr(1));
    }

    componentDidMount() {
        this.getNewsModelIList(this.urlPar.id);
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div
                className={'applyMessage'}
                style={{
                    width: '1116px',
                    minHeight: '648px',
                    margin: '24px auto',
                    background: '#fff',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    position: 'relative',
                    fontSize: '14px',
                    display: 'flex'
                }}
            >
                {this.makeLeftView()}
                {this.makeRightView()}
            </div>
        );
    }

    getNewsModelIList(siteId) {
        Model.NewsModelIList({
            infoTypeId: siteId,
        }, (res) => {
            let onChangeItem = null;
            let newList = [];
            res.data && res.data.forEach((item, idx) => {
                if ('1' !== '' + item.id && '2' !== '' + item.id) {
                    if (siteId && '' + siteId === '' + item.id)
                        onChangeItem = item;
                    else if (!onChangeItem)
                        onChangeItem = item;

                    newList.push({
                        ...item,
                        isChange: siteId ? '' + siteId === '' + item.id :
                            onChangeItem ? '' + onChangeItem.id === '' + item.id : false
                    })
                }

            });
            this.setState({
                allTypeList: newList,
                spinning: false,
                changeRow: onChangeItem,
            }, () => {
                this.getNewsModelIPage(onChangeItem.id);
                this.props.allTypeNews({
                    allList: res.data || [],
                    isAwait: false
                });
            });

        }, (res) => {
            this.setState({spinning: false});
        });
    }

    getNewsModelIPage(id) {
        let {current, pageSize, allTypeList, changeRow} = this.state;
        let {mainLayoutReducers} = this.props;
        let {allTypeNews} = mainLayoutReducers;
        let {allList} = allTypeNews;
        Model.NewsModelIPage({
            current,
            pageSize,
            infoTypeId: id ? id : changeRow.id,
            keyWord: '',
        }, (res) => {
            allTypeList = allTypeList.map(item => {
                return {
                    ...item,
                    unReadNumber: '' + id === '' + item.id ? 0 : item.unReadNumber
                }
            });
            allList = allList.map(item => {
                return {
                    ...item,
                    unReadNumber: '' + id === '' + item.id ? 0 : item.unReadNumber
                }
            });
            let newList = res.data.records && res.data.records.map(item => {
                return {
                    ...item,
                    isShow: false,
                    isHover: false,
                }
            });
            this.setState({mesList: newList, total: res.data.total, allTypeList}, () => {
                if (newList.length <= 0 && current > 1) {
                    this.setState({current: --current}, () => this.getNewsModelIPage());
                    return false;
                }
                this.props.allTypeNews({
                    allList,
                    isAwait: false
                });
            });
        });
    }

    makeLeftView() {
        let {changeRow, allTypeList} = this.state

        return (
            <div
                style={{
                    width: '261px',
                    minHeight: '648px',
                    background: '#F9FAFC',
                    // position: 'absolute',
                    // left: '0',
                    zIndex: '1',
                }}
            >
                <div
                    style={{
                        padding: '16px 24px'
                    }}
                >
                    <Button
                        className={'Button_leftIcon'}
                        icon={<LeftOutlined/>}
                        onClick={() => {
                            this.props.history.push('/pages/home/index');
                        }}
                    >返回</Button>
                </div>
                {/*{
                    !spinning && allTypeList.length <=0 ? <div style={{textAlign: 'center', marginTop: '50px'}}>
                        <img src={none} alt="" style={{width: '200px'}}/>
                        <div style={{color: '#BBBBBB'}}>暂无应用列表...</div>
                    </div> : null
                }*/}
                <ul
                    style={{margin: '0px'}}
                >
                    {
                        allTypeList && allTypeList.map((item, idx) => {
                            return <li
                                key={'apply_' + idx}
                                className={item.isChange ? 'applyS onLi' : 'applyS'}
                                style={{
                                    width: '100%',
                                    height: '40px',
                                    lineHeight: '40px',
                                    padding: '0px 24px',
                                    cursor: 'pointer',
                                    position: 'relative'
                                }}
                                onClick={() => {
                                    changeRow = item;
                                    allTypeList = allTypeList.map((cItem, cIdx) => {
                                        return {
                                            ...cItem,
                                            isChange: idx === cIdx
                                        }
                                    });
                                    this.setState({
                                        allTypeList,
                                        changeRow,
                                        mesList: [],
                                        current: 1,
                                        pageSize: 10,
                                        total: 0,
                                    }, () => {
                                        this.getNewsModelIPage(item.id);
                                    });
                                }}
                            >
                                {
                                    item.unReadNumber && item.unReadNumber > 0 ? <span
                                        style={{
                                            width: '8px',
                                            height: '8px',
                                            background: '#F12C20',
                                            display: 'inline-block',
                                            borderRadius: '50%',
                                            marginRight: '8px',
                                            position: 'absolute',
                                            left: '8px',
                                            top: '16px',
                                        }}
                                    /> : null
                                }
                                {item.infoType || ''}
                            </li>
                        })
                    }
                </ul>
            </div>
        );
    }

    makeRightView() {
        let {changeRow, mesList, spinning, current, pageSize, total} = this.state;

        return <div
            style={{
                // width: '100%',
                flex: 1,
                // paddingLeft: '261px',
                minHeight: '648px',
            }}
        >
            <div
                style={{
                    padding: '20px',
                    minHeight: '648px',
                }}
            >
                <h1
                    style={{
                        padding: '12px 0 24px 12px',
                        fontSize: '20px',
                        margin: '0px'
                    }}
                >{changeRow.infoType}</h1>
                {
                    !mesList || mesList.length <= 0 ? <div
                        style={{
                            marginTop: '100px',
                            textAlign: 'center'
                        }}
                    >
                        {
                            spinning ? <div
                                style={{textAlign: 'center', marginTop: '50px'}}
                            >
                                <Spin size="large" spinning={spinning}/>
                                <div
                                    style={{
                                        color: 'rgba(43,52,65,0.65)',
                                        marginTop: '10px'
                                    }}
                                >
                                    资源加载中，请稍等...
                                </div>
                            </div> : [
                                <img key={'img'} src={none} alt=""
                                     style={{
                                         width: '293px',
                                         height: '182px'
                                     }}
                                />,
                                <div
                                    key={'div'}
                                    style={{
                                        color: 'rgba(43,52,65,0.65)',
                                        marginTop: '30px'
                                    }}
                                >
                                    当前没有事项需要处理
                                </div>
                            ]
                        }
                    </div> : <div>
                        <ul
                            style={{margin: '0px'}}
                        >
                            {
                                mesList && mesList.map((item, idx) => {
                                    return <li
                                        key={'mes_' + idx}
                                        className={'mesLi'}
                                        style={{
                                            minHeight: '56px',
                                            padding: '0px 12px',
                                            overflow: 'hidden',
                                            cursor: 'pointer',
                                            boxShadow: item.isShow || item.isHover ? '0px 4px 4px 0px rgba(43,52,65,0.25)' : '',
                                            transition: 'all 0.3s',
                                            position: 'relative',
                                            // borderBottom: '1px solid rgba(43,52,65,0.09)',
                                            // borderTop: idx === 0 ? '1px solid rgba(43,52,65,0.09)' : '0px',
                                        }}
                                        // onClick={() => {
                                        //     // mesList = mesList.map((cItem, cIdx) => {
                                        //     //     return {
                                        //     //         ...cItem,
                                        //     //         isShow: cIdx === idx ? !cItem.isShow : false
                                        //     //     }
                                        //     // });
                                        //     // this.setState({mesList});
                                        // }}
                                        onMouseEnter={() => {
                                            // if(item.isShow) return false;
                                            mesList = mesList.map((cItem, cIdx) => {
                                                return {
                                                    ...cItem,
                                                    isHover: cIdx === idx
                                                }
                                            });
                                            this.setState({mesList});
                                        }}
                                        onMouseLeave={() => {
                                            // if(item.isShow) return false;
                                            mesList = mesList.map((cItem, cIdx) => {
                                                return {
                                                    ...cItem,
                                                    isHover: false
                                                }
                                            });
                                            this.setState({mesList});
                                        }}
                                    >
                                        {
                                            idx === 0 ? <div
                                                style={{
                                                    width: '100%',
                                                    height: '1px',
                                                    backgroundColor: 'rgba(43,52,65,0.09)'
                                                }}
                                            /> : null
                                        }
                                        <Row
                                            style={{
                                                lineHeight: '20px',
                                                margin: '18px 0px'
                                            }}
                                        >
                                            <Col span={24}>
                                                <h2
                                                    style={{
                                                        fontSize: '14px',
                                                        margin: '0px'
                                                    }}
                                                >{item.infoTitle}</h2>
                                            </Col>
                                            <Col span={20} style={{marginTop: '8px'}}>
                                                {this.newContents(item.infoContentType, item.infoContent)}
                                            </Col>
                                            {
                                                !item.isHover || item.isShow ? <Col span={4}
                                                                                    style={{
                                                                                        textAlign: 'right',
                                                                                        marginTop: '8px'
                                                                                    }}
                                                >
                                                    {item.longTime ? moment(item.longTime).format("MM-DD HH:mm") : ''}
                                                </Col> : null
                                            }
                                            {/*<Col span={4}
                                                 style={{textAlign: 'right', marginTop: '8px'}}
                                            >
                                                {item.longTime ? moment(item.longTime).format("MM-DD HH:mm") : ''}
                                            </Col>*/}
                                            {
                                                item.isShow || item.isHover ? <Col span={4}
                                                                                   style={{textAlign: 'right'}}
                                                >
                                                    {/*<span
                                                        className={'spanBtn'}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            textAlign: 'center',
                                                            lineHeight: '30px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img src={seeMes} alt=""
                                                             style={{width: '16px', height: '16px'}}
                                                        />
                                                    </span>*/}
                                                    <Popconfirm
                                                        title="确认要删除这条信息吗？"
                                                        onConfirm={() => {
                                                            Model.NewsModelIHide({id: item.id}, (res) => {
                                                                message.success('删除成功！');
                                                                this.getNewsModelIPage();
                                                            })
                                                        }}
                                                        onCancel={() => {
                                                        }}
                                                        okText="确定"
                                                        cancelText="取消"
                                                    >
                                                        <span
                                                            title={'删除'}
                                                            className={'spanBtn'}
                                                            style={{
                                                                display: 'inline-block',
                                                                width: '32px',
                                                                height: '32px',
                                                                borderRadius: '50%',
                                                                textAlign: 'center',
                                                                lineHeight: '30px',
                                                                cursor: 'pointer',
                                                                marginLeft: '16px'
                                                            }}
                                                        >
                                                            <img src={delMes} alt=""
                                                                 style={{width: '16px', height: '16px'}}
                                                            />
                                                        </span>
                                                    </Popconfirm>
                                                </Col> : null
                                            }
                                        </Row>
                                        {/*{
                                            item.isShow ? <Row
                                                style={{marginBottom: '18px'}}
                                            >
                                                <Col span={20}>
                                                    <Col span={6}>
                                                        <div style={{fontSize: '12px', color: 'rgba(43,52,65,0.45)'}}>订单号</div>
                                                        1343543534
                                                    </Col>
                                                    <Col span={6}>
                                                        <div style={{fontSize: '12px', color: 'rgba(43,52,65,0.45)'}}>签收日期</div>
                                                        2019-03-03
                                                    </Col>
                                                    <Col span={6}>
                                                        <div style={{fontSize: '12px', color: 'rgba(43,52,65,0.45)'}}>签收人</div>
                                                        陈星岚
                                                    </Col>
                                                    <Col span={6}>
                                                        <div style={{fontSize: '12px', color: 'rgba(43,52,65,0.45)'}}>手机</div>
                                                        15986037889
                                                    </Col>
                                                </Col>
                                                 <Col span={4}
                                                     style={{paddingTop: '5px'}}
                                                >
                                                    <span
                                                        className={'spanBtn'}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            textAlign: 'center',
                                                            lineHeight: '30px',
                                                            cursor: 'pointer',
                                                        }}
                                                    >
                                                        <img src={seeMes} alt=""
                                                             style={{width: '16px', height: '16px'}}
                                                        />
                                                    </span>
                                                    <span
                                                        className={'spanBtn'}
                                                        style={{
                                                            display: 'inline-block',
                                                            width: '32px',
                                                            height: '32px',
                                                            borderRadius: '50%',
                                                            textAlign: 'center',
                                                            lineHeight: '30px',
                                                            cursor: 'pointer',
                                                            marginLeft: '16px'
                                                        }}
                                                    >
                                                        <img src={delMes} alt=""
                                                             style={{width: '16px', height: '16px'}}
                                                        />
                                                    </span>
                                                </Col>
                                            </Row> : null
                                        }*/}
                                        <div
                                            style={{
                                                width: '100%',
                                                height: '1px',
                                                backgroundColor: 'rgba(43,52,65,0.09)'
                                            }}
                                        />
                                    </li>
                                })
                            }
                        </ul>
                        <Pagination
                            current={current}
                            total={total}
                            style={{
                                textAlign: 'right',
                                marginTop: '16px'
                            }}
                            onChange={(current, pageSize) => {
                                this.setState({current}, () => {
                                    this.getNewsModelIPage();
                                });
                            }}
                            showSizeChanger={false}
                        />
                    </div>
                }
            </div>
        </div>
    }

    newContents(type, content) {
        switch (type + '') {
            case '1':
                return content;

            case '2':
                content = content ? JSON.parse(content) : '';
                if (content)
                    content = content.items[0] ? content.items[0].summary.content : '';
                return content;

            case '3':
                content = content ? JSON.parse(content) : '';
                if (content)
                    content = content.items[0] ? <div>
                        <img src={content.items[0].summary.picture || logo} alt=""
                             style={{width: '32px', height: '32px', borderRadius: '6px', marginRight: '8px'}}
                        />
                        {content.items[0].summary.content}
                    </div> : '';
                return content;

            default:
                return null;
        }
    }
}

export default ApplyMessage;
