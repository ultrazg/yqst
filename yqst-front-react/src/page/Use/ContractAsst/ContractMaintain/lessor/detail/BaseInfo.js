//基础信息
import React from 'react';
import request from "../../../../../../utils/request/request";
import Api from "../../Api/Api";

export default class BaseInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    componentDidMount() {
        request(Api.LessorContractGet, {sn: this.props.sn}, (res) => {
            this.props.setData && this.props.setData(res.data)
        }, () => {
        })
    }

    render() {
        let {data} = this.props
        return <div>
            {this.renderText('承租单位', data.lesseeName)}
            {this.renderText('出租单位', data.lessorName)}
            {this.renderText('项目名称', data.projectName)}
            {this.renderText('提交人', data.submitterName)}
            {this.renderText('提交时间', data.submitTime)}
        </div>
    }

    renderText = (title, content) => {
        return (
            <p style={{display: 'flex'}}>
                <label style={{width: 80}}>{title}</label>
                <span style={{marginLeft: 50, flex: 1}}>{content}</span>
            </p>
        )
    }
}
