import React, {Component} from 'react';
import {Document, Page} from "react-pdf-work/dist/entry.webpack";
// import './index.less'
import SealView from './SealView';

export default class PdfSealViewLayout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            domIndex: 0,
            scale: 1,
            rotate: 0,
            numPages: null,
            currentPage: 1,

            //印章数据
            dragObjArr: [],
        };
        window.onmouseup = e => this.onMouseUp(e);
        window.onmousemove = e => this.onMouseMove(e);
    }

    componentDidMount() {
        this.setState({
            domIndex: Math.ceil(Math.random() * 1000),
        })
    }

    componentWillUnmount() {
        window.onmouseup = () => {
        };
        window.onmousemove = () => {
        };
    }

    getDom(id) {
        return document.getElementById(id);
    }

    onMouseUp = (event) => {
        this.downDragTag = null;
        this.lastX = null;
        this.lastY = null;
    }

    onMouseMove = (event) => {
        if (this.downDragTag) {
            let dom = this.getDom(`pdf-${this.state.domIndex}-page-${this.downDragTag.page}`);
            let sealDom = this.getDom(`pdf-${this.state.domIndex}-page-${this.downDragTag.page}-seal${this.downDragTag.idx}`);
            /**
             * 左上角坐标dom.offsetLeft, dom.offsetTop
             * 右下角坐标dom.offsetWidth, dom.offsetHeight
             * 左下角坐标dom.offsetLeft, dom.offsetHeight
             * 右上角坐标dom.offsetWidth, dom.offsetTop
             */
                // this.downDragTag.page;
                // this.downDragTag.idx;
            let dragObjArr = this.state.dragObjArr;
            for (let i = 0; i < dragObjArr.length; i++) {
                let dragItem = dragObjArr[i];
                if (dragItem.page == this.downDragTag.page
                    && i == this.downDragTag.idx) {
                    let clientX = event.clientX;
                    let clientY = event.clientY;
                    if (this.lastX && this.lastY) {
                        let dx = dragItem.left + (clientX - this.lastX);
                        let dy = dragItem.top + (clientY - this.lastY);
                        dragItem.left = dx < 0 ?
                            0 :
                            (dx > (dom.offsetWidth - sealDom.offsetWidth) ?
                                (dom.offsetWidth - sealDom.offsetWidth) : dx);
                        dragItem.top = dy < 0 ?
                            0 :
                            (dy > (dom.offsetHeight - sealDom.offsetHeight) ?
                                (dom.offsetHeight - sealDom.offsetHeight) : dy);
                        dragObjArr[i] = dragItem;
                        this.setState({dragObjArr: dragObjArr});
                    }
                    this.lastX = clientX;
                    this.lastY = clientY;
                    break;
                }
            }
        }
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
        return <div style={{display: 'flex', flexDirection: 'row', ...style}}>
            <LeftSealView onDragEnd={(e) => {
                let dragObjArr = this.state.dragObjArr;
                dragObjArr.push({
                    page: this.tempDragData.page,
                    left: this.tempDragData.left,
                    top: this.tempDragData.top
                });
                this.setState({
                    dragObjArr: dragObjArr
                });
            }}/>
            <div style={{display: 'flex', flex: 1, height: '600px', overflowY: 'auto', overflowX: 'hidden'}}
                 id={`pdf-${domIndex}`}>
                <Document
                    file={url}
                    className='center'
                    error={errorTitle}
                    onLoadSuccess={this.onDocumentLoadSuccess}
                    loading={<h1 style={{color: '#666'}}>文档加载中...</h1>}>
                    {
                        mode === 'singlePage'
                            ? (
                                <Page
                                    width={width}
                                    pageNumber={currentPage}
                                />
                            )
                            :
                            (
                                Array.from(
                                    new Array(numPages),
                                    (el, index) => (
                                        <div id={`pdf-${domIndex}-page-${index}`}
                                             style={{position: 'relative', width: width, backgroundColor: '#fff'}}
                                             onDragEnter={(e) => { //进入目标元素
                                                 e.preventDefault();
                                                 // console.log('进入目标元素');
                                             }}
                                             onDrop={(e) => { //在目标元素中停下
                                                 let dom = document.getElementById(`pdf-${domIndex}`);
                                                 let prePageDom = document.getElementById(`pdf-${domIndex}-page-${index}`);
                                                 console.log('在目标元素中停下', dom.scrollTop, prePageDom.offsetTop,
                                                     prePageDom.offsetLeft);
                                                 if (index > 0) {
                                                     this.tempDragData = {
                                                         page: index,
                                                         left: e.clientX - prePageDom.offsetLeft - 60 / 2,
                                                         top: (prePageDom.offsetTop > dom.scrollTop ?
                                                             e.clientY - Math.abs(prePageDom.offsetTop - dom.scrollTop)
                                                             : e.clientY + Math.abs(prePageDom.offsetTop - dom.scrollTop))
                                                             - 60 / 2
                                                     };
                                                 } else {
                                                     this.tempDragData = {
                                                         page: index,
                                                         left: e.clientX - prePageDom.offsetLeft - 60 / 2,
                                                         top: e.clientY + dom.scrollTop - 60 / 2,
                                                     };
                                                 }
                                                 e.preventDefault();
                                             }}
                                             onDragOver={(e) => { //在目标元素中拖拽
                                                 e.preventDefault();
                                                 // console.log('在目标元素中拖拽');
                                             }}
                                             onDragLeave={(e) => { //拖拽离开目标元素
                                                 e.preventDefault();
                                                 // console.log('拖拽离开目标元素');
                                             }}>
                                            <Page
                                                width={width}
                                                key={`page_${index + 1}`}
                                                pageNumber={index + 1}
                                            />
                                            <SealView
                                                key={`pdf-${domIndex}-page-${index}`}
                                                domIndex={domIndex}
                                                page={index + ''}
                                                dragObjArr={this.state.dragObjArr}
                                                dropDown={({page, idx}) => {
                                                    this.downDragTag = {page: page, idx: idx};
                                                }}
                                                showBtns={({idx}) => {
                                                    let dragObjArr = this.state.dragObjArr;
                                                    dragObjArr[idx] = {...dragObjArr[idx], showBtns: true}
                                                    this.setState({dragObjArr: dragObjArr})
                                                }}
                                                hideBtns={({idx}) => {
                                                    let dragObjArr = this.state.dragObjArr;
                                                    dragObjArr[idx] = {...dragObjArr[idx], showBtns: false}
                                                    this.setState({dragObjArr: dragObjArr})
                                                }}
                                                delSeal={({idx}) => {
                                                    let dragObjArr = this.state.dragObjArr;
                                                    dragObjArr.splice(idx, 1);
                                                    this.setState({dragObjArr: dragObjArr})
                                                }}
                                            />
                                        </div>
                                    ),
                                )
                            )
                    }
                </Document>
            </div>
            <RightSealDataView dragObjArr={this.state.dragObjArr}/>
        </div>
    }
}

const LeftSealView = ({onDragEnd}) => {
    return <div style={{display: 'flex', flexDirection: 'column', width: 200, backgroundColor: 'gray'}}>
        <div draggable="true" style={{
            width: 60,
            height: 60,
            backgroundColor: '#00f',
            cursor: 'pointer',
            zIndex: 1
        }} onDragEnd={(e) => {
            onDragEnd && onDragEnd(e)
        }}/>
    </div>
};
const RightSealDataView = ({dragObjArr}) => {
    return <div style={{display: 'flex', flexDirection: 'column', width: 200, backgroundColor: 'gray'}}>
        {dragObjArr.map((item, idx) => <p>
            <h4 style={{color: '#fff'}}>页面:{item.page}，盖章{idx}，left:{item.left}，top:{item.top}</h4>
        </p>)}
    </div>
};
