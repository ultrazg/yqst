import React, {PureComponent, createRef} from "react";
import {
    StepForwardFilled,
    StepBackwardFilled,
    FullscreenOutlined,
    FullscreenExitOutlined,
    ShrinkOutlined,
    ArrowsAltOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
} from "@ant-design/icons";
import {Document, Page} from "react-pdf-work/dist/entry.webpack";
import styles from "./pdf.module.css";
import {message} from "antd";

class RenderPDF extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            scale: 1,
            rotate: 0,
            currentPage: 1,
            numPages: null,
            isFullscreen: false,
            width: 0, // 全屏时用来调节宽度
            isEdit: false,
            operationLeft: "-999px", // 调节操作栏的显示隐藏
            domIndex: 0,
        };
        this.disappearTimer = null; // 计时器
        this.wrapperRef = createRef();
        this.inputRef = createRef();
    }

    componentDidMount() {
        this.setState({
            domIndex: Math.ceil(Math.random() * 1000),
        })
    }

    componentWillUnmount() {

    }

    zoomIn = () => {
        this.setState({
            scale: this.state.scale + 0.2,
        });
    };

    zoomOut = () => {
        this.setState({
            scale: this.state.scale - 0.2,
        });
    };

    clockwise = () => {
        this.setState({
            rotate: this.state.rotate + 90
        });
    };

    antiClockwise = () => {
        this.setState({
            rotate: this.state.rotate - 90
        });
    };

    next = () => {
        this.setState({
            isEdit: false,
            currentPage: this.state.currentPage + 1
        });
    };

    prev = () => {
        this.setState({
            isEdit: false,
            currentPage: this.state.currentPage - 1
        });
    };

    addFullScreenChangeListener = () => {
        // 弥补无法监听ESC键的另一种方式
        document.addEventListener("webkitfullscreenchange", this.exitFullscreenWhenESC, false);
        document.addEventListener("mozfullscreenchange", this.exitFullscreenWhenESC, false);
        document.addEventListener("fullscreenchange", this.exitFullscreenWhenESC, false);
        document.addEventListener("MSFullscreenChange", this.exitFullscreenWhenESC, false);
    }

    removeFullScreenChangeListener = () => {
        document.removeEventListener("webkitfullscreenchange", this.exitFullscreenWhenESC, false);
        document.removeEventListener("mozfullscreenchange", this.exitFullscreenWhenESC, false);
        document.removeEventListener("fullscreenchange", this.exitFullscreenWhenESC, false);
        document.removeEventListener("MSFullscreenChange", this.exitFullscreenWhenESC, false);
    }

    fullscreen = () => {
        const elem = this.wrapperRef.current;
        if (!this.state.isFullscreen) {
            this.setState({
                isFullscreen: true,
                width: window.screen.width,
                operationLeft: "-50px", // 隐藏操作栏
            }, () => {
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                } else if (elem.msRequestFullscreen) {
                    elem.msRequestFullscreen();
                } else if (elem.mozRequestFullScreen) {
                    elem.mozRequestFullScreen();
                } else if (elem.webkitRequestFullscreen) {
                    elem.webkitRequestFullscreen();
                } else {
                    console.log("no fullscreen");
                    message.error("你的浏览器不支持全屏显示！");
                }
                this.addFullScreenChangeListener();
            });
        }
    }

    exitFullscreenWhenESC = () => {
        if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
            if (this.state.isFullscreen) {
                this.setState({
                    isFullscreen: false,
                    width: 0,
                }, () => {
                    this.removeFullScreenChangeListener();
                });
            }
        }
    }

    exitFullscreen = () => {
        if (this.state.isFullscreen) {
            this.setState({
                isFullscreen: false,
                width: 0,
            }, () => {
                window.document.exitFullscreen();
                this.removeFullScreenChangeListener();
            });
        }
    }

    isNumber = (number) => {
        return /^\d+$/.test(number);
    }

    onDocumentLoadSuccess = (info) => {
        this.setState({
            currentPage: 1,
            numPages: info.numPages
        });
    };

    getWidth = () => {
        const {domIndex} = this.state;
        const pdfId = `pdf-${domIndex}`;
        const dom = document.getElementById(pdfId);
        if (dom !== null) {
            return dom.offsetWidth;
        } else {
            return 0;
        }
    };

    render() {
        const {
            url,
            errorTitle = <h1 style={{color: "#FD2017"}}>文档加载错误!</h1>,
            height,
        } = this.props;
        const width = this.getWidth();
        const {currentPage, numPages, isEdit, rotate, scale, domIndex} = this.state;
        return (
            <div
                id={`pdf-${domIndex}`}
                className={styles.wrapper}
                style={{height}}
                ref={this.wrapperRef}
            >
                <div
                    style={{height: "100%"}}
                    onMouseMove={
                        (e) => {
                            if (this.state.operationLeft) {
                                this.setState({
                                    operationLeft: 0, // 正常显示
                                });
                                clearTimeout(this.disappearTimer);
                                this.disappearTimer = setTimeout(() => {
                                    this.setState({
                                        operationLeft: "-999px", // 隐藏
                                    });
                                }, 5 * 1000);
                            }
                            if (this.disappearTimer) {
                                clearTimeout(this.disappearTimer);
                                this.disappearTimer = setTimeout(() => {
                                    this.setState({
                                        operationLeft: "-999px", // 隐藏
                                    });
                                }, 5 * 1000);
                            }
                        }
                    }
                >
                    <Document
                        file={url}
                        className={styles.pdf}
                        error={errorTitle}
                        onLoadSuccess={this.onDocumentLoadSuccess}
                        loading={<h1 style={{color: "#666"}}>文档加载中...</h1>}
                        options={{
                            cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/",
                            cMapPacked: true
                        }}
                    >
                        <Page
                            width={this.state.width || width - 30}
                            pageNumber={currentPage}
                            scale={scale}
                            rotate={rotate}
                        />
                    </Document>
                </div>
                <div
                    className={styles.operation}
                    style={{left: this.state.operationLeft}}
                    onMouseEnter={
                        () => {
                            if (this.disappearTimer) {
                                clearTimeout(this.disappearTimer);
                            }
                        }
                    }
                >
                    {
                        this.state.isFullscreen ?
                            <FullscreenExitOutlined
                                title="退出全屏"
                                style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                                onClick={this.exitFullscreen}
                            /> :
                            <FullscreenOutlined
                                title="全屏"
                                style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                                onClick={this.fullscreen}
                            />
                    }
                    <ArrowsAltOutlined
                        title="放大"
                        style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                        onClick={this.zoomIn}
                    />
                    <ShrinkOutlined
                        title="缩小"
                        style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                        onClick={this.zoomOut}
                    />
                    <RotateLeftOutlined
                        title="逆时针转"
                        style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                        onClick={this.antiClockwise}
                    />
                    <RotateRightOutlined
                        title="顺时针转"
                        style={{fontSize: "32px", color: "#fff", marginBottom: 20}}
                        onClick={this.clockwise}
                    />
                    <StepBackwardFilled
                        title="上一页"
                        style={{
                            fontSize: "32px",
                            color: this.state.currentPage > 1 ? "#fff" : "#999",
                            marginBottom: 20
                        }}
                        onClick={
                            () => {
                                if (this.state.currentPage === 1) {
                                    return;
                                }
                                this.prev();
                            }
                        }
                    />
                    <StepForwardFilled
                        title="下一页"
                        style={{
                            fontSize: "32px",
                            color: this.state.numPages > this.state.currentPage ? "#fff" : "#999",
                            marginBottom: 20
                        }}
                        onClick={
                            () => {
                                if (this.state.currentPage === this.state.numPages) {
                                    return;
                                }
                                this.next();
                            }
                        }
                    />
                    {
                        numPages ?
                            // 判断是否加载完成
                            <span
                                onClick={
                                    () => {
                                        this.setState({
                                            isEdit: true
                                        }, () => {
                                            this.inputRef.current.focus();
                                        });
                                    }
                                }
                            >
                                {
                                    isEdit ?
                                        <input
                                            defaultValue={currentPage}
                                            className={styles.input}
                                            ref={this.inputRef}
                                            onKeyPress={
                                                // 按Enter键时
                                                (e) => {
                                                    if (this.isNumber(e.target.value) && e.key === "Enter" && parseInt(e.target.value) > 0 && parseInt(e.target.value) <= numPages) {
                                                        this.setState({
                                                            isEdit: false,
                                                            currentPage: parseInt(e.target.value)
                                                        });
                                                    }
                                                }
                                            }
                                            onBlur={
                                                (e) => {
                                                    if (this.isNumber(e.target.value) && parseInt(e.target.value) > 0 && parseInt(e.target.value) <= numPages) {
                                                        this.setState({
                                                            isEdit: false,
                                                            currentPage: parseInt(e.target.value)
                                                        });
                                                    }
                                                }
                                            }
                                        /> :
                                        <>{currentPage}</>
                                }
                                /{numPages}
                            </span> : null
                    }
                </div>
            </div>
        );
    }
}

export default RenderPDF;
