import React from "react";
import PropTypes from 'prop-types' ;

/**
 * Created by ljy on 2018-12-25
 *
 * 属性：style,postMessageData(最好为string类型，减少渲染次数),onLoad,src
 */


class Iframe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            iframeStyle: {}
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.postMessageData != nextProps.postMessageData) {
            this.postMessage(nextProps.postMessageData);
        }
        return null;
    }

    componentDidMount() {
        this.SWIframeView && this.SWIframeView.addEventListener("load", () => {
            this.props.onLoad && this.props.onLoad();
            setTimeout(() => {
                this.setState({
                    iframeStyle: {height: '100%', ...this.props.style}
                });
                this.postMessage(this.props.postMessageData);
            }, 100)
        });
    }

    componentWillUnmount() {
    }

    postMessage = (data) => {
        let dataStr = "";
        if (typeof data === "object") {
            dataStr = JSON.stringify(data);
        } else if (typeof data === "string") {
            dataStr = data;
        }
        this.SWIframeView && this.SWIframeView.contentWindow.postMessage(dataStr, "*")
    }

    render() {
        return <iframe
            id="SWIframeId"
            ref={(c) => {
                this.SWIframeView = c
            }}
            style={{width: '100%', height: 0, ...this.state.iframeStyle}}
            frameBorder={0}
            src={this.props.src}
        />
    }
}

Iframe.propTypes = {
    postMessageData: PropTypes.string.isRequired
}

export default Iframe;
