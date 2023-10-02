import React, {Component} from 'react';
import {Document, Page} from "react-pdf-work";
import './index.less'
import styles from "../renderPDF/pdf.module.css";

//示例：
// <RenderPDF
//     style={{
//         height: document.documentElement.clientHeight * 0.65,
//         overflow: 'hide',
//         overflowY: 'scroll'
//     }}
//     url={window.getOrginUrl(this.state.data.contractPdf)}
//     mode='multiPage'
// />

class RenderPDF extends Component {
    constructor(props) {
        super(props);
        this.state = {
            domIndex: 0,
            scale: 1,
            rotate: 0,
            numPages: null,
            currentPage: 1
        };
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
        })
    };

    zoomOut = () => {
        this.setState({
            scale: this.state.scale - 0.2,
        })
    };

    clockwise = () => {
        this.setState({
            rotate: this.state.rotate + 90
        })
    };

    antiClockwise = () => {
        this.setState({
            rotate: this.state.rotate - 90
        })
    };

    next = () => {
        this.setState({
            currentPage: this.state.currentPage + 1
        })
    };

    prev = () => {
        this.setState({
            currentPage: this.state.currentPage - 1
        })
    };

    onDocumentLoadSuccess = (info) => {
        this.setState({numPages: info.numPages});
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
            mode = 'multiPage', // multiPage singlePage
            errorTitle = <h1 style={{color: '#FD2017'}}>文档加载错误!</h1>,
            style
        } = this.props;
        const {scale, rotate, numPages, currentPage, domIndex} = this.state;
        const width = this.getWidth();
        return (
            <div id={`pdf-${domIndex}`} style={style}>
                <Document
                    file={url}
                    className='center'
                    error={errorTitle}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    loading={<h1 style={{color: '#666'}}>文档加载中...</h1>}
                    options={{
                        cMapUrl: "https://cdn.jsdelivr.net/npm/pdfjs-dist@2.1.266/cmaps/",
                        cMapPacked: true
                    }}
                >
                    {
                        mode === 'singlePage'
                            ? (
                                <Page
                                    width={width - 30}
                                    pageNumber={currentPage}
                                />
                            )
                            :
                            (
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <Page
                                            width={width - 30}
                                            key={`page_${index + 1}`}
                                            pageNumber={index + 1}
                                        />
                                    ),
                                )
                            )
                    }
                </Document>
            </div>
        );
    }
}

export default RenderPDF;

{/*<div className='iconWrapper'>*/
}
{/*    <div className='tar'>*/
}
{/*        {*/
}
{/*            mode === 'singlePage' ? (*/
}
{/*                <Fragment>*/
}
{/*                    <span>第 {currentPage} 页 / 共 {numPages} 页 </span>*/
}
{/*                    <Button*/
}
{/*                        className='iconStyle'*/
}
{/*                        size='large'*/
}
{/*                        disabled={currentPage === 1}*/
}
{/*                        onClick={this.prev}*/
}
{/*                        type="primary"*/
}
{/*                        shape="circle"*/
}
{/*                        icon="left"*/
}
{/*                    />*/
}
{/*                    <Button*/
}
{/*                        className='iconStyle'*/
}
{/*                        size='large'*/
}
{/*                        disabled={currentPage === numPages}*/
}
{/*                        onClick={this.next}*/
}
{/*                        type="primary"*/
}
{/*                        shape="circle"*/
}
{/*                        icon="right"*/
}
{/*                    />*/
}
{/*                </Fragment>*/
}
{/*            ) : null*/
}
{/*        }*/
}
{/*        <Button*/
}
{/*            className='iconStyle'*/
}
{/*            size='large'*/
}
{/*            onClick={this.antiClockwise}*/
}
{/*            type="primary"*/
}
{/*            shape="circle"*/
}
{/*            icon="undo"*/
}
{/*        />*/
}
{/*        <Button*/
}
{/*            className='iconStyle'*/
}
{/*            size='large'*/
}
{/*            onClick={this.clockwise}*/
}
{/*            type="primary"*/
}
{/*            shape="circle"*/
}
{/*            icon="redo"*/
}
{/*        />*/
}
{/*        <Button*/
}
{/*            className='iconStyle'*/
}
{/*            size='large'*/
}
{/*            onClick={this.zoomOut}*/
}
{/*            type="primary"*/
}
{/*            shape="circle"*/
}
{/*            icon="zoom-out"*/
}
{/*        />*/
}
{/*        <Button*/
}
{/*            className='iconStyle'*/
}
{/*            size='large'*/
}
{/*            onClick={this.zoomIn}*/
}
{/*            type="primary"*/
}
{/*            shape="circle"*/
}
{/*            icon="zoom-in"*/
}
{/*        />*/
}
{/*    </div>*/
}
{/*</div>*/
}
