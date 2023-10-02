import {Table, Tabs} from 'antd';
import ViewContent from '../viewContent/ViewContent';
import React, {Component} from 'react';

const TabPane = Tabs.TabPane;
/**
 * Created by ljy on 2018/12/5
 */
// tabs:[{tabName:"全部",callback:()=>{}}]
export default class TabsViewContent extends Component {
    render() {
        return <ViewContent crumb={this.props.crumb}
                            style={(this.props.outStyle ? this.props.outStyle : {})}>
            {this.props.tabs ? <div style={{
                paddingTop: 5,
                paddingLeft: 10,
                paddingRight: 10
            }}>
                <Tabs defaultActiveKey={this.props.defaultTabs}
                      tabBarStyle={{padding: 0, marginBottom: 1}}
                      onChange={(key) => {
                          this.props.tabs[key]
                          && this.props.tabs[key].callback
                          && this.props.tabs[key].callback();
                      }}>
                    {this.props.tabs.map((item, index) => {
                        if (item.tabName === '') return false;
                        return <TabPane tab={item.tabName} key={index + ''}/>;
                    })}
                </Tabs>
            </div> : null}
            {this.props.children}
        </ViewContent>;
    }
}
