import React, {Component} from 'react';
import {power, wait} from '../../resource/index';
import {connect} from "react-redux";
import Loading from './Loading';

@connect(
    (state) => {
        const {
            PermissionsReducer
        } = state;
        return {
            PermissionsReducer
        }
    },
)
class IsPower extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPower: false
        };
    }

    componentDidMount(){
        window.globalPermissions.checkPermission(this.props.permissionsName, (res) => {
            if(!res)
                this.setState({isPower: true});
        });
    }

    componentWillUnmount() {}

    render() {
        return this.makeView();
    }

    makeView(){
        const {
            PermissionsReducer, permissionsName, children, errText = '抱歉，您没有权限查看，请联系管理员！',
            style = {}, styleImg = {}, styleText = {}, styleWait = {}, styleWaitImg = {}, styleWaitText = {},
            isShowRes = true, isShowWait = true,
        } = this.props;

        if(this.state.isPower || PermissionsReducer.isNetworkSync){
            document.body.style.overflow = 'auto' ;
            if(PermissionsReducer.isNetworkSync){
                return this.judgePermissions(PermissionsReducer.permissionsList, permissionsName) ? children : isShowRes ? <div
                    style={{
                        width: '100%',
                        textAlign: 'center',
                        padding: '16px',
                        ...style,
                    }}
                >
                    <img src={power} alt=""
                         style={{
                             width: '120px',
                             ...styleImg,
                         }}
                    />
                    <div
                        style={{
                            color: '#969799',
                            marginTop: '8px',
                            fontSize: '12px',
                            ...styleText,
                        }}
                    >{errText}</div>
                </div> : null;

            }else if(this.state.isPower){
                return children;

            }

        }else if(!PermissionsReducer.isNetworkSync){
            // return isShowWait ? <Loading title={'加载中...'}/> : null;
            return isShowWait ? <div
                style={{
                    width: '100%',
                    textAlign: 'center',
                    padding: '16px',
                    ...styleWait,
                }}
            >
                {/*<img src={wait} alt=""*/}
                {/*     style={{*/}
                {/*         width: '120px',*/}
                {/*         ...styleWaitImg,*/}
                {/*     }}*/}
                {/*/>*/}
                <div
                    style={{
                        color: '#969799',
                        marginTop: '16px',
                        fontSize: '12px',
                        ...styleWaitText,
                    }}
                >
                    加载中，请稍等...
                </div>
            </div> : null;

        }
    }

    judgePermissions(list = [], permissionsName){
        let res = false;
        for (let i = 0; i < list.length; i++) {
            if (list[i].resCode + '' === permissionsName + '') {
                res = true;
                break;
            }
        }
        return res;
    }
}

export default IsPower;
