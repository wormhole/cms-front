import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// import 'antd/dist/antd.css'; // 不需要全部引入
import './index.less';
import {Provider} from 'react-redux';
import store from './module/store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('app'));

// 启用 HMR，保存代码后热刷新
if (process.env.NODE_ENV !== 'production') {
    if (module.hot) module.hot.accept();
}
