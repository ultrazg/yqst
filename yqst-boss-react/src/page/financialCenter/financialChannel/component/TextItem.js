/**
 * Created by ljy on 2018/5/24
 */
import React from 'react';
import {Input} from 'antd';

export default class TextItem extends React.Component {
    render() {
        return this.inputItem(this.props.title, this.props.text,
            this.props.pla, this.props.onChange)
    }

    inputItem(title, text, pla, onChange) {
        return <div style={{
            flex:1,
            paddingLeft: this.props.contentWidth * 0.01,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center'
        }}>
            <div style={{
                marginRight: 7,
                minWidth: this.props.contentWidth * 0.01 * 4,
                fontSize: 13,
                color:this.props.onlyInfo ?'#999':'#777'
            }}>{title}:</div>
            {this.props.onlyInfo ?
                <div className={'text-adapt'} style={{
                    width: this.props.contentWidth * 0.01 * 20,
                    fontSize: 13, color: '#333'
                }}>{text}</div> :
            <Input
                disabled={true}
                style={{color:'#333',backgroundColor: 'transparent', width: this.props.contentWidth * 0.01 * 20}}
                value={text}
                placeholder={""}/>}
        </div>
    }
}