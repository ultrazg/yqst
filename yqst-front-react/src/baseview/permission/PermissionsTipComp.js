/**
 * Created by ljy on 2018/9/4
 */
import React, {Component} from 'react';
import {connect} from 'react-redux';

@connect(
    (state) => {
        const {IndexReducers, PermissionsReducer} = state;
        return {IndexReducers, PermissionsReducer};
    }
)
class PermissionsTipComp extends React.Component {
    render() {
        return this.props.PermissionsReducer.isNetworkSync ?
            <div style={this.getCommonStyles()}>你没有权限，请联系管理员</div>
            : <div style={this.getCommonStyles()}>loading...</div>;
    }

    getCommonStyles() {
        return {
            width: this.props.IndexReducers.contentWidth - 17,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            fontSize: 20,
            minHeight: document.documentElement.clientHeight * 0.7
        };
    }
}

const PermissionsTipCompFunc = (reducer, permissions, renderComp, isReturnComp = false) => {
    if (reducer) {
        if (reducer.isAdmin == 1) {
            return renderComp;
        } else if (reducer.permissionsList) {
            for (let i = 0; i < reducer.permissionsList.length; i++) {
                if (reducer.permissionsList[i].resCode == permissions) {
                    return renderComp;
                }
            }
        }
    }
    return isReturnComp ? <PermissionsTipComp/> : PermissionsTipComp;
};

export default PermissionsTipCompFunc;
