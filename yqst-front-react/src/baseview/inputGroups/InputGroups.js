import React, {Component} from 'react';
import {Input, message} from 'antd';

class InputGroups extends Component{
    constructor(props){
        super(props);
        this.state = {
            length: this.props.length ? parseInt(this.props.length) : 6, // 默认长度
            arrVal: [],
            callback: (arrVal) => {
                this.props.callback && this.props.callback(arrVal.join(''));
            }
        };
    }

    componentDidMount(){
        let {length, arrVal} = this.state;
        for(let i = 0; i < length; i++){
            arrVal[i] = '';
        }
        this.setState({arrVal});
    }

    render(){
        return <div>
            {this.makeInput()}
        </div>
    }

    makeInput(){
        let {length, arrVal, callback} = this.state;
        let html = [];
        for(let i = 0; i < length; i++){
            html.push(<Input
                ref={'Input' + i}
                type={'password'}
                value={arrVal[i]}
                style={{
                    width: '32px',
                    height: '32px',
                    lineHeight: '32px',
                    marginRight: i !== length -1 ? '16px' : '0px',
                    border: '1px solid rgba(43,52,65,0.25)',
                    borderRadius: '3px',
                    fontSize: '14px',
                }}
                maxLength={1}
                onChange={(e) => {
                    if(e.target.value && !/\d/.test(e.target.value))
                        return message.error('密码只能填写数字！', 1);

                    if(i + 1 >= length){
                        if(e.target.value)
                            this.refs['Input' + i].blur();

                    }else{
                        if(e.target.value)
                            this.refs['Input' + (i + 1)].focus();
                    }

                    arrVal[i] = e.target.value;
                    this.setState({arrVal}, () => {
                        callback(this.state.arrVal);
                    });
                }}
                onKeyUp={(e) => {
                    if(e.keyCode === 8){
                        arrVal[i] = e.target.value;
                        this.setState({arrVal}, () => {
                            if(i - 1 >= 0)
                                this.refs['Input' + (i - 1)].focus();

                            callback(this.state.arrVal);
                        });
                    }
                }}
            />);
        }
        return html;
    }
}

export default InputGroups
