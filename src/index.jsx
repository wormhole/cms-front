import React from 'react';
import ReactDOM from 'react-dom';
import Home from './page/home';
import {Provider} from 'react-redux';
import store from './page/home/store';
import {BrowserRouter} from 'react-router-dom'
import 'antd/dist/antd.css';
import './index.less';

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <Home/>
        </Provider>
    </BrowserRouter>, document.getElementById('app'));