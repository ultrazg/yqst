import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import CompanyChain from './chains/CompanyChain';
import ProjectChain from "./chains/ProjectChain";
import SalesAndTradingData from "./salesAndTradingData/SalesAndTradingData";
import OrderData from './orderData/orderData';
import './index.css';

class DataCenter extends Component {
    render() {
        return (
            <Switch>
                <Route path={'/Pages/DataCenter/CompanyChain'} exact
                       component={CompanyChain}/>
                <Route path={'/Pages/DataCenter/ProjectChain'} exact
                       component={ProjectChain}/>
                <Route path={'/Pages/DataCenter/SalesAndTradingData'} exact
                       component={SalesAndTradingData}/>
                <Route path={'/Pages/DataCenter/OrderData'} exact
                       component={OrderData}/>
            </Switch>
        );
    }
}

export default DataCenter;
