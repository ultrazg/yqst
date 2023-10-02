/**
 * Created by ljy on 2018/5/24
 */
import React from 'react';
import {Select} from 'antd';

const Option = Select.Option;
export default class SelectionItem extends React.Component {
    render() {
        return this.selectItem(this.props.title, this.props.option, this.props.pla,
            this.props.dataSource, this.props.showKey, this.props.onSelect)
    }

    selectItem(title, option, pla, dataSource, showKey = 'name', onSelect) {
        return <div style={{
            flex: 1,
            paddingLeft: this.props.contentWidth * 0.01,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <div style={{
                marginRight: 7,
                minWidth: this.props.contentWidth * 0.01 * 2,
                fontSize: 13,
                color: this.props.onlyInfo ? '#999' : '#777'
            }}>{title}:
            </div>
            {this.props.onlyInfo ?
                <div className={'text-adapt'} style={{
                    width: this.props.contentWidth * 0.01 * 20,
                    fontSize: 13, color: '#444'
                }}>{showKey == 'nokey' ? option : option[showKey]}</div> :
                <Select
                    disabled={this.props.onlyInfo}
                    style={{color: '#444', backgroundColor: '#fff', width: this.props.contentWidth * 0.01 * 20}}
                    placeholder={!this.props.onlyInfo && pla ? pla : ""}
                    value={showKey == 'nokey' ? option : option[showKey]}
                    onChange={(datastr) => {
                        if (datastr) {
                            let dataobj = null;
                            if (showKey == 'nokey') {
                                onSelect && onSelect(datastr);
                            } else {
                                try {
                                    dataobj = JSON.parse(datastr);
                                } catch (e) {
                                    dataobj = null
                                }
                                if (dataobj)
                                    onSelect && onSelect(dataobj);
                                else
                                    onSelect && onSelect();
                            }
                        } else {
                            onSelect && onSelect();
                        }
                    }}
                >
                    {dataSource.map((item, index) => {
                        return <Option
                            key={index}
                            value={showKey == 'nokey' ? item : JSON.stringify(item)}>{showKey == 'nokey' ? item : item[showKey]}</Option>
                    })}
                </Select>}
        </div>
    }
}