import React, { Component } from 'react';
import { Breadcrumb, Row, Col } from 'antd';
import { Link } from 'react-router-dom';

class ViewCoat extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isScroll: this.props.isScroll ? this.props.isScroll : false
        };
    }

    componentDidMount() {
    }

    componentWillUnmount() {
        // document.getElementById('root').removeEventListener("scroll", this.setScrollFun.bind(this), false);
    }

    setScroll() {
        let dom = document.getElementById('root');
        dom.addEventListener('scroll', this.setScrollFun.bind(this), false);
    }

    setScrollFun() {
        let dom = document.getElementById('root');
        let modTop = document.getElementById('modTop');
        let modCom = document.getElementById('modCom');
        if (dom.scrollTop >= 100 && this.state.isScroll) {
            modTop.style.position = 'fixed';
            modTop.style.right = '24px';
            modTop.style.top = '0px';
            modTop.style.width = (document.documentElement.clientWidth - 300 - 24) + 'px';
            modTop.style.boxShadow = 'rgba(153, 153, 153, 0.8) -5px 5px 8px 5px';
            modCom.style.marginTop = '141px';

        } else {
            modTop.style.position = 'inherit';
            modTop.style.right = '0px';
            modTop.style.top = '0px';
            // modTop.style.width = 'auto';
            modTop.style.boxShadow = null;
            modCom.style.marginTop = '0px';

        }
    }

    render() {
        const {
            breadCrumb = [], topView = null, topTxtView = null, titleRightView = null, children, topcenterView = null,
            topStyle = {}, topViewStyle = {}, botStyle = {},
        } = this.props;

        return (
            <div>
                <div
                    id={'modTop'}
                    style={{
                        height: '119px',
                        borderRadius: '6px',
                        padding: '22px 32px 24px',
                        background: '#fff',
                        marginBottom: '22px',
                        zIndex: 2,
                        ...topStyle,
                    }}
                >
                    <Breadcrumb
                        style={{ fontSize: '14px' }}
                    >
                        {
                            breadCrumb.map((item, idx) => {
                                if (item.link)
                                    return <Breadcrumb.Item
                                        key={'Breadcrumb_' + idx}
                                        style={{ color: breadCrumb.length - 1 === idx ? 'rgba(43,52,65,1)' : 'rgba(43,52,65,0.25)' }}
                                    >
                                        <Link
                                            to={item.link}
                                        >{item.title}</Link>
                                    </Breadcrumb.Item>;

                                return <Breadcrumb.Item
                                    key={'Breadcrumb_' + idx}
                                    style={{ color: breadCrumb.length - 1 === idx ? 'rgba(43,52,65,1)' : 'rgba(43,52,65,0.25)' }}
                                >{item.title}</Breadcrumb.Item>;
                            })
                        }
                    </Breadcrumb>
                    <Row
                        style={{
                            marginTop: '20px'
                        }}
                    >
                        <Col span={12}>
                            <h1
                                style={{
                                    marginBottom: '0px',
                                    fontSize: '24px',
                                    color: '#2B3441',
                                    lineHeight: '33px',
                                }}
                            >
                                {breadCrumb[breadCrumb.length - 1].title}
                                {titleRightView}
                            </h1>
                        </Col>
                        <Col span={12}
                            style={{
                                textAlign: 'right',
                                lineHeight: '33px',
                                ...topViewStyle,
                            }}
                        >
                            {topView}
                        </Col>
                    </Row>
                    {
                        topTxtView
                    }
                </div>
                {
                    topcenterView ?
                        <div
                            style={{
                                borderRadius: '6px',
                                background: '#fff',
                                padding: '22px 32px',
                                width: (document.documentElement.clientWidth - 300 - 24),
                                marginBottom: '22px',
                                ...botStyle,
                            }}
                        >
                            {topcenterView}
                        </div> :
                        null
                }
                <div
                    id={'modCom'}
                    style={{
                        borderRadius: '6px',
                        background: '#fff',
                        // minHeight: '652px',
                        minHeight: '541px',
                        padding: '22px 32px',
                        width: (document.documentElement.clientWidth - 300 - 24),
                        ...botStyle,
                    }}
                >
                    {children}
                </div>
            </div>
        );
    }
}

export default ViewCoat;
