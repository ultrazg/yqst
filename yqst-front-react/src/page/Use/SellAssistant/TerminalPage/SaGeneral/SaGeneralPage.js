import React, {Component} from 'react';
import {Dropdown, Menu, Modal} from 'antd';
import {
    xl,
    dd_11,
    hw_11,
    ys_11,
    fp_11,
    sh_11,
    jy_11,
    ht_11,
    sp_11,
    kh_11,
    yg_11,
    pz_11,
    perCenter,
    perOtherCon
} from '../../../../../resource';
import moment from 'moment'

const gnList = [
    {
        logo: dd_11,
        name: '订单管理'
    },
    {
        logo: hw_11,
        name: '货物管理'
    },
    {
        logo: ys_11,
        name: '运输管理'
    },
    {
        logo: fp_11,
        name: '发票管理'
    },
    {
        logo: sh_11,
        name: '售后管理'
    },
    {
        logo: jy_11,
        name: '交易单管理'
    },
    {
        logo: ht_11,
        name: '合同管理'
    },
    {
        logo: sp_11,
        name: '商品管理'
    },
    {
        logo: kh_11,
        name: '客户管理'
    },
    {
        logo: yg_11,
        name: '员工管理'
    },
    {
        logo: pz_11,
        name: '交易配置'
    },
];

class SaGeneralPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gnList: gnList,
            shopName: 'xxx',
            times: '---'
        };
    }

    componentDidMount() {
        window.Storage.load({
            key: 'SParams', // 获取本地选择店铺的数据
        }).then(data => {
            console.log('data: ', data);
            this.setState({
                shopName: data.shopName,
                times: data.expireTime ? moment(data.expireTime).format("YYYY-MM-DD") : '---'
            });
        })
    }

    componentWillUnmount() {

    }

    render() {
        let {gnList = []} = this.state;
        const menu = (
            <Menu
                style={{width: '124px', float: 'right', marginRight: '15px'}}
            >
                <Menu.Item>
                    <a
                        onClick={() => {
                            this.setState({mesVisible: true});
                        }}
                    >
                        <img src={perCenter} alt="" style={{
                            width: '18px',
                            height: '18px',
                            verticalAlign: 'text-bottom',
                            marginRight: '8px'
                        }}/>
                        终端信息
                    </a>
                </Menu.Item>
                <Menu.Item>
                    <a
                        onClick={() => {
                            this.props.history.push('/pages/appCenter/sellAssistant/SAIndex?type="切换终端"')
                        }}
                    >
                        <img src={perOtherCon} alt="" style={{
                            width: '18px',
                            height: '18px',
                            verticalAlign: 'text-bottom',
                            marginRight: '8px'
                        }}/>
                        切换终端
                    </a>
                </Menu.Item>
            </Menu>
        );

        return (
            <div>
                <div
                    style={{
                        height: '104px',
                        borderRadius: '6px',
                        background: '#fff',
                        padding: '0px 24px',
                        lineHeight: '104px',
                        fontSize: '24px'
                    }}
                >
                    <h1
                        style={{margin: '0px', height: '100%'}}
                    >
                        <img src={window.globalConfig.logo} alt=""
                             style={{width: '32px', height: '32px', marginRight: '12px'}}
                        />
                        <Dropdown overlay={menu}>
                            <span>
                                <span style={{fontSize: '24px'}}>{this.state.shopName}</span>
                                <img src={xl} alt=""
                                     style={{
                                         width: '14px',
                                         height: '14px',
                                         marginLeft: '8px',
                                         marginRight: '16px'
                                     }}
                                />
                                {/*<Icon type="down"
                                    style={{
                                        fontSize: '14px',
                                        marginLeft: '8px',
                                        marginRight: '16px'
                                    }}
                                />*/}
                            </span>
                        </Dropdown>
                        <span style={{color: 'rgba(43,52,65,0.65)', fontSize: '12px'}}>
                            服务有效期：{this.state.times}
                        </span>
                        <a style={{marginLeft: '8px', fontWeight: 100, fontSize: '12px'}}>服务续费</a>
                    </h1>
                </div>
                <div
                    style={{
                        height: '114px',
                        background: 'rgba(255,255,255,1)',
                        borderRadius: '6px',
                        margin: '24px 0',
                        padding: '24px',
                        display: 'flex'
                    }}
                >
                    <div
                        style={{flex: 1}}
                    >
                        <span>订单总数</span>
                        <h2 style={{fontSize: '30px', marginTop: '4px', marginBottom: '0'}}>--</h2>
                    </div>
                    <div
                        style={{flex: 1}}
                    >
                        <span>商品总数</span>
                        <h2 style={{fontSize: '30px', marginTop: '4px', marginBottom: '0'}}>--</h2>
                    </div>
                    <div
                        style={{flex: 1}}
                    >
                        <span>在售商品</span>
                        <h2 style={{fontSize: '30px', marginTop: '4px', marginBottom: '0'}}>--</h2>
                    </div>
                    <div
                        style={{flex: 1}}
                    >
                        <span>下架商品</span>
                        <h2 style={{fontSize: '30px', marginTop: '4px', marginBottom: '0'}}>--</h2>
                    </div>
                </div>
                <div
                    style={{
                        minHeight: '394px',
                        background: 'rgba(255,255,255,1)',
                        borderRadius: '6px',
                    }}
                >
                    <h2
                        style={{
                            fontSize: '16px',
                            padding: '13px 24px',
                            lineHeight: '22px',
                            borderBottom: '1px solid rgba(43,52,65,0.25)',
                            marginBottom: '0px'
                        }}
                    >常用功能</h2>
                    <div
                        style={{
                            display: 'flex',
                            // justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            padding: '24px 24px 0px 24px',
                            cursor: 'pointer',
                        }}
                    >
                        {
                            gnList.map((item, idx) => {
                                return <div
                                    key={'gnList_' + idx}
                                    style={{
                                        width: '20%',
                                        marginBottom: '32px'
                                    }}
                                >
                                    <img src={item.logo} alt=""
                                         style={{
                                             width: '32px',
                                             height: '32px',
                                             marginRight: '8px'
                                         }}
                                    />
                                    {
                                        item.name
                                    }
                                </div>
                            })
                        }
                    </div>
                </div>
                {this.makeMes()}
            </div>
        );
    }

    makeMes() {
        let {mesVisible} = this.state;
        return <Modal
            width={546}
            className={'Modal'}
            title="终端信息"
            visible={mesVisible}
            onOk={() => {
            }}
            onCancel={() => {
                this.setState({mesVisible: false});
            }}
            footer={null}
        >
            <div style={{textAlign: 'center'}}>
                <img src={window.globalConfig.logo} alt="" style={{width: '56px', height: '56px'}}/>
                <h3 style={{marginTop: '12px', marginBottom: '24px', fontSize: '14px', color: '#2B3441'}}>
                    北京市大头菜批发中心
                </h3>
            </div>
            <div style={{color: 'rgba(43,52,65,0.85', marginBottom: '16px'}}>
                <span style={{
                    display: 'inline-block',
                    color: '#2B3441',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '8px'
                }}>简介：</span>
                主营大头菜批发
            </div>
            <div style={{color: 'rgba(43,52,65,0.85', marginBottom: '16px'}}>
                <span style={{
                    display: 'inline-block',
                    color: '#2B3441',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '8px'
                }}>销售终端地址：</span>
                北京市海淀区蔬菜大道大头菜大厦112号
            </div>
            <div style={{color: 'rgba(43,52,65,0.85', marginBottom: '16px'}}>
                <span style={{
                    display: 'inline-block',
                    color: '#2B3441',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '8px'
                }}>销售终端电话：</span>
                020-1182827
            </div>
            <div style={{color: 'rgba(43,52,65,0.85', marginBottom: '16px'}}>
                <span style={{
                    display: 'inline-block',
                    color: '#2B3441',
                    width: '150px',
                    textAlign: 'right',
                    marginRight: '8px'
                }}>服务有效期：</span>
                2028-03-03
                <a style={{marginLeft: '16px'}}>服务续费</a>
            </div>
        </Modal>
    }
}

export default SaGeneralPage;
