/**
 * Created by yb on 2019/07/05.
 * 监控路由跳转时滚回头部
 */

import React, { Component } from 'react';
import { Route, withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
    // 监控手动刷新页面的时候滚回头部显示
    componentDidMount() {
        setTimeout(() => {
            window.setScrollTop(0);
        }, 1000);
    }

    // 监控路由跳转的时候滚回头部显示
    componentDidUpdate(prevProps) {
        if (this.props.location !== prevProps.location) {
            window.setScrollTop(0)
        }
    }

    render() {
        return this.props.children
    }
}
export default withRouter(ScrollToTop);