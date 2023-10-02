import React, {Component} from 'react';

import {Button, message} from 'antd';
import Model from '../../Model'
import {connect} from "react-redux";
import {setIndexMes} from "../../../layout/redux/mainLayoutAction";
import IsPower from "../../../Power/IsPower";

@connect(
    (state) => {
        const {mainLayoutReducers} = state;
        return {
            mainLayoutReducers
        }
    },
    (dispatch) => {
        return {
            setIndexMes: (position) => {
                dispatch(setIndexMes(position))
            },
        }
    }
)

class CompanyBasInf extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            isEditor: false
        };

    }

    componentDidMount() {
        window.globalPermissions.checkPermission('ERP_MESSAGE_VIEW', (res) => {
            if(!res)
                this.getGetErpInfo();
        });
    }

    componentWillUnmount() {
    }

    render() {
        let {data} = this.state;

        return (
            <div className={'cbiCss'}>
                <IsPower
                    key={'ERP_MESSAGE_VIEW'}
                    permissionsName={'ERP_MESSAGE_VIEW'}
                >
                    <h1>企业基本信息</h1>
                    <ul className={'cbi_ul'}>
                        <li>
                            <span>企业Logo</span>
                            <img style={{width: '80px', height: '80px', borderRadius: '6px'}} src={data.logo} alt=""
                                 className={'imgCover'}/>
                        </li>
                        <li>
                            <span>企业名称</span>
                            {data.enterpriseName || ''}
                        </li>
                        <li>
                            <span>公司全称</span>
                            {data.enterpriseFullName || ''}
                        </li>
                        <li>
                            <span>企业号</span>
                            {data.accountSn || ''}
                        </li>
                        <li>
                            <span>国家</span>
                            {data.country || ''}
                        </li>
                        <li>
                            <span>行业</span>
                            {data.industry || ''}
                        </li>
                        <li>
                            <span>所在地区</span>
                            {`${data.provinceName || ''}${data.cityName || ''}${data.districtName || ''}`}
                        </li>
                        <li>
                            <span>电话</span>
                            {data.contactPhone || ''}
                        </li>
                        <li>
                            <span>传真</span>
                            {data.faxWay || ''}
                        </li>
                        <li>
                            <span>邮箱</span>
                            {data.email || ''}
                        </li>
                        <li>
                            <span>邮编</span>
                            {data.counId || ''}
                        </li>
                        <li>
                            <span>办公地址</span>
                            {`${data.officeProvinceName || ''}${data.officeCityName || ''}${data.officeDistrictName || ''}${data.companyOfficeAddress || ''}`}
                        </li>
                    </ul>
                    <Button type="primary" className={'editBtn'} style={{padding: '0px'}}
                            onClick={() => {
                                window.globalPermissions.checkPermission('ERP_MESSAGE_EDIT', (res) => {
                                    if (res)
                                        return message.error('抱歉，您没有该操作权限，请联系管理员！');

                                    this.props.history.push('/pages/myCompany/subjectSetUp/companyBasInf/companyBasInfEdit');
                                });
                            }}
                    >编辑信息</Button>
                </IsPower>
            </div>
        );
    }

    getGetErpInfo() {
        Model.GetErpInfo({}, (res) => {
            this.setState({data: res.data || {}}, () => {
                this.props.setIndexMes(res.data ? {
                    ...res.data,
                    companyEmail: res.data.email,
                    companyPhone: res.data.contactPhone,
                    company: res.data.enterpriseName,
                } : {});
            });
        }, (err) => {
        });
    }

}

export default CompanyBasInf;
