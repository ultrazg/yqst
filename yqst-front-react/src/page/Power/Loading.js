/**
 * Created by ljy on 2017/11/15
 */
import React, {Component} from 'react';
import { LoadingOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import ApiConst from "../../base/urls/ApiConst";

export default class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: true,
            title: this.props.title || ''
        }
    }

    loadingColor() {
        let developeType = ApiConst.getVersions();
        switch (developeType) {
            case ApiConst.Ver.CZDPRODUCT:
                return '#0ea0a0';
            case ApiConst.Ver.JELPRODUCT:
            case ApiConst.Ver.JELPRODUCT_PRE:
                return '#108ee9';
            default:
                return '#108ee9';
        }
    }

    render() {
        return this.state.visiable ? <Modal
                zIndex={5000}
                visible={true}
                closable={false}
                footer={null}
                width={90}
                bodyStyle={{
                    display: 'flex',
                    height: 90, padding: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                style={{top: '40%', padding: 0}}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <LoadingOutlined style={{fontSize: 28, color: this.loadingColor()}} />
                    <span style={{fontSize: 13, marginTop: 10, color: this.loadingColor()}}>
                        {this.state.title}</span>
                </div>
            </Modal>
            : null;
    }
}
