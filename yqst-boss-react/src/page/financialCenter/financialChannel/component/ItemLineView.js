/**
 * Created by ljy on 2018/5/24
 */
import React from 'react';

export default class ItemLineView extends React.Component {
    render() {
        let len = this.props.children.length;
        let plaView = [];
        while ((len + plaView.length) < 3) {
            plaView.push(<div style={{flex: 1, display: 'flex', paddingLeft: this.props.contentWidth * 0.01}}/>);
        }
        return <div style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: this.props.contentWidth * 0.01,
            paddingRight: this.props.contentWidth * 0.01,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            {this.props.children}
            {plaView}
        </div>
    }
}