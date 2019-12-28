import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.less';
import {Provider} from 'react-redux';
import store from './module/store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>, document.getElementById('app'));