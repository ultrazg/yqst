/**
 * Created by ljy on 2018/4/17
 */
import React, {Component} from 'react';
import {Card, Button, Form, Input, Collapse, message, Switch} from 'antd';
import {timeFormat} from '../../base/functions';
import CheckInput from '../../utils/checkInput/CheckInput';
import AppUpdateModel from './model/AppUpdateModel';
import {initAppData, setAppData} from './redux/AppUpdateManageAction';
import DateUtils from '../../utils/dateutils/DateUtils';
import {connect} from 'react-redux';
import HeadBar from '../../baseview/headbar/HeadBar';
const {TextArea} = Input;
const Panel = Collapse.Panel;

class AppUpdateManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            edit: -1,
            listData: []
        }
    }

    componentDidMount() {
        this.refresh();
    }

    refresh() {
        AppUpdateModel.getAppUpdateList({}, (res) => {
            if (res.data instanceof Array) {
                this.props.setAppData(JSON.parse(JSON.stringify(res.data)));
                this.setState({
                    listData: res.data
                });
            }
        }, () => {
        });
    }

    componentWillUnmount() {
        this.props.initAppData();
    }

    render() {
        return <div style={{width: this.props.IndexReducers.contentWidth}}>
            <HeadBar data={[{name: "App更新管理"}, {name: "App更新列表"}]}/>
            <div style={{
                borderTopRightRadius: 5,
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
                marginBottom: 10,
                marginLeft: 5, marginRight: 5,
                backgroundColor: '#fff'
            }}>
                <div style={{
                    padding: 5,
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                    borderBottomLeftRadius: 5,
                    borderBottomRightRadius: 5,
                    backgroundColor: '#fff'
                }}>
                    <Collapse accordion>
                        {this.state.listData.map((item, index) => {
                            // "appName": "appName5",
                            //     "appType": "appType5",
                            //     "createTime": 1523955238000,
                            //     "historyVersion": "historyVersion5",
                            //     "id": 5,
                            //     "isForce": 5,
                            //     "limitVersion": "limitVersion5",
                            //     "localVersion": "localVersion5",
                            //     "sysTag": "sysTag5",
                            //     "updateInfo": "updateInfo5",
                            //     "updateTime": 1523955395000,
                            //     "updateUrl": "updateUrl5"
                            let listData = this.props.AppUpdateManageReducer.listData;
                            return <Panel header={item.appName + "-" + item.appType} key={index}>
                                {this.renderItem(item, index, listData[index])}
                                <div style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    marginTop: 5,
                                    marginBottom: 5
                                }}>
                                    <Button style={{minWidth: 100}} onClick={() => {
                                        if (this.state.edit == index) {
                                            AppUpdateModel.appUpdateInfo({
                                                ...this.state.listData[index],
                                                updateUrl: this.state.listData[index].updateUrl,
                                            }, (res) => {
                                                setTimeout(() => {
                                                    message.info("保存成功")
                                                    this.setState({edit: -1});
                                                    this.refresh();
                                                }, 500);
                                            }, () => {
                                            });
                                        } else {
                                            this.setState({edit: index});
                                        }
                                    }}>{this.state.edit == index ? "保存" : "编辑"}</Button>
                                </div>
                            </Panel>
                        })}
                    </Collapse>
                </div>
            </div>
        </div>
    }

    renderItem(data, index, orgData) {
        return <div style={{display: 'flex', flexDirection: 'column'}}>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>应用名称:</div>
                {this.state.edit != index ? <div style={{display: 'flex', flex: 2}}>{orgData.appName}</div> :
                    <Input value={data.appName}
                           onChange={(e) => {
                               data.appName = e.target.value;
                               this.setState({
                                   listData: this.state.listData.concat()
                               });
                           }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>平台:</div>
                <div style={{display: 'flex', flex: 2}}>{orgData.appType}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>系统标识:</div>
                {this.state.edit != index ? <div style={{display: 'flex', flex: 2}}>{orgData.sysTag}</div> :
                    <Input value={data.sysTag}
                           onChange={(e) => {
                               data.sysTag = e.target.value;
                               this.setState({
                                   listData: this.state.listData.concat()
                               });
                           }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>当前版本号:</div>
                {this.state.edit != index ? <div style={{display: 'flex', flex: 2}}>{orgData.localVersion}</div> :
                    <Input value={data.localVersion}
                           onChange={(e) => {
                               data.localVersion = e.target.value;
                               this.setState({
                                   listData: this.state.listData.concat()
                               });
                           }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>最低版本号:</div>
                {this.state.edit != index ? <div style={{display: 'flex', flex: 2}}>{orgData.limitVersion}</div> :
                    <Input value={data.limitVersion}
                           onChange={(e) => {
                               data.limitVersion = e.target.value;
                               this.setState({
                                   listData: this.state.listData.concat()
                               });
                           }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>下载链接:</div>
                {this.state.edit != index ? <div style={{display: 'flex', flex: 2}}>{orgData.updateUrl}</div> :
                    <Input value={data.updateUrl}
                           onChange={(e) => {
                               data.updateUrl = e.target.value;
                               this.setState({
                                   listData: this.state.listData.concat()
                               });
                               console.log("orgdata", orgData);
                           }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>更新日志:</div>
                {this.state.edit != index ?
                    <TextArea disabled autosize={1} style={{backgroundColor: '#fff', color: '#555'}}
                              value={orgData.updateInfo}/> :
                    <TextArea autosize={1} value={data.updateInfo}
                              onChange={(e) => {
                                  data.updateInfo = e.target.value;
                                  this.setState({
                                      listData: this.state.listData.concat()
                                  });
                              }}/>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>是否强制更新:</div>
                {this.state.edit != index ?
                    <div style={{display: 'flex', flex: 2}}><Switch checked={orgData.isForce}/></div> :
                    <div style={{display: 'flex', flex: 2}}><Switch checked={data.isForce}
                                                                    onChange={(checked) => {
                                                                        data.isForce = checked ? 1 : 0;
                                                                        this.setState({
                                                                            listData: this.state.listData.concat()
                                                                        });
                                                                    }}/></div>}
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>创建时间:</div>
                <div style={{display: 'flex', flex: 2}}>{DateUtils.formatDateToHourMinute(orgData.createTime)}</div>
            </div>
            <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                <div style={{display: 'flex', minWidth: 90, marginRight: 5, justifyContent: 'flex-end'}}>修改时间:</div>
                <div style={{display: 'flex', flex: 2}}>{DateUtils.formatDateToHourMinute(orgData.updateTime)}</div>
            </div>
        </div>
    }
}

function mapStateToProps(state) {
    const {AppUpdateManageReducer, IndexReducers} = state;
    return {AppUpdateManageReducer, IndexReducers}
}

const mapDispatchToProps = (dispatch) => {
    return {
        initAppData: () => {
            dispatch(initAppData())
        },
        setAppData: (data) => {
            dispatch(setAppData(data))
        }
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(AppUpdateManage)
