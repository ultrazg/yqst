import React, {Component} from 'react';

import {
    Button,
    message,
    Input,
    Select,
    Switch,
    Table,
} from 'antd';
import {
    EditOutlined,
    RollbackOutlined
} from '@ant-design/icons';
import {upload, word} from '../../../../resource';
import UploadFileMethod from '../../../../baseview/uploadFile/UploadFileMethod';
import ViewCoat from '../../PublicModule/ViewCoat/ViewCoat';

const { Option } = Select;

class CompanyClassDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.sn = '';
    }

    componentDidMount() {}

    componentWillUnmount() {}

    render() {
        return (
            <ViewCoat
                breadCrumb={[
                    {title: '企业产品库'},
                    {title: '类目列表', link: '/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList'},
                    {title: '企业产品类目详情'},
                ]}
                topView={<div>
                    <Button type="primary" icon={<EditOutlined />}
                            style={{
                                fontSize: '16px',
                                borderRadius: '6px',
                                paddingTop: '0px',
                                paddingBottom: '0px'
                            }}
                            onClick={() => {
                                this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/CompanyClassEdit');
                                // message.warning('工程师还在紧张有序的研发中，请敬请期待！');
                            }}
                    >编辑</Button>
                    <Button
                        icon={<RollbackOutlined />}
                        style={{
                            fontSize: '16px',
                            borderRadius: '6px',
                            paddingTop: '0px',
                            paddingBottom: '0px',
                            marginLeft: '16px'
                        }}
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/companyProductLib/companyProductLibHome/companyClass/companyClassList');
                        }}
                    >返回</Button>
                </div>}
            >
                {this.TxtView('企业产品类目ID', 'LM000001')}
                {this.TxtView('类目名称', '发动机')}
                {this.TxtView('上级类目', '动力系统')}
                {this.TxtView('创建人', '小米')}
                {this.TxtView('创建时间', '2019-01-01 10:56')}
            </ViewCoat>
        );
    }

    TxtView(label, content){
        return <>
            <div style={{display: 'flex', lineHeight: '32px'}}>
                <div
                    style={{
                        width: '120px',
                        textAlign: 'right',
                        color: '#2B3441',
                    }}
                >{label}：</div>
                <div
                    style={{
                        flex: 1,
                    }}
                >{content}</div>
            </div>
            <div style={{height: '10px'}}/>
        </>
    }
}

export default CompanyClassDetail;
