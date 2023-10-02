import 'react-app-polyfill/ie11'
import 'react-app-polyfill/stable'
// import 'core-js'
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
//redux
import {Provider} from 'react-redux';
import ConfigureStore from './redux/ConfigureStore';
//ConfigProvider
import {ConfigProvider, message} from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
// import 'moment/locale/zh-cn';

const store = ConfigureStore();

// antd message提示只能同时存在一条
message.config({
    maxCount: 1,
})

ReactDOM.render(<Provider store={store}>
    <ConfigProvider locale={zh_CN}>
        <App store={store}/>
    </ConfigProvider>
</Provider>, document.getElementById('root'));
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
