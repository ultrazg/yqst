import React, {Component} from "react";
import {message, Empty, Modal} from "antd";
import cloneDeep from "lodash/cloneDeep";
import {useApp, add, remove, group} from "../../../resource";
import model from "../model";
import JudgePath from "./JudgePath";


const fixAppList = [
    {
        logo: group,
        name: "应用管理",
        url: "/pages/appCenter/ApplyManageNewUI",
    },
    {
        logo: useApp,
        name: "应用市场",
        url: "/pages/appCenter/applyBazaar",
    },
    /**
     * develop，开发完成后删除
     */
    {
        logo: useApp,
        name: "存证中心",
        url: "/pages/appCenter/certificateCenter/certificateCenterHome",
    },
    {
        logo: useApp,
        name: "初始化工具",
        url: "/pages/appCenter/InitializationTool/MaterialRecList",
    },
];

class ApplyIndex extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isAdmin: localStorage.getItem("admin") + "" === "1",
            isSet: false,
            softList: [],
            copySoftList: [],
            editNameVisible: false,
            currentEditItem: {},
            needGroupSave: false,
            allAppList: [],
            chooseAppList: [],
            dragElement: null,
        };
    }

    componentDidMount() {
        this.getList();
    }

    componentWillUnmount() {

    }

    preventDefault(e) {
        e.preventDefault();
    }

    getList = () => {
        model.softUserList({}, res => {
            res.data.forEach(item => {
                item.softList.forEach(n => {
                    if (item.groupId === 0) {
                        n.isShow = 0;
                    } else {
                        n.isShow = 1;
                    }
                });
            });
            this.setState({
                softList: res.data,
            });
        });
    };

    changeSoft = (item, status) => {
        const {softList} = this.state;
        softList.forEach(n => {
            n.softList.forEach(k => {
                if (k.softId === item.softId) {
                    if (status === true) {
                        k.isShow = 0;
                    } else {
                        k.isShow = 1;
                    }
                }
            });
        });
        this.setState({softList});
    }


    saveSoft = () => {
        const {softList} = this.state;
        const arr = [];
        softList.forEach(n => {
            n.softList.forEach(k => {
                arr.push(k);
            });
        });
        model.softGroupPersonSave({
            softPersonSaveList: JSON.stringify(arr)
        }, res => {
            message.success("修改成功");
            this.setState({isSet: false});
            this.getList();
        });
    }


    render() {
        let {isSet, isAdmin} = this.state;
        return (
            <div
                className={"applyIndex"}
                style={{
                    width: "1116px",
                    minHeight: "648px",
                    background: "#fff",
                    borderRadius: "6px",
                    margin: "24px auto",
                    padding: "0px 138px 50px 138px",
                    fontSize: "14px"
                }}
            >
                <h1
                    style={{
                        fontSize: "20px",
                        lineHeight: "28px",
                        padding: "24px 0",
                        borderBottom: "1px solid rgba(43,52,65,0.25)",
                        margin: "0px"
                    }}
                >
                    应用中心
                    {
                        isSet && (
                            <a
                                style={{
                                    fontWeight: "400",
                                    float: "right",
                                    fontSize: "14px",
                                    marginLeft: 8
                                }}
                                onClick={() => {
                                    this.setState({
                                        isSet: false,
                                        softList: this.state.copySoftList
                                    });
                                }}
                            >
                                取消
                            </a>
                        )
                    }
                    <a
                        style={{
                            fontWeight: "400",
                            float: "right",
                            fontSize: "14px"
                        }}
                        onClick={() => {
                            if (isSet === true) {
                                this.saveSoft();
                                return;
                            }
                            this.setState({
                                isSet: !isSet,
                                copySoftList: cloneDeep(this.state.softList)
                            });
                        }}
                    >
                        {isSet ? "保存" : "设置"}
                    </a>
                </h1>
                {/*用户是否为管理员*/}
                {/*{
					isAdmin ? <div>
						<div
							style={{
								color: 'rgba(43,52,65,0.65)',
								margin: '16px 0'
							}}
						>管理
						</div>
						{
							fixAppList && fixAppList.map((item, idx) => {
								return <div
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
										cursor: 'pointer',
										marginRight: (idx === 0 || ++idx % 4 !== 0) ? '24px' : '0px',
										overflow: 'hidden',
										whiteSpace: 'nowrap',
										textOverflow: 'ellipsis'
									}}
									onClick={() => {
										if (item.url && '/pages/appCenter/applyManage' === '' + item.url) {
											window.globalPermissions.checkPermission('SOFT_MANAGE_ENTER', (res) => {
												if (res)
													return message.error('抱歉，您没有该操作权限，请联系管理员！');
												this.props.history.push(item.url);
											});

										} else if (item.url && '/pages/appCenter/applyBazaar' === '' + item.url) {
											window.globalPermissions.checkPermission('SOFT_MARKET_ENTER', (res) => {
												if (res)
													return message.error('抱歉，您没有该操作权限，请联系管理员！');
												this.props.history.push(item.url);
											});

										} else if (item.url) {
											this.props.history.push(item.url);

										}
									}}
								>
									<img src={item.logo} alt=""
										 style={{
											 width: '40px',
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
							})
						}
					</div> : null
				}*/}
                <div>
                    <div
                        style={{
                            color: "rgba(43,52,65,0.65)",
                            margin: "16px 0"
                        }}
                    >管理
                    </div>
                    {
                        fixAppList && fixAppList.map((item, idx) => {
                            return <div
                                title={item.name}
                                className={"applyS"}
                                key={"use_" + idx}
                                style={{
                                    display: "inline-block",
                                    width: "192px",
                                    height: "64px",
                                    padding: "12px",
                                    borderRadius: "6px",
                                    border: "1px solid rgba(43,52,65,0.25)",
                                    marginBottom: "24px",
                                    cursor: "pointer",
                                    marginRight: (idx === 0 || ++idx % 4 !== 0) ? "24px" : "0px",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis"
                                }}
                                onClick={() => {
                                    if (item.url && "/pages/appCenter/ApplyManageNewUI" === "" + item.url) {
                                        window.globalPermissions.checkPermission("SOFT_MANAGE_ENTER", (res) => {
                                            if (res)
                                                return message.error("抱歉，您没有该操作权限，请联系管理员！");
                                            this.props.history.push(item.url);
                                        });

                                    } else if (item.url && "/pages/appCenter/applyBazaar" === "" + item.url) {
                                        window.globalPermissions.checkPermission("SOFT_MARKET_ENTER", (res) => {
                                            if (res)
                                                return message.error("抱歉，您没有该操作权限，请联系管理员！");
                                            this.props.history.push(item.url);
                                        });

                                    } else if (item.url) {
                                        this.props.history.push(item.url);

                                    }
                                }}
                            >
                                <img src={item.logo} alt=""
                                     style={{
                                         width: "40px",
                                         height: "40px",
                                         marginRight: "12px",
                                     }}
                                />
                                <span
                                    style={{
                                        overflow: "hidden",
                                        whiteSpace: "nowrap",
                                        textOverflow: "ellipsis",
                                        display: "inline-block",
                                        width: "110px",
                                        verticalAlign: "middle",
                                    }}
                                >
									{item.name}
								</span>
                            </div>;
                        })
                    }
                </div>
                {
                    !this.state.softList || this.state.softList.length <= 0 ? (
                        <div>
                            <div
                                style={{
                                    color: "rgba(43,52,65,0.65)",
                                    margin: "16px 0"
                                }}
                            >
                                应用桌面
                            </div>
                            <Empty/>
                        </div>
                    ) : this.state.softList.map((n, index) => (
                        this.renderItem(n, index)
                    ))
                }
            </div>
        );
    }

    renderItem = (n, index) => {
        let {isSet, isAdmin} = this.state;
        const dom = (
            <div key={n.groupName + index}>
                <div
                    style={{
                        color: "rgba(43,52,65,0.65)",
                        margin: "16px 0"
                    }}
                >
                    {n.groupName}
                </div>
                <div>
                    {
                        n.softList && n.softList.map((item, idx) => {
                            return (
                                <div
                                    title={item.name}
                                    className={"applyS"}
                                    key={"use_" + idx}
                                    style={{
                                        display: "inline-block",
                                        width: "192px",
                                        height: "64px",
                                        padding: "12px",
                                        borderRadius: "6px",
                                        border: "1px solid rgba(43,52,65,0.25)",
                                        marginBottom: "24px",
                                        marginRight: (idx === 0 || ++idx % 4 !== 0) ? "24px" : "0px",
                                        position: "relative",
                                    }}
                                >
                                    <div
                                        style={{cursor: "pointer"}}
                                    >
                                        <img
                                            src={item.logo}
                                            alt=""
                                            style={{
                                                width: "40px",
                                                height: "40px",
                                                marginRight: "12px",
                                            }}
                                        />
                                        <span
                                            style={{
                                                overflow: "hidden",
                                                whiteSpace: "nowrap",
                                                textOverflow: "ellipsis",
                                                display: "inline-block",
                                                width: "110px",
                                                verticalAlign: "middle",
                                            }}
                                        >
                                            {item.name}
                                        </span>
                                    </div>
                                    {
                                        isSet && item.isShow === 1 ? <img src={remove}
                                                                          onClick={(e) => {
                                                                              e.preventDefault();
                                                                              this.changeSoft(item, true);
                                                                          }}
                                                                          alt=""
                                                                          style={{
                                                                              position: "absolute",
                                                                              width: "18px",
                                                                              top: "-9px",
                                                                              right: "-9px",
                                                                              cursor: "pointer",
                                                                          }}
                                        /> : null
                                    }
                                    {
                                        isSet && item.isShow === 0 ? <img src={add}
                                                                          onClick={(e) => {
                                                                              e.preventDefault();
                                                                              this.changeSoft(item, false);
                                                                          }}
                                                                          alt=""
                                                                          style={{
                                                                              position: "absolute",
                                                                              width: "18px",
                                                                              top: "-9px",
                                                                              right: "-9px",
                                                                              cursor: "pointer",
                                                                          }}
                                        /> : null
                                    }
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        );
        if (isSet) {
            if (n.groupId === 0) {
                return dom;
            } else {
                if (n.softList.length !== 0) {
                    return dom;
                }
            }
        } else {
            return (
                n.groupId !== 0 && n.softList.length !== 0 && <div key={n.groupName + index}>
                    <div
                        style={{
                            color: "rgba(43,52,65,0.65)",
                            margin: "16px 0"
                        }}
                    >
                        {n.groupName}
                    </div>
                    <div>
                        {
                            n.softList && n.softList.map((item, idx) => {
                                return (
                                    <div
                                        title={item.name}
                                        className={"applyS"}
                                        onClick={() => {
                                            if (item.isAuth === 0) {
                                                Modal.info({
                                                    title: "该应用未被授权.",
                                                    okText: "确定",
                                                });
                                                return;
                                            }
                                            if (item.status === 1) {
                                                JudgePath(item.serviceTag, this.props);
                                            } else if (item.status === 3) {
                                                Modal.info({
                                                    title: "该应用已过期,请前往应用详情续费.",
                                                    okText: "立即前往",
                                                    onOk: () => {
                                                        this.props.history.push(`/pages/appCenter/ApplyManageNewUI/applyDetail?softId=${item.softId}&serviceTag=${item.serviceTag}`);
                                                    }
                                                });
                                            }
                                        }}
                                        key={"use_" + idx}
                                        style={{
                                            display: "inline-block",
                                            width: "192px",
                                            height: "64px",
                                            padding: "12px",
                                            borderRadius: "6px",
                                            border: "1px solid rgba(43,52,65,0.25)",
                                            marginBottom: "24px",
                                            marginRight: (idx === 0 || ++idx % 4 !== 0) ? "24px" : "0px",
                                            position: "relative",
                                            cursor: "pointer"
                                        }}
                                    >
                                        <div>
                                            <img
                                                src={item.logo}
                                                alt=""
                                                style={{
                                                    width: "40px",
                                                    height: "40px",
                                                    marginRight: "12px",
                                                }}
                                            />
                                            <span
                                                style={{
                                                    overflow: "hidden",
                                                    whiteSpace: "nowrap",
                                                    textOverflow: "ellipsis",
                                                    display: "inline-block",
                                                    width: "110px",
                                                    verticalAlign: "middle",
                                                }}
                                            >
                                                {item.name}
                                            </span>
                                        </div>
                                        {
                                            isSet && item.isShow === 1 ?
                                                <img
                                                    src={remove}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.changeSoft(item, true);
                                                    }}
                                                    alt=""
                                                    style={{
                                                        position: "absolute",
                                                        width: "18px",
                                                        top: "-9px",
                                                        right: "-9px",
                                                        cursor: "pointer",
                                                    }}
                                                /> : null
                                        }
                                        {
                                            isSet && item.isShow === 0 ?
                                                <img
                                                    src={add}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        this.changeSoft(item, false);
                                                    }}
                                                    alt=""
                                                    style={{
                                                        position: "absolute",
                                                        width: "18px",
                                                        top: "-9px",
                                                        right: "-9px",
                                                        cursor: "pointer",
                                                    }}
                                                /> : null
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            );
        }
    }
}

export default ApplyIndex;

