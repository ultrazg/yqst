/**
 * Created by ljy on 2018/5/24
 */
import React from 'react';
import {Input} from 'antd';

export default class InputItem extends React.Component {
    render() {
        return this.inputItem(this.props.title, this.props.text,
            this.props.pla, this.props.onChange)
    }

    inputItem(title, text, pla, onChange) {
        let styles = {
            paddingLeft: this.props.contentWidth * 0.01,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        };
        if (this.props.style)
            styles = {
                ...styles,
                ...this.props.style,
            }
        return <div style={styles}>
            <div style={{
                marginRight: 7,
                minWidth: this.props.contentWidth * 0.01 * 4,
                fontSize: 13,
                color: this.props.onlyInfo ? '#999' : '#777'
            }}>{title}:
            </div>
            {this.props.onlyInfo ?
                <div className={'text-adapt'} style={{
                    width: this.props.contentWidth * 0.01 * 20,
                    fontSize: 13, color: '#444'
                }}>{this.props.text ? this.props.text : ""}</div> :
                <Input
                    disabled={this.props.onlyInfo}
                    style={{color: '#444', backgroundColor: 'transparent', width: this.props.contentWidth * 0.01 * 20}}
                    value={text}
                    onChange={(e) => {
                        onChange && onChange(e);
                    }}
                    placeholder={!this.props.onlyInfo && pla ? pla : ""}/>}
        </div>
    }
}