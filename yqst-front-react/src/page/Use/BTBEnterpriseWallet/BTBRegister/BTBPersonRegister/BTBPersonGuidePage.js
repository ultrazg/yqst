import React, {Component} from 'react';
import {
    Skeleton,
} from 'antd';
import ViewCoat from '../../../PublicModule/ViewCoat/ViewCoat';

class BTBPersonGuidePage extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '账户管理'},
                    {title: '账户概览'},
                ]}
                titleRightView={<div
                    style={{
                        display: 'inline-block',
                        fontWeight: 100,
                        color: '#2B3441',
                        marginLeft: '14px',
                    }}
                >
                    您还未开通个人账户，请点击
                    <a
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/btbEnterpriseWallet/btbRegister/btbPersonRegister');
                        }}
                    >开通</a>
                </div>}
                // topView={<div>
                //     <Button>提交</Button>
                // </div>}
                botStyle={{
                    background: 'none',
                    padding: '0px'
                }}
            >
                <div
                    style={{background: '#fff', borderRadius: '6px', height: '150px', padding: '12px 24px', marginBottom: '24px'}}
                >
                    <Skeleton paragraph={{ rows: 2 }}/>
                </div>
                <div
                    style={{
                        display: 'flex',
                        marginBottom: '24px'
                    }}
                >
                    <div style={{flex: 1, background: '#fff', borderRadius: '6px', height: '200px', padding: '12px 24px', marginRight: '24px'}}>
                        <Skeleton paragraph={{ rows: 3 }}/>
                    </div>
                    <div style={{flex: 1, background: '#fff', borderRadius: '6px', height: '200px', padding: '12px 24px'}}>
                        <Skeleton paragraph={{ rows: 3 }}/>
                    </div>
                </div>
                <div
                    style={{
                        display: 'flex',
                    }}
                >
                    <div style={{flex: 1, background: '#fff', borderRadius: '6px', height: '200px', padding: '12px 24px', marginRight: '24px'}}>
                        <Skeleton paragraph={{ rows: 3 }}/>
                    </div>
                    <div style={{flex: 1, background: 'none', borderRadius: '6px', height: '200px', padding: '12px 24px'}}>

                    </div>
                </div>
            </ViewCoat>
        );
    }

}

export default BTBPersonGuidePage;
